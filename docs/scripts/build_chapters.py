import os
import json
import re
import markdown
import cloudinary
import cloudinary.search

# Cloudinary configuration using your verified API keys
cloudinary.config(
    cloud_name='mazap-cast',
    api_key='953847344213348',
    api_secret='-4BYRnf2hM9HkHBUv5RGOnP9CRY'
)

# Helper to normalize file names for Cloudinary matching
def normalize_name(name):
    name = os.path.splitext(name)[0]
    name = re.sub(r'_[a-z0-9]{6}$', '', name) # strip Cloudinary suffix
    # Keep only Hebrew letters, English letters, and digits (strip underscores, punctuation, spaces, maqaf)
    name = re.sub(r'[^0-9a-zA-Z\u05d0-\u05ea]', '', name)
    return name.lower()

# Manual overrides for files that have different names in local vs Cloudinary
manual_overrides = {
    "מהפכתהגנאלוגיהוfigg": "מבואלגנאלוגיהגנטיתוfigg"
}

cloudinary_map = {}
try:
    print("Fetching assets list from Cloudinary...")
    res = cloudinary.Search().expression('resource_type:image OR resource_type:video').max_results(500).execute()
    for asset in res.get('resources', []):
        norm = normalize_name(asset['public_id'])
        cloudinary_map[norm] = asset['secure_url']
    print(f"Successfully loaded {len(cloudinary_map)} Cloudinary resources.")
except Exception as e:
    print(f"Warning: Cloudinary fetch failed (using local paths instead): {e}")

# Find directories relative to this script to prevent Windows encoding path issues
script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.abspath(os.path.join(script_dir, "..", ".."))
chapters_dir = os.path.join(base_dir, "פרקים")
output_dir = os.path.join(base_dir, "docs", "data")
os.makedirs(output_dir, exist_ok=True)

