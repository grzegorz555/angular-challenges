import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardItemDirective } from '../../directive/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (add)="addStudent()"
      [style.--bg]="'rgba(0, 250, 0, 0.1)'">
      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (delete)="deleteStudent($event)" />
      </ng-template>
      <ng-container card-image>
        <img ngSrc="assets/img/student.webp" width="200" height="200" alt="" />
      </ng-container>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardItemDirective,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  private fetchedStudents = toSignal(this.http.fetchStudents$);
  students = this.store.students;

  constructor() {
    effect(() => {
      const students = this.fetchedStudents();
      if (students) {
        this.store.addAll(students);
      }
    });
  }

  addStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
