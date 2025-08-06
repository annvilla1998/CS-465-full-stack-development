import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  public onSubmit() {
    this.submitted = true;

    // Check if user is still logged in before submitting
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          this.router.navigate(['/list-trips']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        },
      });
    }
  } 

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  get f() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    // Check if user is logged in first
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      resort: ['', Validators.required],
      pricePerPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        this.trip = value;
        this.editForm.setValue({
          id: [],
          code: [tripCode],
          name: [value.name],
          length: [value.length],
          start: [value.start],
          resort: [value.resort],
          pricePerPerson: [value.pricePerPerson],
          image: [value.image],
          description: [value.description],
        });
        if (!value) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.message = 'Trip: ' + tripCode + ' retrieved';
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }
}
