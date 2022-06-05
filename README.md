# EventTrackerProject

## Overview
MedTrack is an application designed to allow users to track their daily use of prescriptions. It currently has three tables, Medication, User, and UserMedication. Which contain information about the Dosage and Primary uses of specific medication (Medication), the user's information for login in (User), and whether or not the user took the medication on a specific date (UserMedication).

 Currently this project does not have a front-end implementation, but once it does a user will be able to log in, view what medications they are currently taking, track if they have been taking it consistently and add entries. Eventual implementations could see user roles such as *Doctor*, *Patient*, *Hospital Admin*, etc. which would allow patients to give real-time updates to their doctors on how a medication is affecting them, how consistently they are taking it, and allow doctors to easily track prescriptions for their patients and monitor dosage, as well as allowing Hospital Admins to track what medications are being commonly prescribed and their effectiveness (with sanitized user information, of course). 

## Technologies Used
- JPA
- Spring Tool Suite
- REST api
- SQL
- JPQL
- MySQL WorkBench
- Java
- Git
- GitHub
- Gradle


## Expected Routes

1. Medication:
* **GET** `List<Medication>` `http://localhost:8083/api/medications` *Find all medications*
* **GET** `Medication` ` http://localhost:8083/api/medications/{id} ` *Find a medication by id*
* **GET** `List<Medication>` `http://localhost:8083/api/medications/search/{keyword}` *Find medications with name like*
* **POST** `Medication` `http://localhost:8083/api/medications` *Create New Medication*
* **PUT** `Medication` `http://localhost:8083/api/medications/{id}` *Update Medication*
* **DELETE** `void` `http://localhost:8083/api/medications/{id}` *Delete Medication*

2. Users
* **GET** `List<User>` `http://localhost:8083/api/users` *Find all users*
* **GET** `User`  `http://localhost:8083/api/users/{id}` *Find a user by id*
* **GET** `User`  `http://localhost:8083/api/users/login/{username}/{password}` *Login User*
* **POST** `User` `http://localhost:8083/api/users` *Create New User*
* **PUT** `User` `http://localhost:8083/api/users/{id}` *Update a User*
* **DELETE** `User`  `http://localhost:8083/api/medications`  *Delete a User*

3. UserMedications
* **GET** `List<UserMedication>`  `http://localhost:8083/api/user/{id}/usermedications` *Find all UserMedications for a User*
* **GET** `UserMedication` `http://localhost:8083/api/usermedications/{id}`  *Find a UserMedication by ID*
* **POST** `UserMedication ` `http://localhost:8083/api/users/{id}/usermedications`  *Create a new UserMedication*
* **PUT** `UserMedication`  `http://localhost:8083/api/usermedications/{id}`  *Update a UserMedication*
* **DELETE** `UserMedication`  `http://localhost:8083/api/usermedications/{id}`  *Delete a UserMedication*
