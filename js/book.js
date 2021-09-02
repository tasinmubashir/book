
//Arrow Function to load books fetching from API
const loadBooks = () => {
    //Showing the spinner while data is loading
    document.getElementById('search-btn').classList.add('d-none');
    document.getElementById('spinner').classList.remove('d-none');


    //Taking user input
    const userInput = document.getElementById('user-input');
    const searchText = userInput.value;
    //Clear input field
    userInput.value = '';

    //Fetching data from API that user want
    url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(searchText, data))
}

//Arrow Function to display books on UI
const displayBooks = (searchText, books) => {
    //Hiding the Spinner
    document.getElementById('spinner').classList.add('d-none');
    document.getElementById('search-btn').classList.remove('d-none');

    //Getting the books container
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    //Getting the Search Result
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //Checking if there is no book in API data that user searched
    if (books.docs.length === 0) {
        alert(`No Result Found of ${searchText}`);
        //Showing the default background and centering the search box
        document.getElementById('body').style.backgroundImage = 'url(images/background.jpg)';
        document.getElementById('search-container').classList.add('search-center');
    }
    else {
        //Changing the background
        document.getElementById('body').style.background = 'slategray';
        //Moving the search bar at the top
        document.getElementById('search-container').classList.remove('search-center');

        //Books to display (Maximum 20 Books)
        const booksToDisplay = (books.docs).filter(book => ((books.docs).indexOf(book)) < 20)

        //Variable to store number of books showing on UI
        let booksCount = 0;

        //Iterating over the array to display each book
        booksToDisplay.forEach(book => {
            //Incrementing
            booksCount++;

            //Making a variable to store the cover image
            let imgUrl = '';

            //Set custom cover image if cover image undefined in API
            if ((book.cover_i) === undefined) {
                imgUrl = 'https://store.bookbaby.com/MyAccount/CommonControls/BookShopThemes/bookshop/OnePageBookCoverImage.jpg?BookID=BK90045080';
            }
            //Set cover image from API dynamically
            else {
                imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            }
            //Making a card for keeping book informations
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${imgUrl}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${book?.title ? book.title : 'Book Title Unavailable'}</h5>
                        <p class="card-text">Author: <b>${book?.author_name?.[0] ? book.author_name : 'Not Found'}</b>
                        </p>
                        <p class="card-text">
                            First Publish Year: <b>${book?.first_publish_year ? book.first_publish_year : 'Information Unavailable'}</b>
                        </p>
                        <p class="card-text">
                            Publisher: <b>${book?.publisher ? book.publisher : 'Unknown'}</b>
                        </p>
                    </div>
            </div>
            `

            // Appending the book to the books Container
            booksContainer.appendChild(div);

        })

        //Showing the search result details
        const h4 = document.createElement('h4');
        h4.classList.add('text-center', 'text-white', 'fw-lighter');
        h4.innerHTML = `Found ${books.numFound} Results of <b>${searchText}</b> showing ${booksCount}`;
        searchResult.appendChild(h4);
    }
}
