// #tab1
const bookContainer = document.querySelector('.bookcontainer');
const STORAGE_KEY = 'booksArr';

window.addEventListener('load', function () {
    loadDataFromLocalStorage();
    renderBooks();
});

window.addEventListener('beforeunload', function () {
    saveToLocalStorage();
});

function loadDataFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedBooks) {
        booksArr.push(...storedBooks);
    }
}

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksArr));
}

function openTab(tabName) {
    const tabContent = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = 'block';

    const clickedTab = document.querySelector('.tab[data-tab="' + tabName + '"]');
    clickedTab.classList.add("active");
}

openTab('tab1');

function openAddBookModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

function closeAddBookModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

const booksArr = [];

function saveBook() {
    const authorName = document.getElementById('authorName').value;
    const publicationDate = document.getElementById('publicationDate').value;
    const pages = document.getElementById('pages').value;
    const quantity = document.getElementById('quantity').value;

    if (!authorName || !publicationDate || isNaN(pages) || isNaN(quantity)) {
        alert("Please fill out every field with valid data.");
        return;
    }

    const id = Date.now();
    const bookObject = { authorName, publicationDate, pages, quantity, id };
    booksArr.push(bookObject);
    renderBooks();
    console.log(booksArr);
    saveToLocalStorage();
    closeAddBookModal();
}

function showMoreInfo(element) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h3>${element.authorName}'s Book</h3>
        Author:
        <input id="editAuthor" value="${element.authorName}">
        Publication Date:
        <input id="editPublicationDate" value="${element.publicationDate}">
        Pages:
        <input id="editPages" value="${element.pages}">
        Quantity:
        <input id="editQuantity" value="${element.quantity}">
        <button id="saveEdit">Save Edit</button>
    `;

    document.querySelector('#tab1').appendChild(modal);
    modal.appendChild(content);

    const saveEditButton = document.getElementById('saveEdit');
    saveEditButton.addEventListener('click', () => {
        const editedBook = {
            id: element.id,
            authorName: document.getElementById('editAuthor').value,
            publicationDate: document.getElementById('editPublicationDate').value,
            pages: document.getElementById('editPages').value,
            quantity: document.getElementById('editQuantity').value,
        };

        const index = booksArr.findIndex(item => item.id === element.id);
        if (index !== -1) {
            booksArr[index] = editedBook;
            saveToLocalStorage(); 
            renderBooks(); 
        }

        closeModal();
    });

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';

    modal.remove();
}

function renderBooks() {
    const bookContainer = document.querySelector('.bookcontainer');
    bookContainer.innerHTML = '';

    booksArr.forEach(element => {
        const newBookSection = document.createElement('section');
        newBookSection.className = 'book-section';
        newBookSection.innerHTML = `
            <h1>${element.authorName}</h1>  
            <p>Published on ${element.publicationDate}</p>`;

        const moreButton = document.createElement('button');
        moreButton.innerText = 'More';
        moreButton.addEventListener('click', function () {
            showMoreInfo(element);
        });
        newBookSection.appendChild(moreButton);

        bookContainer.appendChild(newBookSection);
    });
}

function clearLocalStorage() {
    localStorage.removeItem(STORAGE_KEY);
}
clearLocalStorage()

// #tab2

const usersArr = [];
const addUserModal = document.getElementById('addUserModal')
const closeUserModalButton = document.getElementById('closeUserModal')
const addUserButton = document.getElementById('addUserButton')
const saveUserButton = document.getElementById('saveUser')


window.addEventListener('load', function () {
    loadUsersFromLocalStorage();
    renderUsers();
});

addUserButton.addEventListener('click', function(){
    addUserModal.style.display = 'block'
})

closeUserModalButton.addEventListener('click', closeUserModal)


function closeUserModal(){
    addUserModal.style.display = 'none'
}

saveUserButton.addEventListener('click', function(){
    const bookTitle = document.getElementById('bookTitle').value;
    const visitorName = document.getElementById('visitorName').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const userQuantity = document.getElementById('userQuantity').value;

    if (!bookTitle || !visitorName || !genre || !year || !userQuantity) {
        alert('Please fill in all fields.');
        return;
    }

    const user = { bookTitle, visitorName, genre, year, userQuantity};
    usersArr.push(user);

    saveUsersToLocalStorage();

    document.getElementById('bookTitle').value = '';
    document.getElementById('visitorName').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
    document.getElementById('userQuantity').value = '';
    addUserModal.style.display = 'none';

    renderUsers();
}) 

function renderUsers() {
    const userListContainer = document.getElementById('userListContainer');
    userListContainer.innerHTML = '';

    usersArr.forEach(element => {
        const newUser = document.createElement('section');
        newUser.className = 'savedUserSection';
        newUser.innerHTML = `
            <h3>Book Title:</h3>
            <p>${element.bookTitle}</p>
            <h3>Visitor's Name:</h3>
            <p>${element.visitorName}</p>
            <h3>Genre:</h3>
            <p>${element.genre}</p>
            <h3>Year:</h3>
            <p>${element.year}</p>
            <h3>Quantity:</h3>
            <p>${element.userQuantity}</p>
        `;
        userListContainer.appendChild(newUser);
    });
}

function saveUsersToLocalStorage() {
    localStorage.setItem('usersArr', JSON.stringify(usersArr));
}

function loadUsersFromLocalStorage() {
    const storedUsers = JSON.parse(localStorage.getItem('usersArr'));
    if (storedUsers) {
        usersArr.push(...storedUsers);
    }
}

function clearLocalStorage2() {
    localStorage.removeItem('usersArr')
}
// #tab3
var selectedRow = null;
const CONTACTS_STORAGE_KEY = 'contactsArr';
const contactsArr = [];

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.contactsContainer');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => div.remove(), 3000);
}

function clearFields() {
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#rollNo').value = '';
}

document.querySelector('#student-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const rollNo = document.querySelector('#rollNo').value;

    if (firstName == '' || lastName == '' || rollNo == '') {
        showAlert('Please fill in all fields', 'danger');
    } else {
        if (selectedRow == null) {
            const list = document.querySelector('#student-list');
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btnEdit btn-sm edit">Edit</a>
                    <a href="#" class="btnDelete btn-sm delete">Delete</a>
                </td>
            `;

            list.appendChild(row);
            showAlert(`User's contact addded`, 'success');
            contactsArr.push({ firstName, lastName, rollNo });
            saveContactsToLocalStorage();
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            showAlert(`User's contact edited`, 'info');
            saveContactsToLocalStorage();
            selectedRow = null; 
        }
        renderContacts();
        clearFields();
    }
});

