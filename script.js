const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".from-to"),
  selectTag = document.querySelectorAll("select"),
  translateBtn = document.querySelector("button");

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