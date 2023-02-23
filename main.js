const quoteContainerTag = document.getElementsByClassName("quote-container")[0];
const quoteTag = document.querySelector("#quote");
const authorTag = document.querySelector("#author");
const btnNewQuoteTag = document.getElementById("btn-newQuote");
const btnTwitterTag = document.querySelector(".btn-twitter");
const loaderTag = document.querySelector("#loader");

const loadingFunc = () => {
  loaderTag.style.display = "block";
  quoteContainerTag.hidden = true;
};

const showDataFunc = () => {
  loaderTag.style.display = "none";
  quoteContainerTag.hidden = false;
};

const generateQuotesFromAPI = async (loadingFunc) => {
  const apiURL = "https://type.fit/api/quotes";
  const response = await fetch(apiURL);
  const data = await response.json();
  rearrangeFetchedData(data);
};

generateQuotesFromAPI().catch((err) =>
  console.log("Error while fetching data from API_url:", err)
);

const rearrangeFetchedData = (data) => {
  loadingFunc();
  setTimeout(() => {
    const newShuffledData = data[Math.floor(Math.random() * data.length)];
    quoteTag.textContent = newShuffledData.text;
    newShuffledData.text.length > 50
      ? quoteTag.classList.add("long-quote")
      : quoteTag.classList.remove("long-quote");
    !newShuffledData.author
      ? (authorTag.textContent = "Annonymous")
      : (authorTag.textContent = newShuffledData.author);
    return showDataFunc();
  }, 3000);
};

const tweetTheQuote = function () {
  console.log("click");
  window.open(
    `https://twitter.com/intent/tweet?text=${quoteTag.textContent} - ${authorTag.textContent}}`
  );
};

btnTwitterTag.addEventListener("click", tweetTheQuote);

btnNewQuoteTag.addEventListener("click", generateQuotesFromAPI);
