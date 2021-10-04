// Showing Notes stored in LocalStorage on page load
showNotes();

// Adding the search functionality by using "input" event listener
let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", function(){
    searchText = searchBox.value.toLowerCase();
    // console.log(searchText);
    let noteCards = document.getElementsByClassName("notesCard");
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[1].innerText.toLowerCase();
        // console.log(cardText);
        if(cardText.includes(searchText)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });

});

// Adding Event Listner on Button, so that data stores to local storage when clicked
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
    let textArea = document.querySelector("textarea.form-control");
    let noteStorage = localStorage.getItem("notes");

    if (noteStorage == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(noteStorage);
    }
    notesObj.push(textArea.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textArea.value = "";
    // console.log(notesObj);
    showNotes();
});

function showNotes() {
    let noteStorage = localStorage.getItem("notes");
    if (noteStorage == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(noteStorage);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="notesCard col-lg-3 col-sm-6 my-3">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">Note ${index + 1}</p>
                            <p class="card-text">${element}</p>
                            <button type="button" id="${index}" onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</button>
                        </div>
                    </div>
                </div>`;
    });
    let noSavedNote = "";
    noSavedNote += `<div class="container" style="text-align:center;">Saved Notes will appear here.</div>`;
    let notesArea = document.getElementById("notesArea");
    if (notesObj.length != 0) {
        notesArea.innerHTML = html;
    } else {
        notesArea.innerHTML = noSavedNote;
    }
}

// Function to delete a Note
function deleteNote(index) {
    // console.log("Index of this Note: " + index);
    let noteStorage = localStorage.getItem("notes");
    if (noteStorage == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(noteStorage);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}





