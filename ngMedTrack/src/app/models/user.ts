import { Medication } from "./medication";
import { UserMedication } from "./user-medication";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  meds: Medication[];
  userMeds: UserMedication[] | null;

  constructor(id: number = 0, firstName: string = '', lastName: string = '', username: string = '', password: string = '', meds: Medication[] = [], userMeds: UserMedication[] | null = null ){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.meds = meds;
    this.userMeds = userMeds;
  }
}
