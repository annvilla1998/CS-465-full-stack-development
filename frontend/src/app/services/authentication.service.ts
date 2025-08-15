import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from './trip-data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private adminStatusSubject = new BehaviorSubject<boolean>(false);
  public adminStatus$ = this.adminStatusSubject.asObservable();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private router: Router
  ) {
    // Initialize admin status on service creation
    this.initializeAdminStatus();
  }

  private async initializeAdminStatus(): Promise<void> {
    if (this.isLoggedIn()) {
      await this.updateAdminStatus();
    }
  }
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }
  public login(user: User): Promise<any> {
    return this.tripDataService
      .login(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        this.updateAdminStatus(); 
      });
  }
  public register(user: User): Promise<any> {
    return this.tripDataService
      .register(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        this.updateAdminStatus(); 
      });
  }
  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.adminStatusSubject.next(false); 
    this.router.navigate(['/login']);
  }
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public async getCurrentUser(): Promise<User | undefined> {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      const user = await this.tripDataService.getUser(token);
      if (!user) {
        return undefined;
      }
      return { email, name, admin: user.admin } as User;
    }
    return undefined;
  }

  private async updateAdminStatus(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      this.adminStatusSubject.next(user?.admin || false);
    } catch (error) {
      console.error('Error updating admin status:', error);
      this.adminStatusSubject.next(false);
    }
  }

  public async refreshAdminStatus(): Promise<void> {
    await this.updateAdminStatus();
  }
}
