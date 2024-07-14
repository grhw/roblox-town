from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
import json
import re

client = Chrome()

client.get("https://roblox-town.fandom.com/wiki/Commands")
camel_case_regex = r"((?<=[a-z])[A-Z]|(?<!\A)[A-Z](?=[a-z]))"
def un_camel_case(text):
    return re.sub(camel_case_regex, " \\g<0>", text, 0, re.MULTILINE)

input("Ready: ")
selected = client.find_elements(By.CSS_SELECTOR,".mw-parser-output > *")

current_type = "?"
current_category = "?"

items = {}

for elem in selected:
    if elem.tag_name == "h2":
        current_type = elem.text.title()
        items[current_type] = {}
        items[current_type][current_type] = []
        current_category = current_type
        print("#--:",current_type,":--#")
    if elem.tag_name == "h3":
        current_category = elem.text.title()
        items[current_type][current_category] = []
        print(":--",current_category,"--:")
    if elem.tag_name == "p" and elem.text.startswith("!"):
        items[current_type][current_category].append(un_camel_case(" ".join(elem.text.split(" ")[1:])))

for curtype in items.keys():
    if len(items[curtype][curtype]) < 1:
        del items[curtype][curtype]

final = {
    "Guns": items["Guns"],
    "Armor": items["Armor"],
}

with open("./public/weapons/weapons.js","w+") as f:
    f.write(f'export const items = {json.dumps(final,indent=4)}\n\n\nexport const attachments = {json.dumps(items["Modifications"],indent=4)}')

print(items)