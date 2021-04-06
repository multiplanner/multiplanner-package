# 🚆 Multiplanner

Multiplanner is een NodeJS-libary voor het plannen van uw treinrit.

## 👾 Instalatie

Gebruik de package manager [NodeJS](https://nodejs.org/) om Multiplanner te installeren.

```bash
npm install multiplanner
```
Voor het eerste gebruik deze library initialiseren met een api key zoals volgt:

```javascript
const {
    updateMultiplanner
} = require('multiplanner');

updateMultiplanner(NS_API_KEY_HIER);
```

## 📜 Formaat

De te plannen reizen zijn een lijst stationsnamen of stationscodes, wachttijden en tijden.
Deze tijden staan in een menselijk formaat, zoals bijvoorbeeld `tomorrow 09:00`.
De wachttijden zijn in minuten.
Tijden kunnen tussen stationsnamen geplakt worden, dan zal gewacht worden met het voortzetten van de reis tot de gegeven tijd bereikt is. In plaats van stationsnamen kunnen ook synoniemen of stationscodes gebruikt
Ook kan een gegeven aantal minuten te wachten gegeven worden.
Relatieve tijden gaan uit van het moment waarop de library aangeroepen worden.

### 👀 Voorbeeld

```
09:00
Amsterdam
Amersfoort
60
Zwolle
lls
```
Bovenstaande route zal om 09:00 van de dag waarop de library wordt aangeroepen beginnen in Amsterdam. Dan wordt naar Amersfoort gereist. In Amersfoort wordt minimaal 60 minuten gewacht tot de reis voortgezet wordt naar Zwolle. Vanuit Zwolle word gereist naar Lelystad Centrum. (lls is de stationscode van Lelystad Centrum)

## 🔭 Gebruik

Behalve de `updateMultiplanner` functie stelt deze library ook de multiReis en formatteerReis functies beschikbaar. Deze kunnen worden gebruikt als volgt:

```javascript
// Importeer functies
const {
    multiReis,
    formatteerReis
} = require('multiplanner');

// Beschrijf de te plannen route
const route = `
09:00
Amsterdam
Amersfoort
60
Zwolle
lls
`;

// Berekent de reis met behulp van de NS api
const reis = await multiReis(route);

// Beschrijft het reisadvies in tekst
const reisadvies = formatteerReis(reis);

// Laat het geschreven reisadvies zien
console.log(reisadvies);
```

## 💁 Bijdragen
Pull Requests zijn welkom. Voor belangrijke wijzigingen moet u eerst een Issue openen om te bespreken wat u wilt wijzigen.

## 📰 Licentie
[MIT](https://choosealicense.com/licenses/mit/)
