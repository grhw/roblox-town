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
Ngal
--: :--`.split("\n")
var Armor = `Robes
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
Rusky (Gamepass)`.split("\n")
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

--: LIGHT MACHINE GUNS :--

MG4
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
USP Match
--: :--`.split("\n")

export var items = {}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

function makeCategory(array) {
    var final = {}
    var key = ""
    var values = []
    array.forEach(entry => {
        if (entry != "") {
            if (entry.startsWith("--:")) {
                if (values.length > 0) {
                    final[key] = values
                }
                values = []
                key = toTitleCase(entry.split(":")[1]).replace("  "," ").trim()
            } else {
                values.push(entry)
            }
        }
    });
    return final
}

items["Weapons"] = makeCategory(Weapons)
items["Armor"] = {"Armor": Armor}
export var attachments = makeCategory(Attachments)

console.log(items)