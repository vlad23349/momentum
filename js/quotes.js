const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

export async function getQuotes(language = "en") {
  if (language === null) language = "en";
  const quotes = `../data${language}.json`;
  const quotesNum = language === "en" ? 1642 : 20;
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * quotesNum);

  quote.textContent = `"${data[randomNum].text}."`;
  author.textContent = `${data[randomNum].author}`;
  localStorage.setItem("language", language);
}

document.addEventListener("DOMContentLoaded", () => {
  getQuotes(localStorage.getItem("language"));
});

changeQuote.addEventListener("click", () => {
  getQuotes(localStorage.getItem("language"));
});
