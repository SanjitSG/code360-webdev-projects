let selectedNoteIndex;

function saveNote() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;
  if (title.trim() === "" || content.trim() === "") return alert("Both title and content are required!");

  let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
  if (selectedNoteIndex !== undefined) {
    notes[selectedNoteIndex] = { title, content };
    selectedNoteIndex = undefined;
  } else {
    notes.push({ title, content });
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  displayNotes();
}

function displayNotes() {
  let notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
  notes.forEach((note, index) => {
    let template = document.getElementById("noteTemplate").content.cloneNode(true);
    let noteDiv = template.querySelector(".note");
    const noteTitle = template.querySelector(".note-title");
    const noteContent = template.querySelector(".note-content");
    noteTitle.onclick = () => selectNote(index);
    noteContent.onclick = () => selectNote(index);

    template.querySelector(".note-title").textContent = note.title;
    template.querySelector(".note-content").textContent = note.content;

    notesList.appendChild(template);
  });
}

function deleteNote() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const checkboxes = document.querySelectorAll(".note-checkbox");

  // Collecting indices of checked notes
  const toDelete = [];
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      toDelete.push(index);
    }
  });

  // Deleting notes based on checkboxes
  for (let i = toDelete.length - 1; i >= 0; i--) {
    notes.splice(toDelete[i], 1);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

function clearAllNotes() {
  localStorage.removeItem("notes");
  displayNotes();
}

function selectNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  document.getElementById("noteTitle").value = notes[index].title;
  document.getElementById("noteContent").value = notes[index].content;
  selectedNoteIndex = index;
}

function searchNotes() {
  let searchText = document.getElementById("search").value.toLowerCase();
  let notes = JSON.parse(localStorage.getItem("notes"));
  let filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchText) || note.content.toLowerCase().includes(searchText));

  displayFilteredNotes(filteredNotes);
}

function displayFilteredNotes(filteredNotes) {
  let notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  filteredNotes.forEach((note, index) => {
    let template = document.getElementById("noteTemplate").content.cloneNode(true);
    let noteDiv = template.querySelector(".note");
    noteDiv.onclick = () => selectNote(index);
    template.querySelector(".note-title").textContent = note.title;
    template.querySelector(".note-content").textContent = note.content;

    notesList.appendChild(template);
  });
}

window.onload = displayNotes;
