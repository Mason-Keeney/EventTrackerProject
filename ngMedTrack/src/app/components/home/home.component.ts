import { UserMedicationService } from './../../services/user-medication.service';
import { MedicationService } from './../../services/medication.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Medication } from 'src/app/models/medication';
import { User } from 'src/app/models/user';
import { UserMedication } from 'src/app/models/user-medication';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  medications: Medication[] = [];
  userMeds: UserMedication[] | null = null;
  user: User | null = null;
  newUser: User = new User();
  editUser: User | null = null;

  username: string = '';
  password: string = '';
  register: boolean = false;

  today = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');
  showUserMed: UserMedication | null = null;
  getNewMed: boolean = false;


  constructor(
    private userService: UserService,
    private medService: MedicationService,
    private userMedService: UserMedicationService,
    private datePipe: DatePipe
    ) { }

  loadMedications(){
    this.medService.index().subscribe({
      next: (medsList) => {
        this.medications = medsList;
      },
      error: (problem) => {
        console.log("HomeHttpComponent.loadMedications(): error loading medications: " + problem)
      }
    })
  }

  loginUser(){
    this.userService.login(this.username, this.password).subscribe({
      next: (currentUser) => {
        this.user = currentUser;
        if(this.user.userMeds){
          this.loadUserMeds();
        }
        this.username = '';
        this.password = '';
      },
      error: (problem) =>{
        console.log("HomeHttpComponent.loginUser(): error loading user: " + problem);
      }
    })
  }
  logout(){
    this.userMeds = [];
    this.user = null;
    this.newUser = new User();
    this.editUser = null;

    this.username = '';
    this.password = '';
    this.register = false;

    this.showUserMed = null;
    this.getNewMed = false;
  }

  startRegisterUser(){
    this.register = true;
  }

  registerUser(){
    this.userService.create(this.newUser).subscribe({
      next: (createdUser) => {
        this.user = createdUser;
        this.register = false;
      },
      error: (problem) => {
        console.log("HomeHttpComponent.registerUser(): error creating user: " + problem)
      }
    })
  }

  updateUser(user: User){
    user.userMeds = null;
    this.userService.update(user.id, user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.editUser = null;
      },
      error: (problem) => {
        console.log("HomeHttpComponent.updateUser(): error updating user.");
        console.log(problem);
      }
    })

  }

  loadUserMeds(){
    this.userMedService.index(this.user).subscribe({
      next: (userMedsList) => {
        this.userMeds = userMedsList
      },
      error: (problem) => {
        console.log("HomeHttpComponent.loadUserMeds(): error retreving userMeds: " + problem);
      }
    })
  }

  startLogUserMed(med: Medication){
    let userMed = new UserMedication();
    if(this.user && this.today){
      userMed = new UserMedication(0, med, this.today, true);
    }
    this.logUserMed(userMed);
  }

  logUserMed(userMed: UserMedication){
    if(this.user)
      this.userMedService.create(this.user.id, userMed).subscribe({
      next: (createdUserMed) => {
        if(this.user?.userMeds){
          this.loadUserMeds();
        }
      },
      error: (problem) => {
        console.log("HomeHttpComponent.logUserMed(): error creating userMed: " + problem)
      }
    })
  }

  hasTakenRequired(med: Medication): Boolean {
    let taken = false;
    let count = 0;
    if(this.user && this.userMeds){
        this.userMeds.forEach(userMed =>{
          if(userMed.medication.name === med.name && userMed.date === this.today){
            count++;
          }
          if((med.useFrequency === "Once Daily" || med.useFrequency === "As Needed") && count === 1){
            taken = true;
          }
          if(med.useFrequency === "Twice Daily" && count === 2){
            taken = true;
          }

        })
    }
    return taken;
  }

  hasTakenAllMeds(user: User): boolean{
    let taken = true;
    user.meds.forEach(med => {
      if(!this.hasTakenRequired(med)){
        taken = false;
      }
    });
    return taken;
  }

  updateUserMed(userMed: UserMedication){
    userMed.user = null;
    console.log(userMed);
    this.userMedService.update(userMed.id, userMed).subscribe({
      next: (updatedUserMed) => {
        this.showUserMed = null;
      },
      error: (problem) => {
        console.log("HomeHttpComponent.updateUserMed(): error updating userMed:")
        console.log(problem);
      }
    })
  }

  deleteUserMed(id: number){
    this.userMedService.destroy(id).subscribe({
      next: () => {
        if(this.user?.userMeds){
          this.loadUserMeds()
        }
      },
      error: (problem) => {
        console.log("HomeHttpComponent.deleteUserMed(): error deleting userMed: " + problem);
      }
    })
  }

  createNewMedication(med: Medication){
    let userMed = new UserMedication()
    if(this.today){
      userMed = new UserMedication(0, med, this.today, false);
      this.getNewMed = false;
      if(this.user){
        this.username = this.user.username;
        this.password = this.user.password;
        this.loginUser();
      }
    }
    if(this.user)
      this.userMedService.create(this.user.id, userMed).subscribe({
      next: (createdUserMed) => {
        if(this.user?.userMeds){
          this.loadUserMeds();
        }
      },
      error: (problem) => {
        console.log("HomeHttpComponent.logUserMed(): error creating userMed: " + problem)
      }
    })
  }




  ngOnInit(): void {

  }

}
