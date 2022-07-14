let input, numberOfNotes;
let arr = [];
// localStorage.setItem("numberOfNotes", 1);
if (localStorage.numberOfNotes > 0) {
  numberOfNotes = localStorage.getItem("numberOfNotes");
  pinOldNote();
} else {
  numberOfNotes = 0;
  localStorage.setItem("numberOfNotes", numberOfNotes);
}

if (localStorage.input) {
  input = localStorage.getItem("input");
  console.log("item found " + input);
}

function pinNote() {
  if (document.getElementById("textBoxInput").value) {
    const note = document.createElement("div");
    note.id = ++numberOfNotes;
    note.classList = "note";

    const heading = document.createElement("h2");
    const para = document.createElement("p");
    let buttonHtml = `<button type="button" id="delDiv" onClick="delDiv(this)" style="float:right;">delete</button><br>`;
    let selHtml = `<select name=color id=color onchange=colorChange(value,this)>
    <option value="wheat">yellow</option>
    <option value="tomato">red</option>
    <option value="aquamarine">green</option></select>`

    document.body.appendChild(note);
    heading.innerHTML =
      "Note " + Number(JSON.parse(localStorage.numberOfNotes) + 1);
    note.appendChild(heading);
    input = document.getElementById("textBoxInput").value;
    para.innerHTML = input;
    note.appendChild(para);
    // note.insertAdjacentElement("afterbegin", del);
    note.insertAdjacentHTML("beforeend", buttonHtml);
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

    // console.log(numberOfNotes);
  } else {
    alert("Empty note");
  }
}

function pinOldNote() {
  arr = JSON.parse(localStorage.getItem("arr"));
  for (let i = 0; i < numberOfNotes; i++) {
    const note = document.createElement("div");
    note.id = Number(i + 1);
    note.classList = "note";

    const heading = document.createElement("h2");
    const para = document.createElement("p");
    let buttonHtml = `<button type="button" id="delDiv" onClick="delDiv(this)" style="float:right;">delete</button><br>`;
    let selHtml = `<select name=color id=color onchange=colorChange(value,this)>
    <option value="wheat">yellow</option>
    <option value="tomato">red</option>
    <option value="aquamarine">green</option></select>`

    document.body.appendChild(note);
    heading.innerHTML = "Note " + Number(i + 1);
    note.appendChild(heading);
    input = arr[i];
    para.innerHTML = input;
    note.appendChild(para);
    note.insertAdjacentHTML("beforeend", buttonHtml);
    note.insertAdjacentHTML("beforeend", selHtml);

  }
}

function delDiv(btn) {
  // console.log(btn.parentNode.id);
  document.getElementById(btn.parentNode.id).remove();
  arr = JSON.parse(localStorage.getItem("arr"));
  arr.splice(btn.parentNode.id-1,1)
  localStorage.setItem("arr", JSON.stringify(arr));
  localStorage.setItem("numberOfNotes", arr.length);
}

function colorChange(value,sel){
console.log("color change"+ value);
document.getElementById(sel.parentNode.id).style.setProperty("--main-color",value);
}
