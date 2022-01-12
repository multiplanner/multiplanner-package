document.getElementsByClassName("container container--padded container--planbar")[0].insertAdjacentHTML('beforeend', `
<div id="inputbalk">
<textarea id="multiplannerinput" _ngcontent-prp-c312="" type="text" autocomplete="off" spellcheck="false" dir="auto" role="combobox" aria-autocomplete="both" aria-haspopup="true" data-lpignore="true" class="textInput formfield__textInput ng-untouched ng-pristine ng-valid" id="location-input-FROM-POSITIONED" name="FROM" placeholder="adres, station of postcode" tabindex="0" aria-owns="location-input-suggestions-FROM-POSITIONED" aria-expanded="false" aria-activedescendant="location-input-suggestions-FROM-POSITIONED-0" style="width: 399px; height: 252px;"></textarea>
</div>
`);

XMLHttpRequest.prototype.vanillaSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(){
    if (this.__zone_symbol__xhrURL.startsWith("https://gateway.apiportal.ns.nl/rio-mlab-proxy-api/reisinfo/api/v3/trips")) {
        this.open("POST", "https://multiplanner.duckdns.org:80/trips");
        const reisplan = document.getElementById("multiplannerinput").value;
        this.vanillaSend(reisplan);
        XMLHttpRequest.prototype.send = XMLHttpRequest.prototype.vanillaSend;
    } else {
        this.vanillaSend();
    }
}