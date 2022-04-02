console.log("This is my library website");
showEntry();
class Books{
    constructor(Name,bookName){
        this.Name = Name;
        this.Book = bookName;
        let LiveTime = new Date();
        this.Time = {
            "Hour":`${LiveTime.getHours()}`,
            "Minutes":`${LiveTime.getMinutes()}`,
            "Seconds":`${LiveTime.getSeconds()}`
        }
    }
};

class Display{
    //It will add row in form
    add(book){
            let addOwnerName = book.Name;
            let addBookName = book.Book;
            let addTime = `${book.Time.Hour}:${book.Time.Minutes}:${book.Time.Seconds}`;
            let bookOwnerName = localStorage.getItem("bookOwnerName");
            let bookOwnerNameObj;
            let bookName = localStorage.getItem("bookName");
            let bookNameObj;
            let bookTime = localStorage.getItem("bookTime");
            let bookTimeObj;
            if(bookOwnerName == null)
            {
                bookOwnerNameObj = [];
            }
            else
            {
                bookOwnerNameObj = JSON.parse(bookOwnerName);
            }
            if(bookName == null)
            {
                bookNameObj = [];
            }
            else
            {
                bookNameObj = JSON.parse(bookName);
            }
            if(bookTime == null)
            {
                bookTimeObj = [];
            }
            else
            {
                bookTimeObj = JSON.parse(bookTime);
            }
            bookOwnerNameObj.push(addOwnerName);
            bookNameObj.push(addBookName);
            bookTimeObj.push(addTime);
            localStorage.setItem("bookOwnerName",JSON.stringify(bookOwnerNameObj));
            localStorage.setItem("bookName",JSON.stringify(bookNameObj));
            localStorage.setItem("bookTime",JSON.stringify(bookTimeObj));
            showEntry();
            

    }
    //it will clear the form after submitting
    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();}
    validate(book){
        if(book.Name.length<2){
            return false;
        }
        else
        {
            return true;
        }
    }
    //it will show the alert slider
    show(type,message){
        let boldText;
        if(type =="Success"){
            boldText = "Success";
        }
        else
        {
            boldText = "Error";
        }
        let alert = document.getElementById('Alert');
        alert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>${boldText}!</strong> ${message}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        setTimeout(function() {
          alert.innerHTML = "";  
        },3000);
    }
    
}
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);
    function showEntry(){
    let bookOwnerName = localStorage.getItem("bookOwnerName");
    let bookOwnerNameObj;
    let bookName = localStorage.getItem("bookName");
    let bookNameObj;
    let bookTime = localStorage.getItem("bookTime");
    let bookTimeObj;
    if(bookOwnerName == null)
    {
        bookOwnerNameObj = [];
    }
    else
    {
        bookOwnerNameObj = JSON.parse(bookOwnerName);
    }
    if(bookName == null)
    {
        bookNameObj = [];
    }
    else
    {
        bookNameObj = JSON.parse(bookName);
    }
    if(bookTime == null)
    {
        bookTimeObj = [];
    }
    else
    {
        bookTimeObj = JSON.parse(bookTime);
    }
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    bookOwnerNameObj.forEach(function(element,index){
        let formstring = `
        <tr>
        <th scope="row">${element}</th>
        <td>${bookNameObj[index]}</td>
        <td>${bookTimeObj[index]}</td>
        <td><button id="${index}" onclick="deleteNote(this.id)" type="delete" class="btn">Cancel</button></td>
        </tr>`;
        tableBody.innerHTML += formstring;
    });
    let tableText = document.getElementById('tableDiv');
    if(bookOwnerNameObj.length != 0){
        tableText.innerHTML = "";
    }
    else
    {
        tableText.innerHTML = `<h5 class="m-auto container">Your entries will be shown here!</h5>`;
    }

}
function deleteNote(index){
    console.log(`I am deleting ${index}`)
    let bookOwnerName = localStorage.getItem("bookOwnerName");
    let bookOwnerNameObj;
    let bookName = localStorage.getItem("bookName");
    let bookNameObj;
    let bookTime = localStorage.getItem("bookTime");
    let bookTimeObj;
    if(bookOwnerName == null)
    {
        bookOwnerNameObj = [];
    }
    else
    {
        bookOwnerNameObj = JSON.parse(bookOwnerName);
    }
    if(bookName == null)
    {
        bookNameObj = [];
    }
    else
    {
        bookNameObj = JSON.parse(bookName);
    }
    if(bookTime == null)
    {
        bookTimeObj = [];
    }
    else
    {
        bookTimeObj = JSON.parse(bookTime);
    }
    bookOwnerNameObj.splice(index,1);
    bookNameObj.splice(index,1);
    bookTimeObj.splice(index,1);
    localStorage.setItem("bookOwnerName",JSON.stringify(bookOwnerNameObj));
    localStorage.setItem("bookName",JSON.stringify(bookNameObj));
    localStorage.setItem("bookTime",JSON.stringify(bookTimeObj));
    showEntry();

};
function libraryFormSubmit(e){
    console.log("I am submitting the form");
    let tableBody = document.getElementById("tableBody");
    let Name = document.getElementById('Name').value;
    let bookName = document.getElementById('selectBook').value;

    let book = new Books(Name,bookName);
    // console.log(book);
    e.preventDefault();

    let display = new Display();
    if(display.validate(book)){
    display.add(book);
    display.clear();
    display.show("Success","Your entry has been succefully recorded");
    showEntry();
    }
    else
    {
        display.show("Error","There is something wrong!");
    }
}
