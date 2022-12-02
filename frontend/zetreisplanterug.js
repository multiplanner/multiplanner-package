
axios
    .get("tekst?filter=(ecclesiastes%7Cproverbs%7Cmattheus%7Cmark%7Cluke%7Cjohn)")
    .then((resultaat) => document.getElementById("bijbeltekst").innerHTML = resultaat.data.match(/(?<=^[0-9A-Za-z ]+ )[^0-9]+$/)[0]);

if (document.cookie) {
    document.getElementById("textarea").value = decodeURIComponent(document.cookie);
    resizeInvoer(document.getElementById("textarea"));
}