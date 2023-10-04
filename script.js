const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".from-to"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange"),
  translateBtn = document.querySelector("button"),
  Icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    console.log(tag);
    for (const country_code in countries) {
      // to show the country code
      //   console.log(country_code);

      console.log(countries[country_code]); // to show the country name
      // selecting English by defaultas FROM language Hindi as TO language
      let selected;
      if (id == 0 && country_code == "en-US") {
        selected = "selected";
      } else if (id == 1 && country_code == "hi-IN") {
        selected = "selected";
      }
      let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option); // adding options tags inside select tag
    }
})

exchangeIcon.addEventListener("click", () =>{
    // exchanging textarea and select tag values
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value= selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () =>{
  let Text = fromText.value;

  (translateFrom = selectTag[0].value), // getting fromselect tag value
  (translateTo = selectTag[1].value); // getting toselect tag value
  console.log(Text, translateFrom, translateTo);
      let apiUrl = `https://api.mymemory.translated.net/get?q=${Text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl).then(res => res.json()).then(data => {
     console.log(data);
     toText.value = data.responseData.translatedText;
  });

})

Icons.forEach(icon => {
    icon.addEventListener("click", ({target}) =>{
        console.log(target)
        // to copy the text from the textarea 
            if(target.classList.contains("fa-copy")){
                if(target.id == "from"){
                    navigator.clipboard.writeText(fromText.value)
                } else{
 navigator.clipboard.writeText(toText.value);
                }
            } else{
                let utterance;
                // if clicked icon has from id, speak the fromtextarea value else speak the totextarea value
                if(target.id == "from"){
                   utterance = new SpeechSynthesisUtterance(fromText.value);
                   utterance.lang = selectTag[0].value; // setting utterance language to fromselect tag value
                }else{
                  utterance = new SpeechSynthesisUtterance(toText.value);
                  utterance.lang = selectTag[1].value; // setting utterance language to toselect tag value
                }
                speechSynthesis.speak(utterance); // speak the passed utterance
            }
    })
})