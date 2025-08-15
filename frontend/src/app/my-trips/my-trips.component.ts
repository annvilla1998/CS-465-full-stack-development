import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [CommonModule],
  providers: [TripDataService],
  templateUrl: './my-trips.component.html',
})
export class MyTripsComponent implements OnInit {
  reservations?: any[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getMyTrips(): void {
    this.tripDataService.getUserTrips().subscribe({
      next: (value: any) => {
        this.reservations = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.getMyTrips(); 
    } else {
      this.router.navigate(['login']);
    }
  }
}
