showNotes(); 


//if user adds a note, add it into localstorage
//Also if users adds a title, add it into local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',function(e)
{
    let addtxt = document.getElementById('addTxt');
    let addtitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem('notesTitle');
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    if(notesTitle == null)
    {
        TitleObj = [];
    }
    else
    {
        TitleObj = JSON.parse(notesTitle);
    }
    notesObj.push(addtxt.value);
    TitleObj.push(addtitle.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    localStorage.setItem('notesTitle',JSON.stringify(TitleObj));
    addtxt.value = "";
    addtitle.value = "";
    // console.log(notesObj);
    showNotes();
})
// localStorage.clear();

//Function to show the notes
function showNotes()
{
    let notes = localStorage.getItem('notes');
    let notesTitle = localStorage.getItem('notesTitle');
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    if(notesTitle == null)
    {
        TitleObj = [];
    }
    else
    {
        TitleObj=JSON.parse(notesTitle);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
    if(TitleObj[index] == "" && TitleObj[index] == [] )//This statement will chack whether Title array object is empty or not if it will be empty then it will print the number of note
    {
            html+=`
            <div class="my-2 mx-2 noteCard" id="NoteCard" style="width: 18rem; border:2px solid grey">
            <div class="card-body">
              <h5 class="card-title" >Note ${index+1}</h5>
                <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="my-2 btn btn-primary">Delete note</button>
            </div>
          </div>
            `; 
    }
    else//If the title object will not be empty then it will print that object in place of title in every note
    {
            html+=`
            <div class="my-2 mx-2 noteCard" id="NoteCard" style="width: 18rem; border:2px solid grey">
            <div class="card-body">
              <h5 class="card-title" >${TitleObj[index]}</h5>
                <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="my-2 btn btn-primary">Delete note</button>
            </div>
          </div>
            `;
    }
    });
    let notesElem = document.getElementById('notes');
    if(notesObj.length!=0)
    {
        notesElem.innerHTML = html;
    }
    else
    {
        notesElem.innerHTML = `Nothing to show! "Add note" to add notes`;
    }

    
}

//Function to delete note
function deleteNote(index){
    // console.log("i am deletng",index);
    let notes = localStorage.getItem('notes');
    let notesTitle = localStorage.getItem('notesTitle');
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    if(notesTitle == null)
    {
        TitleObj = [];
    }
    else
    {
        TitleObj = JSON.parse(notesTitle);
    }
    notesObj.splice(index,1);
    TitleObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("notesTitle",JSON.stringify(TitleObj));
    showNotes();
}

//Function to sort the notes by search
let search = document.getElementById('input');
search.addEventListener('input',function()
{
    let inputVal = search.value;
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    })
})

