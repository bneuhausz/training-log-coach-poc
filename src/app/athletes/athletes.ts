import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AthletesService } from "./athletes-service";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-athletes',
  providers: [AthletesService],
  imports: [MatCardModule, MatTableModule],
  template: `
    <mat-card appearance="outlined" class="w-4/5 my-5 mx-auto">
      <mat-card-header>
        <mat-card-title>Athletes</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <table mat-table [dataSource]="srvc.athletes()" class="mat-elevation-z8">
          <ng-container matColumnDef="display_name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let athlete"> {{ athlete.display_name }} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="cursor-pointer hover:!bg-primary hover:!text-on-primary"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Athletes {
  protected readonly srvc = inject(AthletesService);

  displayedColumns = ['display_name'];
}