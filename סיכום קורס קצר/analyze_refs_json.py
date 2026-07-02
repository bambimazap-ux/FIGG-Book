import os
import re
import glob
import json

workspace = r"C:\Users\nafei\Documents\מופ\סקירות ספרות\FIGG"
md_files = glob.glob(os.path.join(workspace, "פרקים", "*.md")) + [os.path.join(workspace, "סיכום קורס קצר", "סיכום_מקצועי_בנושא_FIGG.md")]

all_refs = {}

for fp in md_files:
    if not os.path.exists(fp):
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    
    parts = re.split(r'##\s+References', content, flags=re.IGNORECASE)
    if len(parts) > 1:
        ref_lines = parts[1].strip().split('\n')
        for line in ref_lines:
            stripped = line.strip()
            if not stripped:
                continue
            m = re.match(r'^\\?\[(\d+)\\?\]\s+(.*)$', stripped)
            if m:
                idx = int(m.group(1))
                val = m.group(2).strip()
                all_refs[val] = {
                    "idx": idx,
                    "file": os.path.basename(fp)
                }

out_path = r"C:\Users\nafei\.gemini\antigravity\brain\8f19ded3-5c76-4efc-ba13-6caf95af406f\scratch\refs.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(all_refs, f, ensure_ascii=False, indent=2)

print(f"Total unique reference texts found: {len(all_refs)}")
print(f"Written to {out_path}")
