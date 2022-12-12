const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotesBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; //On met let au lieu de constantes par ce que on va modifier apiQuotes

// Show Loading

function loading() {
    loader.hidden = false; 
    quoteContainer.hidden= true;
}

// Hidde Loading

function complete() {
    loader.hidden = true; 
    quoteContainer.hidden= false;
}

// Show New Quotes

function newQuote() {
    loading();
    // Pick a random Quote from API quote array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    // Check if author is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author; 
    }

    // changer la taille de la font si la citation est trop longue

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quotes, Hide Loader
    complete();

    quoteText.textContent = quote.text;
}

//  Get Quotes From API

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error)
        // Catch Error Here
    }
}

// Tweet Quote

function tweetQuote() {
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners

newQuotesBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