# Ordered chapters according to syllabus & user requests
ordered_files = [
    ("chapter_1", "פרק_1_מבוא_לגנאלוגיה_גנטית_ו_FIGG.md", 1),
    ("chapter_2", "פרק_2_שונות_גנטית_אנושית_ומבנה_אוכלוסיות.md", 2),
    ("chapter_3", "פרק_3_תשתית_טכנולוגית_לנתוני_גנאלוגיה.md", 3),
    ("chapter_4", "פרק_4_IBD_והסקת_קרבה.md", 4),
    ("chapter_5", "פרק_5_מגבלות_חישוביות_ואוכלוסייתיות.md", 5),
    ("chapter_6", "פרק_6_מסדי_נתונים_גנאלוגיים_וחיפוש_קרובים.md", 6),
    ("chapter_7", "פרק_7_יישומים_אזרחיים_של_גנאלוגיה_גנטית.md", 7),
    ("chapter_8", "פרק_8_זיהוי_נעדרים_שרידים_ו_DVI.md", 8),
    ("chapter_9", "פרק_9_FIGG_במעבדה_הפורנזית.md", 9),
    ("chapter_10", "פרק_10_FIGG_כתהליך_חקירתי.md", 10),
    ("chapter_11", "פרק_11_תיאורי_מקרה_מרכזיים.md", 11),
    ("chapter_12", "פרק_12_מגבלות_כשלים_ומבט_מסכם.md", 12),
    ("chapter_13", "פרק_13_היבטים_משפטיים_ואתיים_של_FIGG.md", 13),
    ("chapter_14", "פרק_14_FIGG_במשטרות_בעולם.md", 14),
    ("chapter_15", "פרק_15_תקנים_בקרה_ואבטחת_איכות_ב_FIGG.md", 15),
    ("key_articles", "מאמרים_מרכזיים.md", 16)
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s\u0590-\u05fe-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def wrap_ltr_in_html(html_content):
    # Splits HTML by tags to apply LTR only to text nodes, keeping tags unmodified
    tokens = re.split(r'(<[^>]+>)', html_content)
    new_tokens = []
    for token in tokens:
        if token.startswith('<') and token.endswith('>'):
            new_tokens.append(token)
        else:
            # 1. Extract citations and replace with non-alphabetic placeholders
            citations = []
            def save_citation(match):
                idx = len(citations)
                ref_num = match.group(1)
                citations.append(f'<a class="citation-badge" data-ref="{ref_num}">[{ref_num}]</a>')
                return f"⚿{idx}⚿"
            
            # Match bracketed numeric citations (only digits like [1] to avoid linking concepts like [IBD])
            token = re.sub(r'\\?\[([0-9]+)\\?\]', save_citation, token)
            
            # 2. Match English words/phrases (at least one letter)
            pattern = r'\b[a-zA-Z0-9_®%\\\-\/]+(?:\s+[a-zA-Z0-9_®%\\\-\/]+)*\b'
            def replace_eng(match):
                word = match.group(0)
                if not any(c.isalpha() for c in word):
                    return word
                return f'<span dir="ltr">{word}</span>'
            
            token = re.sub(pattern, replace_eng, token)
            
            # 3. Restore citations with proper LTR wrapping
            for idx, cit in enumerate(citations):
                token = token.replace(f"⚿{idx}⚿", f'<span dir="ltr">{cit}</span>')
                
            new_tokens.append(token)
    return "".join(new_tokens)

def parse_markdown_to_sections(md_text):
    md_text = md_text.replace('\r\n', '\n')
    lines = md_text.split('\n')
    
    # Extract Title (H1)
    title = ""
    for line in lines:
        if line.strip().startswith('# '):
            title = line.strip()[2:].strip()
            break
            
    # Segment into sections by H2 headings
    sections = []
    current_heading = ""
    current_content = []
    
    for line in lines:
        if line.strip().startswith('## '):
            if current_content or current_heading:
                sections.append((current_heading, '\n'.join(current_content)))
            current_heading = line.strip()[3:].strip()
            current_content = []
        else:
            current_content.append(line)
            
    if current_content or current_heading:
        sections.append((current_heading, '\n'.join(current_content)))
        
    return title, sections

def parse_objectives(md_text):
    # Extract list bullet points underObjectives H2
    bullets = []
    lines = md_text.split('\n')
    for line in lines:
        line_stripped = line.strip()
        if line_stripped.startswith('- ') or line_stripped.startswith('* '):
            bullets.append(wrap_ltr_in_html(line_stripped[2:]))
    return bullets

def parse_concept_boxes(md_text, chapter_num, chapter_title):
    # Extracts concepts defined by ### Concept Name
    concepts = []
    blocks = md_text.split('### ')
    for block in blocks[1:]:
        lines = block.strip().split('\n')
        if not lines:
            continue
        concept_name = lines[0].strip()
        definition_md = '\n'.join(lines[1:]).strip()
        
        # Determine if there's an English term, e.g., "Kinship analysis" or "FIGG"
        # We can extract it for secondary rendering
        english_term = ""
        eng_match = re.search(r'([a-zA-Z][a-zA-Z0-9\s\-/]+)', concept_name)
        if eng_match:
            english_term = eng_match.group(1).strip()
            
        concepts.append({
            "concept": concept_name,
            "english_term": english_term,
            "definition": definition_md,
            "definition_html": wrap_ltr_in_html(markdown.markdown(definition_md)),
            "chapter_num": chapter_num,
            "chapter_title": chapter_title
        })
    return concepts

chapters_data = [
    {
        "id": "home",
        "original_chapter_number": 0,
        "title": "דף הבית",
        "is_home": True,
        "learning_objectives": [],
        "objectives_html": "",
        "intro_html": "",
        "summary_html": "",
        "content_html": "",
        "details_html": "",
        "concept_boxes": [],
        "concept_box_html": "",
        "further_reading_html": "",
        "references_html": "",
        "media": [],
        "order": 0
    }
]
global_concepts = []
chapter_details = []

for ch_id, ch_file, num in ordered_files:
    file_path = os.path.join(chapters_dir, ch_file)
    print(f"Parsing: {ch_file}")
    
    if not os.path.exists(file_path):
        print(f"Error: {ch_file} does not exist!")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    title, sections = parse_markdown_to_sections(content)
    if not title:
        title = ch_file.replace('.md', '').replace('_', ' ')
    if ch_id == "key_articles":
        title = "מקורות"
        
    # Standard clean HTML of the entire markdown for fallback search / non-modular views
    # Filter out Undermind watermark
    cleaned_lines = [line for line in content.split('\n') if "Undermind" not in line and "undermind.ai" not in line]
    full_html = wrap_ltr_in_html(markdown.markdown('\n'.join(cleaned_lines), extensions=['tables']))
    
    # Placeholders for sections
    objectives_html = ""
    learning_objectives = []
    intro_html = ""
    summary_html = ""
    concept_box_html = ""
    concept_boxes = []
    further_reading_html = ""
    references_html = ""
    details_list = []
    
    # Process sections if it's a regular chapter (1-15)
    # The Syllabus (0) and Key Articles (16) render entirely in content_html without collapsing details
    is_regular_chapter = (num >= 1 and num <= 15)
    
    if is_regular_chapter:
        for heading, sect_md in sections:
            # Clean watermark
            sect_md = '\n'.join([line for line in sect_md.split('\n') if "Undermind" not in line and "undermind.ai" not in line])
            
            # Match heading types
            heading_clean = heading.replace('־', '-').strip()
            
            if "מטרות הפרק" in heading_clean:
                learning_objectives = parse_objectives(sect_md)
                objectives_html = wrap_ltr_in_html(markdown.markdown(sect_md))
            elif "מבוא" in heading_clean:
                intro_html = wrap_ltr_in_html(markdown.markdown(sect_md))
            elif "סיכום" in heading_clean:
                summary_html = wrap_ltr_in_html(markdown.markdown(sect_md))
            elif "תיבת מושגים" in heading_clean or "מושגים" in heading_clean:
                concept_box_html = wrap_ltr_in_html(markdown.markdown(sect_md))
                concept_boxes = parse_concept_boxes(sect_md, num, title)
                global_concepts.extend(concept_boxes)
            elif "References" in heading_clean:
                references_html = wrap_ltr_in_html(markdown.markdown(sect_md))
            elif "קריאה להעמקה" in heading_clean or "העמקה" in heading_clean:
                further_reading_html = wrap_ltr_in_html(markdown.markdown(sect_md))
            elif heading_clean == "Table of Contents" or heading_clean == "":
                # Skip Table of Contents
                continue
            else:
                # Core technical deep dives go here
                details_list.append(f"<h2 id='{slugify(heading)}'>{heading}</h2>\n" + markdown.markdown(sect_md, extensions=['tables']))
                
        # Combine details
        details_html = wrap_ltr_in_html('\n'.join(details_list))
    else:
        # For syllabus and key articles, everything is in content_html
        details_html = ""
        
    # Dynamic Media mapping: auto-discover files in docs/media/פרק X/
    media = []
    media_chapter_dir = os.path.join(base_dir, "docs", "media", f"פרק {num}")
    if os.path.exists(media_chapter_dir):
        for file_name in os.listdir(media_chapter_dir):
            file_path = os.path.join(media_chapter_dir, file_name)
            if os.path.isfile(file_path):
                ext = os.path.splitext(file_name)[1].lower()
                media_type = None
                if ext in ['.mp4', '.mov', '.avi']:
                    media_type = "video"
                elif ext in ['.m4a', '.mp3', '.wav']:
                    media_type = "audio"
                elif ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg']:
                    media_type = "infographic"
                
                if media_type:
                    # Clean title: replace underscores/dashes with spaces, strip extension
                    clean_title = os.path.splitext(file_name)[0].replace('_', ' ').replace('-', ' ').strip()
                    # Remove starting "פרק X" or digits prefix
                    clean_title = re.sub(r'^פרק\s+\d+\s+-\s+|^פרק\s+\d+\s+|^[0-9]+\s+-\s+|^[0-9]+\s+', '', clean_title)
                    
                    # Normalize local filename for Cloudinary lookup
                    local_norm = normalize_name(file_name)
                    if local_norm in manual_overrides:
                        local_norm = manual_overrides[local_norm]
                        
                    if local_norm in cloudinary_map:
                        src_url = cloudinary_map[local_norm]
                    else:
                        src_url = f"media/פרק {num}/{file_name}"
                    
                    media.append({
                        "type": media_type,
                        "title": clean_title,
                        "src": src_url
                    })
        # Sort media by type: audio first, then video, then infographic
        type_order = {"audio": 1, "video": 2, "infographic": 3}
        media.sort(key=lambda x: (type_order.get(x["type"], 9), x["title"]))
        
    # If it is a regular chapter, collect references and further reading details for the appendix
    if is_regular_chapter:
        chapter_details.append({
            "num": num,
            "title": title,
            "references_html": references_html,
            "further_reading_html": further_reading_html
        })
        
    # If it is the key articles appendix, build the dynamic unified layout
    if num == 16:
        # 1. Navigation buttons grid at the top
        nav_html = """
        <div class="appendix-nav-section" style="margin-bottom: 40px; padding: 24px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; backdrop-filter: blur(10px); box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
          <h3 style="margin-top: 0; margin-bottom: 18px; color: var(--primary-color); font-size: 1.25rem; font-weight: 700; font-family: inherit;">מעבר מהיר למקורות הפרקים:</h3>
          <div class="appendix-nav-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px;">
            <button class="appendix-nav-btn" onclick="scrollToAppendixSection('general')">מאמרים כלליים</button>
        """
        for ch in sorted(chapter_details, key=lambda x: x["num"]):
            if ch["references_html"] or ch["further_reading_html"]:
                nav_html += f'            <button class="appendix-nav-btn" onclick="scrollToAppendixSection({ch["num"]})">פרק {ch["num"]}</button>\n'
        nav_html += """
          </div>
        </div>
        """
        
        # 2. General articles section (originally from מאמרים_מרכזיים.md)
        general_html = f"""
        <div class="appendix-chapter-section" id="appendix-chapter-general" style="margin-bottom: 48px; padding: 28px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--primary-color); border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-top: 0; margin-bottom: 24px; font-size: 1.6rem; font-weight: 700;">מאמרים כלליים ומחקרים מובילים</h2>
          {full_html}
        </div>
        """
        
        # 3. Chapters sections
        chapters_sections_html = ""
        for ch in sorted(chapter_details, key=lambda x: x["num"]):
            if not ch["references_html"] and not ch["further_reading_html"]:
                continue
                
            chapters_sections_html += f"""
            <div class="appendix-chapter-section" id="appendix-chapter-{ch["num"]}" style="margin-bottom: 48px; padding: 28px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; backdrop-filter: blur(10px);">
              <h2 style="color: var(--primary-color); border-bottom: 2px solid var(--border-color); padding-bottom: 12px; margin-top: 0; margin-bottom: 24px; font-size: 1.6rem; font-weight: 700;">פרק {ch["num"]}: {ch["title"]}</h2>
            """
            
            if ch["references_html"]:
                chapters_sections_html += f"""
                <div class="appendix-section-block" style="margin-bottom: 28px;">
                  <h3 style="color: var(--text-primary); font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 6px; height: 18px; background: var(--accent-color); border-radius: 3px;"></span>
                    מאמרי יסוד ומקורות הפרק
                  </h3>
                  <div class="appendix-items-list">
                    {ch["references_html"]}
                  </div>
                </div>
                """
                
            if ch["further_reading_html"]:
                chapters_sections_html += f"""
                <div class="appendix-section-block">
                  <h3 style="color: var(--text-primary); font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 6px; height: 18px; background: var(--primary-color); border-radius: 3px;"></span>
                    מקורות לקריאה נוספת והרחבה
                  </h3>
                  <div class="appendix-items-list">
                    {ch["further_reading_html"]}
                  </div>
                </div>
                """
                
            chapters_sections_html += "</div>"
            
        # Combine everything into full_html for the appendix page
        full_html = f"""
        <h1 style="margin-bottom: 32px;">נספח: מקורות ומאמרים להרחבה</h1>
        {nav_html}
        {general_html}
        {chapters_sections_html}
        """

    chapters_data.append({
        "id": ch_id,
        "original_chapter_number": num,
        "title": title,
        "learning_objectives": learning_objectives,
        "objectives_html": objectives_html,
        "intro_html": intro_html,
        "summary_html": summary_html,
        "content_html": full_html,
        "details_html": details_html,
        "concept_boxes": concept_boxes,
        "concept_box_html": concept_box_html,
        "further_reading_html": "", # Clear from the chapter body
        "references_html": references_html,
        "media": media,
        "order": len(chapters_data)
    })

# Add unified global Glossary (מילון מושגים) at the very end
sorted_concepts = sorted(global_concepts, key=lambda x: x["concept"])
chapters_data.append({
    "id": "glossary",
    "original_chapter_number": 17,
    "title": "מושגי יסוד",
    "is_glossary": True,
    "learning_objectives": [],
    "objectives_html": "",
    "intro_html": "<p>מילון המושגים מרכז את כל תיבות המושגים והגדרותיהן מכל 15 פרקי הקורס בסדר אלפביתי. תוכל להשתמש בשורת החיפוש הפנימית כדי לסנן מונחים.</p>",
    "summary_html": "",
    "content_html": "",
    "details_html": "",
    "concept_boxes": sorted_concepts,
    "concept_box_html": "",
    "further_reading_html": "",
    "references_html": "",
    "media": [],
    "order": len(chapters_data)
})

# Save JSON and JS database files
output_file = os.path.join(output_dir, "chapters.json")
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(chapters_data, f, ensure_ascii=False, indent=2)

output_js_file = os.path.join(output_dir, "chapters.js")
with open(output_js_file, "w", encoding="utf-8") as f:
    f.write("const chaptersData = ")
    json.dump(chapters_data, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"Successfully compiled {len(chapters_data)} chapters (including Glossary and Key Articles) into chapters.json and chapters.js")
