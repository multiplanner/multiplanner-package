const haalReisOp = () => {
    const reisplan = document.getElementById("textarea").value;
    document.cookie = encodeURIComponent(reisplan);
    console.log(document.cookie);
    axios
        .post("https://multiplanner.duckdns.org/reisscript-json", reisplan)
        .then((resultaat) => {
            document.write(resultaatHTML(resultaat.data));
        });
};