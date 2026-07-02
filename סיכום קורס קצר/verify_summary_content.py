import os
import re
from docx import Document

SUMMARY_DIR = r"C:\Users\nafei\Documents\מופ\סקירות ספרות\FIGG\סיכום קורס קצר"
INPUT_MD = os.path.join(SUMMARY_DIR, "סיכום_מקצועי_בנושא_FIGG.md")
OUTPUT_DOCX = os.path.join(SUMMARY_DIR, "סיכום_מקצועי_בנושא_FIGG.docx")

def clean_text(text):
    # Normalize backslash-escaped brackets
    text = text.replace('\\[', '[').replace('\\]', ']')
    # Clean bold / italic markdown symbols
    text = re.sub(r'\*\*|\*', '', text)
    # Clean up markdown links like [text](url) -> text
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    # Clean heading symbols
    text = re.sub(r'^#+\s+', '', text)
    # Strip spaces
    text = text.strip()
    return text

def main():
    if not os.path.exists(INPUT_MD) or not os.path.exists(OUTPUT_DOCX):
        print("Missing files.")
        return

    # Read markdown lines in main body
    with open(INPUT_MD, "r", encoding="utf-8") as f:
        md_content = f.read()

    md_lines = md_content.split('\n')
    title_count = 0
    md_paragraphs = []
    
    for line in md_lines:
        stripped = line.strip()
        if stripped == "# סיכום מקצועי בנושא FIGG":
            title_count += 1
            if title_count == 2:
                md_paragraphs.append(clean_text(stripped))
            continue
            
        if title_count < 2:
            continue
            
        if not stripped:
            continue
            
        # Ignore horizontal rule markers for text comparison
        if stripped == '---':
            continue
            
        # Remove list markers from md text to match parsed runs
        clean_line = re.sub(r'^[\-\*]\s+', '', stripped)
        clean_line = re.sub(r'^\d+\.\s+', '', clean_line)
        
        md_paragraphs.append(clean_text(clean_line))

    # Read Word document
    doc = Document(OUTPUT_DOCX)
    docx_paragraphs = []
    
    # We find the start of the body paragraphs by tracking title occurrences
    title_occurrences = 0
    
    for p in doc.paragraphs:
        p_text = p.text.strip()
        if not p_text:
            continue
            
        # Skip horizontal line paragraphs
        if p_text.startswith("______________________"):
            continue
            
        if p_text == "סיכום מקצועי בנושא FIGG":
            title_occurrences += 1
            if title_occurrences == 2:
                docx_paragraphs.append(clean_text(p_text))
            continue
            
        if title_occurrences >= 2:
            docx_paragraphs.append(clean_text(p_text))

    print(f"Total markdown body paragraphs parsed: {len(md_paragraphs)}")
    print(f"Total Word body paragraphs parsed: {len(docx_paragraphs)}")

    # Check for mismatches
    mismatches = 0
    max_check = min(len(md_paragraphs), len(docx_paragraphs))
    
    for idx in range(max_check):
        md_p = md_paragraphs[idx]
        docx_p = docx_paragraphs[idx]
        
        if md_p != docx_p:
            print(f"\nMismatch at paragraph {idx + 1}:")
            print(f"MD  : {md_p[:120]}...")
            print(f"DOCX: {docx_p[:120]}...")
            mismatches += 1
            if mismatches > 5:
                print("Too many mismatches, stopping comparison.")
                break

    if len(md_paragraphs) != len(docx_paragraphs):
        print(f"\nWarning: Paragraph counts differ (MD: {len(md_paragraphs)}, DOCX: {len(docx_paragraphs)})")
        mismatches += 1

    if mismatches == 0:
        print("\nSUCCESS: All text content matches word-for-word between MD and Word body paragraphs!")
    else:
        print(f"\nVerification failed with {mismatches} mismatches.")

if __name__ == "__main__":
    main()
