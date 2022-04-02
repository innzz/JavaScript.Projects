let Name = document.getElementById('name');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
let password = document.getElementById('password');
let checkOut = document.getElementById('checkForm');
let signIn = document.getElementById('signIn')
let emailHelp = document.getElementById('emailHelp');
let success = document.getElementById('success');
let failed = document.getElementById('failed');

let nameStatus = false;
let phoneStatus = false;
let emailStatus = false;
let passwordStatus = false;


success.style.display = "none";
failed.style.display = "none";

Name.addEventListener('blur',()=>{
    let regex = /^[a-zA-Z][0-9a-zA-Z]{3,15}$/;
    if(regex.test(Name.value)){
        Name.classList.remove('is-invalid');
        Name.classList.add('is-valid');
        nameStatus = true;
    }
    else
    {
        Name.classList.remove('is-valid');
        Name.classList.add('is-invalid');
        nameStatus = false;
    }
});


phone.addEventListener('blur',()=>{
    let regex = /^[0-9]{10}$/;
    if(regex.test(phone.value)){
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
        phoneStatus = true;
    }
    else
    {
        phone.classList.add('is-invalid');
        phone.classList.remove('is-valid');
        phoneStatus = false;
    }
})
email.addEventListener('blur',()=>{
    let regex = /^[a-zA-Z]+\.?\w+([0-9]+)?@[a-zA-Z]+(.com)$/;
    if(regex.test(email.value)){
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        emailStatus = true;
    }
    else
    {
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        emailStatus = false;
    }
})
password.addEventListener('blur',()=>{
    let passwordFeedback1 = document.getElementById("passwordFeedback1");
    let passwordFeedback2 = document.getElementById("passwordFeedback2");
    passwordFeedback1.style.display = "none";
    passwordFeedback2.style.display = "none";
    let regex = /^[a-zA-Z0-9]{5,15}$/;
    let passwordLength = password.value;
    if(regex.test(password.value)){
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        passwordStatus = true;
    }
    else
    {
        if(passwordLength.length>15)
        {
            passwordFeedback2.style.display = "block";
            password.classList.remove('is-valid');
            password.classList.add('is-invalid');
            passwordStatus = false;
        }
        else{
        passwordFeedback1.style.display = "block";
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        passwordStatus = false;
        }
    }
})
checkOut.addEventListener('click',()=>{
    let checkForm = document.getElementById('checkForm');
    if(nameStatus && phoneStatus && emailStatus && passwordStatus){
        checkForm.classList.remove('is-invalid');
        setTimeout(() => {
            emailHelp.style.display = "none";
            checkForm.classList.add('is-valid');
        }, 500);
    }
    else
    {
        checkForm.classList.remove('is-valid');
        setTimeout(() => {
            emailHelp.style.display = "none";
            checkForm.classList.add('is-invalid');
        }, 500);
    }
})
signIn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(nameStatus && phoneStatus && emailStatus && passwordStatus){
        checkForm.classList.remove('is-invalid');
        checkForm.classList.add('is-valid');
        failed.style.display = "none";
        success.style.display = "block";
        setTimeout(() => {
            success.style.display = "none";
        }, 8000);
    }
    else
    {
        checkForm.classList.remove('is-valid');
        checkForm.classList.add('is-invalid');
        success.style.display = "none";
        failed.style.display = "block";
        setTimeout(() => {
            failed.style.display = "none";
        }, 8000);
    }

})