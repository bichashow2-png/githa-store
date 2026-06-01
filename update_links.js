const fs = require('fs');
const path = require('path');

const productsData = {
    "زبدة اللوز": "almond-butter",
    "زبدة الفستق": "pistachio-butter",
    "الطحينة (سمسم)": "tahini",
    "زبدة البندق": "hazelnut-butter",
    "زبدة الكاجو": "cashew-butter",
    "لوز طبيعي نيء": "raw-almonds",
    "جوز (عين الجمل)": "walnuts",
    "كاجو فاخر": "premium-cashews",
    
    "برغل خشن طبيعي": "bulgur",
    "أرز أسمر كامل": "brown-rice",
    "شوفان عضوي": "oats",
    "كينوا بيضاء": "quinoa",
    "أرز أسود بري": "black-rice",
    
    "ماء الورد الطبيعي": "rose-water",
    "ماء الزهر المقطر": "orange-blossom-water",
    "ماء الزعتر الصافي": "thyme-water",
    "ماء اللبان العضوي": "frankincense-water",
    "ماء جوز الهند العضوي": "coconut-water",
    
    "زيت زيتون بكر ممتاز": "olive-oil",
    "زيت سمسم طبيعي": "sesame-oil",
    "زيت جوز الهند العضوي": "coconut-oil",
    "زبدة طبيعية نقية": "butter",
    "سمن حيواني": "animal-ghee",
    
    "عسل طبيعي أصلي": "pure-honey",
    "دبس التمر الخالص": "date-molasses",
    "دبس الرمان الطبيعي": "pomegranate-molasses",
    "سكر التمر البديل الصحي": "date-sugar",
    
    "خبز الشعير الصحي": "barley-bread",
    "خبز بالخميرة الطبيعية": "sourdough-bread",
    
    "كسكس الشعير": "barley-couscous",
    "كسكس البلوط": "acorn-couscous",
    "كسكس الخروب": "carob-couscous",
    "سباغيتي قمح الكامل": "whole-wheat-spaghetti",
    "رشتة القمح الكامل": "whole-wheat-rechta",
    
    "جبن أبيض طبيعي": "white-cheese",
    "زبادي يوناني أصلي": "greek-yogurt",
    "جبن إيدام معتق": "edam-cheese",
    "حليب جوز الهند": "coconut-milk",
    "شوفان كامل الحبة عضوي": "oats",
    "زبدة الفول السوداني الطبيعية": "default",
    "خبز ريفي بالخميرة": "sourdough-bread"
};

const dir = path.join('C:', 'Users', 'HP', '.gemini', 'antigravity-ide', 'scratch', 'gidha-store', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let changed = false;
    
    Object.keys(productsData).forEach(title => {
        const id = productsData[title];
        // Match <a href="product-detail.html">Title</a> or similar
        const regex = new RegExp('<a href="product-detail.html">(' + title.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + ')</a>', 'g');
        if (regex.test(content)) {
            content = content.replace(regex, '<a href="product-detail.html?id=' + id + '">$1</a>');
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log('Updated ' + file);
    }
});
