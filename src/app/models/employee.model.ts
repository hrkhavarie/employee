import { Designation } from "./designation";

export interface Employee {
    empId: number;
    firstName: string;
    lastName: string;
    phone:number;
    email: string;
    empAge: number;
    dateOfJoining: Date;
    gender: Gender; 
    isMarried: boolean;
    isActive: boolean;
    desId: number;
    designation: Designation;
    selected: boolean;

  }

  export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
  }

  

