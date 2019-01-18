var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var items = ul.getElementsByTagName("li");
var deleteButton = document.getElementsByClassName("Delete");


for (var i = 0; i < deleteButton.length; i++){
	deleteButton[i].addEventListener('click', removeParent, false);
}

function removeParent(e){
	e.target.removeEventListener("click", removeParent, false);
	e.target.parentNode.remove();

}

function lengthInput(){
	return input.value.length;
}

function createListElement(){
	var li = document.createElement("li");
	var deleteButton1 = document.createElement("button")
	deleteButton1.appendChild(document.createTextNode("Delete"))
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);
	li.appendChild(deleteButton1);
	deleteButton1.addEventListener("click", removeParent, false)
	input.value = "";	
}
function createAfterClick(){
		if (lengthInput() > 0){
			createListElement();
		}
	}
function strikeThrough(event){
	event.target.classList.toggle("done");
}
function createAfterKeypress(event){
		if (lengthInput() > 0 && event.keyCode == 13){
		createListElement();
		}
}
button.addEventListener('click', createAfterClick)

input.addEventListener('keypress', createAfterKeypress)

ul.addEventListener("click",strikeThrough) 

