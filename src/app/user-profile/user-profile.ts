import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { UserProfileService } from "./user-profile-service";

@Component({
  selector: 'app-user-profile',
  providers: [UserProfileService],
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
  protected readonly profileService = inject(UserProfileService);
}