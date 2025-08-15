import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trips';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  providers: [TripDataService],
  templateUrl: './trip-listing.component.html',
})
export class TripListingComponent implements OnInit {
  trips?: Trip[];
  message: string = '';
  isAdmin: boolean = false; 

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public isAdminUser(): boolean {
    return this.isAdmin; 
  }

  private async checkAdminStatus(): Promise<void> {
    try {
      const user = await this.authenticationService.getCurrentUser();
      this.isAdmin = user?.admin || false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      this.isAdmin = false;
    }
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }


  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any) => {
        this.trips = value;
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
      this.getStuff();
      this.checkAdminStatus(); 
    } else {
      this.router.navigate(['login']);
    }
  }
}
