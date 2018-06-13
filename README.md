# Preverjanje starosti in izrecna privolitev po GDPR 
Po novi Splošni uredbi o varstvu podatkov morajo upravljavci osebnih podatkov (tisti, ki zbirajo in obdelujejo podatke) kadar obdelujejo podatke na podlagi privolitve otroka, pridobiti soglasje staršev ali skrbnikov (za podlago glejte člen 8 v http://eur-lex.europa.eu/legalcontent/SL/TXT/HTML/?uri=CELEX:32016R0679&from=SL) in zbirati dokaze, da so otroci in njihovi starši oz. skrbniki privolitev dali. Izdelajte sistem za dajanje privolitev, ki bo razen e-naslova otroka zbirala tudi e-naslov starša.

Celoten sistem mora biti samodejen in mora temeljiti na pošiljanju elektronskih sporočil staršem v potrditev. 

Uporabniki portala lahko določijo vsebino besedil, ki so prikazana na portalu in vsebino, ki jo sistem pošilja po elektronski pošti. 

Za otroke, ki so dali privolitev, mora biti kasneje mogoče ugotoviti kdaj (iz katerega IP naslova) je otrok sprožil privolitev, kdaj in iz katerega IP naslova je privolitev potrdila odrasla oseba ter kaj je bilo prikazano otroku in kaj je bilo prikazano odrasli osebi pri dajanju privolitve ter katera besedila so bila poslana po elektronski pošti. 

Na enak način podprite tudi dajanje izrecnih privolitev pri obdelavi posebnih osebnih podatkov (glejte točko a 1. odstavka 9. člena Uredbe). Vsak uporabnik, ki daje privolitev, si lahko pogoje privolitve shrani kot PDF datoteko. Vsak uporabnik pa lahko vse dokaze o privolitvi izvozi kot PDF datoteko. 
Bonus: Zavarovanje dokazov o privolitvi v verigi blokov

# Navodila za namestitev
Najprej klonirajte naš projekt in ga shranite v mapo (priporočamo kar na namizju).

Na povezavi https://www.mongodb.com/download-center?jmp=docs&_ga=2.42390949.1470924867.1528462811-1894267662.1526629176#community pod community server naložite mongoDB (3.6.5 v času pisanja teh navodil) in ga namestite. Med namestitvijo lahko odkljukate Compass saj ni potreben za naš projekt.<br />
Na C: disku naredite mapo »data« in podmapo »db«, saj sta potrebni za delovanje baze.<br />
Mongo bazo zaženete s mongod.exe, ki se nahaja v mapi kamor ste namestili program (C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe).<br />
Nato pa se na bazo povežete tako, da zaženete mongo.exe (C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe).<br />
V oknu mongo.exe izvedite naslednje ukaze (male in velike črke so pomembne).<br />
use Praktikum<br />
db.createCollection("Users")<br />
db.createCollection("Conformation")<br />
db.createCollection("Text")<br />
S tem ste zaključili z namestitvijo baze.<br />

Na povezavi https://nodejs.org/en/ prenesite zadnjo LTS verzijo (8.11.2 v času pisanja the navodil) in program namestite.<br />
Nato odprite cmd in izvedite naslednje ukaze (male in velike črke so pomembne).<br />
cd <pot do mape, kjer ste klonirali naš projekt><br />
npm start<br />

Nato v spletnem brskalniku napišete localhost:5000.

# URL : http://gdpr.praktikum.website

# Avtorji

Darko Lačen  
Katja Frančič  
Teo Kac  
Žiga Hvalec  
