// node build.js  -> writes the Sira CV legal pages (English + Arabic)
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const mail = '<a href="mailto:supportkrmstudio@gmail.com">supportkrmstudio@gmail.com</a>';
const page = (lang, title, other, body) => `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Sira CV</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header><a class="brand" href="index${lang === 'ar' ? '-ar' : ''}.html">Sira CV</a><a class="lang" href="${other.href}">${other.label}</a></header>
<main>
${body.trim()}
</main>
<footer>© KRM Studio · ${mail}</footer>
</body>
</html>
`;

const en = {
  index: ['Sira CV', `
<h1>Sira CV</h1>
<p>ATS-friendly CV builder, free ATS CV Reviewer, cover letters, LinkedIn Profile Reviewer, job tracker and interview prep. Made by KRM Studio.</p>
<ul>
<li><a href="privacy.html">Privacy Policy</a></li>
<li><a href="terms.html">Terms of Use</a></li>
<li><a href="delete-account.html">Delete your account</a></li>
</ul>
<p>Support: ${mail}</p>`],
  privacy: ['Privacy Policy', `
<h1>Privacy Policy</h1>
<p>Last updated: 25 October 2026. Sira CV is made by KRM Studio ("we"). This policy explains what the app keeps, what leaves your phone and why.</p>
<h2>Stays on your phone</h2>
<p>Your CVs, cover letters, CV and LinkedIn checks, job applications, interview answers, goals and settings are stored on your device. CV or LinkedIn PDF/DOCX files you open are read on the device. Photos you use in the LinkedIn photo maker are processed on the device and are not uploaded. Translations run on the device (Google ML Kit downloads the language model once).</p>
<h2>What we collect, only when you choose</h2>
<ul>
<li><b>Account (optional):</b> your name and email address, or your Google account name, email and profile picture if you sign in with Google. Used only to sign you in.</li>
<li><b>Backup (optional, off by default):</b> if you turn on backup, your CVs and cover letters are saved to our database so you can restore them on a new phone.</li>
<li><b>Purchases:</b> an anonymous purchase ID and Google Play purchase records, processed by RevenueCat, so we can unlock Premium.</li>
<li><b>Ads:</b> Google AdMob uses your device's advertising ID to show ads to users who have not removed them. Where the law requires it, you are asked for consent first; if you decline, only non-personalised ads are shown.</li>
</ul>
<p>Reminders and tips are local notifications scheduled on your phone. We do not use analytics, we do not read your contacts, location, microphone or photo library, and we do not sell your data.</p>
<h2>Who processes it</h2>
<ul>
<li>Supabase (sign-in, optional backup and app content updates)</li>
<li>Google Sign-In (if you choose it)</li>
<li>RevenueCat and Google Play (purchases and subscriptions)</li>
<li>Google AdMob (ads, with your consent where required)</li>
</ul>
<p>Data sent over the network is encrypted in transit (HTTPS).</p>
<h2>Children</h2>
<p>Sira CV is a career app for people aged 16 and over and is not directed at children.</p>
<h2>Keeping and deleting your data</h2>
<p>Delete everything on the phone in Profile, Delete all my data. Delete your account and its backup in Profile, Delete account, or see <a href="delete-account.html">how to delete your account</a>. Purchase records may be kept as long as the law requires. Subscriptions must be cancelled in Google Play.</p>
<h2>Your rights</h2>
<p>Depending on where you live (for example under the GDPR) you can ask to access, correct or delete your data. Contact us and we will reply within 30 days.</p>
<h2>Contact</h2>
<p>${mail}</p>`],
  terms: ['Terms of Use', `
<h1>Terms of Use</h1>
<p>Last updated: 25 October 2026. By using Sira CV you agree to these terms.</p>
<h2>The app</h2>
<p>Sira CV helps you write and check CVs, cover letters and LinkedIn profiles. Scores and suggestions are based on clear rules and common recruiter practice; they are guidance, not a promise of a job or interview. You are responsible for the accuracy of what you put in your CV.</p>
<h2>Free and Premium</h2>
<ul>
<li>The CV builder, ATS CV Reviewer and LinkedIn Profile Reviewer are free. Some extras open after a short video ad.</li>
<li>Premium is sold as a one-time lifetime purchase or as a yearly or monthly subscription. Single unlocks (templates, cover letters, LinkedIn Boost, remove ads) are one-time purchases.</li>
<li>Purchases are made through Google Play and follow Google Play's refund rules.</li>
<li>Subscriptions renew automatically until you cancel in Google Play, Payments and subscriptions. Benefits last until the end of the paid period.</li>
</ul>
<h2>Your content</h2>
<p>Your CVs and letters belong to you. You may use the templates and app content for your own job applications.</p>
<h2>Accounts</h2>
<p>Keep your sign-in details safe. You can delete your account at any time in Profile.</p>
<h2>Changes</h2>
<p>We may update the app and these terms. We will show important changes in the app.</p>
<h2>Contact</h2>
<p>${mail}</p>`],
  'delete-account': ['Delete your account', `
<h1>Delete your Sira CV account</h1>
<p>You can delete your account and everything we keep on our servers at any time.</p>
<h2>In the app (fastest)</h2>
<ol>
<li>Open Sira CV</li>
<li>Tap Profile</li>
<li>Tap Delete account and confirm</li>
</ol>
<p>This removes your account and your backed-up CVs and cover letters right away. To also clear the phone, tap Delete all my data. Purchase records may be kept as long as the law requires.</p>
<h2>By email</h2>
<p>If you can no longer open the app, email ${mail} from the address linked to your account with the subject "Delete my account". We delete the data within 30 days and confirm by email.</p>
<h2>Subscriptions</h2>
<p>Deleting your account does not cancel a subscription. Cancel it in Google Play: Account, Payments and subscriptions, Subscriptions.</p>`],
};

