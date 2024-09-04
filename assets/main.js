let category = 'computers';
let url = 'https://api.api-ninjas.com/v1/quotes?category=' + category;
const apiKey = 'yfixoj9cWc3s7UmBI2lGfQ==2QNByH09NUJv47SR';
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let saveBtn = document.getElementById("saveBtn");
let generatBtn = document.getElementById("generatBtn");
let table = document.getElementById("table");

// Function to fetch the quote
function fetchQuote() {
    quote.innerText = "Loading...";
    author.innerText = "";

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            quote.innerText = `"${data[0].quote}"`;
            author.innerText = `-${data[0].author}`;
            saveBtn.dataset.author = data[0].author;
            saveBtn.dataset.quote = data[0].quote;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to add a quote to the table
function addQuoteToTable(authorText, quoteText) {
    let tr = document.createElement('tr');

    let tdAuthor = document.createElement('td');
    tdAuthor.className = 'capitalize px-6 py-3';
    tdAuthor.innerText = authorText;

    let tdQuote = document.createElement('td');
    tdQuote.className = 'capitalize px-6 py-3';
    tdQuote.innerText = quoteText;

    let tdButton = document.createElement('td');
    tdButton.className = 'capitalize px-6 py-3';
    let button = document.createElement('button');
    button.type = 'button';
    button.setAttribute("onclick", "deleteRowTable(this)");
    let icon = document.createElement('ion-icon');
    icon.className = 'text-red-700 text-2xl';
    icon.name = 'trash-sharp';

    button.appendChild(icon);
    tdButton.appendChild(button);

    tr.appendChild(tdAuthor);
    tr.appendChild(tdQuote);
    tr.appendChild(tdButton);

    table.appendChild(tr);
}

// Function to delete a row from the table
function deleteRowTable(button) {
    let row = button.closest('tr');
    row.remove();
}

saveBtn.addEventListener("click", () => {
    let authorText = saveBtn.dataset.author;
    let quoteText = saveBtn.dataset.quote;
    addQuoteToTable(authorText, quoteText);
});

// Generate a new quote when the page is loaded
window.addEventListener("load", function () {
    return fetchQuote();
});

// Generate a new quote when the generate button is clicked
generatBtn.addEventListener("click", function () {
    return fetchQuote();
});
