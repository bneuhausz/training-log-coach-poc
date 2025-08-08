import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AthletesService } from "./athletes-service";

@Component({
  selector: 'app-athletes',
  providers: [AthletesService],
  imports: [],
  template: `
    <h1>Athletes</h1>
    <p>A list of athletes will be displayed here.</p>
    @for (athlete of srvc.athletes(); track athlete.id) {
      <div>
        <h2>{{ athlete.display_name }}</h2>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Athletes {
  protected readonly srvc = inject(AthletesService);
}