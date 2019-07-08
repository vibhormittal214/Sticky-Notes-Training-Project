var stickyNotes = document.getElementById('stickyNotes');
stickyNotes.addEventListener('click',performReminderAction);
//the next 2 lines stores the format and the noyte written
var stickyNotesItems=document.getElementById('stickyNotes');
var sticky=localStorage.getItem('sticky');
if(sticky!=undefined){
	//this stores the list item div and the imagee delete button and the input field inside the div
	stickyNotesItems.innerHTML=sticky;
	if(stickyNotesItems.childNodes[0]!=undefined){
		//this stores the note written on each list item div
		let sticky1=localStorage.getItem('sticky1');
		sticky1 = JSON.parse(sticky1);
		for (let i =0; i<= sticky1.data.length - 1; i++) {
			stickyNotesItems.childNodes[i].childNodes[0].childNodes[0].value=sticky1.data[sticky1.data.length-1-i];
		}
	}
}
//for saving the list item div and content inside it
function save(){
	localStorage.setItem('sticky',stickyNotesItems.innerHTML);
}
//for saving the note written inside each list item div
function saveText(note){
	let sticky1=localStorage.getItem('sticky1');
	if (!sticky1) {
        // Notes does not exist
        sticky1 = {};
        sticky1.data = [];
    } else {
        // Notes already exists
        sticky1 = JSON.parse(sticky1);
    }
    sticky1.data.push(note);
    sticky1 = JSON.stringify(sticky1);
    localStorage.setItem('sticky1', sticky1);
}
//deleting the note written on each div
function deleteText(noteValue) {
	let sticky1 = localStorage.getItem('sticky1');
	sticky1 = JSON.parse(sticky1);
	let index = sticky1.data.indexOf(noteValue);
	if (index > -1) {
		sticky1.data.splice(index, 1);
	}
	localStorage.setItem('sticky1', JSON.stringify(sticky1));
	return index;
};
//triggers when user clicks new note button
document
.getElementById('addNewNote')
.addEventListener('click',function(){
	event.preventDefault();
	//creating a dynamic list item 
	var listItem = document.createElement('li');
	//creating a dynamic division inside list item
	var divimg = document.createElement('div');
	//adding the backgroung note image to that div
	var img=document.createElement('img');
	img.src="back.png";
	var imgdel=document.createElement('img');
	imgdel.src="del.png";
	imgdel.classList.add("imgdel1");
	//adding the input field to that div
	var divtext1 = document.createElement('input');
	divtext1.setAttribute('type', 'text');
	divtext1.classList.add("text1");
	divimg.append(divtext1);
	divimg.append(img);
	divimg.append(imgdel);
	listItem.append(divimg);
	stickyNotes.prepend(listItem);
	listItem.childNodes[0].childNodes[0].addEventListener('focusout', function () {
		if(listItem.childNodes[0].childNodes[0].value!=""){
			saveText(listItem.childNodes[0].childNodes[0].value);
			save();}
		});
})
//when the user updates a note
function addNote(note){
	var listItem = document.createElement('li');
	var divimg = document.createElement('div');
	var img=document.createElement('img');
	img.src="back.png";
	var imgdel=document.createElement('img');
	imgdel.src="del.png";
	imgdel.classList.add("imgdel1");
	var divtext1 = document.createElement('input');
	divtext1.setAttribute('type', 'text');
	divtext1.classList.add("text1");
	divimg.append(divtext1);
	divimg.append(img);
	divimg.append(imgdel);
	listItem.append(divimg);
	stickyNotes.prepend(listItem);
	listItem.childNodes[0].childNodes[0].value=note;
	saveText(listItem.childNodes[0].childNodes[0].value);
	save();
	location.reload();
}
//when user clicks on delete image on the note or when he updates the text
function performReminderAction(){

	if(event.target.classList.value=='text1' && event.target.parentNode.childNodes[0].value!=""){
		var currNote=event.target.parentNode.childNodes[0].value
		event.target.addEventListener('focusout', function () {
			var curr1Note=event.target.parentNode.childNodes[0].value;
			event.target.parentNode.childNodes[0].value=currNote;
			if(currNote!=curr1Note && curr1Note!=""){
				addNote(curr1Note);}
			});
	}	
	else if(event.target.classList.value=='imgdel1'){
		deleteText(event.target.parentNode.childNodes[0].value);
		window.confirm('are you sure!') && stickyNotes.removeChild(event.target.parentNode.parentNode);
		save();
	}
}
