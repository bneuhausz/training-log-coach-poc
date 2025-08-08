import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProfileService } from "./profile-service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-profile',
  providers: [ProfileService],
  imports: [MatProgressSpinnerModule, MatSlideToggleModule],
  template: `
    <h1>User Profile</h1>
    @if (profileService.isLoading()) {
      <mat-spinner />
    }
    @else {
      <mat-slide-toggle (change)="profileService.toggleSelfCoaching$.next($event.checked)" [checked]="profileService.selfCoaching()">Self coaching</mat-slide-toggle>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Profile {
  protected readonly profileService = inject(ProfileService);
}