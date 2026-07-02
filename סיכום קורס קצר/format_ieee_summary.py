import os
import re

SUMMARY_DIR = r"C:\Users\nafei\Documents\מופ\סקירות ספרות\FIGG\סיכום קורס קצר"
INPUT_MD = os.path.join(SUMMARY_DIR, "סיכום_מקצועי_בנושא_FIGG.md")

journal_map = {
    "Forensic science international. Genetics": "Forensic Sci. Int. Genet.",
    "Forensic science international": "Forensic Sci. Int.",
    "Annual review of genetics": "Annu. Rev. Genet.",
    "Genome research": "Genome Res.",
    "Science (New York, N.Y.)": "Science",
    "Science": "Science",
    "Forensic Science International: Synergy": "Forensic Sci. Int. Synergy",
    "Nature": "Nature",
    "Nature Reviews. Genetics": "Nat. Rev. Genet.",
    "Nature Reviews Genetics": "Nat. Rev. Genet.",
    "PLoS Genetics": "PLoS Genet.",
    "Human biology": "Hum. Biol.",
    "Nature genetics": "Nat. Genet.",
    "Bioinformatics": "Bioinformatics",
    "PLoS ONE": "PLoS ONE",
    "Journal of Genetic Counseling": "J. Genet. Couns.",
    "Human reproduction": "Hum. Reprod.",
    "Human Reproduction": "Hum. Reprod.",
    "Reproductive biomedicine online": "Reprod. Biomed. Online",
    "Reproductive BioMedicine Online": "Reprod. Biomed. Online",
    "Journal of Forensic Sciences": "J. Forensic Sci.",
    "Forensic Genomics": "Forensic Genomics",
    "International Journal of Legal Medicine": "Int. J. Legal Med.",
    "Journal of Law and the Biosciences": "J. Law Biosci.",
    "BMC Genomics": "BMC Genomics",
    "Forensic Sciences Research": "Forensic Sci. Res.",
    "PLoS Biology": "PLoS Biol.",
    "Annual review of genomics and human genetics": "Annu. Rev. Genomics Hum. Genet.",
    "F&S Reviews": "F&S Rev.",
    "Genes": "Genes",
    "Nature Communications": "Nat. Commun.",
    "BMC Biology": "BMC Biol.",
    "Adoption & Fostering": "Adoption Fostering",
    "American journal of human genetics": "Am. J. Hum. Genet.",
    "Genetics": "Genetics",
    "WIREs Forensic Science": "WIREs Forensic Sci.",
    "bioRxiv": "bioRxiv"
}

def expand_page_range(match):
    start = match.group(1)
    end = match.group(2)
    if len(end) < len(start):
        prefix = start[:-len(end)]
        end = prefix + end
    return f"pp. {start}–{end}"

def format_ieee(ref_text):
    # 1. Replace quotes and move period/comma inside
    ref_text = re.sub(r'[“”"](.*?)[.,]?[“”"]', r'"\1,"', ref_text)
    ref_text = re.sub(r'"([^"]*?)\?"', r'"\1?"', ref_text)
    
    # 2. Journal abbreviation replacement
    for j_orig, j_abbr in journal_map.items():
        pattern = re.compile(re.escape(f"*{j_orig}*"), re.IGNORECASE)
        ref_text = pattern.sub(f"*{j_abbr}*", ref_text)
        
        pattern_no_ital = re.compile(r'\b' + re.escape(j_orig) + r'\b', re.IGNORECASE)
        if j_orig.lower() not in ["science", "genes"]:
            ref_text = pattern_no_ital.sub(j_abbr, ref_text)

    # 3. Volume and issue: vol. X Y -> vol. X, no. Y
    ref_text = re.sub(r'vol\.\s+(\d+)\s+(\d+)', r'vol. \1, no. \2', ref_text)
    
    # 4. Expand page ranges, e.g., pp. 617–33 -> pp. 617–633
    ref_text = re.sub(r'pp\.\s+(\d+)[–-](\d+)', expand_page_range, ref_text)
    
    # 5. DOI period stripping
    ref_text = re.sub(r'(doi:\s*\[[^\]]+\]\([^\)]+\))\.$', r'\1', ref_text)
    ref_text = re.sub(r'(doi:\s*[^\s]+)\.$', r'\1', ref_text)
    
    # 6. General clean up
    ref_text = re.sub(r',\s*,', ',', ref_text)
    ref_text = re.sub(r'\s+', ' ', ref_text)
    ref_text = ref_text.strip()
    
    return ref_text

def main():
    if not os.path.exists(INPUT_MD):
        print(f"Error: {INPUT_MD} does not exist.")
        return
        
    with open(INPUT_MD, "r", encoding="utf-8") as f:
        content = f.read()
        
    parts = re.split(r'(## References)', content, flags=re.IGNORECASE)
    if len(parts) < 3:
        print("Error: Could not find ## References section in summary markdown.")
        return
        
    pre_content = parts[0] + parts[1] + "\n\n"
    ref_section = parts[2]
    
    lines = ref_section.split('\n')
    new_ref_lines = []
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            new_ref_lines.append("")
            continue
            
        m = re.match(r'^(\\?\[\d+\\?\]\s+)(.*)$', stripped)
        if m:
            prefix = m.group(1)
            ref_text = m.group(2)
            formatted = format_ieee(ref_text)
            new_ref_lines.append(f"{prefix}{formatted}")
        else:
            new_ref_lines.append(line)
            
    new_content = pre_content + "\n".join(new_ref_lines)
    
    # Write back to file
    with open(INPUT_MD, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Successfully converted references in summary markdown to IEEE style!")

if __name__ == "__main__":
    main()
