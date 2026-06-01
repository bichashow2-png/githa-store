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

let count = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // add a dash between Blida and Algeria
    if (content.includes('البليدة الجزائر')) {
        content = content.replace(/البليدة الجزائر/g, 'البليدة - الجزائر');
        fs.writeFileSync(file, content);
        count++;
    }
}
console.log('Updated ' + count + ' files with the dash.');
