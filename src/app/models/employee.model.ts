import { Designation } from "./designation";

export interface Employee {
    empId: number;
    firstName: string;
    lastName: string;
    phone:number;
    email: string;
    age: number;
    dateOfJoining: Date;
    gender: number; 
    isMarried: boolean;
    isActive: boolean;
    desId: number;
    designation: Designation;
  }

