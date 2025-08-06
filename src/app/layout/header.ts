import { ChangeDetectionStrategy, Component, inject } from "@angular/core"
import { MatButtonModule } from "@angular/material/button";
import { Auth } from "../shared/auth/auth";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  template: `
    <header>
      @if (auth.isAuthenticated()) {
        <span>Welcome, {{ auth.user()?.email }}</span>
        <button mat-button (click)="auth.signOut$.next()">Logout</button>
      }
      @else {
        <button mat-button (click)="login()">Login</button>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  protected readonly auth = inject(Auth);

  //TODO: Replace with a proper login form
  protected login() {
    this.auth.signIn$.next({ email: environment.testUser.email, password: environment.testUser.password });
  }
}