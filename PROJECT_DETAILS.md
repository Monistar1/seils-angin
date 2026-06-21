# 📁 تفاصيل المشروع الكاملة — Full Project Details

---

## 🌟 نظرة عامة — Overview

### 🇸🇦 بالعربية
هذا المشروع هو **موقع عيد ميلاد تفاعلي فاخر** مخصص لشخص عزيز (يظهر في الملفات باسم "أسم" / "شودي"). الموقع مصمم كتجربة رقمية رومانسية وجذابة تتضمن بوابة دخول سرية، صفحة بطل، عد تنازلي، معرض صور، رسائل حب، ألعاب نارية، بالونات، زهور، موسيقى خلفية، وتأثيرات بصرية ثلاثية الأبعاد. يعمل الموقع بالكامل على المتصفح ويدعم اللغة العربية مع اتجاه RTL.

### 🇬🇧 In English
This project is a **luxury interactive birthday website** dedicated to a loved one (referred to in the files as "Asma" / "Shody"). It is designed as a romantic and engaging digital experience, featuring a secret PIN entry, hero page, countdown, photo gallery, love letters, fireworks, balloons, flower petals, background music, and 3D visual effects. The site runs entirely in the browser, supports Arabic language, and uses RTL direction.

---

## 🗂️ شجرة المشروع التفصيلية — Detailed Project Tree

```
3v.3/
│
├── 📄 index.html                    # الصفحة الرئيسية / Landing page
├── 📄 pin.html                      # بوابة الدخول بالرمز السري / Secret PIN gateway
├── 📄 hero.html                     # صفحة البطل والقلب النابض / Hero & beating heart page
├── 📄 countdown.html                # العد التنازلي / Countdown page
├── 📄 countdown1.html               # نسخة أخرى من العد التنازلي / Alternative countdown
├── 📄 gallery.html                  # معرض الصور / Photo gallery
├── 📄 letters.html                  # الرسائل والخطابات / Love letters page
├── 📄 gift.html                     # صفحة الهدية / Gift page
├── 📄 music.html                    # صفحة الموسيقى / Music page
├── 📄 fireworks.html                # ألعاب نارية / Fireworks page
├── 📄 balloons.html                 # بالونات / Balloons page
├── 📄 lily.html                     # زنبق / Lily page
├── 📄 footer.html                   # تذييل الصفحة / Footer component
├── 📄 manifest.json                 # ملف تطبيق الويب التقدمي / PWA manifest
│
├── 🎨 css/
│   └── core.css                     # الأنماط الأساسية والمتغيرات / Core styles & variables
│
├── ⚙️ js/
│   ├── core.js                      # الوظائف الأساسية المشتركة / Shared core functions
│   ├── auth.js                      # المصادقة والتحقق من الرمز / Authentication & PIN logic
│   ├── audio.js                     # تشغيل وتحكم الموسيقى / Audio playback & controls
│   ├── engine3d.js                  # محرك التأثيرات ثلاثية الأبعاد / 3D effects engine
│   ├── firebase.js                  # تكامل Firebase / Firebase integration
│   ├── fps.js                       # مراقبة معدل الإطارات / FPS monitor
│   ├── narrative.js                 # محرك السرد والقصة / Narrative engine
│   ├── petals.js                    # تأثير بتلات الزهور / Flower petals effect
│   ├── reveal-engine.js             # محرك الكشف التدريجي عن العناصر / Reveal animation engine
│   └── self-evolve.js               # ميزة التطور الذاتي للموقع / Self-evolve feature
│
└── 🖼️ assets/
    ├── 🎵 bdaya.mp3                 # موسيقى عيد الميلاد / Birthday music
    ├── 🎵 mia-sebastians-theme.mp3  # موسيقى Mia & Sebastian's Theme
    ├── 🎨 favicon.svg               # أيقونة الموقع / Site favicon
    ├── 🎨 og-image.svg              # صورة المعاينة لوسائل التواصل / Open Graph image
    │
    ├── 🎨 icons/
    │   ├── balloons.svg             # أيقونة البالونات
    │   ├── countdown.svg            # أيقونة العد التنازلي
    │   ├── fireworks.svg            # أيقونة الألعاب النارية
    │   ├── footer.svg               # أيقونة التذييل
    │   ├── gallery.svg              # أيقونة المعرض
    │   ├── gift.svg                 # أيقونة الهدية
    │   ├── hero.svg                 # أيقونة البطل
    │   ├── index.svg                # أيقونة الصفحة الرئيسية
    │   ├── letters.svg              # أيقونة الرسائل
    │   ├── lily.svg                 # أيقونة الزنبق
    │   ├── music.svg                # أيقونة الموسيقى
    │   └── pin.svg                  # أيقونة الرمز السري
    │
    └── 📸 photos/
        ├── photo1.svg               # صورة 1
        ├── photo2.svg               # صورة 2
        ├── photo3.svg               # صورة 3
        ├── photo4.svg               # صورة 4
        ├── photo5.svg               # صورة 5
        ├── photo6.svg               # صورة 6
        ├── shody.mp4                # فيديو شودي
        ├── shody.png                # صورة شودي
        ├── shody1.png               # صورة شودي 1
        ├── shody2.png               # صورة شودي 2
        ├── shody3.png               # صورة شودي 3
        ├── shody4.png               # صورة شودي 4
        └── shody5.png               # صورة شودي 5
```

