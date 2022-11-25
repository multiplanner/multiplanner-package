module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami, util) => {
const superattributen = api.supertype ? util.vindApi(api.supertype).attributen : [];
// console.log(superattributen);
const alleAttributen = util.join([util.naarArray(api.attributen), util.naarArray(superattributen)]);
// console.log(alleAttributen)
const attributenlijst = bami(alleAttributen, a => a.value[0], ", ");

return `
<ac:structured-macro ac:macro-id="61b00ec4-f374-4d5b-ba52-afbab46bbf32" ac:name="captioneditem" ac:schema-version="1">
  <ac:parameter ac:name="anchor">G5BQY</ac:parameter>
  <ac:parameter ac:name="name">Table</ac:parameter>
  <ac:parameter ac:name="caption">Aanmaken Fully Dressed Usecase</ac:parameter>
  <ac:parameter ac:name="alignment">left</ac:parameter>
  <ac:rich-text-body>
    <table class="wrapped">
      <colgroup>
        <col style="width: 128.0px;"/>
        <col style="width: 1368.0px;"/>
      </colgroup>
      <tbody>
        <tr>
          <td>Naam</td>
          <td>Aanmaken ${item}</td>
        </tr>
        <tr>
          <td>Preconditie</td>
          <td>
            <br/>
          </td>
        </tr>
        <tr>
          <td>Postconditie</td>
          <td>
            <ol>
              <li>Er is een instantie van ${item} geinstantieerd met de door Beheerder opgegeven waardes van ${attributenlijst}.</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td>Brief description</td>
          <td>Beheerder kiest een ${item} aan te willen maken. Het systeem presenteert een formulier om de attributen in in te vullen. Beheerder verstuurt het formulier. &lt;Systeem&gt; instantieert een instantie van ${item} met de attributen ${attributenlijst}.</td>
        </tr>
        <tr>
          <td colspan="1">Happy flow</td>
          <td colspan="1">
            <p class="western">1. Beheerder geeft aan een ${item} aan te willen maken</p>
            <p class="western">2. Systeem geeft formulier weer, om attributen in te vullen.</p>
            <p class="western">3. Beheerder vult formulier in en verstuurt naar systeem.</p>
            <p class="western">4. Systeem instanieert een instantie van ${item} met de attributen ${attributenlijst}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </ac:rich-text-body>
</ac:structured-macro>
<ac:structured-macro ac:macro-id="473c43da-f849-479d-8976-b7bb13361de4" ac:name="captioneditem" ac:schema-version="1">
  <ac:parameter ac:name="anchor">ZMHTY</ac:parameter>
  <ac:parameter ac:name="name">Table</ac:parameter>
  <ac:parameter ac:name="caption">Bekijken Fully Dressed Usecase</ac:parameter>
  <ac:parameter ac:name="alignment">left</ac:parameter>
  <ac:rich-text-body>
    <table class="wrapped">
      <colgroup>
        <col/>
        <col/>
      </colgroup>
      <tbody>
        <tr>
          <td>Naam</td>
          <td>Bekijken ${item}</td>
        </tr>
        <tr>
          <td>Preconditie</td>
          <td>
            <ol>
              <li>Er is een instantie van ${item} geinstantieerd</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td>Postconditie</td>
          <td>
            <br/>
          </td>
        </tr>
        <tr>
          <td>Brief description</td>
          <td>Beheerder bekijkt de lijst ${item}'s waar hij toegang toe heeft. Optioneel selecteert Beheerder een specifieke instantie. Beheerder krijgt ${attributenlijst} van het geselecteerde ${item} te zien.</td>
        </tr>
        <tr>
          <td>Happy flow</td>
          <td>
            <p class="western">1. Beheerder geeft aan alle ${item}'s te willen bekijken waar hij toegang tot heeft.</p>
            <p class="western">2. Systeem presenteert lijst van ${item}’s.</p>
          </td>
        </tr>
        <tr>
          <td>Alt flow 1</td>
          <td>
            <p class="western">3. Beheerder selecteert een ${item} om te bekijken.</p>
            <p class="western">4. Geeft ${attributenlijst} van het geselecteerde ${item} weer.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </ac:rich-text-body>
</ac:structured-macro>
<ac:structured-macro ac:macro-id="42197948-e21d-48f5-bab2-78b71b07b925" ac:name="captioneditem" ac:schema-version="1">
  <ac:parameter ac:name="anchor">YT4WU</ac:parameter>
  <ac:parameter ac:name="name">Table</ac:parameter>
  <ac:parameter ac:name="caption">Wijzigen Fully Dressed Usecase</ac:parameter>
  <ac:parameter ac:name="alignment">left</ac:parameter>
  <ac:rich-text-body>
    <table class="wrapped">
      <colgroup>
        <col/>
        <col/>
      </colgroup>
      <tbody>
        <tr>
          <td style="text-align: left;">Naam</td>
          <td style="text-align: left;">Bewerken ${item}</td>
        </tr>
        <tr>
          <td style="text-align: left;">Preconditie</td>
          <td style="text-align: left;">
            <ol>
              <li>Er is een <ac:inline-comment-marker ac:ref="66ea9701-3f92-4f9c-8f2b-c8fd305aa983">instantie</ac:inline-comment-marker> van ${item} geinstantieerd</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">Postconditie</td>
          <td style="text-align: left;">
            <ol>
              <li>De attributen van het door Beheerder gewenste ${item} zijn geupdated met de door Beheerder opgegeven nieuwe waarden van de attributen</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">Brief description</td>
          <td style="text-align: left;">
            <p>
              <br/>
            </p>
            <p>Beheerder bekijkt de lijst ${item}'s waar hij toegang toe heeft. Beheerder selecteert een specifieke instantie om deze te bewerken. Beheerder ziet de bekende waarden van ${attributenlijst} in een formulier en kan deze bewerken. Beheerder kiest opslaan. De nieuw ingevulde gegevens worden opgeslagen.</p>
            <p>
              <br/>
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: left;">
            <p>Happy flow</p>
          </td>
          <td colspan="1" style="text-align: left;">
            <ol>
              <li>Beheerder geeft aan lijst ${item}'s te willen bekijken</li>
              <li>Systeem presenteert lijst ${item}'s</li>
              <li>Beheerder selecteert specifieke instantie van ${item} om te bewerken</li>
              <li>Systeem presenteert details van ${item}</li>
              <li>Beheerder past de te bewerken attributen aan</li>
              <li>Beheerder Geeft aan de aangepaste waarden op te willen slaan</li>
              <li>Systeem slaat de nieuwe attributen op</li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  </ac:rich-text-body>
</ac:structured-macro>
<ac:structured-macro ac:macro-id="be8cb00c-f0e2-4a9a-8db7-119e81021e42" ac:name="captioneditem" ac:schema-version="1">
  <ac:parameter ac:name="anchor">0TSTC</ac:parameter>
  <ac:parameter ac:name="name">Table</ac:parameter>
  <ac:parameter ac:name="caption">Verwijderen Fully Dressed Usecase</ac:parameter>
  <ac:parameter ac:name="alignment">left</ac:parameter>
  <ac:rich-text-body>
    <table class="wrapped">
      <colgroup>
        <col/>
        <col/>
        <col/>
      </colgroup>
      <tbody>
        <tr>
          <td style="text-align: left;">Naam</td>
          <td colspan="2" style="text-align: left;">Verwijderen ${item}</td>
        </tr>
        <tr>
          <td style="text-align: left;">Preconditie</td>
          <td colspan="2" style="text-align: left;">
            <ol>
              <li>Er is een instantie van ${item} geinstantieerd</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">Postconditie</td>
          <td colspan="2" style="text-align: left;">
            <ol>
              <li>De instantie van ${item} bestaat niet meer</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td style="text-align: left;">Brief description</td>
          <td colspan="2" style="text-align: left;">Beheerder bekijkt de lijst ${item}'s waar hij toegang toe heeft. Beheerder selecteert een specifieke instantie om deze te verwijderen. Systeem vraagt om bevestiging. Beheerder bevestigt het verwijderen van ${item}. Systeem verwijdert ${item}.</td>
        </tr>
        <tr>
          <td colspan="1">Happy flow</td>
          <td colspan="2">
            <ol>
              <li>Beheerder selecteert specifieke instantie van ${item} om te verwijderen</li>
              <li>Systeem vraagt om bevestiging ${item} te verwijderen</li>
              <li>Beheerder bevestigt het verwijderen van ${item}</li>
              <li>Systeem verwijdert ${item}</li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  </ac:rich-text-body>
</ac:structured-macro>

`;
};
