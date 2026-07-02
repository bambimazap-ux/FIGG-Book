# פרק 9 FIGG במעבדה הפורנזית

##### [**Undermind**](https://undermind.ai)

---


## Table of Contents

- [פרק 9 FIGG במעבדה הפורנזית](#פרק-9-figg-במעבדה-הפורנזית)
  - [מטרות הפרק](#מטרות-הפרק)
  - [מבוא](#מבוא)
  - [למה STR אינו מספיק](#למה-str-אינו-מספיק)
  - [נקודת המוצא של המעבדה](#נקודת-המוצא-של-המעבדה)
  - [Microarray](#microarray)
  - [Whole-genome sequencing](#whole-genome-sequencing)
  - [Targeted SNP panels](#targeted-snp-panels)
  - [מה קובע את בחירת הפלטפורמה](#מה-קובע-את-בחירת-הפלטפורמה)
  - [בקרת איכות](#בקרת-איכות)
    - [Call rate](#call-rate)
    - [Heterozygosity](#heterozygosity)
    - [Concordance ו־accuracy](#concordance-וaccuracy)
    - [השפעת פירוק DNA](#השפעת-פירוק-dna)
  - [מן המעבדה לקובץ החיפוש](#מן-המעבדה-לקובץ-החיפוש)
  - [מקומה של המעבדה בשרשרת FIGG](#מקומה-של-המעבדה-בשרשרת-figg)
  - [סיכום](#סיכום)
  - [תיבת מושגים](#תיבת-מושגים)
    - [Forensic SNP profile](#forensic-snp-profile)
    - [Microarray](#microarray-1)
    - [Whole-genome sequencing](#whole-genome-sequencing-1)
    - [Targeted SNP panel](#targeted-snp-panel)
    - [Call rate](#call-rate-1)
    - [Heterozygosity rate](#heterozygosity-rate)
    - [Concordance](#concordance)
  - [קריאה להעמקה](#קריאה-להעמקה)
    - [\[1\]](#kli21)
    - [\[2\]](#til20)
    - [\[4\]](#vri21)
    - [\[5\]](#rus22)
    - [\[6\]](#pec22)
    - [\[3\]](#ant24)
  - [References](#references)

# פרק 9 FIGG במעבדה הפורנזית

## מטרות הפרק

- להבין מדוע FIGG מחייב מעבר מנתוני STR פורנזיים לנתוני SNP התואמים חיפוש גנאלוגי \[1\].
- להכיר את שלושת מסלולי העבודה המרכזיים במעבדה: microarray, whole-genome sequencing ו־targeted SNP panels \[1\], \[2\], \[3\].
- להבין כיצד איכות וכמות DNA מגבילות את בחירת הפלטפורמה ואת איכות הפרופיל המתקבל \[4\], \[5\], \[6\].
- להכיר מדדי איכות מרכזיים כגון call rate, heterozygosity, concordance ו־degradation effects \[4\], \[5\], \[6\].
- להבין כיצד המעבדה מייצרת קובץ SNP usable לחיפוש במסד גנאלוגי, אך אינה מבצעת עדיין את שלב tree building עצמו \[1\], \[2\].

## מבוא

בשלב זה של הקורס המעבר אל FIGG נעשה קונקרטי. עד כה נבנו היסודות של שונות גנטית, IBD, מסדי נתונים גנאלוגיים וחיפוש קרובים. כעת מתווסף השלב המכריע שבו דגימה פורנזית, שלעיתים נבדקה במקור לצורכי STR קלאסי, חייבת להפוך לפרופיל SNP גנומי המתאים לחיפוש גנאלוגי \[1\].

זהו אחד ההבדלים העמוקים בין פורנזיקה מסורתית לבין FIGG. המעבדה אינה מסתפקת עוד ביצירת פרופיל מזהה קצר, אלא נדרשת לייצר תיאור גנומי צפוף, בר־השוואה, ובעל איכות מספקת כדי לזהות קרובים רחוקים במסדי נתונים \[1\], \[2\].

## למה STR אינו מספיק

STRs הם כלי מצוין לזיהוי ישיר ולהשוואת דגימה ידועה לדגימה לא ידועה, אך הם מספקים מעט מדי מידע לצורך long-range familial search. עם 16–22 סמנים אוטוזומליים אפשר לזהות היטב הורה־ילד, אחים ולעיתים קרבה קרובה נוספת, אך לא לבנות דפוסי שיתוף כרומוזומלי המתאימים לבני דודים רחוקים יותר \[1\].

לכן FIGG נשען על SNPs, לרוב בהיקף של אלפי עד מאות אלפי אתרים, כדי לאפשר זיהוי מקטעי IBD והערכת קרבה במרחק גנאלוגי גדול יותר \[1\], \[6\]. המעבדה הפורנזית חייבת אפוא לתרגם evidence DNA לפורמט גנטי הדומה יותר לזה של consumer genomics מאשר לזה של CODIS.

## נקודת המוצא של המעבדה

ב־FIGG המעבדה מקבלת לעיתים קרובות דגימות מאתגרות יותר מאלה של בדיקות אזרחיות: דם מיושן, תאי זרע, עצם, שן, שיער, קלטות דבק, חפצים נגועים בכמות DNA נמוכה, או שרידים אנושיים שנפגעו מסביבה, לחות, חום או זמן \[2\], \[6\], \[7\].

מכאן נובעת השאלה המעבדתית המרכזית: איזה מסלול טכנולוגי יפיק מן הדגימה המסוימת את פרופיל ה־SNP האמין ביותר לצורכי חיפוש גנאלוגי.

## Microarray

SNP microarray היה במשך שנים רבות מסלול העבודה הטבעי ביותר ל־FIGG, משום שזהו בדיוק סוג הנתונים שעליו נבנו חברות consumer genomics ומסדי התאמה גנאלוגיים \[1\], \[5\].

היתרון של microarray הוא יצירת פרופיל צפוף מאוד, התואם היטב את האקוסיסטם הגנאלוגי. אך יש לו מגבלה יסודית: הוא פותח עבור DNA באיכות ובכמות גבוהות יחסית. דגימות פורנזיות רבות אינן עומדות בהנחות אלה \[1\], \[4\].

Russell ועמיתיו ביצעו validation של Global Screening Array לשימוש פורנזי והראו שאפשר להפיק נתונים איכותיים מכמה סוגי דגימות גם בקלטי DNA נמוכים יחסית, כל עוד נשמרת איכות מספקת של הקריאה, עם call rates של מעל 95% כבר סביב 0.20 ng בתנאים טובים \[5\]. עם זאת, de Vries ועמיתיו הראו שכאשר הכמות והאיכות יורדות עוד, הצלחת הסיווג המשפחתי קורסת במהירות: ב־25 pg ומטה ההצלחה ירדה לאפס, ו־DNA מפורק מאוד פגע קשות בסיווג kinship \[4\].

הלקח המעשי הוא ש־microarray עשוי להיות מצוין כאשר הדגימה סבירה, אך הוא אינו פתרון אוניברסלי לדגימות פורנזיות קשות.

## Whole-genome sequencing

Whole-genome sequencing מציע מסלול גמיש יותר, במיוחד כאשר DNA מפורק או כאשר חומר המוצא מוגבל \[1\], \[2\]. במקום להסתמך על היברידיזציה לשבב מוגדר מראש, ה־DNA נחתך, נבנות ספריות, הקריאות נרצפות, ואז מבוצעים mapping, variant calling, filtering ולעיתים גם המרה לאתרים הרלוונטיים למסדים גנאלוגיים.

Tillmar ועמיתיו הדגימו גישה זו במקרה ה־Ekeby man. הם ריצפו DNA מעצם, יצרו שלוש ספריות, השיגו כיסוי ממוצע של 30X, ולאחר עיבוד ביואינפורמטי, סינון ובחירה של SNPs תואמים, הפיקו גנוטיפים של כ־מיליון SNPs לצורך חיפוש ב־GEDmatch \[2\].

המקרה הזה חשוב משום שהוא מראה ש־WGS יכול לשמש לא רק ככלי מחקרי אלא כמסלול מעבדתי מלא ליצירת lead בזיהוי שרידים או נעדרים. יתרונו הגדול הוא התאמה טובה יותר ל־fragmented DNA; חסרונו הוא עלות, עומס חישובי, ועיבוד מורכב יותר עד ליצירת קובץ usable \[1\], \[2\].

## Targeted SNP panels

ההתפתחות המשמעותית ביותר בשנים האחרונות היא המעבר ל־targeted SNP panels שנבנו במיוחד לצורכי FIGG או kinship inference בינוני־עד־רחוק \[3\], \[6\]. גישה זו מוותרת על צפיפות גנומית מלאה לטובת פאנל ממוקד של SNPs אינפורמטיביים, תוך תכנון אמפליקונים קצרים יותר והתאמה טובה יותר לדגימות פגומות.

ForenSeq Kintelligence הוא הדוגמה הבולטת ביותר לכך. Peck ועמיתיו הראו שבבדיקת validation פנימית, הפאנל של 10,230 SNPs הניב פרופילים אמינים ומדויקים עד 0.05 ng DNA, גם בדגימות מאתגרות, והדגישו את חשיבותם של call rate ושל heterozygosity rate כמדדי איכות מרכזיים \[6\].

Antunes ועמיתיה הציגו validation developmental רחב יותר והדגישו שפאנל זה נבנה כך ש־97.8% מן האמפליקונים יהיו קצרים מ־150 bp, מה שמגדיל את סיכויי ההצלחה בדגימות degraded. הם מסכמים שהקיט, יחד עם MiSeq FGx ו־Universal Analysis Software, מאפשרים להעביר את הרכיב הגנטי של FIGG אל תוך המעבדה הפורנזית עצמה \[3\].

היתרון של פאנלים ממוקדים הוא אפוא שילוב בין רגישות לדגימות קשות, תפוקה נוחה יחסית, והפחתת תלות במעבדות חיצוניות. החיסרון הוא שהמידע המתקבל פחות צפוף ממיקרואריי או WGS, ולכן יש תמיד איזון בין robustness מעבדתי לבין עושר גנומי.

## מה קובע את בחירת הפלטפורמה

בחירת המסלול המעבדתי תלויה בכמה משתנים עיקריים:

- **כמות DNA** — דגימות תת־ננוגרמיות נוטות להקשות במיוחד על microarray \[4\]
- **איכות DNA ופירוק** — DNA מקוטע favor לשיטות מבוססות ריצוף או פאנלים קצרים \[2\], \[3\]
- **מטרת המקרה** — זיהוי שרידים, יצירת lead חקירתי או kinship testing בינוני־טווח עשויים להצדיק בחירות שונות \[8\], \[9\]
- **זמינות תשתית במעבדה** — האם קיימים iScan, MiSeq FGx, workflows של WGS, או יכולת ביואינפורמטית מתאימה \[1\], \[3\]
- **פורמט היציאה הדרוש** — האם נדרש קובץ דמוי consumer raw data או פורמט אחר שניתן להמיר למסדי הנתונים \[1\]

אין לכן תשובה אחת נכונה. המעבדה הפורנזית בוחרת את הפלטפורמה לא רק על סמך טכנולוגיה “טובה יותר”, אלא על סמך התאמה בין הדגימה, המקרה, והמערכת המעשית שבה היא פועלת.

## בקרת איכות

ב־FIGG איכות הפרופיל אינה נמדדת רק בשאלה אם התקבל DNA, אלא אם התקבל פרופיל usable לחיפוש קרובים. לכן בקרת האיכות היא שלב מרכזי במיוחד.

### Call rate

call rate מודד את שיעור ה־SNPs שעבורם התקבלה קריאה גנוטיפית. זהו אחד המדדים הראשונים לבחינת התאמת הפרופיל להמשך עיבוד \[5\], \[6\].

### Heterozygosity

heterozygosity rate משמש מדד משלים חשוב. Peck ועמיתיו הראו שיש לבחון אותו לצד call rate, משום שפרופיל עם call rate סביר אך heterozygosity לא תקינה עלול לשקף בעיה כגון dropout, bias או פגיעה אחרת באיכות הנתונים \[6\].

### Concordance ו־accuracy

במחקרי validation בודקים עד כמה הגנוטיפים תואמים לפרופילי reference ידועים. זהו מדד חשוב במיוחד כאשר עובדים עם קלטי DNA נמוכים, דגימות degraded או workflows חדשים \[5\], \[6\].

### השפעת פירוק DNA

אחד הלקחים החוזרים כמעט בכל הספרות הוא שפירוק DNA הוא צוואר הבקבוק המרכזי. Vri21 מראים שהשפעתו על kinship classification קשה במיוחד, וש־compromised DNA נוטה להוביל יותר ל־false negatives מאשר ל־false positives \[4\]. כלומר, הסכנה העיקרית היא לפספס קרוב אמיתי, לאו דווקא לייצר קרוב מדומה.

## מן המעבדה לקובץ החיפוש

הפלט של המעבדה אינו עץ משפחה אלא קובץ SNP. לאחר sequencing או genotyping מתבצעים עיבוד, filtering, QC ולעיתים התאמה לאתרי ה־SNP הנדרשים לחיפוש במסד גנאלוגי \[1\], \[2\].

זהו שלב חשוב מבחינה מושגית: המעבדה אחראית על החלק הגנטי של FIGG, כלומר על יצירת נתון איכותי ומפורש. רק לאחר מכן מתחיל שלב matching, triangulation ו־genealogical reconstruction שיידון בפרק הבא \[1\].

## מקומה של המעבדה בשרשרת FIGG

המעבדה הפורנזית נמצאת במעבר שבין evidence לבין inference. אם בעבר די היה לה לייצר פרופיל STR בר־השוואה, כעת נדרש ממנה לייצר פרופיל גנומי רחב, לעיתים מתוך דגימה שפגומה יותר מזו שעבורה פותחו הפלטפורמות האזרחיות \[1\], \[4\].

לכן FIGG במעבדה אינו רק שדרוג טכנולוגי. זהו שינוי בתפיסת המוצר המעבדתי: מן השאלה “מי תואם לפרופיל הזה” אל השאלה “האם אפשר לייצר מן הדגימה הזאת פרופיל שיאפשר לאתר קרובים רחוקים”.

## סיכום

FIGG במעבדה הפורנזית מתחיל בהכרה בכך ש־STR אינו מספיק לזיהוי קרובים רחוקים, ולכן יש להפיק מן הדגימה נתוני SNP התואמים חיפוש גנאלוגי \[1\]. microarray מספק צפיפות גבוהה אך רגיש לדגימות compromised; WGS גמיש יותר לדגימות מפורקות אך דורש עיבוד מורכב; ו־targeted SNP panels מספקים פשרה יעילה בין robustness מעבדתי לבין utility גנאלוגי \[2\], \[3\], \[4\], \[6\].

הצלחת השלב המעבדתי תלויה בכמות ובאיכות ה־DNA, בבחירת הפלטפורמה, ובבקרת איכות קפדנית באמצעות מדדים כמו call rate, heterozygosity ו־concordance \[5\], \[6\]. הפלט הסופי של המעבדה הוא קובץ SNP usable, שהוא תנאי הכרחי אך לא מספיק להמשך ה־FIGG. רק בפרק הבא יתחיל המעבר מן הפרופיל הגנטי אל workflow חקירתי וגנאלוגי מלא.

## תיבת מושגים

### Forensic SNP profile

פרופיל גנטי מבוסס SNP המופק מדגימה פורנזית לצורך kinship inference או חיפוש גנאלוגי \[1\].

### Microarray

פלטפורמת genotyping צפופה המבוססת על hybridization לשבב SNPs, יעילה מאוד ל־high-quality DNA אך רגישה יחסית לדגימות degraded \[1\], \[4\].

### Whole-genome sequencing

ריצוף רחב של ה־DNA שממנו ניתן להפיק גנוטיפים של SNPs לאחר עיבוד ביואינפורמטי מתאים \[2\].

### Targeted SNP panel

פאנל ממוקד של SNPs אינפורמטיביים, שתוכנן במיוחד ל־kinship inference או FIGG, לרוב עם אמפליקונים קצרים יותר \[3\], \[6\].

### Call rate

שיעור אתרי ה־SNP שעבורם התקבלה קריאה גנוטיפית usable \[5\], \[6\].

### Heterozygosity rate

מדד התפלגות גנוטיפית המשמש להערכת סבירותו ואיכותו של פרופיל SNP \[6\].

### Concordance

מידת ההתאמה בין הגנוטיפים שהופקו בפרוטוקול הנבדק לבין פרופיל reference ידוע \[5\].

## קריאה להעמקה

### \[1\]

מאמר הסקירה המרכזי על FIGG. לפרק זה הוא חשוב במיוחד משום שהוא מציג את המעבר מ־STR ל־SNP ואת שלושת מסלולי ההפקה המרכזיים: microarray, WGS ושיטות targeted sequencing.

### \[2\]

תיאור מקרה חשוב שבו WGS של עצם אנושית איפשר יצירת פרופיל של כמיליון SNPs לחיפוש ב־GEDmatch. זהו מאמר מפתח להבנת היישום המעבדתי של WGS בשרידים אנושיים.

### \[4\]

מאמר מרכזי על השפעת DNA compromised על הצלחת microarray ועל סיווג kinship ב־IGG. הוא מועיל במיוחד להבנת גבולות הכמות והאיכות של דגימות פורנזיות.

### \[5\]

מחקר validation על Global Screening Array במעבדה פורנזית. מתאים במיוחד להבנת מדדי איכות, ספי קלט DNA, והערכת התאמת דגימות ל־microarray.

### \[6\]

מחקר validation פנימי על ForenSeq Kintelligence לצורכי FGG. המאמר חשוב במיוחד להבנת call rate, heterozygosity, ודגימות low-input או degraded.

### \[3\]

מחקר validation developmental רחב על Kintelligence, MiSeq FGx ו־Universal Analysis Software. מתאים במיוחד להבנת האופן שבו targeted SNP panels מעבירים את היכולת של FIGG אל תוך המעבדה הפורנזית השוטפת.

---

## References

\[1\] D. Kling, C. Phillips, D. Kennett, and A. Tillmar, “Investigative genetic genealogy: Current methods, knowledge and practice.” *Forensic science international. Genetics*, vol. 52, pp. 102474, Jan. 2021, doi: [10.1016/j.fsigen.2021.102474](https://doi.org/10.1016/j.fsigen.2021.102474).

\[2\] A. Tillmar, P. Sjölund, B. Lundqvist, T. Klippmark, C. Älgenäs, and H. Gréen, “Whole-genome sequencing of human remains to enable genealogy DNA database searches - A case report.” *Forensic science international. Genetics*, vol. 46, pp. 102233, Jan. 2020, doi: [10.1016/j.fsigen.2020.102233](https://doi.org/10.1016/j.fsigen.2020.102233).

\[3\] J. Antunes *et al.*, “Developmental validation of the ForenSeq® Kintelligence kit, MiSeq FGx® sequencing system and ForenSeq Universal Analysis Software.” *Forensic science international. Genetics*, vol. 71, pp. 103055, Apr. 2024, doi: [10.1016/j.fsigen.2024.103055](https://doi.org/10.1016/j.fsigen.2024.103055).

\[4\] J. H. de Vries *et al.*, “Impact of SNP microarray analysis of compromised DNA on kinship classification success in the context of investigative genetic genealogy,” *bioRxiv*, Jun. 2021, doi: [10.1101/2021.06.25.449870](https://doi.org/10.1101/2021.06.25.449870).

\[5\] D. A. Russell *et al.*, “Developmental Validation of the Illumina Infinium Assay Using the Global Screening Array on the iScan System for Use in Forensic Laboratories,” *Forensic Genomics*, vol. 3, pp. 15–24, Oct. 2022, doi: [10.1089/forensic.2022.0013](https://doi.org/10.1089/forensic.2022.0013).

\[6\] M. Peck *et al.*, “Internal Validation of the ForenSeq Kintelligence Kit for Application to Forensic Genetic Genealogy,” *Forensic Genomics*, vol. 2, pp. 103–114, Oct. 2022, doi: [10.1089/forensic.2022.0014](https://doi.org/10.1089/forensic.2022.0014).

\[7\] J. L. Watson, D. McNevin, K. Grisedale, M. Spiden, S. Seddon, and J. Ward, “Operationalisation of the ForenSeq® Kintelligence Kit for Australian unidentified and missing persons casework.” *Forensic science international. Genetics*, vol. 68, pp. 102972, Oct. 2023, doi: [10.1016/j.fsigen.2023.102972](https://doi.org/10.1016/j.fsigen.2023.102972).

\[8\] J. L. Watson, D. McNevin, and J. Ward, “Genetic Kinship Testing Techniques for Human Remains Identification and Missing Persons Investigations,” *Forensic Genomics*, vol. 4, pp. 4–23, Mar. 2024, doi: [10.1089/forensic.2023.0018](https://doi.org/10.1089/forensic.2023.0018).

\[9\] K. Gettings, A. Tillmar, K. Sturk-Andreaggi, and C. Marshall, “Review of SNP assays for disaster victim identification: Cost, time, and performance information for decision‐makers,” *Journal of Forensic Sciences*, vol. 69, pp. 1546–1557, Jul. 2024, doi: [10.1111/1556-4029.15585](https://doi.org/10.1111/1556-4029.15585).
