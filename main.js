/**
 * Main JavaScript File for Gidha Store
 * ملف الجافاسكريبت الرئيسي لمتجر غذاء
 * 
 * Includes: Navigation handling, Mobile Menu Toggle, Button Interactions, 
 * Form Validations, and a Simple Carousel for grid components.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle | فتح وإغلاق قائمة الهاتف
    const initMobileMenu = () => {
        const headerContainer = document.querySelector('.header .container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create hamburger button if it doesn't exist | إنشاء زر القائمة إذا لم يكن موجوداً
        if (!document.querySelector('.mobile-menu-btn') && headerContainer && navMenu) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<span class="material-icons">menu</span>';
            menuBtn.setAttribute('aria-label', 'تبديل القائمة'); // Toggle Menu
            
            // Insert button as the first item in header container for mobile | إدراج الزر 
            // Depending on layout, usually near the logo or right side. Let's append to header-icons
            const headerIcons = document.querySelector('.header-icons');
            if(headerIcons) {
                headerContainer.insertBefore(menuBtn, headerIcons);
            } else {
                headerContainer.appendChild(menuBtn);
            }
            
            // Toggle functionality | تفعيل فتح وإغلاق القائمة
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                // Change icon based on state | تغيير الأيقونة بناءً على حالة القائمة
                const isExpanded = navMenu.classList.contains('active');
                menuBtn.innerHTML = isExpanded 
                    ? '<span class="material-icons">close</span>' 
                    : '<span class="material-icons">menu</span>';
            });

            // Close menu when clicking outside | إغلاق القائمة عند النقر في الخارج
            document.addEventListener('click', (e) => {
                if (!headerContainer.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuBtn.innerHTML = '<span class="material-icons">menu</span>';
                }
            });
        }
    };

    // 2. Form Validation | التحقق من النماذج
    const initForms = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Remove native validation alerts (like onsubmit attribute in HTML)
            form.removeAttribute('onsubmit'); 

            form.addEventListener('submit', (e) => {
                e.preventDefault(); // منع الإرسال الفعلي | Prevent actual submission
                
                let isValid = true;
                // Get all required inputs | إحضار جميع الحقول الإلزامية
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'var(--red)'; // تعليم الحقل بالأحمر | Highlight in red
                    } else {
                        input.style.borderColor = 'var(--border-color)'; // إعادة اللون الأصلي | Reset color
                    }
                });
                
                if (isValid) {
                    // Fake success message | رسالة نجاح وهمية بدون backend
                    alert('تمت العملية بنجاح! شكراً لتواصلك معنا.'); // Operation successful!
                    form.reset(); // تفريغ النموذج | Reset form
                } else {
                    alert('يرجى تعبئة جميع الحقول المطلوبة.'); // Please fill all required fields.
                }
            });
        });
    };

    // 3. Simple Carousel/Slider (Vanilla JS) | سلايدر للتمرير الأفقي
    // Drag-to-scroll functionality for Products and Categories grids on mobile
    const initCarousels = () => {
        const carouselContainers = document.querySelectorAll('.products-grid, .categories-grid');
        
        carouselContainers.forEach(container => {
            let isDown = false;
            let startX;
            let scrollLeft;

            container.addEventListener('mousedown', (e) => {
                isDown = true;
                container.style.cursor = 'grabbing';
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });
            
            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.style.cursor = 'grab';
            });
            
            container.addEventListener('mouseup', () => {
                isDown = false;
                container.style.cursor = 'grab';
            });
            
            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed | سرعة التمرير
                
                // For RTL, we invert the scroll logic visually
                const isRTL = document.documentElement.dir === 'rtl';
                container.scrollLeft = isRTL ? scrollLeft + walk : scrollLeft - walk;
            });
        });
    };

    // 4. Button Interactions | تفاعلات الأزرار الوهمية (Alerts)
    const initButtons = () => {
        // Select all dummy links and non-submit buttons
        const dummyButtons = document.querySelectorAll('a[href="#"]:not(.wallet-icon), button:not([type="submit"]):not(.mobile-menu-btn):not(#add-funds-btn):not(#close-wallet)');
        
        dummyButtons.forEach(btn => {
            // Add interaction only if the HTML onclick attribute doesn't have its own specific alert
            if(!btn.getAttribute('onclick')) {
                btn.addEventListener('click', (e) => {
                    if (btn.tagName === 'A' && btn.getAttribute('href') === '#') {
                        e.preventDefault();
                    }
                    // Alert for prototype purpose | تنبيه للنماذج الأولية
                    // alert('هذه الميزة في النموذج الأولي فقط (قيد التطوير).'); 
                });
            }
        });
    };
    
    // 5. Active Link Highlight | تمييز الرابط النشط في القائمة
    const initActiveLinks = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Remove active class from all | مسح الحالة النشطة من الجميع
            link.classList.remove('active');
            
            // Add active class if URL matches | إضافة الحالة النشطة للرابط المتطابق
            if (linkHref && (linkHref.includes(currentPath) || (currentPath === '' && linkHref === 'index.html'))) {
                link.classList.add('active');
            }
        });
    };

    // 6. Dynamic Placeholder Replacer | استبدال الصور المؤقتة بصور حقيقية
    const initPlaceholders = () => {
        const isNested = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
        const prefix = isNested ? '../' : './';
        
        const localProductsData = {
            "almond-butter": { title: "زبدة اللوز", img: "assets/images/almond_butter.jpg" },
            "pistachio-butter": { title: "زبدة الفستق", img: "assets/images/pistachio_butter.jpg" },
            "tahini": { title: "الطحينة (سمسم)", img: "assets/images/tahini.jpg" },
            "hazelnut-butter": { title: "زبدة البندق", img: "assets/images/hazelnut_butter.jpg" },
            "cashew-butter": { title: "زبدة الكاجو", img: "assets/images/cashew_butter.png" },
            "raw-almonds": { title: "لوز طبيعي نيء", img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80" },
            "walnuts": { title: "جوز (عين الجمل)", img: "assets/images/walnuts_macro.png" },
            "premium-cashews": { title: "كاجو فاخر", img: "assets/images/premium_cashews.png" },
            "bulgur": { title: "برغل خشن طبيعي", img: "assets/images/bulgur.jpg" },
            "brown-rice": { title: "أرز أسمر كامل", img: "assets/images/brown_rice.jpg" },
            "oats": { title: "شوفان عضوي", img: "assets/images/oats.jpg" },
            "quinoa": { title: "كينوا بيضاء", img: "assets/images/quinoa.jpg?v=3" },
            "black-rice": { title: "أرز أسود بري", img: "assets/images/black_rice.jpg" },
            "rose-water": { title: "ماء الورد الطبيعي", img: "assets/images/rose_water.jpg" },
            "orange-blossom-water": { title: "ماء الزهر المقطر", img: "assets/images/orange_blossom_water.png" },
            "thyme-water": { title: "ماء الزعتر الصافي", img: "assets/images/thyme_water.png" },
            "frankincense-water": { title: "ماء اللبان العضوي", img: "assets/images/frankincense_water.png" },
            "coconut-water": { title: "ماء جوز الهند العضوي", img: "assets/images/coconut_water.png" },
            "olive-oil": { title: "زيت زيتون بكر ممتاز", img: "assets/images/olive_oil.jpg" },
            "sesame-oil": { title: "زيت سمسم طبيعي", img: "assets/images/sesame_oil.png" },
            "coconut-oil": { title: "زيت جوز الهند العضوي", img: "assets/images/coconut_oil.png" },
            "butter": { title: "زبدة طبيعية نقية", img: "assets/images/pure_butter.png" },
            "animal-ghee": { title: "سمن حيواني", img: "assets/images/animal_ghee.png" },
            "pure-honey": { title: "عسل طبيعي أصلي", img: "assets/images/honey.jpg" },
            "date-molasses": { title: "دبس التمر الخالص", img: "assets/images/date_molasses.png" },
            "pomegranate-molasses": { title: "دبس الرمان الطبيعي", img: "assets/images/pomegranate_molasses.png" },
            "date-sugar": { title: "سكر التمر البديل الصحي", img: "assets/images/date_sugar.png" },
            "barley-bread": { title: "خبز الشعير الصحي", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
            "sourdough-bread": { title: "خبز بالخميرة الطبيعية", img: "assets/images/sourdough_bread.jpg" },
            "barley-couscous": { title: "كسكس الشعير", img: "assets/images/couscous.jpg" },
            "acorn-couscous": { title: "كسكس البلوط", img: "assets/images/acorn_couscous.png" },
            "carob-couscous": { title: "كسكس الخروب", img: "assets/images/carob_couscous.png" },
            "whole-wheat-spaghetti": { title: "سباغيتي قمح الكامل", img: "assets/images/whole_wheat_spaghetti.png" },
            "whole-wheat-rechta": { title: "رشتة القمح الكامل", img: "assets/images/whole_wheat_rechta.png" },
            "white-cheese": { title: "جبن أبيض طبيعي", img: "assets/images/white_cheese.jpg" },
            "greek-yogurt": { title: "زبادي يوناني أصلي", img: "assets/images/greek_yogurt.png" },
            "edam-cheese": { title: "جبن إيدام معتق", img: "assets/images/edam_cheese.png" },
            "coconut-milk": { title: "حليب جوز الهند", img: "assets/images/coconut_milk.png" },
            "default": { title: "منتج طبيعي", img: "assets/images/hero.jpg" }
        };

        const imageMap = {
            'زبدة اللوز': 'assets/images/almond_butter.jpg',
            'زبدة الفستق': 'assets/images/pistachio_butter.jpg',
            'زبدة البندق': 'assets/images/hazelnut_butter.jpg',
            'زبدة الكاجو': 'assets/images/cashew_butter.png',
            'زبدة الفول': 'assets/images/peanut_butter.png',
            'زبدة طبيعية': 'assets/images/pure_butter.png',
            'زبدة': 'assets/images/almond_butter.jpg',
            'طحينة': 'assets/images/tahini.jpg',
            'لوز': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
            'جوز': 'assets/images/walnuts_macro.png',
            'كاجو': 'assets/images/premium_cashews.png',
            'برغل': 'assets/images/bulgur.jpg',
            'أرز أسمر': 'assets/images/brown_rice.jpg',
            'أرز أسود': 'assets/images/black_rice.jpg',
            'شوفان': 'assets/images/oats.jpg',
            'كينوا': 'assets/images/quinoa.jpg?v=3',
            'ماء الورد': 'assets/images/rose_water.jpg',
            'ماء الزهر': 'assets/images/orange_blossom_water.png',
            'ماء اللبان': 'assets/images/frankincense_water.png',
            'ماء جوز الهند': 'assets/images/coconut_water.png',
            'ماء الزعتر': 'assets/images/thyme_water.png',
            'ماء': 'assets/images/rose_water.jpg',
            'زيت زيتون': 'assets/images/olive_oil.jpg',
            'زيت سمسم': 'assets/images/sesame_oil.png',
            'زيت جوز الهند': 'assets/images/coconut_oil.png',
            'زيت': 'assets/images/olive_oil.jpg',
            'سمن': 'assets/images/animal_ghee.png',
            'عسل': 'assets/images/honey.jpg',
            'دبس التمر': 'assets/images/date_molasses.png',
            'دبس الرمان': 'assets/images/pomegranate_molasses.png',
            'سكر التمر': 'assets/images/date_sugar.png',
            'خبز الشعير': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
            'خبز ريفي': 'assets/images/sourdough_bread.jpg',
            'خبز': 'assets/images/sourdough_bread.jpg',
            'كسكس الشعير': 'assets/images/couscous.jpg',
            'كسكس البلوط': 'assets/images/acorn_couscous.png',
            'كسكس الخروب': 'assets/images/carob_couscous.png',
            'كسكس': 'assets/images/couscous.jpg',
            'سباغيتي': 'assets/images/whole_wheat_spaghetti.png',
            'رشتة': 'assets/images/whole_wheat_rechta.png',
            'معجنات': 'assets/images/couscous.jpg',
            'جبن أبيض': 'assets/images/white_cheese.jpg',
            'جبن إيدام': 'assets/images/edam_cheese.png',
            'جبن ايدام': 'assets/images/edam_cheese.png',
            'جبن': 'assets/images/white_cheese.jpg',
            'زبادي': 'assets/images/greek_yogurt.png',
            'حليب جوز الهند': 'assets/images/coconut_milk.png',
            'حليب': 'assets/images/coconut_milk.png',
            'ألبان': 'assets/images/white_cheese.jpg',
            'مزارع': 'assets/images/algerian_farmer.jpg',
            'فريق': 'assets/images/algerian_farmer.jpg',
            'hero': 'assets/images/hero.jpg',
            'المنتجات الغذائية': 'assets/images/hero.jpg',
            'default': 'assets/images/hero.jpg'
        };

        // 1. Resolve product cards accurately based on link ID or Title Text
        const productCards = document.querySelectorAll('.product-card, .cart-item');
        productCards.forEach(card => {
            let matchedImage = null;
            
            // Try matching by link ID first (most accurate)
            const link = card.querySelector('a[href*="id="]');
            if (link) {
                const href = link.getAttribute('href');
                const match = href.match(/[?&]id=([^&]+)/);
                if (match && localProductsData[match[1]]) {
                    matchedImage = localProductsData[match[1]].img;
                }
            }
            
            // Try matching by Title Text next
            if (!matchedImage) {
                const titleNode = card.querySelector('.product-title, .cart-item-title, h3');
                if (titleNode) {
                    const titleText = titleNode.textContent.trim().toLowerCase();
                    for (const id in localProductsData) {
                        const prod = localProductsData[id];
                        if (titleText.includes(prod.title.toLowerCase()) || prod.title.toLowerCase().includes(titleText)) {
                            matchedImage = prod.img;
                            break;
                        }
                    }
                }
            }
            
            // If we successfully found a product-specific image, replace the placeholder inside this card
            if (matchedImage) {
                const placeholders = card.querySelectorAll('span, div');
                placeholders.forEach(node => {
                    if (node.children.length === 0 && node.textContent.includes('[') && node.textContent.includes(']')) {
                        const img = document.createElement('img');
                        const imgSrc = matchedImage.startsWith('http') ? matchedImage : prefix + matchedImage;
                        img.src = imgSrc + '?v=' + new Date().getTime();
                        img.alt = card.querySelector('.product-title, .cart-item-title, h3')?.textContent.trim() || 'product';
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = 'var(--border-radius-md)';
                        if(node.id) img.id = node.id;
                        if(node.className) img.className = node.className;
                        
                        node.parentNode.replaceChild(img, node);
                    }
                });
            }
        });

        // 2. Fallback general text placeholder scanning for static items
        const elements = document.querySelectorAll('span, div, p, h1, h2, h3, a');
        elements.forEach(node => {
            if (node.children.length === 0 && node.textContent.includes('[') && node.textContent.includes(']')) {
                const text = node.textContent.trim();
                const match = text.match(/\[(?:صورة\s+)?([^\]]+)\]/);
                if (match) {
                    const keyword = match[1].trim().toLowerCase();
                    let matchedImage = 'assets/images/hero.jpg'; // default
                    
                    let bestMatchKey = '';
                    for (const key in imageMap) {
                        if (keyword.includes(key.toLowerCase()) && key.length > bestMatchKey.length) {
                            bestMatchKey = key;
                        }
                    }
                    
                    if (bestMatchKey) {
                        matchedImage = imageMap[bestMatchKey];
                    }

                    const img = document.createElement('img');
                    const imgSrc = matchedImage.startsWith('http') ? matchedImage : prefix + matchedImage;
                    img.src = imgSrc + '?v=' + new Date().getTime();
                    img.alt = keyword;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';

                    if (node.parentNode.classList.contains('product-image') || node.parentNode.classList.contains('main-image') || node.parentNode.classList.contains('thumbnail')) {
                        img.style.borderRadius = 'var(--border-radius-md)';
                    } else if (node.parentNode.classList.contains('img-placeholder') || node.parentNode.classList.contains('bento-right')) {
                        img.style.borderRadius = 'var(--border-radius-lg)';
                        node.parentNode.style.padding = '0';
                        node.parentNode.style.background = 'none';
                        node.parentNode.style.boxShadow = 'none';
                        node.parentNode.style.overflow = 'hidden';
                    } else {
                        img.style.borderRadius = 'var(--border-radius-md)';
                    }
                    if(node.id) img.id = node.id;
                    if(node.className) img.className = node.className;

                    node.parentNode.replaceChild(img, node);
                }
            }
        });
    };

    // Initialize all modules | تشغيل كافة الوظائف
    initMobileMenu();
    initForms();
    initCarousels();
    initButtons();
    initActiveLinks();
    initPlaceholders();
    window.cart = new ShoppingCart();
    window.wallet = new Wallet();
});

// --- Cart Logic System ---
class Wallet {
    constructor() {
        this.balance = 0;
        try {
            this.balance = parseInt(localStorage.getItem('gidhaWalletBalance_v2')) || 0;
        } catch(e) {}
        this.init();
    }

    init() {
        this.createModal();
        
        // Setup listener for wallet icon
        const walletIcons = document.querySelectorAll('.wallet-icon');
        walletIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });
    }

    createModal() {
        if(document.getElementById('wallet-modal')) return;

        const modalHtml = `
            <div id="wallet-modal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:1000; justify-content:center; align-items:flex-start; overflow-y:auto; padding:2rem 0; backdrop-filter: blur(5px);">
                <div class="modal-content" style="background:var(--bg-beige); border-radius:16px; width:95%; max-width:450px; position:relative; overflow:hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.2); text-align:right; border: 1px solid var(--border-color); margin: 0 auto;">
                    
                    <!-- Header -->
                    <div style="background:transparent; color:var(--text-dark); padding:1.5rem 1.5rem 0.5rem; text-align:center; position:relative;">
                        <button id="close-wallet" style="position:absolute; top:15px; left:15px; background:none; border:none; color:var(--text-gray); font-size:1.5rem; cursor:pointer;">&times;</button>
                        <span class="material-icons-outlined" style="font-size:3.5rem; margin-bottom:0.5rem; color:var(--primary-green);">account_balance_wallet</span>
                        <h2 style="margin:0; font-size:1.25rem; font-weight:700; color:var(--text-dark);">محفظة غذاء الرقمية</h2>
                    </div>

                    <!-- Balance Card -->
                    <div style="padding:1.5rem;">
                        <div style="background: linear-gradient(135deg, var(--primary-green) 0%, var(--light-green) 100%); color:var(--white); padding:1.5rem; border-radius:12px; margin-bottom:1.5rem; position:relative; overflow:hidden; box-shadow: 0 4px 15px rgba(72, 136, 11, 0.3);">
                            <div style="position:absolute; top:-10px; right:-20px; font-size:7rem; opacity:0.15;"><span class="material-icons-outlined">spa</span></div>
                            <div style="font-size:0.95rem; opacity:0.9; margin-bottom:0.5rem; font-weight:600;">الرصيد المتاح</div>
                            <div style="font-size:2.2rem; font-weight:bold; letter-spacing:1px;" id="wallet-balance-display">${this.balance} د.ج</div>
                            <div style="font-size:0.75rem; opacity:0.8; margin-top:1rem; text-transform:uppercase; letter-spacing:2px;">Gidha Natural Card</div>
                        </div>

                        <!-- Funding Form -->
                        <h3 style="font-size:1rem; margin-bottom:1rem; color:var(--text-dark); font-weight:700;">شحن الرصيد</h3>
                        
                        <div style="display:flex; gap:10px; margin-bottom:1.5rem;">
                            <button class="preset-amount-btn" data-val="1000" style="flex:1; padding:0.75rem; border:1px solid var(--border-color); background:var(--white); border-radius:8px; cursor:pointer; font-family:inherit; font-weight:600; color:var(--text-dark); transition:all 0.2s;">1000 د.ج</button>
                            <button class="preset-amount-btn" data-val="2000" style="flex:1; padding:0.75rem; border:1px solid var(--border-color); background:var(--white); border-radius:8px; cursor:pointer; font-family:inherit; font-weight:600; color:var(--text-dark); transition:all 0.2s;">2000 د.ج</button>
                            <button class="preset-amount-btn" data-val="5000" style="flex:1; padding:0.75rem; border:1px solid var(--border-color); background:var(--white); border-radius:8px; cursor:pointer; font-family:inherit; font-weight:600; color:var(--text-dark); transition:all 0.2s;">5000 د.ج</button>
                        </div>

                        <div style="margin-bottom:1.5rem;">
                            <label style="display:block; font-size:0.85rem; color:var(--text-gray); margin-bottom:0.5rem;">أو أدخل مبلغاً مخصصاً (د.ج)</label>
                            <input type="number" id="funds-input" placeholder="مثال: 1500" min="100" style="width:100%; padding:0.75rem; border:1px solid var(--border-color); border-radius:8px; font-family:inherit; font-size:1rem; text-align:right; background:var(--white); color:var(--text-dark);">
                        </div>

                        <!-- Fake Credit Card Form -->
                        <div style="background:var(--white); border:1px solid var(--border-color); border-radius:8px; padding:1rem; margin-bottom:1.5rem;">
                            <div style="font-size:0.85rem; color:var(--text-gray); margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-weight:600;">معلومات الدفع</span>
                                <div style="display:flex; gap:5px;">
                                    <span class="material-icons-outlined" style="font-size:1.2rem; color:var(--primary-green);">credit_card</span>
                                    <span class="material-icons-outlined" style="font-size:1.2rem; color:var(--top-bar-brown);">credit_score</span>
                                </div>
                            </div>
                            <input type="text" placeholder="رقم البطاقة (0000 0000 0000 0000)" style="width:100%; padding:0.6rem; border:1px solid var(--border-color); border-radius:6px; margin-bottom:0.5rem; font-family:inherit; text-align:left; direction:ltr; background:var(--white); color:var(--text-dark);" maxlength="19">
                            <div style="display:flex; gap:10px;">
                                <input type="text" placeholder="MM/YY" style="flex:1; padding:0.6rem; border:1px solid var(--border-color); border-radius:6px; font-family:inherit; text-align:center; background:var(--white); color:var(--text-dark);" maxlength="5">
                                <input type="password" placeholder="CVV" style="flex:1; padding:0.6rem; border:1px solid var(--border-color); border-radius:6px; font-family:inherit; text-align:center; background:var(--white); color:var(--text-dark);" maxlength="3">
                            </div>
                        </div>

                        <!-- Action Button -->
                        <button id="add-funds-btn" class="btn btn-primary" style="width:100%; padding:1rem; font-size:1.1rem; display:flex; justify-content:center; align-items:center; gap:10px; border-radius:8px; transition:all 0.3s; border:none; color:var(--white);">
                            <span id="btn-text">تأكيد ودفع</span>
                            <span class="material-icons-outlined" id="btn-icon">lock</span>
                        </button>
                        <div style="text-align:center; font-size:0.75rem; color:var(--text-gray); margin-top:0.75rem;">
                            <span class="material-icons-outlined" style="font-size:0.9rem; vertical-align:middle; color:var(--primary-green);">security</span>
                            معلومات الدفع مشفرة وآمنة
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('wallet-modal');
        const closeBtn = document.getElementById('close-wallet');
        const addFundsBtn = document.getElementById('add-funds-btn');
        const amountInput = document.getElementById('funds-input');
        const presetBtns = document.querySelectorAll('.preset-amount-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');

        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if(e.target.id === 'wallet-modal') this.closeModal();
        });

        presetBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Highlight active preset
                presetBtns.forEach(b => { 
                    b.style.borderColor = 'var(--border-color)'; 
                    b.style.color = 'var(--text-dark)'; 
                    b.style.background = 'var(--white)'; 
                });
                e.target.style.borderColor = 'var(--primary-green)';
                e.target.style.color = 'var(--primary-green)';
                e.target.style.background = 'rgba(72, 136, 11, 0.08)';
                amountInput.value = e.target.getAttribute('data-val');
            });
        });

        addFundsBtn.addEventListener('click', () => {
            const amount = amountInput ? amountInput.value : null;
            if(!amount || isNaN(amount) || Number(amount) < 100) {
                alert('الرجاء إدخال مبلغ صالح (100 د.ج كحد أدنى).');
                return;
            }

            // Loading state
            addFundsBtn.style.opacity = '0.8';
            addFundsBtn.style.pointerEvents = 'none';
            btnText.textContent = 'جاري معالجة الدفع...';
            btnIcon.textContent = 'autorenew';
            
            if (!document.getElementById('spin-style')) {
                const style = document.createElement('style');
                style.id = 'spin-style';
                style.innerHTML = '@keyframes spinWallet { 100% { transform:rotate(360deg); } }';
                document.head.appendChild(style);
            }
            btnIcon.style.animation = 'spinWallet 1s linear infinite';

            // Simulate Network Delay
            setTimeout(() => {
                this.addBalance(Number(amount));
                
                // Success state
                btnText.textContent = 'تم الشحن بنجاح!';
                btnIcon.textContent = 'check_circle';
                btnIcon.style.animation = 'none';
                addFundsBtn.style.background = '#28a745'; // Green success color
                addFundsBtn.style.borderColor = '#28a745';

                setTimeout(() => {
                    // Reset UI
                    amountInput.value = '';
                    presetBtns.forEach(b => { 
                        b.style.borderColor = 'var(--border-color)'; 
                        b.style.color = 'var(--text-dark)'; 
                        b.style.background = 'var(--white)'; 
                    });
                    btnText.textContent = 'تأكيد ودفع';
                    btnIcon.textContent = 'lock';
                    addFundsBtn.style.background = 'var(--primary-green)';
                    addFundsBtn.style.borderColor = 'var(--primary-green)';
                    addFundsBtn.style.opacity = '1';
                    addFundsBtn.style.pointerEvents = 'auto';

                    this.closeModal();
                }, 2000);

            }, 2000);
        });
    }

    openModal() {
        document.getElementById('wallet-balance-display').textContent = `${this.balance} د.ج`;
        document.getElementById('wallet-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('wallet-modal').style.display = 'none';
        document.body.style.overflow = '';
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
        localStorage.setItem('gidhaWalletBalance_v2', this.balance.toString());
        if(document.getElementById('wallet-balance-display')) {
            document.getElementById('wallet-balance-display').textContent = `${this.balance} د.ج`;
        }
    }
}

class ShoppingCart {
    constructor() {
        try {
            this.cart = JSON.parse(localStorage.getItem('gidhaCart'));
            if (!Array.isArray(this.cart)) this.cart = [];
        } catch (e) {
            this.cart = [];
        }
        this.init();
    }

    init() {
        this.updateBadge();
        this.setupAddToCartButtons();
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        } else if (window.location.pathname.includes('checkout.html')) {
            this.renderCheckoutPage();
        }
    }

    saveCart() {
        localStorage.setItem('gidhaCart', JSON.stringify(this.cart));
        this.updateBadge();
    }

    addItem(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.cart.push(product);
        }
        this.saveCart();
    }

    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.renderCartPage();
    }

    updateQuantity(id, newQty) {
        if (newQty < 1) return;
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQty;
            this.saveCart();
            this.renderCartPage();
        }
    }

    updateBadge() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    setupAddToCartButtons() {
        // Find all add to cart buttons (icons on products)
        const addToCartBtns = document.querySelectorAll('.btn-cart-icon, .btn-primary:not([type="submit"]):not([href])');
        
        addToCartBtns.forEach(btn => {
            // Remove dummy alerts if any
            if(btn.getAttribute('onclick')) {
                btn.removeAttribute('onclick');
            }
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                let id = 'default';
                let title = 'منتج';
                let price = 500;
                let image = 'assets/images/hero.jpg';
                let quantity = 1;

                // If on product detail page
                if (btn.classList.contains('btn-primary')) {
                    if(!btn.textContent.includes('إضافة للسلة')) return;
                    const urlParams = new URLSearchParams(window.location.search);
                    id = urlParams.get('id') || 'default';
                    title = document.getElementById('product-title')?.textContent || title;
                    price = parseFloat(document.getElementById('product-price')?.textContent) || price;
                    const qtyInput = document.querySelector('.qty-input');
                    if (qtyInput) quantity = parseInt(qtyInput.value) || 1;
                    
                    const imgNode = document.getElementById('main-product-image') || document.querySelector('.main-image img');
                    if(imgNode && imgNode.tagName === 'IMG') {
                        image = imgNode.src;
                    }
                } else {
                    // Grid product card
                    const card = btn.closest('.product-card');
                    if (card) {
                        const link = card.querySelector('a[href*="id="]');
                        if (link) {
                            const match = link.getAttribute('href').match(/[?&]id=([^&]+)/);
                            if (match) id = match[1];
                        }
                        title = card.querySelector('.product-title')?.textContent.trim() || title;
                        price = parseFloat(card.querySelector('.product-price')?.textContent) || price;
                        const imgNode = card.querySelector('.product-image img');
                        if (imgNode) image = imgNode.src;
                    }
                }

                this.addItem({ id, title, price, image, quantity });
            });
        });
    }

    renderCartPage() {
        const container = document.querySelector('.cart-items-section');
        const summarySubtotal = document.querySelectorAll('.summary-row span:last-child')[0];
        const summaryShipping = document.querySelectorAll('.summary-row span:last-child')[1];
        const summaryTotal = document.querySelector('.summary-row.total .price');

        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 2rem;">سلة التسوق فارغة.</div>';
            if (summarySubtotal) summarySubtotal.textContent = '0 د.ج';
            if (summaryShipping) summaryShipping.textContent = '0 د.ج';
            if (summaryTotal) summaryTotal.textContent = '0 د.ج';
            document.querySelector('h1').textContent = 'سلة التسوق (0 منتجات)';
            return;
        }

        document.querySelector('h1').textContent = `سلة التسوق (${this.cart.reduce((a,b)=>a+b.quantity,0)} منتجات)`;
        container.innerHTML = '';
        let subtotal = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            let imgSrc = item.image;
            if(!imgSrc.startsWith('http') && window.location.pathname.includes('/pages/')) {
                // If the cart page is inside /pages/, ensure relative path is correct. 
                // But wait, the saved image path might be 'assets/images/...' or 'http://...'
                // If it's already an absolute or blob URL it works. If it's relative, we add '../'
                if(!imgSrc.startsWith('../') && !imgSrc.startsWith('/')) {
                    imgSrc = '../' + imgSrc;
                }
            }

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <button class="btn-remove" data-id="${item.id}"><span class="material-icons-outlined">delete_outline</span> حذف</button>
                <div class="cart-item-img">
                    <img src="${imgSrc}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title"><a href="product-detail.html?id=${item.id}">${item.title}</a></h3>
                    <div class="cart-item-brand">العلامة</div>
                    <div class="cart-item-price">${item.price} د.ج</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn minus" data-id="${item.id}" aria-label="تقليل الكمية">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly aria-label="الكمية">
                        <button class="qty-btn plus" data-id="${item.id}" aria-label="زيادة الكمية">+</button>
                    </div>
                    <div class="cart-item-price item-total">${itemTotal} د.ج</div>
                </div>
            `;
            container.appendChild(div);
        });

        // Setup event listeners for the rendered cart
        container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                this.removeItem(btn.getAttribute('data-id'));
            });
        });

        container.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = this.cart.find(i => i.id === id);
                if(item) this.updateQuantity(id, item.quantity - 1);
            });
        });

        container.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = this.cart.find(i => i.id === id);
                if(item) this.updateQuantity(id, item.quantity + 1);
            });
        });

        // Update Summary
        const shipping = 500; // Flat shipping rate
        if (summarySubtotal) summarySubtotal.textContent = subtotal + ' د.ج';
        if (summaryShipping) summaryShipping.textContent = shipping + ' د.ج';
        if (summaryTotal) summaryTotal.textContent = (subtotal + shipping) + ' د.ج';
    }

    renderCheckoutPage() {
        const container = document.querySelector('.checkout-items-list');
        const summarySubtotal = document.querySelectorAll('.checkout-summary .summary-row span:last-child')[0];
        const summaryShipping = document.querySelectorAll('.checkout-summary .summary-row span:last-child')[1];
        const summaryTotal = document.querySelector('.checkout-summary .summary-row.total .price');
        
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 1rem;">سلة التسوق فارغة.</div>';
            if (summarySubtotal) summarySubtotal.textContent = '0 د.ج';
            if (summaryShipping) summaryShipping.textContent = '0 د.ج';
            if (summaryTotal) summaryTotal.textContent = '0 د.ج';
            
            const form = document.getElementById('checkoutForm');
            if(form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    alert('سلة التسوق فارغة! الرجاء إضافة منتجات قبل الدفع.');
                    window.location.href = 'store.html';
                };
            }
            return;
        }

        container.innerHTML = '';
        let subtotal = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'checkout-item';
            div.innerHTML = `
                <div class="checkout-item-name">
                    ${item.title}
                    <span>الكمية: ${item.quantity}</span>
                </div>
                <div class="checkout-item-price">${itemTotal} د.ج</div>
            `;
            container.appendChild(div);
        });

        const shipping = 500; // Flat shipping rate
        if (summarySubtotal) summarySubtotal.textContent = subtotal + ' د.ج';
        if (summaryShipping) summaryShipping.textContent = shipping + ' د.ج';
        if (summaryTotal) summaryTotal.textContent = (subtotal + shipping) + ' د.ج';

        const form = document.getElementById('checkoutForm');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                
                // Clear cart after successful order
                this.cart = [];
                this.saveCart();
                
                const orderId = Math.floor(Math.random() * 90000) + 10000;
                alert('تم استلام طلبك بنجاح! رقم الطلب: #' + orderId + '\\nسنتصل بك قريباً لتأكيد الطلب.');
                window.location.href = '../index.html';
            };
        }
    }
}

// Initialize the cart and wallet when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gidhaWallet = new Wallet();
    window.gidhaCart = new ShoppingCart();
});

document.addEventListener('DOMContentLoaded', () => {
    // Make entire product cards clickable
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Prevent triggering if a button or specific link inside was clicked
            if (e.target.closest('.btn-cart-icon') || e.target.closest('a')) {
                return;
            }
            const titleLink = card.querySelector('.product-title a');
            if (titleLink) {
                window.location.href = titleLink.href;
            }
        });
    });
});

