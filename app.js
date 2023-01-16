// Main Div
const main = document.querySelector("#main");

// Note Number for each note 
let index = 1;

// Global Varaibles
// let allNotes = [];

// Add Note Btn
const addNoteBtn = document.querySelector(".addNoteBtn").addEventListener("click", () => {
    addNote();
  });

// Add Note Function
const addNote = (text = "") => {
// for(let i = 1;i<=index;i++){
//    console.log(index[i]);
// };
  // Create Element
  const note = document.createElement("div");
  // Add ClassList
  note.classList.add("note");
  

  note.innerHTML = `
  
   <div class="tools">
   <div>
  <h3>Note ${index++}</h3>
   </div>
   <div>
   <i class="save bi bi-clipboard-plus"></i>
   <i class="trash bi bi-trash3-fill"></i>
   </div>
   </div>
   <textarea class="textarea" cols="30" rows="10">${text}</textarea>
   `;
  //  if (val == "" || val) {
  //   const textarea = note.querySelector(".textarea").value = val;
  //  }

  // Append  to outer div
  main.appendChild(note);
  saveNote();

  // Auto Save Note
  note.addEventListener("focusout", () => {
    saveNote();
  });

  // Delete Note
  note.querySelector(".trash").addEventListener("click", () => {
    index--
    note.remove();
    saveNote();
  });

  // save Notes
  note.querySelector(".save").addEventListener("click", () => {
    saveNote();
  });

  //clearAll Btn
 document.getElementById('clearAll').addEventListener('click',()=>{
  localStorage.clear();
  note.remove();
  window.location.reload();
})
};

// Save Notes to LS
const saveNote = () => {

  const notes = document.querySelectorAll(".note textarea");
  // console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

// window.onload = () => {
//     const localNotes = localStorage.getItem("notes");
//     allNotes = localNotes ? JSON.parse(localNotes) : [];
//     allNotes.forEach(n => {
//         addNote(n);
//     })
// }

// Self calling function
(
  function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));

  if (lsNotes === null) {
    addNote();
  } else {
    lsNotes.forEach((lsNote) => {
      addNote(lsNote);
    });
  }
})();
