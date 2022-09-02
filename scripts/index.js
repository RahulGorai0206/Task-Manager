const state = {
    taskList: [], // to store the tasklist and its contents & we cal also make multiple fields of it
}

const taskContents = document.querySelector(".task--contents"); // selected a class via quaryselector & also save in a variable
const taskModal = document.querySelector(".task--modal--body"); // "  "  "  "


const HtmlTaskContent = ({ id, title, description, type, url }) => `
<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}> 
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            ${
            url &&
            `  <img src=${url} class="card-img-top md-3" alt="...">`
            }
            <h4 class="card-title">${title}</h4>
            <p class='description trim-3-lines text-muted' data-gram_editor='flase'>${description}</p>
            <div class='tags text-white d-flex flex-wrap'>
            <spam class='badge bg-primary m-1'>${type}</span>
            </div>
        </div>
        <div class='card-footer'>
        <button type=button class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-toggle='#ShowTask'>Open</button>
        <button type=button class='btn btn-outline-info float-right' data-bs-toggle='modal' data-bs-toggle='#ShowTask'>
            <i class='fas fa-pencil-alt'></i>
        </button>
        <button type=button class='btn btn-outline-danger float-right' data-bs-toggle='modal' data-bs-toggle='#ShowTask'>
            <i class='fas fa-trash-alt'></i>
        </button>
        </div>
    </div>
</div>
`;
const HtmlModelContent = ({ id, title, description, type, url }) => {
    const date=new Date(parseInt(id))
    return`
    <div id=${id}>
    ${
        url &&
        `  <img src=${url} class="card-img-top md-3" alt="...">`
    }
    <strong class-'text-muted>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p>${description}</p>
    </div>
    `
}
