//Creating a wall clock
const clock = ()=>{
    let date = new Date();
    let time = date.toLocaleTimeString('en-in');
    let clock = document.getElementById('clock');
    clock.innerHTML = `<h1>${time}</h1>`
};

// setInterval(clock,1000);