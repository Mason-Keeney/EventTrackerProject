import { Medication } from "./medication";
import { User } from "./user";

export class UserMedication {
  id: number;
  medication: Medication;
  user: User | null;
  date: string;
  taken: boolean;

  constructor(id: number = 0, med: Medication = new Medication(), date: string = '', taken: boolean = false){
    this.id = id;
    this.medication = med;
    this.user = null;
    this.date = date;
    this.taken = taken;
  }

}
