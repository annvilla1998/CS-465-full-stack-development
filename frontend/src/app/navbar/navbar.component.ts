import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private adminSubscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    // Subscribe to admin status changes
    this.adminSubscription = this.authenticationService.adminStatus$.subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    });

    // Check initial admin status
    this.checkAdminStatus();
  }

  ngOnDestroy() {
    this.adminSubscription.unsubscribe();
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  public onLogout(): void {
    this.isAdmin = false; 
    return this.authenticationService.logout();
  }
  public isAdminUser(): boolean {
    return this.isAdmin;
  }
  private async checkAdminStatus(): Promise<void> {
    try {
      if (this.authenticationService.isLoggedIn()) {
        await this.authenticationService.refreshAdminStatus();
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }
}
