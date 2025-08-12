import { ChangeDetectionStrategy, Component, computed, inject, input, resource } from "@angular/core";
import { AthleteService } from "./athlete-service";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from '@angular/material/tabs';
import { AthleteBlocksComponent } from "./blocks/blocks";

@Component({
  selector: 'app-athlete',
  providers: [AthleteService],
  imports: [MatProgressBarModule, MatCardModule, MatTabsModule, AthleteBlocksComponent],
  template: `
    @if (athleteResource.isLoading()) {
      <mat-progress-bar mode="indeterminate" />
    }
    @else if (!athleteResource.error()) {
      @if (athlete(); as athlete) {
        <mat-card-header>
          <mat-card-title>{{ athlete.display_name }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-tab-group>
            <mat-tab label="Blocks">
              <app-blocks [athleteId]="athlete.id"></app-blocks>
            </mat-tab>
            <mat-tab label="Workouts">
              <p>Workouts content for {{ athlete.display_name }}</p>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      }
    }
    
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AthleteComponent {
  protected readonly srvc = inject(AthleteService);

  id = input.required<string>();

  athleteResource = resource({
    params: () => this.id(),
    loader: async ({ params }) => {
      const athleteData = await this.srvc.loadAthlete(params);
      return athleteData.data;
    }
  });

  athlete = computed(() => {
    return this.athleteResource.value();
  });
}