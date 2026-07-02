# פרק 15 תקנים בקרה ואבטחת איכות ב FIGG

##### [**Undermind**](https://undermind.ai)

---


## Table of Contents

- [פרק 15 תקנים בקרה ואבטחת איכות ב FIGG](#פרק-15-תקנים-בקרה-ואבטחת-איכות-ב-figg)
  - [מטרות הפרק](#מטרות-הפרק)
  - [מבוא](#מבוא)
  - [למה FIGG דורש משטר איכות נפרד](#למה-figg-דורש-משטר-איכות-נפרד)
  - [שכבות הבקרה ב־FIGG](#שכבות-הבקרה-בfigg)
  - [Developmental validation ו־internal validation](#developmental-validation-וinternal-validation)
    - [Developmental validation](#developmental-validation)
    - [Internal validation](#internal-validation)
  - [מדדי איכות מרכזיים](#מדדי-איכות-מרכזיים)
  - [איכות דגימה, פירוק וגבולות הפלטפורמה](#איכות-דגימה-פירוק-וגבולות-הפלטפורמה)
  - [בקרה על התאמה למסדי הנתונים](#בקרה-על-התאמה-למסדי-הנתונים)
  - [SOPs, תיעוד ושרשרת עבודה](#sops-תיעוד-ושרשרת-עבודה)
  - [בקרה ביואינפורמטית והון אנושי](#בקרה-ביואינפורמטית-והון-אנושי)
  - [Confirmatory testing והבחנה בין lead לבין evidence](#confirmatory-testing-והבחנה-בין-lead-לבין-evidence)
  - [תקינה, הסמכה ומיסוד](#תקינה-הסמכה-ומיסוד)
  - [טבלה מסכמת](#טבלה-מסכמת)
  - [סיכום](#סיכום)
  - [תיבת מושגים](#תיבת-מושגים)
    - [Developmental validation](#developmental-validation-1)
    - [Internal validation](#internal-validation-1)
    - [Quality control](#quality-control)
    - [Concordance](#concordance)
    - [SOP](#sop)
    - [Confirmatory testing](#confirmatory-testing)
    - [Accreditation](#accreditation)
  - [קריאה להעמקה](#קריאה-להעמקה)
    - [\[1\]](#kli21)
    - [\[3\]](#mat25)
    - [\[5\]](#jag17)
    - [\[4\]](#gre19)
    - [\[6\]](#pec22)
    - [\[7\]](#ant24)
    - [\[8\]](#rus22)
    - [\[11\]](#til21b)
    - [\[2\]](#but22)
  - [References](#references)

# פרק 15 תקנים בקרה ואבטחת איכות ב FIGG

## מטרות הפרק

- להבין כי FIGG אינו רק workflow חקירתי חדש אלא גם אתגר של תקינה, validation, בקרה ואחריות מוסדית \[1\], \[2\], \[3\].
- להכיר את רמות הבקרה השונות ב־FIGG: איכות הדגימה, איכות פרופיל ה־SNP, התאמה למסד, genealogy, ואימות פורנזי סופי \[1\], \[4\].
- להבין מה תורם developmental validation ומה תורם internal validation לפני הכנסת פלטפורמה או קיט לעבודה שגרתית \[5\], \[6\], \[7\].
- להכיר מדדי איכות מרכזיים כגון call rate, concordance, read depth, heterozygosity ו־reproducibility \[5\], \[6\], \[8\].
- להבין מדוע במיסוד של FIGG נדרשים גם SOPs, הכשרת כוח אדם, בקרה ביואינפורמטית, תיעוד ונהלים ברורים להבחנה בין lead לבין evidence \[1\], \[2\], \[3\].

## מבוא

ככל ש־FIGG עובר ממקרים יוצאי דופן לכלי משטרתי ומעבדתי ממוסד יותר, השאלה המרכזית אינה רק האם השיטה יכולה לעבוד, אלא האם היא יכולה לעבוד באופן אמין, עקבי, מתועד וניתן להגנה מקצועית. זהו בדיוק תחומה של אבטחת האיכות. שיטה שמצליחה בתיק אחד אינה בהכרח שיטה מוכנה ל־routine casework \[1\], \[3\].

במובן זה, תקנים ובקרה ב־FIGG נוגעים לכל השרשרת. הם מתחילים באיכות הדנ”א ובבחירת הפלטפורמה, ממשיכים במדדי QC ובתוקף של ה־SNP profile, נוגעים לשלב ההעלאה למסד ולפירוש התוצאות, ומסתיימים בהבחנה החיונית בין lead חקירתי לבין אימות פורנזי קביל \[1\], \[2\], \[4\].

## למה FIGG דורש משטר איכות נפרד

המעבדה הפורנזית הקלאסית רגילה לעבוד עם STRs, עם סמנים סטנדרטיים, ועם נהלי casework ותיקים יחסית. FIGG משנה את המוצר המעבדתי ואת נקודות הכשל האפשריות. במקום פרופיל קצר לצורך direct match, יש צורך בפרופיל SNP צפוף מספיק כדי לאתר מקטעי IBD ולזהות קרובים רחוקים \[1\].

מכאן נובעות שלוש בעיות איכות חדשות.

- **די בצפיפות נמוכה או בשגיאות קריאה כדי לקצר מקטעי IBD ולפספס קרובים אמיתיים** \[1\]
- **לא כל פרופיל usable במעבדה הוא גם usable למסד genealogy** — למשל GEDmatch דוחה בדרך כלל datasets עם פחות מ־50,000 סמנים \[1\]
- **גם פרופיל גנאלוגי טוב עדיין אינו זיהוי קביל**; נדרש שלב אימות נפרד, לרוב באמצעות STR \[1\], \[4\]

לכן FIGG זקוק למשטר איכות שמחבר בין genomics, ביואינפורמטיקה, genealogy ו־forensic confirmation.

## שכבות הבקרה ב־FIGG

אפשר לחשוב על אבטחת האיכות ב־FIGG כחמש שכבות עיקריות:

| שכבת בקרה | השאלה המרכזית | דוגמאות לנקודות כשל |
|:---|:---|:---|
| דגימה ו־pre-analytical | האם הדגימה מתאימה בכלל ל־SNP workflow | פירוק, low input, mixture, contamination \[4\], \[9\] |
| הפקת נתוני SNP | האם נוצר פרופיל צפוף ואמין | call rate נמוך, coverage לא מספיק, dropout, bias \[1\], \[6\], \[8\] |
| התאמה לפלטפורמה ולמסד | האם הנתון תואם לדרישות upload ול־matching | מספר סמנים נמוך מדי, פורמט לא תואם, marker set לא מספק \[1\], \[3\] |
| פירוש חקירתי־גנאלוגי | האם ההתאמות מפורשות בזהירות ותוך תיעוד | endogamy, pedigree collapse, tree errors, misattributed parentage \[1\], \[4\] |
| אימות פורנזי סופי | האם ה־lead אומת כראוי | דילוג על STR confirmation או בלבול בין lead לראיה \[1\], \[4\], \[10\] |

הטבלה מדגישה נקודה חשובה: QA ב־FIGG אינו מסתיים כאשר התקבל קובץ SNP. גם אם המעבדה פעלה היטב, עדיין יש צורך בנהלים לשלב genealogy ולשלב האימות.

## Developmental validation ו־internal validation

בכל טכנולוגיה פורנזית חדשה יש להבחין בין שני שלבי validation מרכזיים.

### Developmental validation

Developmental validation בודק אם מערכת, קיט או workflow חדשים מסוגלים בכלל לספק תוצאות אמינות במגוון תנאים מבוקרים. Jag17 הוא דוגמה קלאסית לכך. במחקר זה נבחנה מערכת MiSeq FGx על פני כ־1,700 reactions, ונמדדו accuracy, precision, sensitivity, mixtures, species specificity, repeatability ו־reproducibility לפי הנחיות SWGDAM \[5\].

הערך של developmental validation הוא בכך שהוא מגדיר את גבולות המערכת: מאיזה קלט DNA מתחילים לאבד יציבות, אילו סמנים רגישים יותר, מה קורה במעכבים, היכן נמצאים analytical threshold ו־interpretation threshold, ומהו ביצוע המערכת מול פרופיל reference ידוע \[5\].

### Internal validation

לאחר שמערכת הוכחה ברמה עקרונית, כל מעבדה חייבת לשאול אם היא פועלת היטב גם אצלה, בתנאי העבודה שלה, עם כוח האדם שלה, המכשור שלה וסוגי הדגימות שהיא מקבלת. כאן נכנס internal validation.

בדיוק מסיבה זו מחקרי validation על Global Screening Array ועל ForenSeq Kintelligence חשובים מאוד ל־FIGG. Rus22 הראה שאפשר להפעיל את GSA גם במעבדה פורנזית, אך תוך תשומת לב קפדנית לספי קלט, call rates ואיכות הדגימה \[8\]. Pec22 ו־Ant24 הראו כי Kintelligence, יחד עם MiSeq FGx ו־Universal Analysis Software, יכול להשתלב היטב במעבדות פורנזיות לצורכי FGG, בתנאי שנשמרים מדדי QC מוגדרים ונבדקת התאמה לדגימות low-input ו־degraded \[6\], \[7\].

## מדדי איכות מרכזיים

ל־FIGG אין מדד יחיד שקובע אם פרופיל טוב או לא. נדרשת קריאה משולבת של כמה מדדים.

| מדד | מה הוא בודק | למה הוא חשוב |
|:---|:---|:---|
| Call rate | שיעור אתרי ה־SNP שנקראו בהצלחה | מסמן אם הפרופיל צפוף מספיק ל־matching \[6\], \[8\] |
| Concordance | התאמה לפרופיל reference ידוע | בודק דיוק גנוטיפי של המערכת \[5\], \[11\] |
| Read depth או coverage | עומק ריצוף באתרי היעד | משפיע על אמינות הקריאה ועל עמידות מול noise \[1\], \[5\] |
| Heterozygosity | סבירות התפלגות הגנוטיפים | מסייע לזהות dropout או artefacts \[6\] |
| Repeatability ו־reproducibility | יציבות בתוך אותו מריץ ובין אנליסטים או מכשירים | קריטיים למעבר מ־proof of concept ל־routine use \[5\] |

Kli21 מוסיף כי גם מדדים כמו allelic balance, Q-score ויחס forward/reverse חשובים במיוחד כאשר מנסים להעריך אם פרופיל MPS מתאים להסקת קרבה \[1\].

## איכות דגימה, פירוק וגבולות הפלטפורמה

אחד הלקחים החוזרים ביותר בספרות הוא שאיכות דגימה היא צוואר הבקבוק הראשי. Microarray עשוי להצליח היטב בדגימות טובות יחסית, אך הוא רגיש יותר ל־compromised DNA \[1\], \[9\]. דגימות degraded במיוחד, low template או skeletal remains דוחפות לעיתים קרובות לכיוון WGS או targeted capture/panel workflows \[1\], \[3\], \[11\].

Vri21 הראה ש־compromised DNA פוגע קשות ביכולת לסווג קרבה ב־IGG, ושככל שהאיכות והכמות יורדות, הצלחת ה־kinship classification מתמוטטת במהירות \[9\]. לכן אבטחת איכות ב־FIGG מתחילה למעשה עוד לפני הפקת הפרופיל: בהחלטה אם הדגימה בכלל מתאימה למסלול הנבחר.

Mat25 מסכם היטב את ההיגיון התפעולי הזה ומציע hybrid workflow: CE-STRs למקרים שגרתיים, NGS לדגימות קשות ולתיקים מורכבים, ו־SNP microarrays או workflows מקבילים עבור long-range kinship ו־FIGG \[3\]. זוהי גישה חשובה, משום שהיא מחליפה את השאלה “איזו טכנולוגיה טובה יותר” בשאלה “איזו טכנולוגיה מבוקרת ומתאימה יותר לכל סוג מקרה”.

## בקרה על התאמה למסדי הנתונים

ב־FIGG לא די בכך שהפרופיל מדויק מבחינה אנליטית. הוא צריך גם להתאים לדרישות החיפוש במסד. Kli21 מזכיר ש־GEDmatch אינו מקבל בדרך כלל פרופילים עם פחות מ־50,000 SNPs, וש־matching algorithms רגישים לטעויות קריאה ולחוסר צפיפות \[1\].

לכן חלק מן־QA צריך לעסוק גם ב־post-analytic fit:

- האם marker set מספיק צפוף ומפוזר גנומית
- האם פורמט היצוא מתאים למסד היעד
- האם איכות הפרופיל מספיקה כדי למנוע קיצור מלאכותי של מקטעי IBD
- האם ברור באילו תנאים המסד יקבל או ידחה את הקובץ \[1\]

זו נקודה ייחודית ל־FIGG. במערכות פורנזיות קלאסיות, המעבדה מייצרת פרופיל להשוואה בתוך תשתית מוכרת. כאן המעבדה צריכה לעיתים לייצר פרופיל שמתאים גם לאקוסיסטם genealogy חיצוני.

## SOPs, תיעוד ושרשרת עבודה

But22 ו־Mat25 מדגישים כי הכנסת טכנולוגיות חדשות לעבודה שגרתית דורשת יותר מאשר מכשור תקין. היא דורשת SOPs ברורים, תיעוד החלטות, process maps, ושילוב בתוך מסגרת של תקינה רחבה יותר \[2\], \[3\].

ב־FIGG נהלים כאלה צריכים לכלול לפחות:

- קריטריונים לבחירת תיקים
- קריטריונים לבחירת פלטפורמה לפי סוג הדגימה
- ספי QC מינימליים להמשך עבודה
- נהלי upload ו־data handling
- תיעוד של כל צעד genealogy משמעותי
- נהלי target testing ואיסוף דגימת אימות
- הבחנה כתובה בין investigative notes לבין ראיה פורנזית סופית

But22 מתאר כיצד בעשור האחרון התרחבו מאוד המסמכים המנחים בתחום, דרך FBI QAS, OSAC, ASB, SWGDAM ומסמכי implementation strategy של NGS \[2\]. גם אם לא כל מסמך עוסק ישירות ב־FIGG, הם מספקים את מסגרת ה־quality culture הנחוצה להטמעתו.

## בקרה ביואינפורמטית והון אנושי

אחד החסמים הפחות גלויים לעין אך החשובים ביותר הוא הביואינפורמטיקה. Mat25 מדגיש כי מעבר ל־NGS ול־microarrays יוצר עומס חדש של ניתוח נתונים, storage, software validation ותלות בכוח אדם מיומן \[3\].

מכאן נובעת דרישה כפולה:

- **כלי תוכנה מאומתים** — לא רק אלגוריתם שעובד, אלא workflow מתועד, version-controlled וניתן לשחזור
- **הכשרת כוח אדם** — אנליסטים שיכולים להבחין בין variant אמיתי ל־artefact, להבין מגבלות של phasing ושל kinship inference, ולתעד uncertainty באופן נכון \[1\], \[3\]

But22 מוסיף שגם human factors חייבים להיות חלק מן־QA המודרני. שגיאות אינן נובעות רק ממכשירים אלא גם מעומס קוגניטיבי, מפרשנות יתר ומאופן עיצוב התהליך \[2\]. ב־FIGG הדבר חשוב במיוחד משום שהשרשרת כוללת הרבה נקודות שבהן judgment אנושי משחק תפקיד.

## Confirmatory testing והבחנה בין lead לבין evidence

אבטחת איכות ב־FIGG אינה שלמה בלי כלל יסוד: genealogy אינו הוכחה סופית. Gre19 מדגיש כי גם כאשר הכיוון הגנאלוגי נראה משכנע, יש לאמת אותו באמצעות direct STR comparison בין דגימת החשוד לבין הפרופיל הפורנזי \[4\]. Kli21 מזכיר כי עיקרון זה מעוגן גם בהנחיות מדיניות שונות כמעין “CODIS first and last” \[1\].

משמעות הכלל הזה היא כפולה.

ראשית, הוא מגן מפני overclaiming. התאמה משפחתית ועץ יוחסין טובים ככל שיהיו עדיין אינם שקולים ל־forensic identification. שנית, הוא מכריח את המערכת לשמור על הפרדה תפקודית בין שלב ה־lead generation לבין שלב ה־proof \[4\], \[10\].

בהקשר זה Til21b מציע תרומה מעניינת. FORCE panel פותח כדי לגשר בין lead גנאלוגי לבין שלב confirmation במקרים שבהם STRs לבדם אינם מספקים, למשל בשרידים degraded או בהסקת קרבה מרוחקת יותר. יתרונו הוא בכך שהוא מספק פאנל SNP ייעודי, בעל concordance גבוהה מאוד, שאינו כולל סמנים רפואיים רגישים ושיכול לחזק שלב אימות מבוקר \[11\].

## תקינה, הסמכה ומיסוד

במעבר מ־innovation ל־routine practice, שאלת התקינה המוסדית נעשית מרכזית. Mat25 מצביע על ISO/IEC 17025 ועל קודים לאומיים כבסיס להסמכת מעבדות שמטמיעות NGS ו־SNP workflows \[3\]. But22 מציג את העדכונים של FBI QAS ואת עבודת OSAC ו־ASB כעדות לכך שגם סביבת התקנים הרחבה יותר נעה לכיוון תהליכים מפורטים יותר של validation, interpretation, training ו־quality management \[2\].

עם זאת, הספרות גם מבהירה שהתחום עדיין בתנועה. Mat25 מציין שב־2024 פורסמו הנחיות SWGDAM לפרשנות SNPs, אך הן עדיין אינן מכסות במלואן microarrays ו־FIGG \[3\]. כלומר, קיימת כבר מסגרת איכות מתפתחת, אך לא קנון סגור ואחיד לכל מרכיבי FIGG.

## טבלה מסכמת

| תחום | מה נדרש בפועל | מקורות מרכזיים |
|:---|:---|:---|
| Validation אנליטי | developmental ו־internal validation, ספי ביצוע ומגבלות מערכת | \[5\], \[6\], \[7\], \[8\] |
| QC של פרופיל SNP | call rate, concordance, coverage, heterozygosity, reproducibility | \[1\], \[5\], \[6\] |
| בחירת טכנולוגיה | התאמת פלטפורמה לסוג הדגימה ולמטרת המקרה | \[1\], \[3\], \[9\] |
| תיעוד ונהלים | SOPs, process maps, training, data handling, bioinformatics | \[2\], \[3\] |
| אימות סופי | STR confirmation או פאנל משלים מבוקר במקרים מתאימים | \[1\], \[4\], \[11\] |
| ממשל ותקינה | QAS, ISO/IEC 17025, OSAC, ASB, SWGDAM | \[2\], \[3\] |

## סיכום

תקנים, בקרה ואבטחת איכות ב־FIGG עוסקים בשאלה כיצד להפוך workflow חדשני ואפקטיבי לכלי מקצועי שאפשר לסמוך עליו. הדבר מחייב validation מדורג, מדדי QC ברורים, התאמה זהירה בין דגימה לפלטפורמה, SOPs ותיעוד, בקרה ביואינפורמטית, והפרדה חדה בין genealogy lead לבין פורנזיקה מאמתת \[1\], \[3\], \[4\].

הספרות מראה כי התחום נע בכיוון של מיסוד מואץ, עם יותר קיטים ייעודיים, יותר מסמכי guidance ויותר שיח על accreditation \[2\], \[3\], \[7\]. אך היא גם מבהירה ש־FIGG עדיין אינו טכנולוגיה “שגרתית” פשוטה. איכותו תלויה לא רק במכשיר או בקיט, אלא בשרשרת שלמה של החלטות מקצועיות ומתועדות, מן הדגימה ועד האימות הסופי.

## תיבת מושגים

### Developmental validation

הערכת ביצועי מערכת חדשה בתנאים מבוקרים כדי לקבוע דיוק, רגישות, מגבלות וספי עבודה \[5\].

### Internal validation

בדיקה מקומית של מערכת בתוך המעבדה המיישמת אותה, עם המכשור, הצוות והנהלים שלה \[6\], \[8\].

### Quality control

מערך מדדים ובדיקות שוטפות שנועדו להבטיח כי פרופיל ה־SNP אמין ומתאים להמשך העבודה \[1\], \[6\].

### Concordance

מידת ההתאמה בין פרופיל שהופק במערכת הנבדקת לבין reference ידוע \[5\], \[11\].

### SOP

Standard Operating Procedure, כלומר נוהל עבודה כתוב, מפורט וחוזר, שנועד להבטיח עקביות ובקרה.

### Confirmatory testing

שלב האימות הישיר של lead גנאלוגי, בדרך כלל באמצעות STR profiling, ולעיתים בעזרת פאנל SNP ייעודי משלים \[4\], \[11\].

### Accreditation

הכרה פורמלית בכך שמעבדה עומדת בדרישות תקן ובמערכת איכות מתאימה, כגון ISO/IEC 17025 \[3\].

## קריאה להעמקה

### \[1\]

סקירת היסוד הרחבה ביותר על FIGG. לפרק זה היא חשובה במיוחד בגלל הדיון בדרישות ה־SNP profile, ב־QC, במסדי הנתונים, ובצורך ב־confirmation ובהסדרה.

### \[3\]

המקור הטוב ביותר להבנת היישום השגרתי של NGS ו־microarrays בפורנזיקה. מתאים במיוחד לחסמי הטמעה, accreditation, bioinformatics ו־hybrid workflows.

### \[5\]

דוגמה חזקה ל־developmental validation בפורנזיקה גנומית. חשוב במיוחד להבנת accuracy, sensitivity, mixtures, reproducibility וספי פרשנות.

### \[4\]

מקור מפתח לנהלי safeguard ב־FIGG עצמו, כולל sample suitability, מגבלות upload, פרוטוקולי קשר עם matches, ואימות STR סופי.

### \[6\]

מחקר validation פנימי חשוב על Kintelligence, עם דגש על call rate, heterozygosity ועבודה עם דגימות low-input ו־degraded.

### \[7\]

מחקר validation developmental על Kintelligence ו־MiSeq FGx, חשוב במיוחד להבנת הכנסת workflow ייעודי של FIGG לתוך המעבדה הפורנזית.

### \[8\]

מקור מפתח להבנת הכנסת SNP microarray לשימוש פורנזי מבוקר, כולל ספי קלט DNA ומדדי איכות.

### \[11\]

מאמר חשוב על FORCE panel ככלי ביניים בין lead גנאלוגי לבין confirmation, במיוחד במקרים שבהם STR לבדו אינו מספק.

### \[2\]

סקירת רוחב מועילה מאוד למסמכי guidance, עדכוני QAS, עבודת OSAC ו־ASB, ותרבות האיכות הרחבה שבתוכה FIGG מוטמע.

---

## References

\[1\] D. Kling, C. Phillips, D. Kennett, and A. Tillmar, “Investigative genetic genealogy: Current methods, knowledge and practice.” *Forensic science international. Genetics*, vol. 52, pp. 102474, Jan. 2021, doi: [10.1016/j.fsigen.2021.102474](https://doi.org/10.1016/j.fsigen.2021.102474).

\[2\] J. Butler, “Recent advances in forensic biology and forensic DNA typing: INTERPOL review 2019–2022,” *Forensic Science International: Synergy*, vol. 6, Dec. 2022, doi: [10.1016/j.fsisyn.2022.100311](https://doi.org/10.1016/j.fsisyn.2022.100311).

\[3\] S. P. Matute and S. Iyavoo, “Implementation of NGS and SNP microarrays in routine forensic practice: opportunities and barriers,” *BMC Genomics*, vol. 26, May 2025, doi: [10.1186/s12864-025-11723-6](https://doi.org/10.1186/s12864-025-11723-6).

\[4\] E. Greytak, C. Moore, and S. Armentrout, “Genetic genealogy for cold case and active investigations.” *Forensic science international*, vol. 299, pp. 103–113, Jun. 2019, doi: [10.1016/J.FORSCIINT.2019.03.039](https://doi.org/10.1016/J.FORSCIINT.2019.03.039).

\[5\] A. C. Jäger *et al.*, “Developmental validation of the MiSeq FGx Forensic Genomics System for Targeted Next Generation Sequencing in Forensic DNA Casework and Database Laboratories.” *Forensic science international. Genetics*, vol. 28, pp. 52–70, May 2017, doi: [10.1016/j.fsigen.2017.01.011](https://doi.org/10.1016/j.fsigen.2017.01.011).

\[6\] M. Peck *et al.*, “Internal Validation of the ForenSeq Kintelligence Kit for Application to Forensic Genetic Genealogy,” *Forensic Genomics*, vol. 2, pp. 103–114, Oct. 2022, doi: [10.1089/forensic.2022.0014](https://doi.org/10.1089/forensic.2022.0014).

\[7\] J. Antunes *et al.*, “Developmental validation of the ForenSeq® Kintelligence kit, MiSeq FGx® sequencing system and ForenSeq Universal Analysis Software.” *Forensic science international. Genetics*, vol. 71, pp. 103055, Apr. 2024, doi: [10.1016/j.fsigen.2024.103055](https://doi.org/10.1016/j.fsigen.2024.103055).

\[8\] D. A. Russell *et al.*, “Developmental Validation of the Illumina Infinium Assay Using the Global Screening Array on the iScan System for Use in Forensic Laboratories,” *Forensic Genomics*, vol. 3, pp. 15–24, Oct. 2022, doi: [10.1089/forensic.2022.0013](https://doi.org/10.1089/forensic.2022.0013).

\[9\] J. H. de Vries *et al.*, “Impact of SNP microarray analysis of compromised DNA on kinship classification success in the context of investigative genetic genealogy,” *bioRxiv*, Jun. 2021, doi: [10.1101/2021.06.25.449870](https://doi.org/10.1101/2021.06.25.449870).

\[10\] O. M. Tuazon, R. Wickenheiser, R. Ansell, C. J. Guerrini, G. Zwenne, and B. Custers, “Law enforcement use of genetic genealogy databases in criminal investigations: Nomenclature, definition and scope,” *Forensic Science International: Synergy*, vol. 8, Feb. 2024, doi: [10.1016/j.fsisyn.2024.100460](https://doi.org/10.1016/j.fsisyn.2024.100460).

\[11\] A. Tillmar, K. Sturk-Andreaggi, J. Daniels-Higginbotham, J. T. Thomas, and C. Marshall, “The FORCE Panel: An All-in-One SNP Marker Set for Confirming Investigative Genetic Genealogy Leads and for General Forensic Applications,” *Genes*, vol. 12, Dec. 2021, doi: [10.3390/genes12121968](https://doi.org/10.3390/genes12121968).
