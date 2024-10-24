import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToEmployees() {
    this.router.navigate(['/employees']);
  }

  navigateToEmployeeForm() {
    this.router.navigate(['/employee/add']);
  }

  navigateToDesignations() {
    this.router.navigate(['/designations']);
  }

}
