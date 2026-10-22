<div align="center">

<img src="resource/public/logo.svg" width="110" alt="شعار DevManTurbo">

# DevManTurbo

### فكرة واحدة ← فيديو قصير جاهز للنشر

نص، صوت، مقاطع، ترجمة وموسيقى، تتولّدها كلها بالذكاء الاصطناعي من واجهة عربية كاملة.

[![License: MIT](https://img.shields.io/badge/license-MIT-0a0a0a?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11%2B-0a0a0a?style=for-the-badge)](#البدء-السريع)
[![اللغات](https://img.shields.io/badge/لغة_الواجهة-15-0a0a0a?style=for-the-badge)](#اللغات-المدعومة)
[![الإصدار](https://img.shields.io/badge/الإصدار-1.3.9-e7000b?style=for-the-badge)](#)
[![Stars](https://img.shields.io/github/stars/LechehebDjaafar/DevManTurbo?style=for-the-badge&color=0a0a0a)](https://github.com/LechehebDjaafar/DevManTurbo/stargazers)

**العربية** · [English](README-en.md)

<br>

<img src="docs/screenshots/main-ar.png" alt="الواجهة العربية لـ DevManTurbo" width="92%">

</div>

<div dir="rtl">

## لماذا DevManTurbo؟

أدوات توليد الفيديو بالذكاء الاصطناعي كثيرة، لكن أغلبها بواجهات إنجليزية أو صينية فقط، وبأسعار اشتراك، وبلا دعم حقيقي للعربية. **DevManTurbo** مفتوح المصدر ويعمل على جهازك، ويقدّم:

- **واجهة عربية كاملة** من اليمين إلى اليسار، لا ترجمة جزئية.
- **تصميماً احترافياً** نظيفاً وسريعاً، بخطّين Geist وIBM Plex Sans Arabic.
- **15 لغة** للواجهة، تُبدَّل بنقرة.
- **تحكماً كاملاً**: مفاتيحك، وبياناتك، ونماذجك، على جهازك.

> مبني على المحرّك القوي [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) (ترخيص MIT)، ومضاف إليه كل ما يحتاجه المستخدم العربي.

## كيف يعمل؟

1. **اكتب موضوعاً** مثل «كيف يغيّر الذكاء الاصطناعي حياتنا».
2. يكتب النموذج **النص** ويستخرج **الكلمات المفتاحية**.
3. يجلب التطبيق **المقاطع** المناسبة من Pexels أو Pixabay أو ملفاتك.
4. يولّد **التعليق الصوتي** والترجمة ويضيف **الموسيقى**.
5. يركّب كل ذلك في **فيديو جاهز** بالنسبة التي تريدها (9:16 أو 16:9 أو 1:1).

<div align="center">
<img src="docs/screenshots/generating-en.png" alt="مراحل توليد الفيديو وسجل التنفيذ" width="92%">
<br><sub>متابعة مراحل التوليد لحظةً بلحظة مع سجل مفصّل.</sub>
</div>

## لقطات الشاشة

<div align="center">

| الواجهة العربية | الواجهة الإنجليزية |
|:---:|:---:|
| <img src="docs/screenshots/main-ar.png" width="440"> | <img src="docs/screenshots/main-en.png" width="440"> |

<img src="docs/screenshots/settings-ar.png" alt="نافذة الإعدادات" width="86%">
<br><sub>نافذة الإعدادات: مزوّد النموذج، والمفاتيح، ومصادر المقاطع، والنشر التلقائي، والنسخ الاحتياطي.</sub>

</div>

## المقارنة مع المشروع الأصلي

| الجانب | MoneyPrinterTurbo الأصلي | DevManTurbo |
|---|---|---|
| دعم العربية | غير متوفر | واجهة عربية كاملة من اليمين إلى اليسار (616 نصاً مترجماً) |
| لغات الواجهة | الصينية والإنجليزية وبعض اللغات | **15 لغة** |
| التصميم | شكل Streamlit الافتراضي | نظام تصميم فاتح مخصّص: بطاقات 24px، وعناصر 18px، وحدود رفيعة، ولون أحمر وحيد للتمييز |
| الهوية | MoneyPrinterTurbo | شعار وأيقونة وترويسة جديدة |
| الترجمة العربية داخل الفيديو | تحتاج خطاً يدوياً | خط يدعم العربية مرفق جاهزاً |
| الخطوط دون إنترنت | غير مطبّق | مضمّنة، فتعمل الواجهة بلا إنترنت |
| الصفحة المستقلة | صفحة نصية بسيطة | واجهة HTML/CSS/JS كاملة يقدّمها الـ API |
| المحرّك والمزوّدون والـ API | الأصلي | متوافق مع الأصلي |

## ما الذي أُضيف وحُسّن

- **العربية من الألف إلى الياء:** ترجمة كاملة، وتخطيط RTL، وأصوات عربية.
- **15 لغة** للواجهة.
- **واجهة جديدة موحّدة** تشمل كل الصفحات والنوافذ والتبويبات والتنبيهات.
- **إصلاحات وتحسينات** ظهرت مع الاستخدام اليومي. <!-- TODO: اكتب كل إصلاح في سطر، مثل: "إصلاح: ..." -->
- **إضافات خاصة بهذه النسخة.** <!-- TODO: اكتب إضافاتك هنا -->

## اللغات المدعومة

العربية · English · Français · Español · Deutsch · Italiano · Português · Русский · Türkçe · Bahasa Indonesia · Tiếng Việt · 한국어 · Azərbaycan dili · Català · 简体中文

## البدء السريع

**المتطلبات:** Python 3.11 أو أحدث، وبرنامج FFmpeg، ومفتاح API لأحد مزوّدي النماذج (مثل Gemini أو OpenAI أو DeepSeek أو نموذج محلي عبر Ollama).

```bash
git clone https://github.com/LechehebDjaafar/DevManTurbo.git
cd DevManTurbo
pip install -r requirements.txt
cp config.example.toml config.toml    # ثم ضع مفاتيحك داخله
```

**شغّل الواجهة** (تُفتح على `http://127.0.0.1:8501`):

```bash
webui.bat        # ويندوز
sh webui.sh      # لينكس وماك
```

**شغّل الـ API** (يقدّم الصفحة المستقلة على `http://127.0.0.1:8080`):

```bash
python main.py
```

> شغّل الأوامر من جذر المشروع حتى يُطبَّق الثيم الموجود في `.streamlit/config.toml`.

## هيكل الملفات الجديدة

```
.streamlit/config.toml      الثيم الفاتح والألوان
webui/styles.css            طبقة نظام التصميم
webui/assets/               الخطوط والأيقونة
webui/i18n/                 ملفات اللغات الخمس عشرة
resource/public/            الواجهة المستقلة HTML/CSS/JS
resource/fonts/             خطوط الترجمة ومنها العربي
```

## أسئلة شائعة

**هل هو مجاني؟** نعم، المشروع مفتوح المصدر. قد تحتاج مفاتيح API لبعض المزوّدين، ومنهم من يقدّم طبقة مجانية.

**هل يعمل دون إنترنت؟** الواجهة نفسها تعمل بلا إنترنت، أما توليد النص وجلب المقاطع فيحتاجان اتصالاً، إلا إذا استخدمتَ نموذجاً محلياً وملفاتك الخاصة.

**هل تظهر الترجمة العربية صحيحة في الفيديو؟** نعم، اختر خطاً يدعم العربية مثل `IBMPlexSansArabic-Bold.ttf` من قائمة الخطوط.

**كيف أتابع المهام؟** من زر «مدير المهام» في أعلى الواجهة.

## خارطة الطريق

- [ ] فيديو توضيحي قصير في أعلى هذه الصفحة
- [ ] المزيد من الأصوات العربية واللهجات
- [ ] قوالب جاهزة للترجمة والانتقالات
- [ ] <!-- TODO: أضف أهدافك القادمة -->

## المساهمة

الإضافات مرحَّب بها: أبلغ عن خلل عبر [Issues](https://github.com/LechehebDjaafar/DevManTurbo/issues)، أو أرسل Pull Request، أو حسّن إحدى الترجمات في `webui/i18n/`.

## تاريخ النجوم

<a href="https://star-history.com/#LechehebDjaafar/DevManTurbo&Date">
  <img src="https://api.star-history.com/svg?repos=LechehebDjaafar/DevManTurbo&type=Date" alt="Star History" width="560">
</a>

## الشكر والترخيص

بُني DevManTurbo على [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) للمطوّر Harry والمساهمين فيه، بترخيص MIT، فلهم الشكر على هذا الأساس. الإضافات في هذه النسخة أنشأها ويطوّرها **جعفر لشهب (Djaafar Lecheheb)** من ورقلة، الجزائر.

<div align="center">

**إن أفادك المشروع فاضغط ⭐ أعلى الصفحة، فهي أبسط طريقة لدعمه ولمساعدة غيرك على اكتشافه.**

</div>

</div>
