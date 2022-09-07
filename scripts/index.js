const state = {
    taskList: [], // to store the tasklist and its contents & we cal also make multiple fields of it
}

const taskContents = document.querySelector(".task--contents"); // selected a class via quaryselector & also save in a variable [For input]
const taskModal = document.querySelector(".task--modal--body"); // "  "  "  " [Using for showing deails in modal]

// [Using for grtting data from form]
const HtmlTaskContent = ({ id, title, description, type, url }) => `
<div class="col mt-5 " id=${id} key=${id}> 
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            ${url ?
    `  <img src=${url} height='150px' class="card-img-top" alt="...">`
    :
        `<img src="https://matematego.com/assets/noimage-cf86abd9b579765c1131ec86cb1e70052199ddadfecf252e5cb98e50535d11f3.png" height='150px' class="card-img-top md-3" alt="...">`
    }
            <h4 class="card-title">${title}</h4>
            <p class='description trim-3-lines text-muted' data-gram_editor='flase'>${description}</p>
            <div class='tags text-white d-flex flex-wrap'>
            <spam class='badge bg-primary m-1'>${type}</span>
            </div>
        </div>
        <div class='card-footer'>
        <button type=button class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target="#ShowTask" id=${id} onclick='OpenTask.apply(this, arguments)'>Open</button> 
        <button type=button class='btn btn-outline-info float-right' onclick="EditTask.apply(this, arguments)">
            <i class='fas fa-pencil-alt'></i>
        </button>
        <button type=button class='btn btn-outline-danger float-right' name=${id} onclick="DeleteTask.apply(this, arguments) ">
            <i class='fas fa-trash-alt'></i>
        </button>
        </div>
    </div>
</div>
`;
const HtmlModelContent = ({ id, title, description, type, url }) => { // for showing the task after clicking open button
    const date = new Date(parseInt(id))
    return `
    <div id=${id}>
    ${url ?
        `  <img src=${url} class="card-img-top height='150px' md-3" alt="...">`
        :
        `<img src="https://matematego.com/assets/noimage-cf86abd9b579765c1131ec86cb1e70052199ddadfecf252e5cb98e50535d11f3.png" class="card-img-top md-3" height='150px' alt="...">`
        }
    <strong class='text-muted md-3'>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p>${description}</p>
    </div>
    `;
};
const UpdateLocalStorage = () => {
    localStorage.setItem( // make a array called tasks and store in string format
        "tasks",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};
const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks); // convert string array into object and store it
    if (localStorageCopy) state.taskList = localStorageCopy.tasks; // only copy if empty
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", HtmlTaskContent(cardDate)) // also add the html
    });
};

const HandleSubmit = (event) => {
    const id = `${Date.now()}`; // getting current date time 
    const input = { // getting 
        url: document.getElementById('img').value,
        title: document.getElementById('tasktitle').value,
        type: document.getElementById('tag').value,
        description: document.getElementById('taskdetails').value,
    };
    if(input.title===''|| input.description===''){ // check if the field is empty
        return;
    }
    taskContents.insertAdjacentHTML( // this function will add the html at a adjucent position
        "beforeend",
         HtmlTaskContent({ 
            ...input,       // it will now show the full object it will spread it video 25: 1hr 28mins also add another data
            id,           // also adding id field
        })
    );
    state.taskList.push({...input,id})
    UpdateLocalStorage();
};

const OpenTask=(e)=>{  // for showing the task after clicking open button
    if(!e) e=window.event;
    const GetTask=state.taskList.find(({id})=> id ===e.target.id);
    taskModal.innerHTML=HtmlModelContent(GetTask);
};

