//Drag and Drop events

let img = document.getElementById('img');
let whiteBoxes = document.getElementsByClassName('whiteBoxes');

//DragStart and DragEnd events can be only performed on draggable elements

img.addEventListener('dragstart',(e)=>{
    console.log('dragStart event triggerd');
    e.target.className += ' hold';
    setTimeout(() => {
        e.target.className = 'hide';   
    }, 0);
});

img.addEventListener('dragend',(e)=>{
    console.log('dragEnd event triggerd');
    e.target.className = 'imageBox';
});

//Other draggable events 

for (let whiteBox of whiteBoxes) {
    whiteBox.addEventListener('dragenter',(e)=>{
        console.log('dragEnter event triggerd');
        e.target.className = 'dashed';
    });
    whiteBox.addEventListener('dragover',(e)=>{
        //It is necessary tp prevent deafault behaviour of dragOver event
        e.preventDefault();
        console.log('dragOver event triggerd');
    });
    whiteBox.addEventListener('dragleave',(e)=>{
        console.log('dragLeave event triggerd');
        e.target.className = 'whiteBoxes';
    });
    whiteBox.addEventListener('drop',(e)=>{
        console.log('drop event triggerd');
        e.target.append(img);
        e.target.className = 'whiteBoxes';
    });
}