---

## 📝 شرح تفصيلي للملفات — Detailed File Descriptions

### 1️⃣ `index.html` — الصفحة الرئيسية
**العربية:** الصفحة الافتتاحية للموقع. تحتوي على قلب نابض متحرك، رسالة ترحيب، وزر للدخول إلى التجربة. تستخدم خطوط Google Fonts (أرق روحه، القاهرة، طجوال) وتدعم اللغة العربية باتجاه RTL.

**English:** The landing page of the website. It features an animated beating heart, a welcome message, and an entry button. It uses Google Fonts (Aref Ruqaa, Cairo, Tajawal) and supports Arabic with RTL direction.

---

### 2️⃣ `pin.html` — البوابة السرية
**العربية:** صفحة تطلب من المستخدم إدخال رمز PIN سري للوصول إلى باقي أقسام الموقع. تحتوي على قفل على شكل قلب وحقول أرقام.

**English:** A page that prompts the user to enter a secret PIN code to access the rest of the website. It includes a heart-shaped lock and numeric input fields.

---

### 3️⃣ `hero.html` — صفحة البطل
**العربية:** الصفحة الرئيسية للعرض بعد الدخول. تظهر قلبًا نابضًا كبيرًا مع رسالة "ملكتي أسم — قلبي النابض" وعناصر بصرية جذابة.

**English:** The main display page after entry. It shows a large beating heart with the message "My Queen Asma — My Beating Heart" and attractive visual elements.

---

### 4️⃣ `countdown.html` & `countdown1.html` — العد التنازلي
**العربية:** صفحات تعرض عدادًا تنازليًا لتاريخ عيد الميلاد أو لحظة خاصة. `countdown1.html` هي نسخة بديلة بنمط أو تنسيق مختلف.

**English:** Pages displaying a countdown to the birthday date or a special moment. `countdown1.html` is an alternative version with a different style or layout.

---

### 5️⃣ `gallery.html` — معرض الصور
**العربية:** صفحة تعرض مجموعة من الصور والذكريات (shody.png, shody1-5.png, photo1-6.svg) بشكل جمالي مع تأثيرات.

**English:** A page that displays a collection of photos and memories (shody.png, shody1-5.png, photo1-6.svg) in a beautiful layout with effects.

---

### 6️⃣ `letters.html` — الرسائل
**العربية:** صفحة تحتوي على رسائل حب أو خطابات مكتوبة بشكل جميل وعاطفي.

**English:** A page containing beautifully written love letters or emotional messages.

---

### 7️⃣ `gift.html` — الهدية
**العربية:** صفحة مخصصة لعرض هدية عيد الميلاد أو مفاجأة خاصة.

**English:** A page dedicated to displaying the birthday gift or a special surprise.

---

### 8️⃣ `music.html` — الموسيقى
**العربية:** صفحة تشغيل الموسيقى الخلفية مع تحكمات وتأثيرات بصرية متزامنة.

**English:** A music playback page with controls and synchronized visual effects.

---

### 9️⃣ `fireworks.html` — الألعاب النارية
**العربية:** صفحة تعرض تأثير ألعاب نارية احتفالية باستخدام Canvas أو CSS/JS.

**English:** A page displaying celebratory fireworks effects using Canvas or CSS/JS.

---

### 🔟 `balloons.html` — البالونات
**العربية:** صفحة تحتوي على تأثير بالونات طائرة للاحتفال.

**English:** A page featuring floating balloon effects for celebration.

---

### 1️⃣1️⃣ `lily.html` — الزنبق
**العربية:** صفحة خاصة بتأثير زهور الزنبق أو عرض زهرة الزنبق بشكل فني.

**English:** A special page for lily flower effects or an artistic lily display.

