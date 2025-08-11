import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { AthleteService } from "./athlete-service";

@Component({
  selector: 'app-athlete',
  providers: [AthleteService],
  imports: [],
  template: `
    <h1>Athlete Profile - {{ id() }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AthleteComponent {
  protected readonly srvc = inject(AthleteService);

  id = input.required<string>();
}