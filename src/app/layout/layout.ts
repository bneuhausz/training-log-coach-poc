import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Header } from "./header";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, MatSidenavModule, MatListModule, RouterLink, MatCardModule],
  template: `
    <mat-sidenav-container fullscreen class="!bg-slate-200">
      <mat-sidenav #sidenav>
        <mat-nav-list (click)="sidenav.close()">
          <a mat-list-item routerLink="/dashboard">Dashboard</a>
          <a mat-list-item routerLink="/profile">Profile</a>
          <a mat-list-item routerLink="/athletes">Athletes</a>
          <a mat-list-item routerLink="/create-block">Create Block</a>
        </mat-nav-list>
      </mat-sidenav>
      <app-header [sidenav]="sidenav" />
      <router-outlet />
    </mat-sidenav-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {

}