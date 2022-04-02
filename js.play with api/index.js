let enterJson = document.getElementById('enterJson');
let customParams = document.getElementById('customParams');
let contentType = document.getElementById('contentTypeBox');

//Hiding contentType at first
enterJson.style.display = "none";
customParams.style.display = "none";
contentType.style.display = "none";

//initializing parameters count
let addedParamsCount = 1;

//Utility function
// 1. Function to get element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//If the user click on get radio
let get = document.getElementById('get');
get.addEventListener('click',()=>{
    contentType.style.display = "none";
});

//If the user click on post radio
let post = document.getElementById('post');
post.addEventListener('click',()=>{
    contentType.style.display = "block";
});

//After user clicks on json post request 
let json = document.getElementById('json');
json.addEventListener('click',()=>{
    enterJson.style.display = "block";
    customParams.style.display = "none";
});

//After user clicks on custom parameters post request 
let params = document.getElementById('params');
params.addEventListener('click',()=>{
    customParams.style.display = "block";
    enterJson.style.display = "none";
});

//If user clicks on add new parameters
let addParams = document.getElementById('addParams');
addParams.addEventListener('click',()=>{
    addedParamsCount++;
    // console.log(addedParamsCount);
    let customParams = document.getElementById('customParams');
    let string = `<div class="row my-3">
                            <label for="Key" class="col-auto">Key</label>
                        <div class="col-md-4">
                            <input type="text" id="Key${addedParamsCount}" placeholder="Enter Key" class="form-control">
                        </div>
                              <label for="value" class="col-auto">value</label>
                        <div class="col-md-4">
                             <input type="text" id="value${addedParamsCount}" placeholder="Enter value" class="form-control">
                        </div>
                    <button type="button" class="btn btn-primary col-auto deleteParams" id="delParams"> - </button>
                </div>`;
    let paramElement = getElementFromString(string);
    customParams.appendChild(paramElement);
    // console.log(paramElement);
    let deleteParams = document.getElementsByClassName('deleteParams');
    for (const item of deleteParams) {
        item.addEventListener('click',(e)=>{
            if (confirm('Delete parameter ?')){
                e.target.parentElement.remove();
                
            }
            // console.log(e.target.parentElement);
        });
    };
});


//If the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    
    //This will show please wait response to the user 
    // if (!document.getElementById(responseUrl)) {
        let stringTextarea = `<pre class="language-javascript" style="max-height:500px"><code id="prismResponse" class="language-javascript">
        </code></pre>`;
        // prismResponse.innerHTML = hie;
        // let requestUrlElem = getElementFromString(string);
        // let responseUrlTextArea = document.getElementById('responseUrlTextArea');
        // responseUrlTextArea.appendChild(requestUrlElem);
        let responseTextarea = document.getElementById('responseTextarea');
        // console.log(stringTextarea);
        responseTextarea.innerHTML = stringTextarea;
    // };
    
    
    let url = document.getElementById('url').value;
    let requestType;
    let contentType;
    //If the request type is checked
    if (document.querySelector("input[name='Request']:checked")) {
        requestType = document.querySelector("input[name='Request']:checked").value;
    }
    //If the content type is checked
    if (document.querySelector("input[name='content']:checked")) {
        contentType = document.querySelector("input[name='content']:checked").value;  
    }

    //After selecting content type
    let dataParam;
    
    //if the content type is custom parameters
    if (contentType == 'params') {
        dataParam = {};
        for (let index = 1; index <= addedParamsCount; index++) {
            if (document.getElementById(`Key${index}`) != undefined) {
                let key = document.getElementById(`Key${index}`).value;
                let value = document.getElementById(`value${index}`).value;
                dataParam[key] = value;
            }
        }
        dataParam = JSON.stringify(dataParam);
    }
    //if the content type is json type
    else if (contentType =='JSON')
    {
        let reg = /^{/;
        if (reg.test(document.getElementById('stringParams').value)) {
            dataParam = "";
            dataParam = document.getElementById('stringParams').value;
            // dataParam = JSON.stringify(dataParam);
            document.getElementById('stringParams').classList.remove('is-invalid');
        }
        else
        {
            document.getElementById('stringParams').classList.add('is-invalid');
        }
    }
    

    //If request type is get
    // let responseUrl = document.getElementById('responseUrl');
    let prismResp = document.getElementById('prismResponse');
    prismResp.innerHTML = "Please wait....Your response is fetching...";
    if (requestType == "GET") {
        if (url != "") {
            async function getData() {
                const response = await fetch(url);
                const data = await response.text();
                return data;
            }
    
            // let prismResponse = document.getElementById('prismResp');
            // console.log(prismResponse);
            getData().then(text=>{
                // let responseUrl = document.getElementById('responseUrl');
                prismResp.innerHTML = text;
                Prism.highlightAll();
            })
        }
    }
    //If the request type is post
    else if(requestType == "POST")
    {
        if (url != "") {
            fetch(url,{
                method: 'POST',
                body: dataParam,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            }).then((response)=>response.text()).then(text=>{
                // let responseUrl = document.getElementById('responseUrl');
                prismResp.innerText = text;
                Prism.highlightAll();
            })
        }
    }
    //If the request type is not checked
    else
    {
        // let responseUrl = document.getElementById('responseUrl');
        prismResp.innerHTML = "<h3>Choose the correct request type!</h3>";
        Prism.highlightAll();
    }
});