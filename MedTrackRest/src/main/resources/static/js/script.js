
// INITIALIZE BEGIN
window.addEventListener("load", function(e){
	console.log("script.js loaded");
	init();
})
var user = null;
var messageDiv = null;

function init(){
	document.login.loginbtn.addEventListener('click', login)
	document.login.registerUser.addEventListener('click', showRegister)
	messageDiv = document.getElementById("messageDiv");
}
// INTIALIZE END




// LOGIN BEGIN
let login = function(e){
	e.preventDefault();
	let username = document.login.username.value;
	let password = document.login.password.value;
	 confirmUser(username, password);
}

function confirmUser(username, password){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `api/users/login/${username}/${password}`);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				user = JSON.parse(xhr.responseText);
				userHome(user);
			}
			else {
				printMessage("Username or Password incorrect");
			}
		}	
	}
	xhr.send();	
}
// LOGIN END




// DISPLAY BEGIN
function showRegister(e){
	e.preventDefault();
	let registerDiv = document.getElementById("registerDiv");
	let registerForm = document.createElement('form');
	let usernameIn = document.createElement('input');
		usernameIn.type = "text";
		usernameIn.placeholder = "Username";
		usernameIn.name = "username";
		registerForm.appendChild(usernameIn);
	let passwordIn = document.createElement('input');
		passwordIn.type = "password";
		passwordIn.placeholder = "Password";
		passwordIn.name = "password";
		registerForm.appendChild(passwordIn);
	let firstNameIn = document.createElement('input');
		firstNameIn.type = "text";
		firstNameIn.placeholder = "First Name";
		firstNameIn.name = "firstName";
		registerForm.appendChild(firstNameIn);
	let lastNameIn = document.createElement('input');
		lastNameIn.type = "text";
		lastNameIn.placeholder = "Last Name";
		lastNameIn.name = "lastName";
		registerForm.appendChild(lastNameIn);
		registerForm.appendChild(document.createElement('br'));
	let registerBtn = document.createElement('button');
		registerBtn.type = "submit";
		registerBtn.textContent = "Register";
		registerBtn.className = "btn btn-primary btn-block";
		registerBtn.addEventListener("click", beginRegisterUser);
		registerForm.appendChild(registerBtn)
	registerDiv.appendChild(registerForm);
	e.target.removeEventListener("click", showRegister);
	e.target.addEventListener("click", hideRegister);
}

function hideRegister(e){
	e.preventDefault();
	let registerDiv = document.getElementById("registerDiv");
	removeElements(registerDiv);
	e.target.removeEventListener("click", hideRegister);
	e.target.addEventListener("click", showRegister);
}

function userHome(user){
	console.log(user);
	let loginForm = document.login;
	for (let i = 0; i < loginForm.children.length; i++){
		loginForm.children[i].hidden = true;	
	}
	displayUser(user);
	displayMedications(user);
	displayUserMedications(user);
	
}

function reloadLogin(){
	for (let i = 0; i < loginForm.children.length; i++){
		loginForm.children[i].hidden = false;	
	}
}


function displayUser(user){
	let userDisplay = document.getElementById("userDiv");
	removeElements(userDisplay);
	let userName = document.createElement('h3');
	userName.textContent = user.firstName + " " + user.lastName;
	userName.style.cursor = "pointer";
	userName.addEventListener("click", openEditUser);
	userDisplay.appendChild(userName);
}


