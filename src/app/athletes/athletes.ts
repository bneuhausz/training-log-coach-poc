import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AthletesService } from "./athletes-service";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-athletes',
  providers: [AthletesService],
  imports: [MatCardModule, MatTableModule, RouterLink],
  template: `
    <mat-card-header>
      <mat-card-title>Athletes</mat-card-title>
    </mat-card-header>

    <mat-card-content>
      <table mat-table [dataSource]="srvc.athletes()">
        <ng-container matColumnDef="display_name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let athlete"> {{ athlete.display_name }} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns;"
          [routerLink]="['/athletes', row.id]"
          class="cursor-pointer hover:!bg-primary hover:!text-on-primary"
        ></tr>
      </table>
    </mat-card-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Athletes {
  protected readonly srvc = inject(AthletesService);

  displayedColumns = ['display_name'];
}