const fs = require('fs');
const path = require('path');

const dirs = [__dirname, path.join(__dirname, 'pages')];
let files = [];
for (const dir of dirs) {
    const dirFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    for (const f of dirFiles) {
        files.push(path.join(dir, f));
    }
}

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Year
    content = content.replace(/2024 غذاء/g, '2026 غذاء');
    
    // 2. Location
    content = content.replace(/الجزائر العاصمة، الجزائر/g, 'البليدة الجزائر');
    
    // 3. Phone
    content = content.replace(/\+213 555 123 456/g, '0555 123 456');
    
    // 4. Social Icons
    const newSocial = `<div class="social-icons" style="display:flex; gap:10px; align-items:center;">
                        <a href="#" aria-label="انستغرام" style="color:var(--text-gray);"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="#" aria-label="فيسبوك" style="color:var(--text-gray);"><span class="material-icons-outlined" style="font-size:28px;">facebook</span></a>
                        <a href="#" aria-label="لينكد إن" style="color:var(--text-gray);"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                    </div>`;
                    
    content = content.replace(/<div class="social-icons">[\s\S]*?<\/div>/, newSocial);
    
    fs.writeFileSync(file, content);
}
console.log('Updated ' + files.length + ' files.');
