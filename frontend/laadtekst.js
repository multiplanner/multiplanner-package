axios
    .get(`tekst${window.location.search}`)
    .then((resultaat) => {
        const tekst = resultaat.data.match(/(?<=^[0-9A-Za-z ]+ )[^0-9]+$/)[0];
        const verwijzing = resultaat.data.match(/^[A-Za-z0-9 ]+ [0-9]+ [0-9]+/)[0];
        document.getElementById("bijbeltekst").innerHTML = tekst;
        document.getElementById("verwijzing").innerHTML = verwijzing;
    });