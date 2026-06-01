import os
import glob
import re

def main():
    for file in glob.glob('**/*.html', recursive=True):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            content = re.sub(r'main\.js(\?v=\d+)?', 'main.js?v=2', content)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            pass

if __name__ == '__main__':
    main()
