import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./header";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, MatSidenavModule],
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav #sidenav>
      </mat-sidenav>
      <app-header [sidenav]="sidenav" />
    
      <main>
        <router-outlet />
      </main>
    </mat-sidenav-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {

}