const DeleteTask=(e)=>{
    if (!e) e=window.event;
    const TargetID=e.target.getAttribute("name"); // getting id with the help of name property
    const type=e.target.tagName; // get element type it will be I or BUTTON
    const RemoveTask=state.taskList.filter(({id})=> id !== TargetID);  // save all the task that doesn't match the current id
    state.taskList=RemoveTask; // then save it on original state basically update the old array
    UpdateLocalStorage();
    if(type==="BUTTON"){ 
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild( // also remove from current HTML 
            e.target.parentNode.parentNode.parentNode
        );
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild( // also remove from current HTML
        e.target.parentNode.parentNode.parentNode.parentNode
    );
};

const EditTask=(e)=>{
    if(!e) e=window.event;

    window.alert("Tap on the text that you want to edit..")
    const TargetID=e.target.id; // getting element id   
    const type=e.target.tagName; // getting type of element
    let parentNode;
    let tasktitle;
    let taskdescription; // for storing purpose
    let tasktype;
    let submitbutton;

    if(type==="BUTTON"){
        parentNode=e.target.parentNode.parentNode.parentNode; // save as the delete task thing console log for more details
    }else{
        parentNode=e.target.parentNode.parentNode.parentNode.parentNode;
    }
    tasktitle=parentNode.childNodes[1].childNodes[1].childNodes[3];
    taskdescription=parentNode.childNodes[1].childNodes[1].childNodes[5]; // select child nodes
    tasktype=parentNode.childNodes[1].childNodes[1].childNodes[7].childNodes[1];

    submitbutton=parentNode.childNodes[1].childNodes[3].childNodes[1];
    tasktitle.setAttribute("contenteditable", "true"); 
    tasktype.setAttribute("contenteditable", "true"); // set content editable to edit
    taskdescription.setAttribute("contenteditable", "true");

    submitbutton.setAttribute('onclick',"SaveEdit.apply(this,arguments)"); // set attribute >> an event
    submitbutton.removeAttribute("data-bs-toggle"); // remove this attribute to not work like a modal button like before
    submitbutton.removeAttribute("data-bs-target");
    submitbutton.innerHTML="Save Changes"; // change the button text 

};

SaveEdit=(e)=>{
    if(!e) e=window.event;

    const TargetID=e.target.id;
    const parentNode=e.target.parentNode.parentNode.parentNode;
    const tasktitle=parentNode.childNodes[1].childNodes[1].childNodes[3];
    const taskdescription=parentNode.childNodes[1].childNodes[1].childNodes[5];
    const tasktype=parentNode.childNodes[1].childNodes[1].childNodes[7].childNodes[1]; // getting all data
    const submitbutton=parentNode.childNodes[1].childNodes[3].childNodes[1];

    const updateddata={ // store the data of the editable content
        tasktitle:tasktitle.innerHTML,
        taskdescription:taskdescription.innerHTML,
        tasktype:tasktype.innerHTML,
    };

    let StateCopy=state.taskList; // store the current state
    StateCopy=StateCopy.map((task)=>task.id===TargetID?
    {
        id:task.id,
        title:updateddata.tasktitle,
        description:updateddata.taskdescription, // overwright some data to updated data
        type: updateddata.tasktype,
        url:task.url,
    }
    :task
    );

    state.taskList=StateCopy; // then update the data to state as well
    UpdateLocalStorage(); 

    tasktitle.setAttribute("contenteditable", "false");
    tasktype.setAttribute("contenteditable", "false");
    taskdescription.setAttribute("contenteditable", "false");
            // making all the element as like before
    submitbutton.setAttribute("onclick","OpenTask.apply(this, arguments)");
    submitbutton.setAttribute("data-bs-toggle",'modal');
    submitbutton.setAttribute("data-bs-target","#ShowTask");
    submitbutton.innerHTML="Open";
}

Search=(e)=>{
    if(!e) e=window.event;

    while (taskContents.firstChild) {
        taskContents.removeChild(taskContents.firstChild);
      }
    const ResultData=state.taskList.filter(({title})=>{ // filter out the data according my input and store it
        return title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    ResultData.map((cardData)=>{ // map through the data 
        taskContents.insertAdjacentHTML("beforeend",HtmlTaskContent(cardData));
    });
};