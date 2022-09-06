const state = {
    taskList: [], // to store the tasklist and its contents & we cal also make multiple fields of it
}

const taskContents = document.querySelector(".task--contents"); // selected a class via quaryselector & also save in a variable
const taskModal = document.querySelector(".task--modal--body"); // "  "  "  "


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
        <button type=button class='btn btn-outline-info float-right' data-bs-toggle='modal' data-bs-target="#ShowTask">
            <i class='fas fa-pencil-alt'></i>
        </button>
        <button type=button class='btn btn-outline-danger float-right' name=${id} onclick="DeleteTask.apply(this, arguments) ">
            <i class='fas fa-trash-alt'></i>
        </button>
        </div>
    </div>
</div>
`;
const HtmlModelContent = ({ id, title, description, type, url }) => {
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
    localStorage.setItem(
        "tasks",
        JSON.stringify({
            tasks: state.taskList,
        })
    );
};
const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.tasks);
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", HtmlTaskContent(cardDate))
    });
};

const HandleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('img').value,
        title: document.getElementById('tasktitle').value,
        type: document.getElementById('tag').value,
        description: document.getElementById('taskdetails').value,
    };
    if(input.title===''|| input.description===''){
        return;
    }
    taskContents.insertAdjacentHTML(
        "beforeend", HtmlTaskContent({ 
            ...input,       // it will now show the full object it will spread it video 25: 1hr 28mins also add another data
            id,           
        })
    );
    state.taskList.push({...input,id})
    UpdateLocalStorage();
};

const OpenTask=(e)=>{
    if(!e) e=window.event;
    const GetTask=state.taskList.find(({id})=> id ===e.target.id);
    taskModal.innerHTML=HtmlModelContent(GetTask);
};

const DeleteTask=(e)=>{
    if (!e) e=window.event;
    const TargetID=e.target.getAttribute("name");
    const type=e.target.tagName; // get element type
    const RemoveTask=state.taskList.filter(({id})=> id !== TargetID);
    state.taskList=RemoveTask;
    UpdateLocalStorage();
    if(type==="BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );
};