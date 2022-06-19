# EventTrackerProject





## Overview
MedTrack is an application designed to allow users to track their daily use of prescriptions. It currently has three tables, Medication, User, and UserMedication. Which contain information about the Dosage and Primary uses of specific medication (Medication), the user's information for login in (User), and whether or not the user took the medication on a specific date (UserMedication).


## Table of Contents
<a href="#overview"> Overview</a> <br>
<a href="#technologies-used">Technologies Used </a> <br>
<a href="#medication-routes"> Medication Routes </a> <br>
<a href="#user-routes"> User Routes </a><br>
<a href="#usermedication-routes"> UserMedication Routes</a> <br>
<a href="#future-implementations"> Future Implementations</a>

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
- JavaScript
- Angular
- html
- css
- bootstrap
- ngbootstrap


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

## Future Implementations

 Building the front end of this application challenged me more than most of the projects have. Not just because learning JavaScript in a week is a challenge, but because I made sure to create a project that required more thought and effort than what was absolutely necessary. However, that challenge was definitely worth the extra time I had to take, understanding how these elements fit together and how to use DOM manipulation and DOM traversal to accomplish what I needed was very worthwhile. I currently have a front end built entirely on a single page that dynamically adds and removes elements as needed, with full CRUD cabilities on the USER entity, and CRUD where it was deemed necessary to have a functional program on the other entities. I will definitely be expanding on the capabilities of this webpage as we begin to learn and use Angular, and I am happy for the time I took to understand how these elements fit together. Learning this has definitely increased my understanding of the structure and syntax that goes into building a webpage.

 ## Angular Upgrade

 Rebuilding the front end of this application in Angular made the entire process much simpler. The ability to create an html element in the traditional layout and manipulate it more directly was far easier and faster to implement than relying on DOM Traversal and Manipulation at all times. There was a much more clear connection between the HTML element I wanted to manipulate and the code that was controlling it.
