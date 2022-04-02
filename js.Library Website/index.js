console.log("This is my library website");
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
        let tableBody = document.getElementById('tableBody');
        let formstring = `
        <tr>
                <th scope="row">${book.Name}</th>
                <td>${book.Book}</td>
                <td>${book.Time.Hour}: ${book.Time.Minutes}: ${book.Time.Seconds}</td>
                <td><button id="delete" type="delete" class="btn">Cancel</button></td>
        </tr>`;
        tableBody.innerHTML += formstring;
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

function libraryFormSubmit(e){
    console.log("I am submitting the form");
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
    }
    else
    {
        display.show("Error","There is something wrong!");
    }
}