function displayMedications(user){
	let medicationDisplay = document.getElementById("medicationDiv");
	removeElements(medicationDisplay);
	let medicationHeader = document.createElement('h3');
	medicationHeader.textContent = "Currently Prescribed";
	medicationDisplay.appendChild(medicationHeader);
	if(user.meds != null){
	for(let i = 0; i < user.meds.length; i++){
		
		let medName = document.createElement('h5');
		  medName.textContent = user.meds[i].name;
		  medicationDisplay.appendChild(medName);
		
		let medDetails = document.createElement('ul');
		
		  let dosage = document.createElement('li');
		    dosage.textContent = user.meds[i].dosage;
		    medDetails.appendChild(dosage);
		
		  let primaryUse = document.createElement('li');
		    primaryUse.textContent = user.meds[i].primaryUse;
		    medDetails.appendChild(primaryUse);
		
		  if(user.meds[i].secondaryUse != null && user.meds[i].secondaryUse != ""){
			let secondaryUse = document.createElement('li')
			secondaryUse.textContent = user.meds[i].secondaryUse;
			medDetails.appendChild(secondaryUse);
		  }
		
		  let useFrequency = document.createElement('li');
			useFrequency.textContent = user.meds[i].useFrequency;
			medDetails.appendChild(useFrequency);
	      medicationDisplay.appendChild(medDetails);
	      
	      let addUserMedForm = document.createElement('form');
	      
	      let hiddenUserId = document.createElement('input')
	        hiddenUserId.value = user.id;
	        hiddenUserId.hidden = "true";
	        addUserMedForm.appendChild(hiddenUserId);
	      
	      let hiddenMedId = document.createElement('input');
	        hiddenMedId.value = user.meds[i].id;
	        hiddenMedId.hidden = "true";
	        addUserMedForm.appendChild(hiddenMedId);
	      	  
	      let userMedSubmit = document.createElement('button');
	        userMedSubmit.type = "submit";
	        userMedSubmit.textContent = "Log this med"
	        userMedSubmit.className = "btn btn-primary";
	        userMedSubmit.addEventListener('click', addUserMed);
	        addUserMedForm.appendChild(userMedSubmit);
	      
	      medicationDisplay.appendChild(addUserMedForm);
	      medicationDisplay.appendChild(document.createElement('hr'));
	      }  
	}
}


function displayUserMedications(user){
	let usermeds = user.userMeds;
	let usermedsDisplay = document.getElementById("userMedDiv");
		removeElements(usermedsDisplay);
		
	let usermedsHeader = document.createElement('h3');
	  usermedsHeader.textContent = "Daily Tracker"
	
	if(user.userMeds != null){
	let medTable = document.createElement('table');
	  medTable.className = "table";
	let tableHead = document.createElement('thead');
	  medTable.appendChild(tableHead);
	  
	let tableBody = document.createElement('tbody');
	  medTable.appendChild(tableBody);
	let headerRow = document.createElement('tr');
	  tableHead.appendChild(headerRow);
	
	let headerOne = document.createElement('th');
	  headerOne.textContent = "DATE";
	  headerOne.scope = "col"
	  headerRow.appendChild(headerOne);
	
	let headerTwo = document.createElement('th');
	  headerTwo.textContent = "MEDICATION";
	  headerRow.appendChild(headerTwo)
	  headerTwo.scope = "col"
	  usermedsDisplay.appendChild(usermedsHeader);
	
	for(let i = 0; i < usermeds.length; i++){
		let detailRow = document.createElement('tr')
		  medTable.append(detailRow);
		let takenOn = document.createElement('td');
		  takenOn.textContent = usermeds[i].date;
		  detailRow.appendChild(takenOn);
		let medName = document.createElement('td');
		  medName.textContent = usermeds[i].medication.name;
		  detailRow.appendChild(medName);
	}
	usermedsDisplay.appendChild(medTable);
	}
}

function removeElements(div){
	while(div.firstElementChild){
		div.removeChild(div.firstElementChild);
	}
	if(messageDiv.firstElementChild){
		removeMessage();
	}
}

// HOMEPAGE DISPLAY END





// USERMED MANIPULATION BEGIN
function addUserMed(e){
	e.preventDefault();
	let medInput = e.target.previousElementSibling;
	let userInput = medInput.previousElementSibling;
	let userId = userInput.value;
	let userMedId = medInput.value;
	startUserMed(userId, userMedId);		
}

