const newQuoteBtn = document.getElementById("new-quote-btn");
const quoteText = document.querySelector(".quote-text");
const authorName = document.querySelector(".author-name");

const dots = newQuoteBtn.querySelector(".dots");

function showLoading() {
  dots.classList.remove("hidden");
  newQuoteBtn.disabled = true;
}

function hideLoading() {
  dots.classList.add("hidden");
  newQuoteBtn.disabled = false;
}

function removeSkeleton() {
  [quoteText, authorName].forEach((el) => el.classList.remove("skeleton-text"));
}

function showSkeleton() {
  [quoteText, authorName].forEach((el) => el.classList.add("skeleton-text"));
}

async function loadQuotes() {
  showSkeleton();
  showLoading();
  try {
    const res = await fetch("quotes.json");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const quoteData = await res.json();
    let randomIndex = Math.floor(Math.random() * quoteData.length);
    const quote = quoteData[randomIndex];
    setTimeout(() => {
      removeSkeleton();
      hideLoading();
      quoteText.textContent = quote?.text || "No quote found";
      authorName.textContent = `- ${quote?.author}` || "- Unknown";
    }, 1000);
  } catch (error) {
    quoteText.textContent = "Failed to load data";
    authorName.textContent = "";
    hideLoading();
    removeSkeleton();
  }
}

newQuoteBtn.addEventListener("click", loadQuotes);
loadQuotes();
