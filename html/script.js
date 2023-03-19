var Attachments = `Suppressor
Heavy Suppressor
Green Laser
CL6X Sight
Compensator
Hunting Scope
EOTech Sight
Ergo Grip
Extended Stock
Flash Hider
Folding Grip
ACOG Sight
Flashlight
Angled Grip
Coyote Sight
JGM4 Sight
PSO-1 Scope
Kobra Sight
M145 Sight
Wide Choke
Red Laser
Bipod`.split("\n")
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
var Weapons = `--: Guns :--

Tumor Growth
L85A2
M1911
Steyr Elite
M4
MP443
MP7
UMP-40
MG4
Remington 870
RFB
Saddlegun
Glock-18
Desert Eagle
AK-47
M16A3
CZ-75
L96A1
AS VAL
Five SeveN
G36C
M9
P226
P90
RPK-74M
SR-2
Magnum Revolver
SKS
MAC-10
AUG A3
HK416
Makarov
FAMAS F1
JNG-90
CheyTac M200
MK-11
QBZ-95
MP5K
QBU-88
Dragunov SVD
TMP

--: Ammo :--

Twin 9x19mm Parabellum
FN 5.7x28mm
.30-30 Winchester
.308 Winchester
.44 Magnum
.45 ACP
.50 Action Express
12 Gauge
4.6x30mm
5.56x45mm NATO
7.62x39mm
7.92x57mm Mauser
8 Gauge
9x19mm Parabellum
9x39mm
FN 5.7x28mm Pistol
.50 BMG
.40 S&W
9x19mm Parabellum Rifle
7.62x51mm NATO
7.62x39mm M43
9x21mm Gyurza
.40 S&W Rifle
.357 Magnum
.45 ACP Rifle

--: Other :--

Wrench
Laptop
Mask
NV Goggles
Balaclava
Ballistics Helmet
Ballistics Vest
Bandage
Medkit
Hammer
Pickaxe
Fire axe
Defibrillator

--: Gamepass :--

Groza-4
Classic Pistol
Barrett M82A3
Riot Shield
PP2000
Cowboy Gun
Double Barrel
SPAS-12
UNICA 6
Akimbo M9
Luger P08
Ithaca 37 Stakeout
KRISS Vector
Shovel
Fail
SCAR-H
UTS-15
FN FAL
M1921 Thompson
Walther WA2000`.split("\n")

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