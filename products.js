const productsData = {
    // Nuts
    "almond-butter": { title: "زبدة اللوز", brand: "الشركة أ", price: "0 د.ج", img: "./almond_butter.jpg", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "pistachio-butter": { title: "زبدة الفستق", brand: "الشركة ب", price: "0 د.ج", img: "./pistachio_butter.jpg", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "tahini": { title: "الطحينة (سمسم)", brand: "الشركة ج", price: "0 د.ج", img: "./tahini.jpg", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "hazelnut-butter": { title: "زبدة البندق", brand: "الشركة د", price: "0 د.ج", img: "./hazelnut_butter.jpg", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "cashew-butter": { title: "زبدة الكاجو", brand: "الشركة أ", price: "0 د.ج", img: "./cashew_butter.png", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "raw-almonds": { title: "لوز طبيعي نيء", brand: "الشركة ب", price: "0 د.ج", img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "walnuts": { title: "جوز (عين الجمل)", brand: "الشركة ج", price: "0 د.ج", img: "./walnuts_macro.png", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    "premium-cashews": { title: "كاجو فاخر", brand: "الشركة د", price: "0 د.ج", img: "./premium_cashews.png", category: "المكسرات والبذور", categoryLink: "category-nuts.html" },
    
    // Grains
    "bulgur": { title: "برغل خشن طبيعي", brand: "الشركة أ", price: "0 د.ج", img: "./bulgur.jpg", category: "الحبوب والبقوليات", categoryLink: "category-grains.html" },
    "brown-rice": { title: "أرز أسمر كامل", brand: "الشركة ب", price: "0 د.ج", img: "./brown_rice.jpg", category: "الحبوب والبقوليات", categoryLink: "category-grains.html" },
    "oats": { title: "شوفان عضوي", brand: "الشركة ج", price: "0 د.ج", img: "./oats.jpg", category: "الحبوب والبقوليات", categoryLink: "category-grains.html" },
    "quinoa": { title: "كينوا بيضاء", brand: "الشركة د", price: "0 د.ج", img: "./quinoa.jpg?v=3", category: "الحبوب والبقوليات", categoryLink: "category-grains.html" },
    "black-rice": { title: "أرز أسود بري", brand: "الشركة هـ", price: "0 د.ج", img: "./black_rice.jpg", category: "الحبوب والبقوليات", categoryLink: "category-grains.html" },
    
    // Water
    "rose-water": { title: "ماء الورد الطبيعي", brand: "الشركة أ", price: "0 د.ج", img: "./rose_water.jpg", category: "الماء", categoryLink: "category-water.html" },
    "orange-blossom-water": { title: "ماء الزهر المقطر", brand: "الشركة ب", price: "0 د.ج", img: "./orange_blossom_water.png", category: "الماء", categoryLink: "category-water.html" },
    "thyme-water": { title: "ماء الزعتر الصافي", brand: "الشركة ج", price: "0 د.ج", img: "./thyme_water.png", category: "الماء", categoryLink: "category-water.html" },
    "frankincense-water": { title: "ماء اللبان العضوي", brand: "الشركة د", price: "0 د.ج", img: "./frankincense_water.png", category: "الماء", categoryLink: "category-water.html" },
    "coconut-water": { title: "ماء جوز الهند العضوي", brand: "الشركة هـ", price: "0 د.ج", img: "./coconut_water.png", category: "الماء", categoryLink: "category-water.html" },
    
    // Oils
    "olive-oil": { title: "زيت زيتون بكر ممتاز", brand: "الشركة أ", price: "0 د.ج", img: "./olive_oil.jpg", category: "الزيوت والدهون الصحية", categoryLink: "category-oils.html" },
    "sesame-oil": { title: "زيت سمسم طبيعي", brand: "الشركة ب", price: "0 د.ج", img: "./sesame_oil.png", category: "الزيوت والدهون الصحية", categoryLink: "category-oils.html" },
    "coconut-oil": { title: "زيت جوز الهند العضوي", brand: "الشركة ج", price: "0 د.ج", img: "./coconut_oil.png", category: "الزيوت والدهون الصحية", categoryLink: "category-oils.html" },
    "butter": { title: "زبدة طبيعية نقية", brand: "الشركة د", price: "0 د.ج", img: "./pure_butter.png", category: "الزيوت والدهون الصحية", categoryLink: "category-oils.html" },
    "animal-ghee": { title: "سمن حيواني", brand: "الشركة هـ", price: "0 د.ج", img: "./animal_ghee.png", category: "الزيوت والدهون الصحية", categoryLink: "category-oils.html" },
    
    // Honey
    "pure-honey": { title: "عسل طبيعي أصلي", brand: "الشركة أ", price: "0 د.ج", img: "./honey.jpg", category: "العسل والمحليات الطبيعية", categoryLink: "category-honey.html" },
    "date-molasses": { title: "دبس التمر الخالص", brand: "الشركة ب", price: "0 د.ج", img: "./date_molasses.png", category: "العسل والمحليات الطبيعية", categoryLink: "category-honey.html" },
    "pomegranate-molasses": { title: "دبس الرمان الطبيعي", brand: "الشركة ج", price: "0 د.ج", img: "./pomegranate_molasses.png", category: "العسل والمحليات الطبيعية", categoryLink: "category-honey.html" },
    "date-sugar": { title: "سكر التمر البديل الصحي", brand: "الشركة د", price: "0 د.ج", img: "./date_sugar.png", category: "العسل والمحليات الطبيعية", categoryLink: "category-honey.html" },
    
    // Bakery
    "barley-bread": { title: "خبز الشعير الصحي", brand: "الشركة أ", price: "0 د.ج", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", category: "مخبوزات صحية", categoryLink: "category-bakery.html" },
    "sourdough-bread": { title: "خبز بالخميرة الطبيعية", brand: "الشركة ب", price: "0 د.ج", img: "./sourdough_bread.jpg", category: "مخبوزات صحية", categoryLink: "category-bakery.html" },
    
    // Pastries
    "barley-couscous": { title: "كسكس الشعير", brand: "الشركة أ", price: "0 د.ج", img: "./couscous.jpg", category: "معجنات", categoryLink: "category-pastries.html" },
    "acorn-couscous": { title: "كسكس البلوط", brand: "الشركة ب", price: "0 د.ج", img: "./acorn_couscous.png", category: "معجنات", categoryLink: "category-pastries.html" },
    "carob-couscous": { title: "كسكس الخروب", brand: "الشركة ج", price: "0 د.ج", img: "./carob_couscous.png", category: "معجنات", categoryLink: "category-pastries.html" },
    "whole-wheat-spaghetti": { title: "سباغيتي قمح الكامل", brand: "الشركة د", price: "0 د.ج", img: "./whole_wheat_spaghetti.png", category: "معجنات", categoryLink: "category-pastries.html" },
    "whole-wheat-rechta": { title: "رشتة القمح الكامل", brand: "الشركة هـ", price: "0 د.ج", img: "./whole_wheat_rechta.png", category: "معجنات", categoryLink: "category-pastries.html" },
    
    // Dairy
    "white-cheese": { title: "جبن أبيض طبيعي", brand: "الشركة أ", price: "0 د.ج", img: "./white_cheese.jpg", category: "ألبان وأجبان", categoryLink: "category-dairy.html" },
    "greek-yogurt": { title: "زبادي يوناني أصلي", brand: "الشركة ب", price: "0 د.ج", img: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Strained_yogurt.jpg", category: "ألبان وأجبان", categoryLink: "category-dairy.html" },
    "edam-cheese": { title: "جبن إيدام معتق", brand: "الشركة ج", price: "0 د.ج", img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Edam_cheese_with_knife.jpg", category: "ألبان وأجبان", categoryLink: "category-dairy.html" },
    "coconut-milk": { title: "حليب جوز الهند", brand: "الشركة د", price: "0 د.ج", img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Coconut_milk.jpg", category: "ألبان وأجبان", categoryLink: "category-dairy.html" },
    
    // Default placeholder
    "default": { title: "منتج طبيعي", brand: "العلامة المميزة", price: "0 د.ج", img: "./hero.jpg", category: "منتجات عامة", categoryLink: "store.html" }
};


