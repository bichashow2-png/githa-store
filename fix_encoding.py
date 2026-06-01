import os

base_dir = r"C:\Users\HP\.gemini\antigravity-ide\scratch\gidha-store"

def fix_encoding(filepath):
    try:
        # Read the corrupted utf-8 file
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # If it contains mojibake like 'Øº' we can try to reverse it
        if 'Ø' in content or 'Ù' in content:
            # Convert corrupted string back to bytes using latin-1
            raw_bytes = content.encode('cp1252') # or latin-1
            # Decode the bytes properly as utf-8
            fixed_content = raw_bytes.decode('utf-8')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"Fixed encoding for {filepath}")
    except Exception as e:
        print(f"Failed to fix {filepath}: {e}")

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            fix_encoding(os.path.join(root, file))
