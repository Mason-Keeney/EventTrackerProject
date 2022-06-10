window.addEventListener("load", function(e){
	console.log("script.js loaded");
	init();
})

function init(){
	console.log("in init");
	document.login.loginbtn.addEventListener('click', login)
}

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
				let user = JSON.parse(xhr.responseText);
				userHome(user);
			}
			else {
				printError("Username or Password incorrect");
			}
		}	
	}
	xhr.send();	
}

function userHome(user){
	console.log(user);
	let loginForm = document.login;
	while(loginForm.firstElementChild){
		loginForm.removeChild(loginForm.firstElementChild);
	}
	displayUser(user);
	displayMedications(user);
	displayUserMedications(user);
	
	
	
}

function displayUser(user){
	let userDisplay = document.getElementById("userDiv");
	let userName = document.createElement('h3');
	userName.textContent = user.firstName + " " + user.lastName;
	userDisplay.appendChild(userName);
}

function displayMedications(user){
	let medicationDisplay = document.getElementById("medicationDiv");
	let medicationHeader = document.createElement('h3');
	medicationHeader.textContent = "Currently Prescribed";
	medicationDisplay.appendChild(medicationHeader);
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
	}
}

function displayUserMedications(user){
	let usermeds = user.userMeds;
	let usermedsDisplay = document.getElementById("userMedDiv");
	let usermedsHeader = document.createElement('h3');
	usermedsHeader.textContent = "Daily Tracker"
	usermedsDisplay.appendChild(usermedsHeader);
	for(let i = 0; i < usermeds.length; i++){
		let medName = document.createElement('h5');
		medName.textContent = usermeds[i].medication.name;
		usermedsDisplay.appendChild(medName);
		
		let details = document.createElement('ul');
		let takenOn = document.createElement('li');
		takenOn.textContent = usermeds[i].date;
		details.appendChild(takenOn);
		usermedsDisplay.appendChild(details);
	}
}



function printError(error){
	console.log(error);
}
