# מדריך פרומפטים מורחב ל-NotebookLM עבור קורס FIGG (גרסה פדגוגית אופטימלית)

מדריך זה מכיל סטים של פרומפטים המותאמים אישית עבור שתי מערכות שונות בתוך **NotebookLM**:
1. **תיבת התאמת השמע (Customize Audio Overview)**: הנחיות ממוקדות באנגלית להזנה בתיבת ה-Customize של סקירת השמע. הנחיות אלו מנחות את שני המנחים של ה-Audio Overview לפעול כ**עוזרי הוראה (Teaching Assistants)** של הקורס, העורכים חזרה שבועית לסטודנטים, מדגישים מונחים בינלאומיים מרכזיים, ומפרקים אי-הבנות נפוצות (Misconceptions) של סטודנטים בבחינות.
2. **ממשק הצ'אט של NotebookLM (Chat Interface)**: פרומפטים מפורטים להדבקה בחלון הצ'אט של הפרק כדי להפיק תסריטי וידאו מובנים ותרשימי זרימה לאינפוגרפיקות בעברית, תוך שמירה על המושגים האקדמיים באנגלית.

### הנחיה גלובלית חשובה:
בכל הפרומפטים המפיקים פלט בעברית (צ'אט סקירת וידאו וצ'אט אינפוגרפיקה), הוכנסה הנחיה מפורשת ל-AI **לא לתרגם מושגים אקדמיים וגנטיים לעברית** (למשל: להשאיר *phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, microarray, WGS, STR, SNP* באנגלית בתוך הטקסט העברי).

---

## תוכן העניינים

