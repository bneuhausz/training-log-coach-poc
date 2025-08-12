import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-blocks',
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <div class="py-4 text-center">
      <button matButton>New Block</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AthleteBlocksComponent {
  athleteId = input.required<string>();
}