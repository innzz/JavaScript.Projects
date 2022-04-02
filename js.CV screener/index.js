let url = `https://api.github.com/users`;
// let url = `https://pokeapi.co/api/v2/ability`;
// let url = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=100`;
// let pokemonAbilities = [];
// for (let index = 21; index < 50; index++) {
//     let pokemonUrls = `https://pokeapi.co/api/v2/pokemon/${index}/`;


//async await fetching function
    async function candidatesGenerator() {
        const response = await fetch(url);
        const users = await response.json();
        return users;
    };

//This will iterate the array in forward direction 
function Iterator(data2,dataIndex) {
    let nextIndex = dataIndex;
    return {
        next: function(){
            // console.log(nextIndex);
            return nextIndex<data2.length?
            {value:data2[nextIndex++],done:false} : 
            {done:true};
        }
    };
};

//This will iterate the array in reverse direction
function prevIterator(data,dataIndex) {
    let nextIndex = dataIndex-2;
    return {
        next: function(){
            // console.log(nextIndex);
            return nextIndex<data.length?
            {value:data[nextIndex--],done:false} : 
            {done:true};
        }
    };
};

//THis will execute after the promise will be done
candidatesGenerator().then(data=> {
    let dataIndex = 0;
    let prevUser;
    // console.log(data);
    let prevData;
    let userData = Iterator(data,dataIndex);

    //function to show the data of first member
    CV();

    let nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click',CV);
    //Function to show the data of members
    function CV(){
        //This will iterate an member array elements one by one in forward direction
        currentUser = userData.next().value;

        //This is the index of the current member
        dataIndex++;

        // console.log("next user index"+dataIndex);

        //This function will give the index of current member to the previous iterator
        prevData = prevIterator(data,dataIndex);

        if (currentUser != undefined) {
            let image = document.getElementById('image');
            let profile = document.getElementById('profile');
            image.innerHTML = `<img src="${currentUser.avatar_url}" style="width:40%;border: 2px solid rgb(5, 0, 0);border-radius: 10px">`;
            profile.innerHTML = `
            <ul class="list-group" style="border-radius: 20px">
            <li id="name" class="list-group-item" style="color:rgb(5, 0, 0)";>Name: <b>${currentUser.login}</b></li>
            <li id="profession" class="list-group-item" style="color:rgb(5, 0, 0)";>Profession: <b>${currentUser.node_id}</b></li>
            <li id="Type" class="list-group-item" style="color:rgb(5, 0, 0)";>Type: <b>${currentUser.type}</b></li>
            </ul>`;
        }
        else{
            location.reload();
        }
    };
    


    let prevBtn = document.getElementById('prevBtn');
    prevBtn.addEventListener('click',prevCv);
    
    function prevCv(){
            //This will iterate an member array elements one by one in previous direction
            prevUser = prevData.next().value;

            //This is the index of the current member
            dataIndex--;

            //This function will give the index of current member to the forward iterator
            userData = Iterator(data,dataIndex);

            if (prevUser != undefined) {
                let image = document.getElementById('image');
                let profile = document.getElementById('profile');
                image.innerHTML = `<img src="${prevUser.avatar_url}" style="width:40%;border: 2px solid rgb(5, 0, 0);border-radius: 10px">`;
                profile.innerHTML = `
                <ul class="list-group" style="border-radius: 20px">
               <li id="name" class="list-group-item" style="color:rgb(5, 0, 0)";>Name: <b>${prevUser.login}</b></li>
               <li id="profession" class="list-group-item" style="color:rgb(5, 0, 0)";>Profession: <b>${prevUser.node_id}</b></li>
               <li id="Type" class="list-group-item" style="color:rgb(5, 0, 0)";>Type: <b>${prevUser.type}</b></li>
               </ul>`;
            }
            else{
                location.reload();
            } 
        };
});
