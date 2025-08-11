import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core"
import { MatButtonModule } from "@angular/material/button";
import { Auth } from "../shared/auth/auth";
import { environment } from "../../environments/environment";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenav } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar class="!bg-primary !text-on-primary">
      @if (auth.isAuthenticated()) {
        <button matIconButton (click)="sidenav().open()">
          <mat-icon class="!text-on-primary">menu</mat-icon>
        </button>
      }
      <span class="flex-auto"></span>
      @if (auth.isAuthenticated()) {
        <span>{{ auth.user()?.email }}</span>
        <button matButton="elevated" class="ml-3" (click)="auth.signOut$.next()">Logout</button>
      }
      @else {
        <button matButton="elevated" (click)="login()">Login</button>
      }
    </mat-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  protected readonly auth = inject(Auth);
  sidenav = input.required<MatSidenav>();

  //TODO: Replace with a proper login form
  protected login() {
    this.auth.signIn$.next({ email: environment.testUser.email, password: environment.testUser.password });
  }
}