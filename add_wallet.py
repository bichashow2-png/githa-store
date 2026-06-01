import os
import glob
import re

def main():
    wallet_html = r'<a href="#" class="wallet-icon" aria-label="محفظتي" title="محفظتي" style="gap: 5px;">\n                    <span class="material-icons-outlined">account_balance_wallet</span>\n                    <span class="wallet-balance-text" style="font-size: 0.85rem; font-weight: bold;">0 د.ج</span>\n                </a>'
    
    # 1. Update HTML files
    for file in glob.glob('**/*.html', recursive=True):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Insert the wallet HTML inside header-icons right before the first <a>
            if 'wallet-icon' not in content:
                content = re.sub(r'(<div class="header-icons">\s*)', r'\1' + wallet_html + '\n                ', content)
                
            # Bump cache
            content = re.sub(r'main\.js(\?v=\d+)?', 'main.js?v=3', content)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error processing {file}: {e}")

    # 2. Add Wallet class to main.js
    main_js_path = 'assets/js/main.js'
    try:
        with open(main_js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
        wallet_js = """
class Wallet {
    constructor() {
        this.balance = 0;
        try {
            this.balance = parseInt(localStorage.getItem('gidhaWalletBalance')) || 0;
        } catch(e) {}
        this.init();
    }

    init() {
        this.updateDisplay();
        
        // Setup listener for wallet icon
        const walletIcons = document.querySelectorAll('.wallet-icon');
        walletIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`محفظتي\\n\\nرصيدك الحالي: ${this.balance} د.ج`);
            });
        });
    }

    addBalance(amount) {
        this.balance += amount;
        this.save();
    }

    subtractBalance(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.save();
            return true;
        }
        return false;
    }

    save() {
        localStorage.setItem('gidhaWalletBalance', this.balance.toString());
        this.updateDisplay();
    }

    updateDisplay() {
        const displays = document.querySelectorAll('.wallet-balance-text');
        displays.forEach(display => {
            display.textContent = `${this.balance} د.ج`;
        });
    }
}
"""
        if 'class Wallet' not in js_content:
            # Inject before ShoppingCart class
            js_content = js_content.replace('class ShoppingCart', wallet_js + '\nclass ShoppingCart')
            
            # Inject initialization
            init_code = "    window.gidhaWallet = new Wallet();\n    window.gidhaCart = new ShoppingCart();"
            js_content = js_content.replace('    window.gidhaCart = new ShoppingCart();', init_code)
            
            with open(main_js_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
    except Exception as e:
        print(f"Error processing main.js: {e}")

if __name__ == '__main__':
    main()
