import os
import glob
import re

def main():
    # 1. Update CSS version
    for file in glob.glob('**/*.html', recursive=True):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            content = re.sub(r'style\.css(\?v=\d+)?', 'style.css?v=7', content)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error processing {file}: {e}")

    # 2. Fix index.html image
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<span>[صورة مزارعة جزائرية]</span>', '<img src="./assets/images/algerian_farmer.jpg" alt="دعم المزارع المحلية" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    # 3. Fix about.html image
    with open('pages/about.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<span>[صورة لفريق العمل أو المزرعة]</span>', '<img src="../assets/images/algerian_farmer.jpg" alt="مزارع غذاء" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius-lg);">')
    with open('pages/about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    # 4. Fix contact.html map
    with open('pages/contact.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<div class="map-placeholder">\n                        <span>[خريطة Google Maps هنا]</span>\n                    </div>', '<div class="map-placeholder" style="padding: 0; overflow: hidden; background: none; box-shadow: none;">\n                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102450.41370213032!2d2.8336696499999997!3d36.4800742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fae9b5f543dc3%3A0x67c2d8db191f63dc!2sBlida%2C%20Algeria!5e0!3m2!1sen!2s!4v1714571234567!5m2!1sen!2s" width="100%" height="100%" style="border:0; border-radius: var(--border-radius-lg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n                    </div>')
    with open('pages/contact.html', 'w', encoding='utf-8') as f:
        f.write(content)

    # 5. Fix product-detail.html
    with open('pages/product-detail.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<button class="btn btn-primary" onclick="alert(\'تمت إضافة المنتج للسلة بنجاح!\')">', '<button class="btn btn-primary">')
    content = content.replace('<button class="btn-favorite" onclick="this.classList.toggle(\'active\'); alert(\'تم التحديث في قائمة الأمنيات\');" aria-label="إضافة للمفضلة">', '<button class="btn-favorite" onclick="this.classList.toggle(\'active\');" aria-label="إضافة للمفضلة">')
    
    gallery_script = """
            // Gallery logic
            setTimeout(() => { // Wait for placeholder replacer to finish
                const mainImageContainer = document.querySelector('.main-image');
                const thumbnails = document.querySelectorAll('.thumbnail');
                
                thumbnails.forEach(thumb => {
                    thumb.style.cursor = 'pointer';
                    thumb.addEventListener('click', function() {
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                        
                        const thumbImg = this.querySelector('img');
                        const mainImg = mainImageContainer.querySelector('img');
                        
                        if(thumbImg && mainImg) {
                            // Simple fade effect
                            mainImg.style.opacity = '0.5';
                            setTimeout(() => {
                                mainImg.src = thumbImg.src;
                                mainImg.style.opacity = '1';
                            }, 150);
                        }
                    });
                });
            }, 100);
        });
    </script>"""
    content = content.replace('        });\n    </script>', gallery_script)
    with open('pages/product-detail.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    # 6. cart.html dummy script (remove it)
    with open('pages/cart.html', 'r', encoding='utf-8') as f:
        content = f.read()
    cart_script = """    <script>
        // Custom JS for Cart Page Interactions
        document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.cart-item');
            
            items.forEach(item => {
                const minusBtn = item.querySelector('.qty-btn.minus');
                const plusBtn = item.querySelector('.qty-btn.plus');
                const qtyInput = item.querySelector('.qty-input');
                
                if(minusBtn && plusBtn && qtyInput) {
                    minusBtn.addEventListener('click', () => {
                        let val = parseInt(qtyInput.value);
                        if(val > 1) qtyInput.value = val - 1;
                    });
                    plusBtn.addEventListener('click', () => {
                        let val = parseInt(qtyInput.value);
                        qtyInput.value = val + 1;
                    });
                }
            });
        });
    </script>"""
    content = content.replace(cart_script, '')
    with open('pages/cart.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    main()
