import { items, attachments } from './weapons.js'; 

let shortenAttachmentNames = false;

const shAtt = document.querySelector(".shorten-att");
shAtt.onclick = () => {
    shortenAttachmentNames = !shortenAttachmentNames;
    shAtt.innerHTML = shortenAttachmentNames ? "[X] Shorten attachments names" : "[ ] Shorten attachments names";
};

function initDropdown(dropdown, callback) {
    let on = false;
    const text = dropdown.querySelector(".dropdowntext");
    const selections = dropdown.querySelector(".selections");
    text.onclick = () => {
        on = !on;
        selections.style.display = on ? "block" : "none";
    };

    selections.querySelectorAll("button").forEach(selection => {
        selection.onclick = () => {
            selections.style.display = "none";
            on = false;
            callback(selection.innerText);
        };
    });
}

const template = '<span class="dropdown [ID]"><button class="dropdowntext">[NAME]</button><span class="selections" style="display: none;">[DROP]</span></span>';
const weapon_template = '<div class="entry [ID]"><button class="remove">Remove</button> <!--<button class="duplicate">Duplicate</button> --><span>[NAME]</span> <button class="addattach">Add Attachment</button><div class="attachments"></div></div>';
const attachment_template = '<span class="att [ID]">[ATTACH] <button class="remove">Remove</button><br></span>';

function lazySimplify(text, max) {
    return text.replaceAll(" ", "").toLowerCase().substring(0, max);
}

function sorter(a, b) {
    const aType = a.getAttribute("weapon-type");
    const bType = b.getAttribute("weapon-type");
    if (aType && bType) {
        return aType.localeCompare(bType);
    }
    return a.innerText.localeCompare(b.innerText);
}

function sort() {
    const sorted = Array.from(document.querySelectorAll(".entry")).sort(sorter);
    const creations = document.querySelector(".creations");
    sorted.forEach(element => {
        creations.appendChild(element);
        const attachments = Array.from(element.querySelectorAll(".att")).sort(sorter);
        const attContainer = element.querySelector(".attachments");
        attachments.forEach(e2 => {
            attContainer.appendChild(e2);
        });
    });
}

function update() {
    sort();
    const entries = document.querySelectorAll(".entry");
    let weapons = "";
    let armors = "";
    entries.forEach(a => {
        const name = lazySimplify(a.querySelector("span").innerText, 5);
        if (a.classList.contains("armor")) {
            armors += name + " ";
        } else {
            let wep = name;
            const atts = a.querySelector(".attachments").querySelectorAll("span");
            atts.forEach(e => {
                if (e.innerHTML.includes("Remove")) {
                    let toAdd = e.innerText.split(" <button")[0].split(" ")[0].toLowerCase();
                    if (shortenAttachmentNames) {
                        toAdd = lazySimplify(toAdd, 3);
                    }
                    wep += "+" + toAdd;
                }
            });
            weapons += wep + ' ';
        }
    });
    document.querySelector(".weaponry").innerHTML = weapons;
    const armorElement = document.querySelector(".armor");
    if (armorElement.innerHTML !== armors) {
        armorElement.innerHTML = armors;
    }
}

function createDropdown(parent, name, items, callback) {
    const id = "c" + Math.round(Date.now() * 1000) + name.replaceAll(" ", "");
    const dropdown = document.createElement("span");
    parent.appendChild(dropdown);

    const buttons = items.map(item => `<button>${item}</button><br>`).join('');
    dropdown.outerHTML = template.replace("[ID]", id).replace("[NAME]", name).replace("[DROP]", buttons);
    initDropdown(document.querySelector(".dropdown." + id), callback);
}

function createWeapon(name, canHasAttachments, itemType) {
    const weapon = document.createElement("div");
    const id = "w" + Math.round(Date.now() * 1000);
    const wpt = itemType.replaceAll(" ", "-").toLowerCase();
    document.querySelector(".creations").appendChild(weapon);
    weapon.outerHTML = weapon_template.replace("[NAME]", name).replace("[ID]", id);
    const weaponElement = document.querySelector("." + id);
    weaponElement.classList.add(wpt);
    weaponElement.setAttribute("weapon-type", wpt);

    if (!canHasAttachments) {
        weaponElement.querySelector(".addattach").remove();
    } else {
        weaponElement.querySelector(".addattach").onclick = () => {
            const container = document.createElement("div");
            const a_id = "a" + Math.round(Date.now() * 1000);
            container.classList.add(a_id);
            weaponElement.querySelector(".attachments").appendChild(container);
            Object.keys(attachments).forEach(attachType => {
                const attachs = attachments[attachType];
                createDropdown(container, attachType, attachs, r => {
                    container.outerHTML = attachment_template.replace("[ATTACH]", r).replace("[ID]", a_id);
                    const newContainer = document.querySelector(".att." + a_id);
                    newContainer.querySelector(".remove").onclick = () => {
                        newContainer.remove();
                    };
                });
            });
        };
    }
    weaponElement.querySelector(".remove").onclick = () => {
        weaponElement.remove();
    };
    return weaponElement;
}

Object.keys(items).forEach(categoryName => {
    const category = items[categoryName];
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("section");
    document.querySelector(".background").appendChild(categoryElement);
    Object.keys(category).forEach(itemType => {
        const items = category[itemType];
        createDropdown(categoryElement, itemType, items, e => {
            createWeapon(e, categoryName !== "NoAttachments", itemType);
        });
    });
});

document.onclick = () => {
    update();
};
