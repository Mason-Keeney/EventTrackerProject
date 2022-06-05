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


### Medication Routes
|      Return Type       |   Method   |                    Route                                |       Functionality       |
|------------------------|------------|---------------------------------------------------------|---------------------------|
| `List<Medication>`     | **GET**    | `http://localhost:8083/api/medications`                 | *Find all Medications*    |
| `Medication`           | **GET**    | `http://localhost:8083/api/medications/{id}`            | *Find a Medication by ID* |
| `List<Medication>`     | **GET**    | `http://localhost:8083/api/medications/search/{keyword}`| *Find Medication by Name* |
| `Medication`           | **POST**   | `http://localhost:8083/api/medications`                 | *Create New Medication*   |
| `Medication`           | **PUT**    | `http://localhost:8083/api/medications/{id}`            | *Update Medication*       |
| `void`                 | **DELETE** | `http://localhost:8083/api/medications/{id}`            |  *Delete Medication*      |




### User Routes
| Return Type  |   Method   |                          Route                                |    Functionality    |
|--------------|------------|---------------------------------------------------------------|---------------------|
| `List<User>` | **GET**    | `http://localhost:8083/api/users`                             | *Find all users*    |
| `User`       | **GET**    | `http://localhost:8083/api/users/{id}`                        | *Find a user by id* |
| `User`       | **GET**    | `http://localhost:8083/api/users/login/{username}/{password}` | *Login User*        |
| `User`       | **POST**   | `http://localhost:8083/api/users`                             | *Create New User*   |
| `User`       | **PUT**    | `http://localhost:8083/api/users/{id}`                        | *Update a User*     |
| `void`       | **DELETE** | `http://localhost:8083/api/medications`                       | *Delete a User*     |



### UserMedication Routes
|      Return Type       |   Method   |                           Route                                  |             Functionality             |
|------------------------|------------|------------------------------------------------------------------|---------------------------------------|
| `List<UserMedication>` | **GET**    | `http://localhost:8083/api/user/{id}/usermedications`  | *Find all UserMedications for a User* |
| `UserMedication`       | **GET**    | `http://localhost:8083/api/usermedications/{id}`       | *Find a UserMedication by ID*         |
| `UserMedication`       | **POST**   | `http://localhost:8083/api/users/{id}/usermedications` | *Create a new UserMedication*         |
| `UserMedication`       | **PUT**    | `http://localhost:8083/api/usermedications/{id}`       | *Update a UserMedication*             |
| `void`                 | **DELETE** | `http://localhost:8083/api/usermedications/{id}`       | *Delete a UserMedication*             |
