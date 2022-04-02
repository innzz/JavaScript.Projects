// console.log("This is my library website");
//show function here so if local storage has any element it will show them at first
showEntry();

//declaring class books which will not have functions
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

//declaring class display which will have some functions which will be performed
class Display{


    //Add function which will add elements in form
    add(book){
            let addOwnerName = book.Name;
            let addBookName = book.Book;
            let addTime = `${book.Time.Hour}:${book.Time.Minutes}:${book.Time.Seconds}`;
            let bookOwnerName = localStorage.getItem("bookOwnerName");
            let bookOwnerNameObj;//Making an object variable which will become array or empty array
            let bookName = localStorage.getItem("bookName");
            let bookNameObj;
            let bookTime = localStorage.getItem("bookTime");
            let bookTimeObj;
            //Checking if the element is empty or not
            if(bookOwnerName == null)
            {
                bookOwnerNameObj = [];//This will convert that previous object variable into empty array if element will be empty
            }
            else
            {
                bookOwnerNameObj = JSON.parse(bookOwnerName);//This will convert that previous object variable into array if element will not be empty
            }
            //doing same for other elements
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
            //This will push the values in created array
            bookOwnerNameObj.push(addOwnerName);
            bookNameObj.push(addBookName);
            bookTimeObj.push(addTime);
            //THis will set the array object into localstorage by converting into string
            localStorage.setItem("bookOwnerName",JSON.stringify(bookOwnerNameObj));
            localStorage.setItem("bookName",JSON.stringify(bookNameObj));
            localStorage.setItem("bookTime",JSON.stringify(bookTimeObj));
            //After that the showEntry function will run again
            showEntry();
            

    }
    //it will clear the form after submitting
    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();}

    //It will check if the book values are filled properly
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

//This function will show all the entries in form one by one as per the entries perform
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
    tableBody.innerHTML = "";//Creating it empty so that the previous values should not be get printed with new ones
    bookOwnerNameObj.forEach(function(element,index){
        let formstring = `
        <tr class="entryText" >
        <td>${element}</td>
        <td>${bookNameObj[index]}</td>
        <td>${bookTimeObj[index]}</td>
        <td><button id="${index}" onclick="deleteNote(this.id)" type="delete" class="btn">Cancel</button></td>
        </tr>`;
        tableBody.innerHTML += formstring;//Whole string of every object is stored in this formstring variable
    });

    //This will execute when the object will be empty
    let tableText = document.getElementById('tableDiv');
    if(bookOwnerNameObj.length != 0){
        tableText.innerHTML = "";
    }
    else
    {
        tableText.innerHTML = `<h5 class="m-auto container">Your entries will be shown here!</h5>`;
    }

}

//It will delete the entry by taking their index
function deleteNote(index){
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
    //This will remove that element of which the id is given to it
    bookOwnerNameObj.splice(index,1);
    bookNameObj.splice(index,1);
    bookTimeObj.splice(index,1);
    //after that the new lenght of an array will be there
    localStorage.setItem("bookOwnerName",JSON.stringify(bookOwnerNameObj));
    localStorage.setItem("bookName",JSON.stringify(bookNameObj));
    localStorage.setItem("bookTime",JSON.stringify(bookTimeObj));
    //We will have to show all the elements again
    showEntry();

};

//Function to search
let search = document.getElementById("searchbtn");
search.addEventListener('input',function()
{
    let searchVal = search.value;
    let entryText = document.getElementsByClassName("entryText");
    Array.from(entryText).forEach(function(element)
    {
        let noteTextName = element.getElementsByTagName('td')[0].innerText;
        let noteTextBookName = element.getElementsByTagName('td')[1].innerText;
        let noteTextTime = element.getElementsByTagName('td')[2].innerText;
        if(noteTextName.includes(searchVal)|| noteTextBookName.includes(searchVal) || noteTextTime.includes(searchVal))
        {
            element.style.display = "revert";
        }
        else
        {
            element.style.display = "none";
        }
    })
})


//THis function will be listen after the form is submit button is clicked 
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);


//THis is the function which will get listen
function libraryFormSubmit(e){
    let Name = document.getElementById('Name').value;
    let bookName = document.getElementById('selectBook').value;
    let book = new Books(Name,bookName);

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
