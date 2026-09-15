import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
} from '@angular/core';
import { CardItemDirective } from '../../directive/card-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card-container flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="[card-image]"></ng-content>
      <section>
        @for (item of list(); track item) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate().templateRef"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      .card-container {
        background: var(--bg, gray);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly itemTemplate = contentChild.required(CardItemDirective);
  add = output<void>();
}
