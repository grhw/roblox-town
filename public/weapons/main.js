import { items, attachments } from './weapons.js'; 
        
function initDropdown(dropdown,callback) {
    var on = false;
    console.log(dropdown)
    var text = dropdown.querySelector(".dropdowntext")
    var selections = dropdown.querySelector(".selections")
    text.onclick = ()=>{
        on = !on
        if (on) {
            selections.style.display = "block"
        } else {
            selections.style.display = "none"
        }
    }

    selections.querySelectorAll("button").forEach(selection => {
        selection.onclick = ()=>{
            selections.style.display = "none"
            on = false;
            callback(selection.innerText)
        }
    });
}
const template = '<span class="dropdown [ID]"><button class="dropdowntext">[NAME]</button><span class="selections" style="display: none;">[DROP]</span></span>'
const weapon_template = '<div class="entry [ID]"><button class="remove">Remove</button> <!--<button class="duplicate">Duplicate</button> --><span>[NAME]</span> <button class="addattach">Add Attachment</button><div class="attachments"></div></div>'
const attachment_template = '<span class="att [ID]">[ATTACH] <button class="remove">Remove</button><br></span>'
function update() {
    var entries = document.querySelectorAll(".entry")
    var weapons = ""
    var armors = ""
    entries.forEach((a)=>{
        if (a.querySelector(".addattach") == null) {
            armors += a.querySelector("span").innerText + " "
        } else {
            var wep = ""
            wep = a.querySelector("span").innerText.replaceAll(" ","").toLowerCase().substring(0,5)
            var atts = a.querySelector(".attachments").querySelectorAll("span")
            atts.forEach((e)=>{
                if (e.innerHTML.includes("Remove")) {
                    wep = wep + "+" + e.innerText.split(" <button")[0].split(" ")[0]
                }
            })
            weapons += wep + ' '
        }
    })
    document.querySelector(".weaponry").innerHTML = weapons
    document.querySelector(".armor").innerHTML = armors
}

function createDropdown(parent,name,items,callback) {
    const id = "c" +Math.round(Date.now()*1000) + name.replaceAll(" ","")
    var dropdown = document.createElement("span")

    parent.appendChild(dropdown)

    var buttons = ""
    items.forEach(item => {
        buttons += `<button>${item}</button><br>`
    });

    dropdown.outerHTML = template.replace("[ID]",id).replace("[NAME]",name).replace("[DROP]",buttons)
    console.log(id)
    initDropdown(document.querySelector(".dropdown." + id),callback)
}

function createWeapon(name,canHasAttachments) {
    var weapon = document.createElement("div")
    const id = "w" +Math.round(Date.now()*1000)
    document.querySelector(".creations").appendChild(weapon)
    weapon.outerHTML = weapon_template.replace("[NAME]",name).replace("[ID]",id)
    weapon = document.querySelector("." + id)
    if (!canHasAttachments) {
        weapon.querySelector(".addattach").remove()
    } else {
        weapon.querySelector(".addattach").onclick = ()=>{
            var container = document.createElement("div")
            const a_id = "a" + Math.round(Date.now()*1000)
            container.classList.add(a_id)
            weapon.querySelector(".attachments").appendChild(container)
            Object.keys(attachments).forEach((attachType) => {
                const attachs = attachments[attachType]
                createDropdown(container,attachType,attachs,(r)=>{
                    container.outerHTML = attachment_template.replace("[ATTACH]",r).replace("[ID]",a_id)
                    container = document.querySelector(".att." + a_id)
                    container.querySelector(".remove").onclick = ()=>{
                        container.remove()
                    }
                })
            }
        )}
    }
    weapon.querySelector(".remove").onclick = ()=>{
        weapon.remove()
    }
    //weapon.querySelector(".duplicate").onclick = ()=>{
    //    createWeapon(name,canHasAttachments)
    //}
    return weapon
}

console.log(attachments)

Object.keys(items).forEach((categoryName) => {
    const category = items[categoryName]
    var categoryElement = document.createElement("div")
    categoryElement.classList.add("section")
    document.querySelector(".background").appendChild(categoryElement)
    Object.keys(category).forEach((itemType) => {
        const items = category[itemType]
        createDropdown(categoryElement,itemType,items,(e)=>{
            createWeapon(e,!(itemType == "Armor"))
        })
    });
});
document.onclick = ()=>{
    update()
}