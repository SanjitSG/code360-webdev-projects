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

    template.querySelector(".note-title").textContent = note.title;
    template.querySelector(".note-content").textContent = note.content;

    notesList.appendChild(template);
  });
}

function deleteNote() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const checkBoxes = document.querySelectorAll(".note-checkbox");

  //collecting indices of checked notes
  const toDelete = [];
  checkBoxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      toDelete.push(index);
    }
  });

  // deleting notes based on checkboxes
  for (let i = toDelete.length - 1; i >= 0; i--) {
    notes.splice(toDelete[i], 1);
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}
displayNotes();
