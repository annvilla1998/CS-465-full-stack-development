import { BROWSER_STORAGE } from '../storage';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

import { Trip } from '../models/trips';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private apiBaseUrl = environment.apiBaseUrl || 'http://localhost:3000/api';
  private url = `${this.apiBaseUrl}/trips`;
  private user: User | undefined;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) // private authenticationService: AuthenticationService
  {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };
    return this.http.post<Trip>(this.url, formData, httpOptions);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };
    return this.http.put<Trip>(
      `${this.url}/${formData.code}`,
      formData,
      httpOptions
    );
  }

  bookTrip(formData: Reservation, tripId: number): Observable<Reservation> {
    const token = this.storage.getItem('travlr-token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Get user ID from JWT token
    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id;
    } catch (error) {
      throw new Error('Invalid authentication token');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post<Reservation>(
      `${this.apiBaseUrl}/users/${userId}/reservations`,
      { ...formData, tripId},
      httpOptions
    );
  }

  getUserTrips(): Observable<Trip[]> {
    const token = this.storage.getItem('travlr-token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Get user ID from JWT token
    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id;
    } catch (error) {
      throw new Error('Invalid authentication token');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/users/${userId}/reservations`, httpOptions);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public getUser(token: string): Promise<User> | null {
    // Decode JWT token to get user ID
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      // Make API call to get user data
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };

      return this.http
        .get<User>(`${this.apiBaseUrl}/users/${userId}`, httpOptions)
        .toPromise()
        .then((user: User | undefined) => {
          this.user = user;
          return this.user;
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
          return error.message || error;
        });
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => (response as AuthResponse) || {})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
