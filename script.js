const books = []
const booksCounter = document.querySelector('.book-count > span')
const booksContainer = document.querySelector('.books')
const addBookButton = document.querySelector('#add-book-button')
const dialog = document.querySelector('dialog')
const form = document.querySelector('form')
const closeDialogButton = form.querySelector('.close')
const resetDialogButton = form.querySelector('.reset')
const dialogAddButton = form.querySelector('.add')
const dialogTitle = form.querySelector('.title')
const dialogAuthor = form.querySelector('.author')
const dialogPages = form.querySelector('.pages')
const dialogReadCheck = form.querySelector('#read')

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let animalFarm = new Book('animal farm', 'george orwell',114,false)
let anotherBook = new Book('some title' ,'some author', 116,true)
let thirdBook = new Book('last title', 'last author', 446,false)

books.push(animalFarm,anotherBook,thirdBook)

function createBookElement(bookObject,index){
    let book = document.createElement('div')
    let title = document.createElement('h1')
    let author = document.createElement('h1')
    let pages = document.createElement('h1')
    let readStatus = document.createElement('button')
    let remove = document.createElement('button')
    
    book.appendChild(title)
    book.appendChild(author)
    book.appendChild(pages)
    book.appendChild(readStatus)
    book.appendChild(remove)

    book.classList.add('book')
    title.classList.add('title')
    author.classList.add('author')
    pages.classList.add('pages')
    readStatus.classList.add('read-status',`${bookObject.read ? 'read' : 'not-read'}`)
    remove.classList.add('remove')
    readStatus.setAttribute("index",index)
    remove.setAttribute("index",index)

    readStatus.addEventListener('click',function(){
        books[index].readStatus = !books[index].readStatus
        resetLibrary(books)
    })

    remove.addEventListener('click',function(){
        books.splice(index,1)
        resetLibrary(books)
    })

    title.textContent = bookObject.title
    author.textContent = bookObject.author
    pages.textContent = bookObject.pages
    bookObject.read ? (readStatus.textContent = 'read') : (readStatus.textContent ='not read')
    remove.textContent = 'remove'

    return book
}

function resetLibrary(books){
    let bookElements = []
    books.forEach( (book,index) =>{ 
        let bookElement = createBookElement(book,index)
        bookElements.push(bookElement)
    })
    booksContainer.replaceChildren('')
    bookElements.forEach(item=>{
        booksContainer.appendChild(item)
    })
    booksCounter.textContent = books.length
}

addBookButton.addEventListener('click',function(){
    form.reset()
    dialog.showModal()
})

closeDialogButton.addEventListener('click',function(){
    form.reset()
    dialog.close()
})

form.addEventListener('submit',function(e){
    e.preventDefault()
    let Ob = new Book(dialogTitle.value,dialogAuthor.value,dialogPages.value,dialogReadCheck.value)
    books.push(Ob)
    form.reset()
    dialog.close()
    resetLibrary(books)
})



resetLibrary(books)
