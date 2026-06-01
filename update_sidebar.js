const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldSidebarRegex = /<div class="filter-widget">\s*<h4>التصنيفات<\/h4>\s*<ul class="filter-list" style="list-style:none; padding:0;">[\s\S]*?<\/ul>\s*<\/div>/;

const newSidebar = `<div class="filter-widget">
                    <h4>التصنيفات</h4>
                    <ul class="filter-list">
                        <li><input type="checkbox" id="cat-1" onclick="window.location.href='category-grains.html'"> <label for="cat-1"><a href="category-grains.html">الحبوب والبقوليات</a></label></li>
                        <li><input type="checkbox" id="cat-2" onclick="window.location.href='category-nuts.html'"> <label for="cat-2"><a href="category-nuts.html">المكسرات والبذور</a></label></li>
                        <li><input type="checkbox" id="cat-3" onclick="window.location.href='category-oils.html'"> <label for="cat-3"><a href="category-oils.html">الزيوت والدهون الصحية</a></label></li>
                        <li><input type="checkbox" id="cat-4" onclick="window.location.href='category-honey.html'"> <label for="cat-4"><a href="category-honey.html">العسل والمحليات الطبيعية</a></label></li>
                        <li><input type="checkbox" id="cat-5" onclick="window.location.href='category-bakery.html'"> <label for="cat-5"><a href="category-bakery.html">مخبوزات صحية</a></label></li>
                        <li><input type="checkbox" id="cat-6" onclick="window.location.href='category-water.html'"> <label for="cat-6"><a href="category-water.html">الماء</a></label></li>
                        <li><input type="checkbox" id="cat-7" onclick="window.location.href='category-pastries.html'"> <label for="cat-7"><a href="category-pastries.html">معجنات</a></label></li>
                        <li><input type="checkbox" id="cat-8" onclick="window.location.href='category-dairy.html'"> <label for="cat-8"><a href="category-dairy.html">ألبان وأجبان</a></label></li>
                    </ul>
                </div>`;

let updatedCount = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (oldSidebarRegex.test(content)) {
        content = content.replace(oldSidebarRegex, newSidebar);
        fs.writeFileSync(filePath, content);
        updatedCount++;
    }
}
console.log('Updated ' + updatedCount + ' files.');
