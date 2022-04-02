let Name = document.getElementById('name');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
let password = document.getElementById('password');
let checkOut = document.getElementById('checkForm');
let signIn = document.getElementById('signIn')
let emailHelp = document.getElementById('emailHelp');
let success = document.getElementById('success');
let failed = document.getElementById('failed');
let accounts = document.getElementById('viewAccounts');
let form = document.getElementById('form');
let accountsData = document.getElementById('accountsData');
let backButton = document.getElementById("backBtn");
let passwordScreen = document.getElementById('passwordScreen');
let tryAgain = 4;


let nameStatus = false;
let phoneStatus = false;
let emailStatus = false;
let passwordStatus = false;


success.style.display = "none";
failed.style.display = "none";
backButton.style.display = "none";
passwordScreen.style.display = 'none';

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
        let Users = localStorage.getItem('Users');
        let usersData;
        let users = {
            "userName" : Name.value,
            "phone": phone.value,
            "email": email.value,
            "password": password.value
        };
        if(Users == null){
            usersData = [];
        }
        else
        {
            usersData = JSON.parse(Users);
        }
        checkForm.classList.remove('is-invalid');
        checkForm.classList.add('is-valid');
        failed.style.display = "none";
        success.style.display = "block";
        setTimeout(() => {
            success.style.display = "none";
        }, 8000);
        console.log(users);
        usersData.push(users);
        localStorage.setItem('Users',JSON.stringify(usersData));
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
    
});

const submitPass = ()=> {
        let submitPassword = document.getElementById('submitPassword');
        submitPassword.addEventListener('click',()=>{
        let adminPassword = document.getElementById('adminPassword');
        let adminPasswordStatus;
        let adminPasswordValue = "";
        adminPasswordValue = adminPassword.value;
        if(adminPasswordValue == "inzamam"){
            adminPasswordStatus = true;
        }
        else
        {
            adminPasswordStatus = false;
        }
        adminPassword.value = "";
    if(adminPasswordStatus){
    passwordScreen.style.display = "none";
    accountsData.style.display = "block";
    let tableBody = document.getElementById('tableBody');
    let Users = localStorage.getItem('Users');
    let usersData;
    if(Users==null){
        usersData = [];
    }
    else
    {
        usersData = JSON.parse(Users);
    }
    let str = '';
    usersData.forEach(element => {
        str+=`
        <tr>
          <td>${element['userName']}</td>
          <td>${element['phone']}</td>
          <td>${element['email']}</td>
          <td>${element['password']}</td>
        </tr>
        `;
    });
    tableBody.innerHTML = str;
    }
    else
    {
        tryAgain --;
        passwordScreen.innerHTML = `<h2>Incorrect Password</h2>`;
        adminPasswordValue = "";
        setTimeout(() => {
            passwordScreen.innerHTML = `
            <h3>Try again! you have ${tryAgain} attempts left.</h3>
            <div class="row g-3 align-items-center  mt-3">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Password</label>
        </div>
        <div class="col-auto">
        <input type="password" id="adminPassword" class="form-control" aria-describedby="passwordHelpInline">
        </div>
        <span><button id="submitPassword" type="button" class="btn btn-outline-primary">submit</button></span>
        </div>`;
        submitPassword.addEventListener('click',submit());
        // console.log(tryAgain);
    }, 500);
    }
    });
};

const submit = ()=> {
    let submitPassword = document.getElementById('submitPassword');
    submitPassword.addEventListener('click',()=>{
        let adminPassword = document.getElementById('adminPassword');
        let adminPasswordStatus;
        let adminPasswordValue;
        adminPasswordValue = adminPassword.value;
        if(adminPasswordValue == "inzamam"){
            adminPasswordStatus = true;
        }
        else
        {
            adminPasswordStatus = false;
        }
    if(adminPasswordStatus){
    passwordScreen.style.display = "none";
    accountsData.style.display = "block";
    let tableBody = document.getElementById('tableBody');
    let Users = localStorage.getItem('Users');
    let usersData;
    if(Users==null){
        usersData = [];
    }
    else
    {
        usersData = JSON.parse(Users);
    }
    let str = '';
    usersData.forEach(element => {
        str+=`
        <tr>
          <td>${element['userName']}</td>
          <td>${element['phone']}</td>
          <td>${element['email']}</td>
          <td>${element['password']}</td>
        </tr>
        `;
    });
    tableBody.innerHTML = str;
    }
    else
    {
        tryAgain--;
        if (tryAgain<1) {
            passwordScreen.innerHTML = "<h2>You have exceeded the attempts</h2>";
        }
        else
        {
        passwordScreen.innerHTML = `<h2>Incorrect Password</h2>`;
        adminPasswordValue = "";
        setTimeout(() => {
            passwordScreen.innerHTML = `
            <h3>Try again! you have ${tryAgain} attempts left.</h3>
            <div class="row g-3 align-items-center  mt-3">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Password</label>
        </div>
        <div class="col-auto">
        <input type="password" id="adminPassword" class="form-control" aria-describedby="passwordHelpInline">
        </div>
        <span><button id="submitPassword" type="button" class="btn btn-outline-primary">submit</button></span>
        </div>`;
        submitPassword.addEventListener('click',submit());
        // console.log(tryAgain);
    }, 500);
    }
}
    });
};

    accounts.addEventListener('click',()=> {
    failed.style.display = "none";
    success.style.display = "none";
    backButton.style.display = "block";
    passwordScreen.style.display = "block";
    form.style.display = "none";
    if(tryAgain>3){
    submitPass();
    }
});



backButton.addEventListener("click",()=>{
    // submitPass();
    passwordScreen.style.display = "none";
    form.style.display = "block";
    backButton.style.display = "none";
    accountsData.style.display = "none";
});