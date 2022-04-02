showNotes(); 


//if user adds a note, add it into localstorage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',function(e)
{
    let addtxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    notesTitle.push(addtitle.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addtxt.value = "";
    // console.log(notesObj);
    showNotes();
})


//Function to show the notes
function showNotes()
{
    let notes = localStorage.getItem('notes');
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
        html+=`
        <div class="my-2 mx-2 noteCard" id="NoteCard" style="width: 18rem; border:2px solid grey">
        <div class="card-body">
          <h5 class="card-title" >Note ${index+1}</h5>
            <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="my-2 btn btn-primary">Delete note</button>
        </div>
      </div>
        `;
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
    console.log("i am deletng",index);
    let notes = localStorage.getItem('notes');
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
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


//Function to create a editable title for a note
// function changeTitle(index){
//     let title = document.getElementById(index);
//     title.addEventListener('click',function()
//     {
//         let noTextarea = document.getElementsByClassName('noTextarea').length;
//         if(noTextarea == 0){
//             let html = index.innerHTML;
//             index.innerHTML =  `<textarea class="textareaClass" id="textareaId" placeholder="Leave a comment here">${html}</textarea>`;}
//     let textarea = document.getElementById('textareaClass');
//     textarea.addEventListener('blur',function()
//     {
//         index.innerHTML = textarea.value;
//     })
// })
// }