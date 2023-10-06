let books = []

function Book(title,author,pages,readStatus){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus,
    this.changeStatus = function(){
        this.readStatus = !this.readStatus
    }

}

