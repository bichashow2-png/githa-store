import os
import re

base_dir = r"C:\Users\HP\.gemini\antigravity-ide\scratch\gidha-store"

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for index.html (header and footer)
    pattern1 = r'<a href="\./index\.html" class="(logo|footer-logo)">\s*<span class="material-icons">grass</span> غذاء\s*</a>'
    repl1 = r'<a href="./index.html" class="\1"><img src="./assets/images/logo.png" alt="غذاء" style="height: 45px;"></a>'
    
    # Pattern for pages/*.html (header and footer)
    pattern2 = r'<a href="\.\./index\.html" class="(logo|footer-logo)">\s*<span class="material-icons">grass</span> غذاء\s*</a>'
    repl2 = r'<a href="../index.html" class="\1"><img src="../assets/images/logo.png" alt="غذاء" style="height: 45px;"></a>'

    new_content = re.sub(pattern1, repl1, content)
    new_content = re.sub(pattern2, repl2, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            replace_in_file(os.path.join(root, file))