document.querySelector('#student-list').addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('edit')) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector('#firstName').value = selectedRow.children[0].textContent;
        document.querySelector('#lastName').value = selectedRow.children[1].textContent;
        document.querySelector('#rollNo').value = selectedRow.children[2].textContent;
    }
});

document.querySelector('#student-list').addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('delete')) {
        const rowIndex = Array.from(target.parentElement.parentElement.parentNode.children).indexOf(target.parentElement.parentElement);
        contactsArr.splice(rowIndex, 1);
        showAlert(`User's contact deleted`, 'danger');
        saveContactsToLocalStorage();
        renderContacts();
    }
});

function loadContactsFromLocalStorage() {
    const storedContacts = JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY)) || [];
    contactsArr.push(...storedContacts);
}

function saveContactsToLocalStorage() {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contactsArr));
}

function renderContacts() {
    const contactList = document.querySelector('#student-list');
    contactList.innerHTML = '';

    contactsArr.forEach(contact => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.rollNo}</td>
            <td>
                <a href="#" class="btnEdit btn-sm edit">Edit</a>
                <a href="#" class="btnDelete btn-sm delete">Delete</a>
            </td>
        `;
        contactList.appendChild(newRow);
    });
}

window.addEventListener('load', function () {
    loadContactsFromLocalStorage();
    renderContacts();
});