function startUserMed(userId, medId){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/medications/${medId}`)
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let med = JSON.parse(xhr.responseText);
					let userMed = {
		              medication: med,
		              taken: true,
	                }
				createUserMed(userId, userMed);
			} else{
				printMessage("Unable to find medication");
			}
		}
		
	}
	xhr.send();
}

function createUserMed(userId, userMed){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", `api/users/${userId}/usermedications`)

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 201 || xhr.status === 200){
				let userMedication = JSON.parse(xhr.responseText);
				user.userMeds.push(userMedication);
				displayUserMedications(user);
			}
			else {
			printMessage("Unable to log medication")
		}
		} 
	}
	console.log(userMed)
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(userMed));
}
// USERMED MANIPULATION END



// USER MANIPULATION BEGIN
function findUser(id){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `api/users/${id}`)
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let user = JSON.parse(xhr.responseText);
				return user;
			} else {
				return null;
			}
		}
	}
	xhr.send();
}

function openEditUser(e){
	console.log("accessed edit user");
	createEditUserForm(e.target.parentElement);
	e.target.removeEventListener('click', openEditUser);
	e.target.addEventListener('click', closeEditUser);
}

function closeEditUser(e){
	console.log("closed edit user");
	removeEditUserForm(e.target);
	e.target.removeEventListener('click', closeEditUser);
	e.target.addEventListener('click', openEditUser);
}

function createEditUserForm(parent){
	let form = document.createElement('form');
	  parent.appendChild(form);
	  
	let firstName = document.createElement('input');
	  firstName.type = "text";
	  firstName.value = user.firstName;
	  firstName.name = "firstName";
	  form.appendChild(firstName);
	  
	let lastName = document.createElement('input');
	  lastName.type = "text";
	  lastName.value = user.lastName;
	  lastName.name = "lastName";
	  form.appendChild(lastName);
	  
	let userEditSubmit = document.createElement('button');
	  userEditSubmit.type = "submit";
	  userEditSubmit.textContent = "Confirm Edit";
	  userEditSubmit.className = "btn btn-warning";
	  userEditSubmit.addEventListener('click', function(e){
		e.preventDefault();
		let lastNameInput = e.target.previousElementSibling;
		let firstNameInput = lastNameInput.previousElementSibling;
		let editUser = {
			id: user.id,
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
		}
		console.log(editUser);
		sendEditUser(editUser);
	})
	form.appendChild(userEditSubmit);
	let userDeleteSubmit = document.createElement('button');
		userDeleteSubmit.type = "submit";
		userDeleteSubmit.textContent = "Delete";
		userDeleteSubmit.className = "btn btn-danger";
		userDeleteSubmit.addEventListener("click", function(e){
			e.preventDefault();
			deleteUser(user.id)
		})
	form.appendChild(userDeleteSubmit);
	  
}

function removeEditUserForm(sibling){
	sibling.parentElement.removeChild(sibling.nextElementSibling);
}

function sendEditUser(user){
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/users/${user.id}`);
	xhr.setRequestHeader("Content-type", "application/json");
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 201 || xhr.status === 200){
				let editedUser = JSON.parse(xhr.responseText);
				user = editedUser;
				displayUser(user);
			}
			else {
			printMessage("Unable to update user information");
		}
		} 
	}
	
	xhr.send(JSON.stringify(user));
}

function deleteUser(id){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/users/${user.id}`);
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 204){
				reloadLogin();
				printMessage("User Deleted");
			}
			else {
			printMessage("Unable to Delete User");
		}
		} 
	}
	
	xhr.send();
}

function beginRegisterUser(e){
	e.preventDefault();
	let lastName = e.target.previousElementSibling.previousElementSibling;
	let firstName = lastName.previousElementSibling;
	let password = firstName.previousElementSibling;
	let username = password.previousElementSibling;
	let user = {
		username: username.value,
		password: password.value,
		firstName: firstName.value,
		lastName: lastName.value
	}
	registerUser(user);
	removeElements(document.getElementById('registerDiv'));
}

function registerUser(user){
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/users`);
	xhr.setRequestHeader("Content-type", "application/json");
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 201 || xhr.status === 200){
				let newUser = JSON.parse(xhr.responseText);
				user = newUser;
				userHome(user);
			}
			else {
			printMessage("Unable to create user");
		}
		} 
	}
	
	console.log(user)
	xhr.send(JSON.stringify(user));
}

// USER MANIPULATION END



// PRINT MESSAGE BEGIN
function printMessage(message){
	let messageDisplay = document.createElement('h5');
	messageDisplay.textContent = message;
	messageDiv.appendChild(messageDisplay);
}

function removeMessage(){
	while(messageDiv.firstElementChild){
		messageDiv.removeChild(messageDiv.firstElementChild);
	}
}
// PRINT MESSAGE END