---

### 1️⃣2️⃣ `footer.html` — التذييل
**العربية:** مكون تذييل الصفحة يمكن تضمينه في الصفحات الأخرى.

**English:** A footer component that can be included in other pages.

---

### 1️⃣3️⃣ `manifest.json`
**العربية:** ملف تكوين تطبيق الويب التقدمي (PWA) يحدد الاسم، اللون، الأيقونة، وطريقة العرض.

**English:** Progressive Web App (PWA) configuration file defining name, color, icon, and display mode.

---

## ⚙️ شرح ملفات JavaScript — JavaScript File Descriptions

| الملف / File | الوصف / Description |
|-------------|---------------------|
| `core.js` | وظائف JavaScript الأساسية المشتركة بين جميع الصفحات. / Core shared JavaScript utilities used across all pages. |
| `auth.js` | منطق التحقق من الرمز السري وحماية الصفحات. / PIN verification logic and page protection. |
| `audio.js` | تشغيل الموسيقى وإدارة الصوت. / Music playback and audio management. |
| `engine3d.js` | محرك رسومات وتأثيرات ثلاثية الأبعاد. / 3D graphics and effects engine. |
| `firebase.js` | ربط المشروع بخدمات Firebase. / Firebase services integration. |
| `fps.js` | مراقبة أداء الموقع عبر معدل الإطارات. / Website performance monitoring via FPS. |
| `narrative.js` | إدارة السرد القصصي والانتقالات بين الأحداث. / Story narrative and event transitions management. |
| `petals.js` | تأثير سقوط بتلات الزهور على الشاشة. / Falling flower petals effect. |
| `reveal-engine.js` | محرك الكشف التدريجي عن العناصر عند التمرير أو التفاعل. / Scroll/interaction reveal animation engine. |
| `self-evolve.js` | ميزة خاصة لجعل الموقع يتطور أو يتفاعل بذكاء. / Special feature for self-evolving or smart interactions. |

---

## 🎨 ملفات الأصول — Asset Files

### 🎵 الموسيقى / Audio
- `bdaya.mp3` — أغنية عيد ميلاد / Birthday song
- `mia-sebastians-theme.mp3` — موسيقى هادئة رومانسية / Calm romantic music

### 🖼️ الصور / Images
- `favicon.svg` — أيقونة المتصفح / Browser favicon
- `og-image.svg` — صورة المعاينة عند المشاركة / Sharing preview image
- `photos/shody.png`, `shody1-5.png` — صور شخصية / Personal photos
- `photos/photo1-6.svg` — رسومات/صور إضافية / Additional graphics
- `photos/shody.mp4` — فيديو قصير / Short video

### 🎨 الأيقونات / Icons
مجموعة من أيقونات SVG لكل صفحة في الموقع.
A set of SVG icons for each page of the website.

---

## 🛠️ التقنيات المستخدمة — Technologies Used

- **HTML5** — هيكل الصفحات
- **CSS3** — التنسيق والتأثيرات البصرية
- **JavaScript (Vanilla)** — التفاعل والحركة
- **Google Fonts** — خطوط عربية جميلة (Cairo, Tajawal, Aref Ruqaa)
- **Firebase** — الخدمات السحابية
- **PWA** — تطبيق ويب تقدمي عبر `manifest.json`
- **SVG & Canvas** — رسومات متجهة وتأثيرات مرئية

---

## 🚀 كيفية التشغيل — How to Run

### 🇸🇦 بالعربية
1. افتح المجلد الرئيسي للمشروع.
2. انقر مرتين على ملف `index.html` أو افتحه بأي متصفح حديث.
3. للحصول على أفضل تجربة، يُفضل استخدام خادم محلي مثل Live Server في VS Code.

### 🇬🇧 In English
1. Open the main project folder.
2. Double-click `index.html` or open it in any modern browser.
3. For the best experience, use a local server such as Live Server in VS Code.

---

## 🎯 ملاحظات إضافية — Additional Notes

- الموقع مصمم بشكل أساسي للعرض على الهواتف المحمولة (Mobile First).
- يدعم اللغة العربية بالكامل مع اتجاه RTL.
- يحتوي على تأثيرات بصرية متعددة لخلق تجربة عاطفية فاخرة.
- بعض الميزات قد تتطلب تفاعل المستخدم (مثل تشغيل الموسيقى) بسبب سياسات المتصفح.

---

*تم إنشاء هذا الملف لتوثيق المشروع وتسهيل فهمه والعمل عليه.*
*This file was created to document the project and make it easier to understand and work with.*
