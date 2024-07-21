let bookTitle = document.querySelector('.book-title')
let bookPages = document.querySelector('.book-pages')
let bookStatus = document.querySelector('.book-read-status')
const table = document.getElementById('table')



const myLibrary = [
    new Book("The Fellowship of the Ring", 423, false),
    new Book("The Hobbit", 310, true),
    new Book("The Way of Kings", 1280, true)
];



function Book(title, pages, status) {
  this.title = title;
  this.pages = pages;
  this.isRead = status;
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

function initializeButtons() {
    
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr');
            const index = row.getAttribute('data-index-number');
            const book = myLibrary[index];
            if(book){
            book.toggleReadStatus();
            button.textContent = book.isRead ? "Read" : "Unread";
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', initializeButtons);


document.querySelector('.book-info').addEventListener('submit', function(event) {
    event.preventDefault(); 
});

let changeStatusButton = document.querySelectorAll('.toggle-button')
document.querySelector(".add-book-button").addEventListener("click", openBookForm)
document.querySelector(".close-dialog-btn").addEventListener("click", closeDialog)
document.querySelector(".submit-book-btn").addEventListener("click", infoSubmit)

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', deleteRow);
})

function deleteRow(event){
    const button = event.target
    const row = button.closest('tr')
    const index = row.getAttribute('data-index-number')

    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
    }
    row.remove();
}







    
    


function createDeleteButton(row) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Remove";
    deleteButton.setAttribute("class", "delete-button")
    deleteButton.addEventListener('click', deleteRow);
    return deleteButton;
}


function openBookForm() {
    const openBtn = document.querySelector(".add-book-dialog")
    openBtn.open = true;
}

function closeDialog() {
   const closeBtn = document.querySelector('.add-book-dialog')
   closeBtn.close()
  }

function infoSubmit() {
   const closeBtn = document.querySelector('.add-book-dialog')


   let addition = new Book(bookTitle.value, bookPages.value, bookStatus.value === "true")
   myLibrary.push(addition)



   

        const row = table.insertRow();
        const index = myLibrary.length - 1
        row.setAttribute('data-index-number', index);
            
            const titleCell = row.insertCell();
            titleCell.textContent = addition.title;
            
            
            const pagesCell = row.insertCell();
            pagesCell.textContent = addition.pages;


            const statusCell = row.insertCell();
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('toggle-button');
            console.log(bookStatus.value)
            if(bookStatus.value === "yes" || bookStatus.value === "read"){
                addition.isRead = true;
            } else {
                addition.isRead = false;
            }
            toggleButton.textContent = addition.isRead ? "Read" : "Not Read";
            statusCell.appendChild(toggleButton);

                toggleButton.addEventListener('click', function() {
                    addition.toggleReadStatus();
                    toggleButton.textContent = addition.isRead ? "Read" : "Not Read";
                });




            

        row.insertCell()
        let deleteCell = row.cells[3]
        
        

    
        deleteButton = createDeleteButton(deleteCell)
        
       
       deleteCell.appendChild(deleteButton)
    
   
   closeBtn.close()
  }