const ar = {
  index: ['Sira CV', `
<h1>Sira CV</h1>
<p>منشئ سيرة ذاتية متوافقة مع ATS، ومراجع سيرة ذاتية مجاني، وخطابات تقديم، ومراجع ملف لينكدإن، ومتابعة طلبات التوظيف والتحضير للمقابلات. من تطوير KRM Studio.</p>
<ul>
<li><a href="privacy-ar.html">سياسة الخصوصية</a></li>
<li><a href="terms-ar.html">شروط الاستخدام</a></li>
<li><a href="delete-account-ar.html">حذف حسابك</a></li>
</ul>
<p>الدعم: ${mail}</p>`],
  privacy: ['سياسة الخصوصية', `
<h1>سياسة الخصوصية</h1>
<p>آخر تحديث: 25 أكتوبر 2026. تطبيق Sira CV من تطوير KRM Studio ("نحن"). توضح هذه السياسة ما يحفظه التطبيق وما يخرج من هاتفك ولماذا.</p>
<h2>يبقى على هاتفك</h2>
<p>سيرك الذاتية وخطابات التقديم ونتائج الفحص وطلبات التوظيف وإجابات المقابلات والأهداف والإعدادات محفوظة على جهازك. ملفات PDF/DOCX التي تفتحها تُقرأ على الجهاز. الصور التي تستخدمها في صانع صورة لينكدإن تُعالج على الجهاز ولا تُرفع. الترجمة تتم على الجهاز (تحمّل Google ML Kit نموذج اللغة مرة واحدة).</p>
<h2>ما نجمعه فقط عندما تختار ذلك</h2>
<ul>
<li><b>الحساب (اختياري):</b> اسمك وبريدك الإلكتروني، أو اسم حساب Google وبريده وصورته إذا سجلت الدخول عبر Google. يُستخدم فقط لتسجيل دخولك.</li>
<li><b>النسخ الاحتياطي (اختياري ومتوقف افتراضيًا):</b> إذا فعّلته تُحفظ سيرك الذاتية وخطاباتك في قاعدة بياناتنا لتستعيدها على هاتف جديد.</li>
<li><b>المشتريات:</b> معرّف شراء مجهول وسجلات شراء Google Play تعالجها RevenueCat لفتح بريميوم.</li>
<li><b>الإعلانات:</b> تستخدم Google AdMob معرّف الإعلانات في جهازك لعرض الإعلانات لمن لم يزلها. حيث يتطلب القانون ذلك نطلب موافقتك أولًا، وإذا رفضت تُعرض إعلانات غير مخصصة فقط.</li>
</ul>
<p>التذكيرات والنصائح إشعارات محلية على هاتفك. لا نستخدم أدوات تحليل، ولا نقرأ جهات الاتصال أو الموقع أو الميكروفون أو معرض الصور، ولا نبيع بياناتك.</p>
<h2>من يعالج البيانات</h2>
<ul>
<li>Supabase (تسجيل الدخول والنسخ الاحتياطي الاختياري وتحديثات محتوى التطبيق)</li>
<li>تسجيل الدخول عبر Google (إذا اخترته)</li>
<li>RevenueCat وGoogle Play (المشتريات والاشتراكات)</li>
<li>Google AdMob (الإعلانات بموافقتك حيث يلزم)</li>
</ul>
<p>البيانات المرسلة عبر الشبكة مشفّرة أثناء النقل (HTTPS).</p>
<h2>الأطفال</h2>
<p>Sira CV تطبيق مهني لمن هم في سن 16 عامًا فأكثر وليس موجّهًا للأطفال.</p>
<h2>الاحتفاظ بالبيانات وحذفها</h2>
<p>احذف كل ما على الهاتف من الملف الشخصي ثم حذف كل بياناتي. احذف حسابك ونسخته الاحتياطية من الملف الشخصي ثم حذف الحساب، أو راجع <a href="delete-account-ar.html">طريقة حذف الحساب</a>. قد نحتفظ بسجلات الشراء ما دام القانون يطلب ذلك. يجب إلغاء الاشتراكات من Google Play.</p>
<h2>حقوقك</h2>
<p>بحسب مكان إقامتك (مثل اللائحة الأوروبية GDPR) يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها. راسلنا وسنرد خلال 30 يومًا.</p>
<h2>التواصل</h2>
<p>${mail}</p>`],
  terms: ['شروط الاستخدام', `
<h1>شروط الاستخدام</h1>
<p>آخر تحديث: 25 أكتوبر 2026. باستخدامك Sira CV فإنك توافق على هذه الشروط.</p>
<h2>التطبيق</h2>
<p>يساعدك Sira CV على كتابة وفحص السير الذاتية وخطابات التقديم وملفات لينكدإن. الدرجات والاقتراحات مبنية على قواعد واضحة وممارسات التوظيف الشائعة، وهي إرشادات وليست وعدًا بوظيفة أو مقابلة. أنت مسؤول عن صحة ما تكتبه في سيرتك.</p>
<h2>المجاني وبريميوم</h2>
<ul>
<li>منشئ السيرة الذاتية ومراجع ATS ومراجع لينكدإن مجانية. بعض الإضافات تُفتح بعد إعلان فيديو قصير.</li>
<li>يُباع بريميوم كشراء لمرة واحدة مدى الحياة أو كاشتراك سنوي أو شهري. الفتح المنفرد (القوالب، خطابات التقديم، LinkedIn Boost، إزالة الإعلانات) شراء لمرة واحدة.</li>
<li>تتم المشتريات عبر Google Play وتخضع لقواعد الاسترداد الخاصة به.</li>
<li>تتجدد الاشتراكات تلقائيًا حتى تلغيها من Google Play، المدفوعات والاشتراكات. تستمر المزايا حتى نهاية الفترة المدفوعة.</li>
</ul>
<h2>محتواك</h2>
<p>سيرك الذاتية وخطاباتك ملك لك. يمكنك استخدام القوالب ومحتوى التطبيق في طلبات التوظيف الخاصة بك.</p>
<h2>الحسابات</h2>
<p>حافظ على بيانات تسجيل الدخول. يمكنك حذف حسابك في أي وقت من الملف الشخصي.</p>
<h2>التغييرات</h2>
<p>قد نحدّث التطبيق وهذه الشروط، وسنعرض التغييرات المهمة داخل التطبيق.</p>
<h2>التواصل</h2>
<p>${mail}</p>`],
  'delete-account': ['حذف الحساب', `
<h1>حذف حسابك في Sira CV</h1>
<p>يمكنك حذف حسابك وكل ما نحتفظ به على خوادمنا في أي وقت.</p>
<h2>من التطبيق (الأسرع)</h2>
<ol>
<li>افتح Sira CV</li>
<li>اضغط الملف الشخصي</li>
<li>اضغط حذف الحساب وأكّد</li>
</ol>
<p>يحذف ذلك حسابك وسيرك الذاتية وخطاباتك المحفوظة احتياطيًا فورًا. لمسح الهاتف أيضًا اضغط حذف كل بياناتي. قد نحتفظ بسجلات الشراء ما دام القانون يطلب ذلك.</p>
<h2>عبر البريد الإلكتروني</h2>
<p>إذا لم تعد تستطيع فتح التطبيق، راسل ${mail} من البريد المرتبط بحسابك بعنوان "حذف حسابي". نحذف البيانات خلال 30 يومًا ونؤكد لك بالبريد.</p>
<h2>الاشتراكات</h2>
<p>حذف الحساب لا يلغي الاشتراك. ألغِه من Google Play: الحساب، المدفوعات والاشتراكات، الاشتراكات.</p>`],
};

for (const [name, [title, body]] of Object.entries(en)) {
  fs.writeFileSync(path.join(dir, `${name}.html`), page('en', title, { href: `${name}-ar.html`, label: 'العربية' }, body));
}
for (const [name, [title, body]] of Object.entries(ar)) {
  fs.writeFileSync(path.join(dir, `${name}-ar.html`), page('ar', title, { href: `${name}.html`, label: 'English' }, body));
}
fs.writeFileSync(
  path.join(dir, 'README.md'),
  '# Sira CV legal pages\n\nPrivacy policy, terms of use and account deletion for Sira CV by KRM Studio.\n' +
    'Published at https://krm-studio.github.io/sira-cv-legal/\n',
);
console.log(fs.readdirSync(dir).join(' '));
