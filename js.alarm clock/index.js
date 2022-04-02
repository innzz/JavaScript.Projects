

    function showTime(time) {
        let displayTime = document.getElementById('displayTime');
        // console.log(displayTime);
        let hour = time.hour;
        if(hour<10){
            hour = "0"+time.seconds;
        };
        let minutes = time.minutes;
        if(minutes < 10){
            minutes = "0"+time.minutes;
        };
        let seconds = time.seconds;
        if(seconds<10){
            seconds = "0"+time.seconds;
        };
        let realTime = hour+":"+minutes+":"+seconds;
        let alarmTime = localStorage.getItem('alarmTime');
        if(alarmTime == realTime){
            let alarmText = document.getElementById('alarmText');
            alarmText.innerHTML = `<h1>Alarm Riging!!.</h1>`;
        }
        displayTime.innerHTML = `
        <h3 style="text-align:center;" >Time</h3>
        <div class="container input-group" style="align-items:center; justify-content: center;">
        <h1>${hour}:</h1>
        <h1>${minutes}:</h1>
        <h1>${seconds}</h1> 
        </div>
        `;
        // console.log(alarmTime);
    }
    function setAlarm(time){
        console.log("event fired");
            let hour = time.hour;
            if(hour<10){
                hour = "0"+time.seconds;
            };
            let minutes = time.minutes;
            if(minutes < 10){
                minutes = "0"+time.minutes;
            };
            let seconds = time.seconds;
            if(seconds<10){
                seconds = "0"+time.seconds;
            };
            let realTime = hour+":"+minutes+":"+seconds;
            let alarmHour = document.getElementById('hour').value;
            let alarmMinutes = document.getElementById('minutes').value;
            let alarmSeconds = document.getElementById('seconds').value;
            let alarmTime = alarmHour+":"+alarmMinutes+":"+alarmSeconds;
            localStorage.setItem('alarmTime',alarmTime);
            let alarmAlert = document.getElementById('alarmAlert');
            alarmAlert.innerHTML = `<strong>Alarm!</strong> has been set for ${alarmTime}`;
            alarmAlert.style.display = 'block';
            setTimeout(() => {
                alarmAlert.style.display = 'none';
            }, 8000);

    };

    function getTime() {
        let date = new Date();
        return time = {
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    }


    // setInterval(() => {
        let time1 = getTime();
        showTime(time1);
    // },1000);


    let time2 = getTime();
    let alarm = document.getElementById('setAlarmBtn');
    alarm.addEventListener('click',()=>{
        setAlarm(time2);
    });


        // function playAudio(){
        //     var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
        //     audio.muted = true;
        //     audio.play();
        // };
        // playAudio();