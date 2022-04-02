let screen = document.getElementById('screen');

let buttons = document.querySelectorAll('button');
// console.log(buttons);
let screenVal = "";
let buttonText = "";

screen.addEventListener('blur',()=>{
    if (screen.value != "") {
        screenVal = screen.value;
        screen.value = eval(screenVal);
        screenVal = screen.value;
        // console.log(screenVal);
    }
});

//running this for loop to get values of all the buttons
for(let button of buttons){
    button.addEventListener('click',(e)=>{
        //it will give the value of the button to the variable
        buttonText = e.target.innerText;
        screenVal = screen.value;
        //After user clicks on '=' symbol
        if(buttonText == '='){
            if (screenVal === "") {
                screen.value = "Please enter any number";
                setTimeout(() => {
                    screen.value = "";
                }, 800);
            }
            else{
                //doing button text empty so that it won't add '=' symbol in the screen string
                buttonText = '';
                // console.log("BUtton text is"+buttonText);
                screenVal += buttonText;
                //eval function will do the sum of the string if there will be any arthemetic expressions
                screen.value = eval(screenVal);
                screenVal = screen.value;
                // console.log(screenVal);
            }
        }
        //If the user will click on the C it will clear all the value 
        else if (buttonText == 'C') {
            //doing button text empty so that it won't add 'C' symbol in the screen string
            buttonText = '';
            screen.value = "";
            screenVal = "";
        }
        //If the user will click on back it will remove last element from string
        else if(buttonText == 'back'){
            //doing button text empty so that it won't add 'back' symbol in the screen string
            buttonText = "";
            //Making array from string to perform function to remove last element
            let value = Array.from(screenVal);
            //If value will not be empty array then it will remove one element from last
            if (value != []) {
                //for removing last element from array i am using splice() function
                value.splice(value.length-1,1);
                //Then to make that array again string i am using join() function
                screenVal = value.join('');
            }
            //If the value will be empty array then ill simply make an empty string
            else
            {
                screenVal = "";
            }
            //At last showing the new string after removing one element from last
            screen.value = screenVal;
        }
        //This will show the string of added buttons text to the screen
        else
        {
            screenVal += buttonText;
            screen.value = screenVal;
        }

    });
}