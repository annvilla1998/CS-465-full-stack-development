import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-book-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-trip.component.html',
})
export class BookTripComponent implements OnInit {
  public bookForm!: FormGroup;
  trip!: Trip;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      this.router.navigate(['/list-trips']);
      return;
    }
    this.tripService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.trip = trip;
      },
      error: (error: any) => {
        console.error('Error fetching trip:', error);
        this.router.navigate(['/list-trips']);
      },
    });
    this.bookForm = this.formBuilder.group({
      length: ['', Validators.required],
      start: ['', Validators.required],
    });
  }

  public onSubmit() {
    // Check if user is still logged in before submitting
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.submitted = true;
    if (this.bookForm.valid) {
      this.tripService.bookTrip(this.bookForm.value, this.trip.id).subscribe({
        next: (data: any) => {
          this.router.navigate(['/list-trips']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        },
      });
    }
  } 

  get f() {
    return this.bookForm.controls;
  }
}
