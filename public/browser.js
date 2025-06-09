
console.log('Frontend JS');

function itemTemplate(item){
    return  `<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
                <span class="item-text">${item.reja}</span>
                <div>
                    <button 
                        data-id="${item._id}"
                        class="edit-me btn btn-secondary btn-sm mr-1"
                    >
                        Ozgartirish
                    </button>
                    <button
                        data-id="${item._id}"
                        class="delete-me btn btn-danger btn-sm"
                    >
                        Ochirish
                    </button>
                </div>
            </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function(e){
      e.preventDefault();
    axios.post("/create-item", {reja: createField.value})
    .then(response => {
        document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = "";
        createField.focus();
    })
    .catch(err => {"Iltimos qaytadan urinib koring"});
});


document.addEventListener('click', function(e){
    // delete oper
    if(e.target.classList.contains('delete-me')){
        if(confirm("Are you sure to delete?")){
             axios.post('/delete-item', {id: e.target.getAttribute('data-id')})
            .then(response => {
                console.log(response.data);
                e.target.parentElement.parentElement.remove();
            })
            .catch(err => {});
        };
    }

    // update oper
    if (e.target.classList.contains("edit-me")) {
  const li = e.target.closest("li");
  const span = li.querySelector(".item-text");
  const currentText = span.innerText;
  const newValue = prompt("Input new value:", currentText);
    
  if (newValue) {
    axios.post('/update-item', {
        id: e.target.getAttribute("data-id"),
        reja: newValue.trim()
        })
        .then((response) => {
            span.innerText = newValue.trim();
            })
        .catch(err => {
            console.log("Something went wrong")
        });
        }
    }
})

// delete all
document.getElementById('clean-all').addEventListener('click', function(e){
    if(confirm('Are you sure te delete all items?')){
        axios.post('/delete-all')
        .then((response) => {
            document.getElementById('item-list').innerHTML = "";
        })
        .catch((err) => {
            console.log('ERROR:', err);
        });
    }
})