let input, numberOfNotes;
let arr = [];
let colors = [];
// localStorage.setItem("numberOfNotes", 1);
if (localStorage.numberOfNotes > 0) {
  numberOfNotes = localStorage.getItem("numberOfNotes");
  pinOldNote();
} else {
  numberOfNotes = 0;
  localStorage.setItem("numberOfNotes", numberOfNotes);
}

let tb = document.getElementById("textBoxInput");

tb.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("pin1").click();
  }
});

function pinNote() {
  if (document.getElementById("textBoxInput").value) {
    const note = document.createElement("div");
    note.id = ++numberOfNotes;
    note.classList = "note";

    // const heading = document.createElement("h2");
    const para = document.createElement("p");
    let buttonHtml = `<button type="button" id="deleteButton" onClick="delDiv(this)" style="float:right; background-color: transparent; border:0ch;"><img src="delete.png" height="25px" alt="image"></button>`;
    let editButtonHtml = `<button type="button" id="editButton" onClick="editNote(this.parentNode)" style="float:right;background-color: transparent; border:0ch;"><img src="edit.png" height="25px" alt="image"></button>`;
    let selHtml = `<select name=color id=color onchange=colorChange(value,this)>
    <option value="wheat">yellow</option>
    <option value="tomato">red</option>
    <option value="aquamarine">green</option></select>`;

    document.body.appendChild(note);
    // heading.innerHTML =
    //   "Note " + Number(JSON.parse(localStorage.numberOfNotes) + 1);
    // note.appendChild(heading);
    input = document.getElementById("textBoxInput").value;
    para.innerHTML = input;
    note.appendChild(para);
    note.insertAdjacentHTML("afterbegin", buttonHtml);
    note.insertAdjacentHTML("afterbegin", editButtonHtml);
    note.insertAdjacentHTML("beforeend", selHtml);

    if (localStorage.arr) {
      arr = JSON.parse(localStorage.getItem("arr"));
      arr.push(input);
      localStorage.setItem("arr", JSON.stringify(arr));
      localStorage.setItem("numberOfNotes", arr.length);
    } else {
      arr.push(input);
      localStorage.setItem("arr", JSON.stringify(arr));
      localStorage.setItem("numberOfNotes", arr.length);
    }
    if (localStorage.color) {
      colors = JSON.parse(localStorage.getItem("colors"));
      console.log("Before push" + colors);
      colors.push("wheat");
      console.log("after push" + colors);
      localStorage.setItem("colors", JSON.stringify(colors));
    } else {
      colors.push("wheat");
      localStorage.setItem("colors", JSON.stringify(colors));
    }

    // console.log(numberOfNotes);
  } else {
    alert("Empty note");
  }
}

function pinOldNote() {
  let clicked = false;
  arr = JSON.parse(localStorage.getItem("arr"));
  for (let i = 0; i < numberOfNotes; i++) {
    const note = document.createElement("div");
    note.id = Number(i + 1);
    note.classList = "note";

    // const heading = document.createElement("h2");
    const para = document.createElement("p");
    para.id = "para";
    let buttonHtml = `<button type="button" id="deleteButton" onClick="delDiv(this)" style="float:right; background-color: transparent; border:0ch;"><img src="delete.png" height="25px" alt="image"></button>`;
    let editButtonHtml = `<button type="button" id="editButton" onClick="editNote(this.parentNode)" style="float:right;background-color: transparent; border:0ch;"><img src="edit.png" height="25px" alt="image"></button>`;
    let selHtml = `
    <select name=color id=color onchange=colorChange(value,this)>
    <option style="color:black;" disabled selected hidden>&#127912</option>
    <option style="color:wheat; font-size:20px;" value="wheat">&#11044;</option>
    <option style="color:tomato; font-size:20px;" value="tomato">&#11044;</option>
    <option style="color:aquamarine; font-size:20px;" value="aquamarine">&#11044;</option>`;

    document.body.appendChild(note);
    // heading.innerHTML = "Note " + Number(i + 1);
    // note.appendChild(heading);
    input = arr[i];
    para.innerHTML = input;
    note.appendChild(para);
    note.insertAdjacentHTML("afterbegin", buttonHtml);
    note.insertAdjacentHTML("afterbegin", editButtonHtml);
    note.insertAdjacentHTML("beforeend", selHtml);
    if (localStorage.colors) {
      colors = JSON.parse(localStorage.getItem("colors"));
      let color = colors[i];
      oldColor(color, note);
    }
    // if (!clicked) {
    //   note.addEventListener("click", function () {
    //     editNote(note);
    //   });
    //   clicked = true;
    //   note.removeEventListener("click",);
    // }
  }
}

