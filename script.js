var Attachments = `--: SCOPES AND SIGHTS :--
 
Coyote Sight
Hunting Scope
ACOG Sight
CL6X Sight
EOTech Sight
JGM4 Sight
Kobra Sight
PSO-1 Scope
Holosun507c
Acog Scope
M145
AEMS
SRS

--: GRIPS :--

Angled Grip
Folding Grip
Bipod
Extended Stock (SMGs/Pistols only)
DD Grip
Ergo Grip
Strike
Seelite
Skeleton

--: BARREL :--

Compensator
Flash Hider
Osprey Suppresor
Heavy Suppressor
Suppressor
Wide Choke
Muzzlebreak
TAA Muzzlebrake

--: OTHER :--

Flashlight
Blue Laser
Green Laser
Red Laser
Rangefinder
Ngal`.split("\n")
var Armor = `--: Armor :--

Robes
Tenor
Robes2
HCS
COM
SWAT
FBI
RGF
Slav
Riot
VDV
SAS
GRU

--: Gamepass :--

Rusky`.split("\n")
var Weapons = `--: AUTOMATIC RIFLES :--

AK-47
AUGA3
FAMAS G2
G36C
HK416
L85A2
M16A1
M4
QBZ-95
ASVAL
MP40
MCX
SG-552

--: SNIPER RIFLES  :--

RFB
Model-1777 Musket
QBU-88
CheyTac M200
JNG-90
L96A1
Steyr Elite
Dragunov SVD

--: DESIGNATED MARKSMAN RIFLES  :--

AR-10
SKS
MK-11
M110
M1 Garand

--: LIGHT MACHINE GUNS MG4 :--

RPK-74M
Lewis

--: SUBMACHINE GUNS  :--

MAC-10
MP5K
MP7
MPX
P90
SR-2
UMP-45
TMP
Uzi

--: SHOTGUNS  :--

Remington870
Saiga
Saddlegun

--: PISTOLS  :--

M9
CZ-75
DesertEagle
FiveSeven
Glock-18C
Glock-19
M1911
MP443
Makarov
P226
Magnum Revolver
USP Match`.split("\n")

const itemtemplate = document.querySelector(".dumpster .item")
const armortemplate = document.querySelector(".dumpster .armor")

const itemselect = itemtemplate.querySelector(".itemselect")
const attachselect = itemtemplate.querySelector(".attachselect")
const attachtemplate = itemtemplate.querySelector(".attach")

const armorselect = armortemplate.querySelector(".armorselect")

const addoptioninselect = (sel,name) => {
    const elmnt = document.createElement("option")
    elmnt.innerHTML = name
    sel.appendChild(elmnt)
    if (name.includes("--:")||(name == "")) {
        elmnt.setAttribute("disabled","disabled")
    }
}

for (let i = 0;i < Weapons.length;i++) {
    addoptioninselect(itemselect, Weapons[i])
}

for (let i = 0;i < Attachments.length;i++) {
    addoptioninselect(attachselect, Attachments[i])
}

for (let i = 0;i < Armor.length;i++) {
    addoptioninselect(armorselect, Armor[i])
}

const addweapons = document.querySelector(".addweapons")
const addarmor = document.querySelector(".addarmor")
const list = document.querySelector(".list")

const newweapon = () => {
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
    const duplicateitem = item.querySelector(".duplicateitem")
    duplicateitem.addEventListener("click", () => {
        newweapon()
    })
}

addweapons.addEventListener("click", newweapon)

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
            final = final + " " + select.value.replace(" ","").substring(0,5)
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
            final = final + "<br>!spawn " + select.value.replace(" ","").substring(0,5)
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