function pinNote() {
    

  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class = "note">
    <p id="out1"></p>
    <p>111</p>
    </div>
    `;
  note.insertAdjacentHTML("afterbegin", htmlData);
  document.body.appendChild(note);
  
  var input = document.getElementById("note1").value;
  document.getElementById("out1").innerHTML = input;  

}