function delDiv(btn) {
  // console.log(btn.parentNode.id);
  if (confirm("Do you want to delete the note?")) {
    document.getElementById(btn.parentNode.id).remove();
    arr = JSON.parse(localStorage.getItem("arr"));
    arr.splice(btn.parentNode.id - 1, 1);
    localStorage.setItem("arr", JSON.stringify(arr));
    localStorage.setItem("numberOfNotes", arr.length);
    colors = JSON.parse(localStorage.getItem("colors"));
    colors.splice(btn.parentNode.id - 1, 1);
    localStorage.setItem("colors", JSON.stringify(colors));
  }
}

function colorChange(value, sel) {
  document
    .getElementById(sel.parentNode.id)
    .style.setProperty("background-color", value);
  colors = JSON.parse(localStorage.getItem("colors"));
  let index = Number(sel.parentNode.id - 1);
  // console.log(colors);
  colors[index] = value;
  localStorage.setItem("colors", JSON.stringify(colors));
}

function oldColor(value, sel) {
  document.getElementById(sel.id).style.setProperty("background-color", value);
}

function editNote(note) {
  let clicked = false;
  if (!clicked) {
    // if (!GetElementInsideContainer(note.id, "editText")) {
    console.log("edit function called");
    let editHtml = `
    <form
    style="padding-top:5px;">
      <input
        type="textarea"
        id="editText"
        placeholder="Edit the note"
      />
      <button type="button" class="saveButton" id="saveButton" onClick="saveText(this.parentNode)" style="background-color: transparent; border:0ch;"><img src="tick.png" width=15px></button>
      <button type="button" class="saveButton" id="cancelButton" onClick="cancelText(this.parentNode)" style="background-color: transparent;  border:0ch;"><img src="cancel.jpg"  width=15px></button>    
    </form>`;

    note.insertAdjacentHTML("beforeend", editHtml);
    clicked = true;
    console.log("hello");
    let sb = document.getElementById("editText");
    sb.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("saveButton").click();
      }
    });
  }
}

function saveText(note) {
  if (document.getElementById("editText").value) {
    input = document.getElementById("textBoxInput").value;
    // note.para.innerHTML = input;
    // for(let i =0 ; i<note.parentNode.childNodes.length ; i++){
    //   console.log(note.childNodes[i]);  //will need to be changed when heading is removed
    // }
    console.log(note.parentNode.childNodes[2]);
    note.parentNode.childNodes[2].innerHTML =
      document.getElementById("editText").value;

    arr = JSON.parse(localStorage.getItem("arr"));
    arr[Number(note.parentNode.id - 1)] =
      document.getElementById("editText").value;
    localStorage.setItem("arr", JSON.stringify(arr));
    note.parentNode.removeChild(note);
  } else {
    alert("Empty note");
  }
}

function cancelText(note) {
  note.parentNode.removeChild(note);
}
function GetElementInsideContainer(containerID, childID) {
  var elm = document.getElementById(childID);
  var parent = elm ? elm.parentNode : {};
  if (parent.id && parent.id === containerID) {
    return true;
  }
  return false;
}
