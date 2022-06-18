export class Medication {
  id: number;
  name: string;
  dosage: number;
  primaryUse: string;
  secondaryUse: string;
  useFrequency: string;

  constructor(id: number = 0, name: string = "", dosage: number = 0, primaryUse: string = '', secondaryUse: string = '', useFrequency: string = ''){
    this.id = id;
    this.name = name;
    this.dosage = dosage;
    this.primaryUse = primaryUse;
    this.secondaryUse = secondaryUse;
    this.useFrequency = useFrequency;
  }
}
