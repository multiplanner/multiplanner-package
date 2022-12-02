const minimaalNul = (getal) => getal < 0 ? 0 : getal; 
const formateerTijdsduurMinuten = (tijdsduur) => `${tijdsduur >= 60 ? `${Math.floor(tijdsduur / 60)} uur en ` : ""}${tijdsduur % 60} ${tijdsduur % 60 == 1 ? "minuut" : "minuten"}`;
const formatteerTijd = (date) => new Date(date).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Amsterdam' });
const formatteerDatum = (date) => new Date(date).toLocaleDateString("nl-NL", {day: 'numeric', month: 'long', year: 'numeric'});
const vertaalZijde = (zijde) => ({
    LEFT: "Links",
    RIGHT: "Rechts"
})[zijde] || "Onbekend";

const rij = (reisdeel) => `
<tr>
    <td>${formateerTijdsduurMinuten(reisdeel.overstaptijd)}</td>
    <td>${reisdeel.vertrekstationnaam}</td>
    <td>${reisdeel.vertrekspoor}</td>
    <td>${formatteerTijd(reisdeel.vertrektijd)}</td>
    <td>${reisdeel.categorie}</td>
    <td>${reisdeel.richting}</td>
    <td>${formateerTijdsduurMinuten(reisdeel.ritduur)}</td>
    <td>${formatteerTijd(reisdeel.aankomsttijd)}</td>
    <td>${reisdeel.aankomststationnaam}
    <td>${reisdeel.aankomstspoor}</td>
    <td>${vertaalZijde(reisdeel.uitstapzijde)}</td>
</tr>
`;


const resultaatHTML = (reis) => `
<!DOCTYPE html>
<html lang="en">

<html>
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>Reis van ${reis.reis[0].vertrekstationnaam} naar ${reis.reis[reis.reis.length - 1].aankomststationnaam}</title>
<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">-->
<link rel="stylesheet" href="bootstrap-neon-glow.css">


<link rel="stylesheet" href="resultaat.css">
</head>
<body>

<div class="container-fluid">

    <div class="row">

        <div class="col">
            <h3>Reisdetails</h3>
            <div class="table-responsive">
                <table class="table table-hover">
                    <tr><th scope="row">Prijs</th><td>&euro;${reis.prijs / 100}</td></tr>
                    <tr><th scope="row">Vertrekdatum</th><td>${formatteerDatum(reis.reis[0].vertrektijd)}</td></tr>
                    <tr><th scope="row">Wachttijd</th><td>${formateerTijdsduurMinuten(reis.stationstijd)}</td></tr>
                    <tr><th scope="row">Rijtijd</th><td>${formateerTijdsduurMinuten(reis.treintijd)}</td></tr>
                    <tr><th scope="row">Totale reistijd</th><td>${formateerTijdsduurMinuten(reis.reistijd)}</td></tr>
                    <tr><th scope="row">Hemelsbrede afstand</th><td>${Math.round(reis.hemelsbredeafstand)} kilometer</td></tr>
                </table>
            </div>
        </div>
   
        <div class="col">
            <h3>Bewijs links</h3>
            <ul class="list-group">
                ${reis.urls.map((url, index) => `<li class="list-group-item"><a class="bewijslink" href=${url} target="_blank">Bewijslink ${index + 1}</a></li>`).join("")}
            </ul>
        </div>

        <div class="col">
            <h3>Reisplan</h3>
            <div class="table-responsive">
                <table class="table table-hover">
                    <th scope="col">Overstaptijd</th>
                    <th scope="col">Vertrekstation</th>
                    <th scope="col">Vertrekspoor</th>
                    <th scope="col">Vertrektijd</th>
                    <th scope="col">Product</th>
                    <th scope="col">Richting</th>
                    <th scope="col">Ritduur</th>
                    <th scope="col">Aankomsttijd</th>
                    <th scope="col">Aankomststation</th>
                    <th scope="col">Aankomstspoor</th>
                    <th scope="col">Uitstapzijde</th>
                    ${reis.reis.map(rij)}
                </table>
            </div>
        </div>
    </div>
</div>
</script>
</body>
</html>
`;