- [פרק 1: מבוא לגנאלוגיה גנטית ו־FIGG](#פרק-1-מבוא-לגנאלוגיה-גנטית-ו-figg)
- [פרק 2: שונות גנטית אנושית ומבנה אוכלוסיות](#פרק-2-שונות-גנטית-אנושית-ומבנה-אוכלוסיות)
- [פרק 3: תשתית טכנולוגית לנתוני גנאלוגיה](#פרק-3-תשתית-טכנולוגית-לנתוני-גנאלוגיה)
- [פרק 4: IBD והסקת קרבה](#פרק-4-ibd-והסקת-קרבה)
- [פרק 5: מגבלות חישוביות ואוכלוסייתיות](#פרק-5-מגבלות-חישוביות-ואוכלוסייתיות)
- [פרק 6: מסדי נתונים גנאלוגיים וחיפוש קרובים](#פרק-6-מסדי-נתונים-גנאלוגיים-וחיפוש-קרובים)
- [פרק 7: יישומים אזרחיים של גנאלוגיה גנטית](#פרק-7-יישומים-אזרחיים-של-גנאלוגיה-גנטית)
- [פרק 8: זיהוי נעדרים, שרידים ו־DVI](#פרק-8-זיהוי-נעדרים-שרידים-ו-dvi)
- [פרק 9: FIGG במעבדה הפורנזית](#פרק-9-figg-במעבדה-הפורנזית)
- [פרק 10: FIGG כתהליך חקירתי](#פרק-10-figg-כתהליך-חקירתי)
- [פרק 11: תיאורי מקרה מרכזיים](#פרק-11-תיאורי-מקרה-מרכזיים)
- [פרק 12: מגבלות, כשלים ומבט מסכם](#פרק-12-מגבלות-כשלים-ומבט-מסכם)
- [פרק 13: היבטים משפטיים ואתיים של FIGG](#פרק-13-היבטים-משפטיים-ואתיים-של-figg)
- [פרק 14: FIGG במשטרות בעולם](#פרק-14-figg-במשטרות-בעולם)
- [פרק 15: תקנים, בקרה ואבטחת איכות ב־FIGG](#פרק-15-תקנים-בקרה-ואבטחת-איכות-ב-figg)

---

## פרק 1: מבוא לגנאלוגיה גנטית ו־FIGG

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes, greeting clichés, or filler banter. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 1" instead of citing papers. Keep all technical terms in their standard English forms (e.g. FIGG, STR, SNP, pedigree).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers the introduction to Forensic Investigative Genetic Genealogy, summarizing Chapter 1 of the FIGG Course Book."
2. Key Concepts: Briefly explain:
   - The shift from traditional genealogy to genetic datasets.
   - The difference between pedigree kinship, familial STR search, and FIGG.
   - DNA acting as a "searching tool" in FIGG.
3. Misconception Buster: Debunk the student belief that a FIGG database match is a final suspect identification. Explain clearly that a database relative match is ONLY an investigative lead, and direct STR testing of the suspect is mandatory before arrest.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as an expert instructional designer and video producer. Based on the uploaded chapter, write a detailed 5-minute video review script in Hebrew for 3rd-year science undergraduate students.
The script must be structured in a two-column table:
- Column 1: Visual Storyboard Directions (Describe on-screen slide titles, charts, animation flow, and visual transitions).
- Column 2: Narration (Hebrew) (Write the exact narrator dialogue/voiceover in a professional, academic, and engaging Hebrew tone).
Ensure the video covers:
- The conceptual shift from STR-based direct matching to SNP-based distant relative searching.
- The workflow mapping from crime scene sample -> database query -> tree building -> STR confirmation.
- The legal and scientific distinction between a "lead" and a "proof".
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, generate a detailed content outline and structural layout in Hebrew for an infographic illustrating "The Step-by-Step FIGG Workflow vs. Traditional DNA Profiling."
For each step, provide:
1. Step Title in Hebrew (keep technical terms in English).
2. Exact Hebrew copy describing the technical action (from initial SNP genotyping to database relative search, reverse tree triangulation, and final STR confirmatory test).
3. Visual representation instructions (e.g., "Illustrate a split flowchart branching into a family pedigree").
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 2: שונות גנטית אנושית ומבנה אוכלוסיות

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two population geneticists delivering an academic lecture on genetic variation. The tone must be strictly academic, highly professional, clinical, and restrained. ZERO outside knowledge. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 2". Keep all technical terms in their standard English forms (e.g. SNPs, LD, haplotype, PCA, ADMIXTURE).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Human Genetic Variation and Population Structure, summarizing Chapter 2 of the FIGG Course Book."
2. Key Concepts: Explain:
   - SNPs, Linkage Disequilibrium (LD), and haplotype blocks.
   - Reference panels (1000 Genomes Project) and baseline allele frequencies.
   - PCA and ADMIXTURE logic.
3. Misconception Buster: Debunk the belief that PCA clusters represent discrete "racial groups." Explain clearly that genetic ancestry is continuous and population structure serves as vital statistical context for relative matching.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as an expert population genetics educator and scriptwriter. Based on the uploaded chapter, write a detailed 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Describe PCA coordinate plots, ADMIXTURE bar charts, and haplotype maps).
- Column 2: Narration (Hebrew) (Write the spoken explanation in Hebrew, maintaining a formal academic style for science undergraduates).
Cover the following topics:
- The molecular definitions of SNPs, LD, and haplotypes.
- How reference databases help us understand allele frequency variation.
- How PCA projects genetic markers into clusters, and how ADMIXTURE decomposes a genome into ancestral components.
- Why genetic ancestry is a continuous biological variable rather than a discrete category.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design a content outline in Hebrew for an infographic illustrating "Visualizing PCA Clustering and ADMIXTURE Bar Charts."
The layout should contain:
- Block 1: From Haplotype blocks to SNP grid.
- Block 2: How PCA reduces genetic dimensionality (visualize x/y axis plotting sample clusters).
- Block 3: ADMIXTURE bar chart breakdown (color-coded genetic proportions).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 3: תשתית טכנולוגית לנתוני גנאלוגיה

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 3". Keep all technical terms in English (e.g. microarray, WGS, phasing, imputation).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers the Technological Infrastructure for Genetic Genealogy, summarizing Chapter 3 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Why dense SNPs are required for genealogy instead of standard STR bands.
   - SNP Microarrays, Whole-Genome Sequencing (WGS), and targeted panels.
   - Phasing and Imputation.
3. Misconception Buster: Debunk the belief that phasing (separating maternal and paternal alleles) requires DNA from both parents. Explain that population-scale databases allow algorithms to run long-range phasing.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as an instructional designer in bioinformatics. Based on the uploaded chapter, generate a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show sequencing read alignments, phasing of heterozygous loci, and imputation tables filling in blanks).
- Column 2: Narration (Hebrew) (Write the voiceover script in Hebrew, explaining complex database files, variant calling, and formatting).
Ensure the narrator explains:
- The structural difference between STR and SNP markers in resolution.
- The laboratory workflows of microarrays vs. WGS.
- The mathematical importance of long-range phasing in identifying shared haplotypes.
- Imputation and data format matching.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design an infographic structure in Hebrew illustrating "The Phasing and Imputation Pipeline for SNP Arrays."
Outline the step-by-step pipeline:
- Step 1: Raw Unphased Genotype data (alleles at heterozygous sites are disordered).
- Step 2: Haplotype Phasing (aligning maternal and paternal sets using long-range reference panels).
- Step 3: Imputation (predicting missing SNPs based on linkage disequilibrium databases).
- Step 4: Final aligned profile (phased, filled, ready for database upload).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 4: IBD והסקת קרבה

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 4". Keep all technical terms in English (e.g. IBD, IBS, cM, recombination, ERSA).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Identity by Descent and Kinship Inference, summarizing Chapter 4 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Recombination in meiosis causing IBD segment decay over generations.
   - The centiMorgan (cM) unit.
   - How algorithms like ERSA use shared cM to predict relationships.
3. Misconception Buster: Debunk the confusion between Identity by State (IBS) and Identity by Descent (IBD). Explain that IBS segments are identical by chance and carry no genealogical signal, whereas IBD segments are inherited from a common ancestor.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a genetics lecturer. Based on the uploaded chapter, write a 5-minute video review script in Hebrew explaining IBD and relatedness.
Structure the script in a two-column table:
- Column 1: Visual Directions (Recombination diagrams, chromosomes crossing over, and charts showing segment length decay).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, defining cM, IBD0/IBD1/IBD2 states, and kinship coefficients).
Make sure to explain:
- Why shared segments shorten with each generation.
- The difference between IBS (chance sharing) and IBD (common ancestor sharing).
- How ERSA estimates relationship boundaries and the drop-off in accuracy beyond 3rd-4th cousins.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, generate an infographic layout in Hebrew titled "Meiosis, Recombination, and the Decay of IBD Segments."
Outline a visual process showing:
- Visual Block 1: Recombination in Meiosis (maternal and paternal chromosomes exchanging segments).
- Visual Block 2: 1st Degree Relative Sharing (large, continuous shared blocks).
- Visual Block 3: 3rd-5th Degree Relative Sharing (small, fragmented blocks dispersed across chromosomes).
- Visual Block 4: IBS vs. IBD comparison (identical alleles by state vs. identical haplotypes by descent).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 5: מגבלות חישוביות ואוכלוסייתיות

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 5". Keep all technical terms in English (e.g. background sharing, cryptic relatedness, endogamy, REAP, PC-Relate).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Computational and Population Limitations, summarizing Chapter 5 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - The definitions of background sharing, cryptic relatedness, and endogamy.
   - How demographic factors distort predictions.
   - Adjustments like REAP and PC-Relate.
3. Misconception Buster: Debunk the belief that a large shared cM segment always indicates a close, recent relationship. Explain that in endogamous communities, cryptic relatedness inflates shared cM values, masking actual pedigree distance.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as an advanced population genetics instructor. Based on the uploaded chapter, write a 5-minute video review script in Hebrew explaining demographic limitations in genetic matching.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show closed community trees, overlapping inheritance loops, and the PC-Relate matrix adjustments).
- Column 2: Narration (Hebrew) (Write the script in Hebrew, detailing endogamy, founder effects, and REAP adjustments).
Ensure the narrator covers:
- Why shared cM charts are inaccurate in endogamous groups (e.g. Ashkenazi Jewish, island populations).
- The definition of cryptic relatedness.
- How software models adjust calculations based on local ancestry to uncover true relatedness.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design an infographic structure in Hebrew illustrating "Relatedness Calculation Distortion: Panmixia vs. Endogamy."
The layout should contain:
- Left Column: Panmictic Population (clean recombination, linear pedigree, expected shared cM).
- Right Column: Endogamous Population (repeated marriages within a closed gene pool, multiple loops, falsely inflated shared cM).
- Bottom Panel: The Correction Pipeline (running PC-Relate to factor in population covariance and outputting adjusted cM levels).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 6: מסדי נתונים גנאלוגיים וחיפוש קרובים

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 6". Keep all technical terms in English (e.g. CODIS, SNP database, match list, cM).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Genealogical Databases and Relative Search, summarizing Chapter 6 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Differences between CODIS (direct STR matching) and consumer databases (relative SNP matching).
   - The 2% database coverage threshold (Erlich et al.) for finding a 3rd cousin.
   - Reducing the search space using age, gender, and geography.
3. Misconception Buster: Debunk the idea that law enforcement can query any user's profile directly. Explain that platforms enforce terms of service (TOS) and require explicit opt-in/opt-out preferences from users.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic science educator. Based on the uploaded chapter, write a 5-minute video review script in Hebrew explaining genealogical databases and search dynamics.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Venn diagrams showing database scale, filtering flows, and match list user interfaces).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, detailing the 2% database coverage theory, match lists, and demographic filters).
Cover:
- The distinction between CODIS (direct matching) and consumer databases (relative matching).
- How a database of 1.28 million profiles can cover nearly an entire population via 3rd-cousin relationships.
- The step-by-step reduction of a candidate pool from ~850 down to a single-digit group using age and location.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, create a flowchart infographic design in Hebrew showing "Erlich's Database Search Space Reduction Flow."
Illustrate the sequential process:
- Step 1: Database Query (Upload target profile to FTDNA/GEDmatch).
- Step 2: The 3rd Cousin Match (Finding a match with ~100 shared cM).
- Step 3: Candidate Pool Generation (Identifying ~850 genealogical candidates based on tree reconstruction).
- Step 4: Demographic Filtering (Excluding candidates by age, gender, and geographical tracking).
- Step 5: Final Target Pool (Reducing to ~16-17 candidates for physical confirmatory testing).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 7: יישומים אזרחיים של גנאלוגיה גנטית

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 7". Keep all technical terms in English (e.g. ancestry, adoption search, donor tracing, NPE).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers the Civil Applications of Genetic Genealogy, summarizing Chapter 7 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Ancestry, adoption search, donor tracing, and Non-Paternity Events (NPE).
   - How databases disrupt family secrets.
3. Misconception Buster: Debunk the idea that donor anonymity can still be protected by sperm or egg banks. Explain how consumer relative-matching databases automatically bypass donor anonymity through genetic triangulation.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a bioethics educator. Based on the uploaded chapter, generate a 5-minute video review script in Hebrew explaining civil applications of genetic testing.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Pedigree charts showing biological vs. legal parentage, consumer DNA kit displays).
- Column 2: Narration (Hebrew) (Write the dialogue in Hebrew, explaining ancestry, adoption searches, and donor conception).
Ensure the narrator covers:
- How direct-to-consumer genetic testing has altered the landscape of adoption and donor anonymity.
- The definition of NPEs (Non-Paternity Events).
- The ethical conflicts surrounding genetic disclosures and privacy within family networks.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 8: זיהוי נעדרים, שרידים ו־DVI

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 8". Keep all technical terms in English (e.g. pedigree matching, likelihood ratio, DVI, STR, SNP).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Missing Persons, Skeletal Remains, and DVI, summarizing Chapter 8 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Pedigree matching and likelihood ratios (LR).
   - ICMP reference matching vs. FIGG database searches.
   - ISFG DVI recommendations.
3. Misconception Buster: Debunk the confusion between standard "familial searching" (searching national offender databases for close relatives using STRs) and "FIGG" (searching open consumer databases using SNPs).
4. Outro: End the episode immediately after the final takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a humanitarian forensics instructor. Based on the uploaded chapter, write a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show disaster identification flows, bone DNA extraction diagrams, and likelihood ratio calculations).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, explaining pedigree matching, likelihood ratios, and DVI protocols).
Cover the following:
- How direct reference profiles differ from family-reference profiles.
- The ISFG guidelines on using DNA as a primary identifier in DVI.
- How SNP profiling enables identification when only distant relatives are available.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, write an infographic content layout in Hebrew comparing "ICMP Family Reference Matching vs. FIGG Open Database Search."
Structure the comparison:
- Left Panel (ICMP/DVI model): Focus on closed reference database (gathering DNA from first-degree relatives of missing persons) -> Computing Likelihood Ratios (LR) -> Direct Identification.
- Right Panel (FIGG model): Focus on degraded bones -> Generating SNP profiles -> Searching open consumer databases -> Triangulation and reverse tree reconstruction -> STR confirmatory testing.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 9: FIGG במעבדה הפורנזית

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 9". Keep all technical terms in English (e.g. microarray, WGS, ForenSeq Kintelligence, call rate, heterozygosity, concordance).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers FIGG in the Forensic Laboratory, summarizing Chapter 9 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Why STR profiles are incompatible with genealogical databases, necessitating SNP arrays or sequencing.
   - Microarrays vs. WGS vs. Targeted panels (ForenSeq Kintelligence).
   - QC metrics: Call Rate, Heterozygosity, and Concordance.
3. Misconception Buster: Debunk the assumption that microarrays are the default choice for all forensic samples. Explain that degraded, low-template, or contaminated DNA often fails microarray call rates, making WGS or targeted sequencing panels necessary.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic laboratory educator. Based on the uploaded chapter, generate a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Show laboratory microchips, sequencer runs, DNA degradation curves, and call rate tables).
- Column 2: Narration (Hebrew) (Write the script in Hebrew, detailing the transition from STR to SNP, microarray vs. WGS, and lab QC metrics).
Ensure the narrator explains:
- Why microarrays require high-quality DNA, while WGS and targeted panels are better suited for degraded samples.
- The meaning of Call Rate, Concordance, and Heterozygosity in validating profiles.
- The validation process for importing SNP data into genealogical systems.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design a flowchart infographic in Hebrew titled "Forensic Lab SNP Technology Selection and Quality Validation Pipeline."
Map the decision-making pipeline:
- Stage 1: Sample Assessment (Testing DNA quantity, degradation index, and contamination levels).
- Stage 2: Tech Selection (Route A: High-quality DNA -> Microarray/WGS; Route B: Degraded DNA -> Targeted SNP panel).
- Stage 3: Quality Checkpoint (Measuring Call Rate > 95%, Concordance > 99%, and standard Heterozygosity levels).
- Stage 4: Variant Formatting (Generating formatted files ready for upload).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 10: FIGG כתהליך חקירתי

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 10". Keep all technical terms in English (e.g. match list, clustering, triangulation, MRCA, reverse genealogy, target testing).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers FIGG as an Investigative Process, summarizing Chapter 10 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Match list analysis and clustering.
   - Triangulation to locate MRCAs.
   - Reverse Genealogy (ascending and descending).
3. Misconception Buster: Debunk the idea that a database match is the suspect. Explain that the database match is just a distant relative (e.g. 3rd cousin), and the actual suspect is identified only after extensive reverse genealogy research and direct STR confirmation.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic genealogy training coordinator. Based on the uploaded chapter, write a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show branching family trees, highlighted matching pairs, census documents, and target testing strategies).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, explaining match clustering, triangulation, and reverse genealogy).
Cover:
- The triangulation process (identifying a shared ancestor couple from two matches).
- The ascending and descending methods of genealogy.
- The role of documentary evidence (birth, marriage, and death records) in narrowing down candidate profiles.
- Confirming the lead via direct STR profiling.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design a flowchart infographic in Hebrew titled "The Reverse Genealogy and Triangulation Process."
Draw a step-by-step flowchart:
- Step 1: Match Clustering: Identifying shared match groups A & B.
- Step 2: Ascending Research: Building trees upward to locate the common ancestor couple (MRCA).
- Step 3: Descending Research: Building trees downward, mapping all descendants of the MRCA.
- Step 4: Intersecting Trees: Finding the intersection of paternal and maternal trees.
- Step 5: Narrowing Candidates: Filtering by age, gender, and geography to identify the target subject.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 11: תיאורי מקרה מרכזיים

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 11". Keep all technical terms in English (e.g. WGS, database, triangulation, STR, registry).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Key Case Studies in FIGG, summarizing Chapter 11 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - The Linköping double murder case resolution.
   - The Ekeby skeletal remains case.
   - The Norwegian pilot reports.
3. Misconception Buster: Debunk the belief that cold cases are solved by DNA matching alone. Highlight that without complete civil registries, birth/death records, and archival databases, genetic matching cannot lead to an identification.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic casework educator. Based on the uploaded chapter, generate a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Casework timelines, Swedish and Norwegian maps, police investigation logs, and laboratory profiles).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, detailing Linköping, Ekeby, and the Norwegian pilot studies).
Ensure the narrator covers:
- The investigative steps taken in Linköping to identify the double homicide suspect.
- How skeletal remains in Ekeby were processed using WGS to enable matches.
- The lessons of Norwegian case files: Why having high-quality DNA is not enough if national registries are incomplete.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design an infographic timeline in Hebrew mapping "The Linköping Double Murder Case Resolution Workflow."
Map the chronological process:
- Phase 1: Cold Case (Homicide in 2004, STR profiling fails to find database match).
- Phase 2: Tech Transition (WGS sequence generated from crime scene DNA in 2019).
- Phase 3: Database Query & Matching (Uploading SNP data to GEDmatch/FTDNA, obtaining matches).
- Phase 4: Pedigree Triangulation (Reverse genealogy identifies candidate brothers).
- Phase 5: Confirmatory Phase (Collecting discard DNA, STR comparison, positive identification, and conviction in 2020).
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 12: מגבלות, כשלים ומבט מסכם

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 12". Keep all technical terms in English (e.g. low-template, variant calling, false heterozygote, kinship coefficient, mixture).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Limitations, Failures, and Summary of the FIGG Pipeline, summarizing Chapter 12 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Degraded, low-template, or contaminated DNA impact.
   - Genotyping errors (false heterozygotes) and kinship distortion.
   - Mixed profiles and distant matching boundaries.
3. Misconception Buster: Debunk the myth that DNA sequencing is 100% error-free in casework. Explain how false heterozygous variant calls in degraded samples can artificially inflate relationship coefficients.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic quality assurance trainer. Based on the uploaded chapter, write a 5-minute video review script in Hebrew explaining the limits and failures of FIGG.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Illustrate degraded DNA profiles, false match alerts on databases, and DNA mixture peaks).
- Column 2: Narration (Hebrew) (Write the script in Hebrew, detailing genotyping errors, and demographic background noise).
Cover the following topics:
- How poor sample quality leads to genotype dropouts.
- How endogamous population structures create false-positive matching alerts.
- The biological limits of database search arrays.
- Why the chain of validation is critical.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, create an infographic in Hebrew showing "The Vulnerability Points in the FIGG Pipeline."
Highlight the potential fail points:
- Sample Level: Degraded/mixed DNA -> False variant calls.
- Algorithmic Level: Genotyping errors -> Inflated relationships.
- Demographic Level: Endogamy/Admixture -> Cryptic relatedness biases.
- Database Level: Missing records/non-cooperating relatives -> Broken trees.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 13: היבטים משפטיים ואתיים של FIGG

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 13". Keep all technical terms in English (e.g. family privacy, TOS, informed consent, mission creep, proportionality, last resort).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Legal and Ethical Aspects of FIGG, summarizing Chapter 13 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Genetic privacy as family privacy.
   - TOS agreement vs. informed consent.
   - Proportionality, last resort, and oversight.
3. Misconception Buster: Debunk the belief that public safety always overrides genetic privacy in law enforcement work. Discuss the legal limits of proportionality and explain why searching relative databases requires judicial oversight and strict criteria.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic law educator. Based on the uploaded chapter, write a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show privacy icons, warrant documents, terms of service checkboxes, and oversight boards).
- Column 2: Narration (Hebrew) (Write the spoken script in Hebrew, detailing genetic privacy, informed consent, and proportionality).
Ensure the narrator covers:
- Why using a person's DNA to find their cousin raises family privacy concerns.
- The differences in database policies (GEDmatch vs. commercial databases).
- The legal framework of "last resort" and "proportionality" in policing.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Based on the uploaded chapter, design an ethical decision-tree infographic in Hebrew titled "The Proportionality and Legal Compliance Decision Tree for FIGG."
Structure the flowchart:
- Question 1: Is the offense a violent crime (homicide/rape)?
- Question 2: Have traditional DNA database searches (CODIS/STR) failed to produce a match? (Last Resort Check).
- Question 3: Does the chosen database allow law enforcement upload in its TOS? (Consent Check).
- Question 4: Is there judicial oversight/warrant approval? (Legal Check).
- Outcome: FIGG approved / Denied.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 14: FIGG במשטרות בעולם

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 14". Keep all technical terms in English (e.g. US model, Sweden model, Norway model, genomics, genealogy, governance).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers FIGG in Police Forces Worldwide, summarizing Chapter 14 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - The US model: private sector databases, DOJ guidelines.
   - The Swedish model: statutory codification (July 1, 2025).
   - The Norwegian model: centralized, public sector collaboration.
3. Misconception Buster: Debunk the assumption that there is a single global model for FIGG policing. Compare the decentralized, private-sector-led US approach with the strictly regulated public-sector models in Sweden and Norway.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a public policy instructor. Based on the uploaded chapter, generate a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: Visual Directions (Show a world map comparing the US, Sweden, and Norway, icons of private labs vs. state registries, and law symbols).
- Column 2: Narration (Hebrew) (Write the script in Hebrew, comparing the US, Swedish, and Norwegian systems).
Cover:
- The decentralized US approach and the DOJ guidelines.
- The legislative changes in Sweden that codified the use of FIGG.
- The Norwegian pilot project's focus on national archives and public safety limits.
- The balance between genomics, genealogy, and governance.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

---

## פרק 15: תקנים, בקרה ואבטחת איכות ב־FIGG

### 1. הנחיית התאמה לסקירה קולית (Audio Overview Customization Prompt)
*העתק והדבק בתיבת ה-Customize של ה-Audio Overview לפני יצירת השמע:*
```text
[Section A: Critical Source & Time Constraints]
Base this discussion EXCLUSIVELY on the provided document. You MUST finish the entire conversation in UNDER 5 MINUTES.

[Section B: Tone & Critical Constraints]
Act as two expert course Teaching Assistants (TAs) summarizing the weekly lesson for 3rd-year science undergraduate students. Keep the tone supportive, pedagogically clear, and scientifically rigorous. Avoid casual podcast jokes. Discuss ONLY the facts in the text.
NO generic podcast banter. Do NOT use phrases like "deep dive", "buckle up", "mind-blowing", "hey everyone", "exciting new findings", or "in this episode". Refer to "this lesson" or "Chapter 15". Keep all technical terms in English (e.g. validation, QC, SOP, accreditation, confirmatory testing).

[Section C: Episode Structure & Pacing]
1. Intro: Start with: "Today's briefing covers Standards, Control, and Quality Assurance in FIGG, summarizing Chapter 15 of the FIGG Course Book."
2. Key Concepts: Discuss:
   - Developmental vs. internal validation.
   - QC thresholds (heterozygosity, call rate).
   - SOPs, proficiency testing, and accreditation.
3. Misconception Buster: Debunk the belief that an expert genealogist's family tree alone is sufficient for a criminal indictment. Remind students that the pedigree is only an investigative lead, and standard lab verification is required before any arrest.
4. Outro: End the episode immediately after the takeaway.
```

### 2. פרומפט צ'אט לסקירת וידאו (Video Review Chat Prompt)
*העתק והדבק בחלון הצ'אט של NotebookLM:*
```text
Act as a forensic quality assurance educator. Based on the uploaded chapter, write a 5-minute video review script in Hebrew.
Structure the script in a two-column table:
- Column 1: On-Screen Visuals (Show validation logs, validation curve graphs, laboratory SOP manuals, and proficiency testing schedules).
- Column 2: Narration (Hebrew) (Write the script in Hebrew, explaining developmental vs. internal validation, QC parameters, and accreditation).
Ensure the narrator explains:
- The validation stages required to implement microarrays and WGS in routine casework.
- Why standard Operating Procedures (SOPs) are mandatory.
- The legal requirement of confirmatory STR testing before arrests.
- The role of laboratory accreditation in establishing credibility in court.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```

### 3. פרומפט צ'אט ליצירת אינפוגרפיקה (Central Process Infographic Prompt)
```text
Based on the uploaded chapter, write an infographic flow layout in Hebrew mapping the "Steps to Achieve Forensic Validation and Quality Control for FIGG."
Create a workflow flowchart:
- Step 1: Developmental Validation (manufacturer specifications).
- Step 2: Internal Validation (lab-specific parameters, testing known control samples).
- Step 3: Setting SOPs (Standard Operating Procedures for extraction, variant calling, and upload).
- Step 4: Proficiency Testing & Training (genealogist certification).
- Step 5: Confirmatory Verification Loop (mandatory independent STR confirmation before arrest).
Provide detailed Hebrew text, QA badges, and flowchart layout indicators.
Note: Do not translate academic, genetic, and genomic concepts (such as phasing, imputation, cryptic relatedness, triangulation, cM, IBD, IBS, PCA, ADMIXTURE, WGS, STR, SNP) into Hebrew. Keep these terms in English within the Hebrew text.
```
