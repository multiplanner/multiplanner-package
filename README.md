# 🚆 Multiplanner

Multiplanner is een NodeJS-libary voor het plannen van uw treinrit.

## 👾 Instalatie

Gebruik de package manager [NodeJS](https://nodejs.org/) om Multiplanner te installeren.

```bash
npm install multiplanner
```
Voor het eerste gebruik deze library initialiseren met een api key zoals volgt:

```javascript
import {
    updateMultiplanner
} from "./multiplanner.js";

updateMultiplanner(NS_API_KEY_HIER);
```

## 🔭 Library

Behalve de `updateMultiplanner` functie stelt deze library ook de multiReis en formatteerReis functies beschikbaar. Deze kunnen worden gebruikt als volgt:

```javascript
// Importeer functies
import {
    multiReis,
    formatteerReis
} from "./multiplanner.js";

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
