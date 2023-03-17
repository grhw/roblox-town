var Attachments = `ACOG Sight
Angled Grip
Bipod
CL6X Sight
Compensator
Coyote Sight
EOTech Sight
Ergo Grip
Extended Stock
Flash Hider
Flashlight
Folding Grip
Green Laser
Heavy Suppressor
Hunting Scope
JGM4 Sight
Kobra Sight
M145 Sight
PSO-1 Scope
Red Laser
Suppressor
Wide Choke`.split("\n")
var Armor = `COM
FBI
GRU
HCS
RGF
Riot
Robes
Robes2
SAS
Slav
SWAT
Tenor
VDV
Rusky (GAMEPASS)`.split("\n")
var Weapons = `AK-47
AS VAL
AUG A3
CheyTac M200
CZ-75
Desert Eagle
Dragunov SVD
FAMAS F1
Five SeveN
G36C
Glock-18
HK416
JNG-90
L85A2
L96A1
M16A3
M1911
M4
M9
MAC-10
Magnum Revolver
Makarov
MG4
MK-11
MP443
MP5K
MP7
P226
P90
QBU-88
QBZ-95
Remington 870
RFB
RPK-74M
Saddlegun
SKS
SR-2
Steyr Elite
TMP
Tumor Growth
UMP-40
Balaclava
Ballistics Helmet
Ballistics Vest
Bandage
Defibrillator
Fire axe
Hammer
Laptop (Drone)
Mask
Medkit
NV Goggles
Pickaxe
Wrench
Akimbo M9 (GAMEPASS)
Barrett M82A3 (GAMEPASS)
Classic Pistol (GAMEPASS)
Cowboy Gun (GAMEPASS)
Double Barrel (GAMEPASS)
Fail (GAMEPASS)
FN FAL (GAMEPASS)
Groza-4 (GAMEPASS)
Ithaca 37 Stakeout (GAMEPASS)
KRISS Vector (GAMEPASS)
Luger P08 (GAMEPASS)
M1921 Thompson (GAMEPASS)
PP2000 (GAMEPASS)
Riot Shield (GAMEPASS)
SCAR-H (GAMEPASS)
Shovel (GAMEPASS) 
SPAS-12 (GAMEPASS)
UNICA 6 (GAMEPASS)
UTS-15 (GAMEPASS)
Walther WA2000 (GAMEPASS)`.split("\n")

const itemtemplate = document.querySelector(".dumpster .item")
const armortemplate = document.querySelector(".dumpster .armor")

const itemselect = itemtemplate.querySelector(".itemselect")
const attachselect = itemtemplate.querySelector(".attachselect")
const attachtemplate = itemtemplate.querySelector(".attach")

const armorselect = armortemplate.querySelector(".armorselect")

for (let i = 0;i < Weapons.length;i++) {
    const elmnt = document.createElement("option")
    elmnt.innerHTML = Weapons[i]
    itemselect.appendChild(elmnt)
}

for (let i = 0;i < Attachments.length;i++) {
    const elmnt = document.createElement("option")
    elmnt.innerHTML = Attachments[i]
    attachselect.appendChild(elmnt)
}

for (let i = 0;i < Armor.length;i++) {
    const elmnt = document.createElement("option")
    elmnt.innerHTML = Armor[i]
    armorselect.appendChild(elmnt)
}

const addweapons = document.querySelector(".addweapons")
const addarmor = document.querySelector(".addarmor")
const list = document.querySelector(".list")

addweapons.addEventListener("click", () => {
    const item = itemtemplate.cloneNode(true)
    item.querySelector(".attach").remove()
    list.appendChild(item)
    const attachments = item.querySelector(".attachments")
    const removeweapon = item.querySelector(".removeitem")
    removeweapon.addEventListener("click", () => {
        item.remove()
    })
    const addattach = item.querySelector(".addattachments")
    addattach.addEventListener("click", () => {
        const attach = attachtemplate.cloneNode(true)
        attachments.appendChild(attach)
        attach.querySelector(".removeattachments").addEventListener("click", () => {
            attach.remove()
        })
    })
})

addarmor.addEventListener("click", () => {
    const armor = armortemplate.cloneNode(true)
    list.appendChild(armor)
    const removearmor = armor.querySelector(".removearmor")
    removearmor.addEventListener("click", () => {
        armor.remove()
    })
})

const radiosetspawn = document.querySelector("input[value=\"setspawn\"]")
const radiospawn = document.querySelector("input[value=\"spawn\"]")
const generation = document.querySelector(".generation")

radiosetspawn.checked = true


document.querySelector(".generate").addEventListener("click", () => {
    const items = document.querySelectorAll(".list .item")
    const armor = document.querySelectorAll(".list .armor")
    if (radiosetspawn.checked == true) {
        var final = ""
        for (let i = 0;i < items.length;i++) {
            const select = items[i].querySelector(".itemselect")
            const attachs = items[i].querySelectorAll(".attach")
            final = final + " " + select.value.split(" ")[0]
            for (let x = 0;x < attachs.length;x++) {
                const attachselect = attachs[x].querySelector(".attachselect")
                final = final + "+" + attachselect.value.split(" ")[0]
            }
        }
        for (let i = 0;i < armor.length;i++) {
            const select = armor[i].querySelector(".armorselect")
            final = final + " " + select.value.split(" ")[0]
        }
        generation.innerHTML = "!setspawn " + final
    } else {
        var final = ""
        for (let i = 0;i < items.length;i++) {
            const select = items[i].querySelector(".itemselect")
            const attachs = items[i].querySelectorAll(".attach")
            final = final + "<br>!spawn " + select.value.split(" ")[0]
            for (let x = 0;x < attachs.length;x++) {
                const attachselect = attachs[x].querySelector(".attachselect")
                final = final + "+" + attachselect.value.split(" ")[0]
            }
        }
        for (let i = 0;i < armor.length;i++) {
            const select = armor[i].querySelector(".armorselect")
            final = final + "<br>!spawnarmor " + select.value.split(" ")[0]
        }
        generation.innerHTML = final
    }
})