console.log('Frontend JS');

function itemTemplate(item){
    return  `<li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-2">
      <input type="checkbox" class="complete-checkbox" data-id="${item._id }" ${item.completed ? 'checked' : ''}>
      <span class="item-text ${item.completed ? 'text-decoration-line-through text-muted' : '' }">
        ${ item.reja }
      </span>
    </div>
    <div class="d-flex gap-2">
      <button data-id="${item._id }" class="edit-me btn btn-sm btn-outline-secondary">✏️</button>
      <button data-id="${item._id }" class="delete-me btn btn-sm btn-outline-danger">🗑️</button>
    </div>
  </li>`;
}

let createField = document.getElementById("create-field");
// Create oper
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
// Checkbox oper
document.addEventListener('change', function(e){
    if (e.target.classList.contains('complete-checkbox')){
        const checkbox = e.target;
        const id = checkbox.getAttribute('data-id');
        const completed = checkbox.checked;
        axios
      .post("/checkbox-item", { id: id, completed: completed })
      .then(() => {
        const textEl = checkbox.closest("li").querySelector(".item-text");
        if (completed) {
          textEl.classList.add("text-decoration-line-through", "text-muted");
        } else {
          textEl.classList.remove("text-decoration-line-through", "text-muted");
        }
      })
      .catch(() => {
        alert("Somthing went wrong in checkbox part!");
      });
  }
});

document.addEventListener('click', function(e){
    // Delete oper
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

    // Update oper
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

// Delete all
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