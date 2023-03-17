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
Wide Choke`
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
Rusky (GAMEPASS)`
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
SPAS-12(GAMEPASS)
UNICA 6 (GAMEPASS)
UTS-15 (GAMEPASS)
Walther WA2000 (GAMEPASS)`
var res = ""
//Attachments = Attachments.split("\n").sort((a, b) => a.length - b.length)
//Weapons = Weapons.split("\n").sort((a, b) => a.length - b.length)
//Armor = Armor.split("\n").sort((a, b) => a.length - b.length)
Attachments = Attachments.split("\n").sort()
Weapons = Weapons.split("\n").sort()
Armor = Armor.split("\n").sort()


function select() {
  this.classList.toggle("list-object")
  this.classList.toggle("aclist-object")

  var eqwep = document.querySelectorAll(".weapons .aclist-object")
  var att = document.querySelectorAll(".attachments .aclist-object")
  var arm = document.querySelectorAll(".armor .aclist-object")
  res = ""
  for (let i = 0; i < eqwep.length; i++) {
    res = res + "!spawn " + eqwep[i].innerHTML.split(" ")[0]
    for (let i = 0; i < att.length; i++) {
      res = res + "+" + att[i].innerHTML.split(" ")[0]
    }
    res = res + "\n"
  }

  for (let i = 0; i < arm.length; i++) {
    res = res + "\n!spawnarmor " + arm[i].innerHTML.split(" ")[0]

  }
  var out = document.getElementsByClassName("result")[0]
  out.value = res
  out.classList.remove("Copied")
}
function select2(e) {
  e.classList.toggle("list-object")
  e.classList.toggle("aclist-object")

  var eqwep = document.querySelectorAll(".weapons .aclist-object")
  var att = document.querySelectorAll(".attachments .aclist-object")
  var arm = document.querySelectorAll(".armor .aclist-object")
  res = ""
  for (let i = 0; i < eqwep.length; i++) {
    res = res + "!spawn " + eqwep[i].innerHTML.split(" ")[0]
    for (let i = 0; i < att.length; i++) {
      res = res + "+" + att[i].innerHTML.split(" ")[0]
    }
    res = res + "\n"
  }

  for (let i = 0; i < arm.length; i++) {
    res = res + "\n!spawnarmor " + arm[i].innerHTML.split(" ")[0]

  }
  var out = document.getElementsByClassName("result")[0]
  out.value = res
  out.classList.remove("Copied")
}

for (let i = 0; i < Attachments.length; i++) {
  var tag = document.createElement("button");
  var text = document.createTextNode(Attachments[i]);
  tag.appendChild(text);
  var element = document.getElementsByClassName("attachments")[0]
  element.appendChild(tag);
  tag.classList.add('list-object')
  tag.classList.add(tag.innerHTML.replaceAll(" ", "-"))
  tag.onclick = select
}
for (let i = 0; i < Weapons.length; i++) {
  var tag = document.createElement("button");
  var text = document.createTextNode(Weapons[i]);
  tag.appendChild(text);
  var element = document.getElementsByClassName("weapons")[0]
  element.appendChild(tag);
  tag.classList.add('list-object')
  tag.classList.add(tag.innerHTML.replaceAll(" ", "-"))
  tag.onclick = select
}
for (let i = 0; i < Armor.length; i++) {
  var tag = document.createElement("button");
  var text = document.createTextNode(Armor[i]);
  tag.appendChild(text);
  var element = document.getElementsByClassName("armor")[0]
  element.appendChild(tag);
  tag.classList.add('list-object')
  tag.classList.add(tag.innerHTML.replaceAll(" ", "-"))
  tag.onclick = select
};

function selectText() {
  const copyText = document.getElementById('result');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  copyText.classList.add("Copied")
}

var save = document.getElementsByClassName("save")[0]
var load = document.getElementsByClassName("load")[0]
var inpl = document.getElementsByClassName("inpl")[0]

save.onclick = function() {
  var actlist = document.querySelectorAll(".aclist-object")
  data = ""
  for (let i = 0; i < actlist.length; i++) {
    data = data + actlist[i].innerHTML + ","
    console.log(actlist[i])
  }
  localStorage.setItem(inpl.value, data)
  console.log(data)
}
load.onclick = function() {
  var actlist = document.querySelectorAll(".aclist-object")
  data = localStorage.getItem(inpl.value).split(",")
  for (let i = 0; i < actlist.length; i++) {
    select2(actlist[i])
  }
  for (let i = 0; i < data.length - 1; i++) {
    select2(document.getElementsByClassName(data[i].replaceAll(" ", "-"))[0])
  }
  console.log(data)
}