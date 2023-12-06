const bookApiUrl = 'https://striveschool-api.herokuapp.com/books';
const bookList = document.getElementById('bookList');

fetch(bookApiUrl)
    .then(response => response.json())
    .then((data) => {
        libraryBooks(data)
    });


// Funzione per creare la libreria
function libraryBooks(books) {

    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4');

        card.innerHTML = `
            <div class="card">
                <img src="${book.img}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <p class="card-text">Prezzo: ${book.price} €</p>
                    <p class="card-text">${book.category}</p>

                    <button class="btn btn-danger" onclick="removeCard(event)">Scarta</button>
                    <button class="btn btn-primary" onclick="addToCart('${book.title}', ${book.price})">Compra ora</button>
                </div>
            </div>
        `;

        bookList.appendChild(card);
    });
}

// Funzione per scartare un libro dalla libreria
function removeCard(event) {
    const card = event.target.closest('.card').remove()
}

// Funzione per aggiungere un libro al carrello
function addToCart(title, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const book = { title, price };
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartList();
}

// Funzione per rimuovere un libro dal carrello
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartList();
}


// Funzione per le liste del carrello collegate al localStorage
function cartList() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    cart.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerHTML = `
            ${book.title} - ${book.price} €
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Rimuovi</button>
        `;
        cartList.appendChild(listItem);
    });
}


