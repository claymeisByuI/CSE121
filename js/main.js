// Remarkable is a markdown parser
//  I am allowing more markdown features than the default cause I dont need to worry about security and hacking
const md = new Remarkable({
    html: true,
    breaks: true, // allow line breaks
}); 



// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let notesListElement = document.querySelector('note-list'); 

// Render notes to screen
notes.forEach(note => {
    renderNoteToList(note);
});

// on click of the add note button
// save form content to localStorage
// reset form
let saveButton = document.getElementById('add-note');
saveButton.addEventListener('click', addNote);
resetForm();

//Resets the form to a friendly state and moves focus to the textarea
function resetForm(){
    let noteTextElement = document.querySelector('#note-text');
    noteTextElement.value = '# Title goes here\n\nMore notes here.';
    noteTextElement.focus();
    noteTextElement.selectionStart = 2;
    noteTextElement.selectionEnd = 17;
}

// on click of the add note button
function addNote(e) {
    e.preventDefault();
    let noteText = document.querySelector('#note-text').value;
    let note = {
        text: noteText,
        id: Date.now()
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNoteToList(note);
    resetForm();
}


function renderNoteToList(note) {
    let newNoteElement = document.createElement('note-item');
    newNoteElement.setAttribute('note-id', note.id);
    let noteCard = `
    <article class="card">
        <header>
            <h2>${(new Date(note.id)).toLocaleString()}</h2>
            <button id="delete-button" class="flat-button"><i class="gg-trash-empty"></i></button>
        </header>  
        <div class="content">` + md.render(note.text) + `
        </div>
    </article>
    `
    newNoteElement.innerHTML = noteCard;
    notesListElement.appendChild(newNoteElement);
    newNoteElement.querySelector("#delete-button").addEventListener('click', deleteNote);
}

// on click of the delete button
// find the note-id from the attribute
// remove the note from notes array
// update localStorage
// remove the note from the screen
function deleteNote(e) {
    let parentCard = e.target.parentElement.parentElement.parentElement;
    let noteId = parentCard.getAttribute('note-id');
    let noteIndex = notes.findIndex(note => note.id == noteId);
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    parentCard.remove();
}
