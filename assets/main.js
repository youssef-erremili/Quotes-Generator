const category = 'computers';
const url = 'https://api.api-ninjas.com/v1/quotes?category=' + category;
const apiKey = 'yfixoj9cWc3s7UmBI2lGfQ==2QNByH09NUJv47SR';
const quote = document.getElementById("quote")
const author = document.getElementById("author")
const saveBtn = document.getElementById("saveBtn")


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
            saveBtn.addEventListener("click", () => {
                console.log(data[0].quote);
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


window.addEventListener("load", function () {
    return fetchQuote()
})