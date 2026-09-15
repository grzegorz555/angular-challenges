import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardItemDirective } from '../../directive/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (add)="addTeacher()"
      [style.--bg]="'rgba(250, 0, 0, 0.1)'">
      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.firstName"
          (delete)="deleteTeacher($event)" />
      </ng-template>
      <ng-container card-image>
        <img ngSrc="assets/img/teacher.png" width="200" height="200" alt="" />
      </ng-container>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardComponent,
    ListItemComponent,
    CardItemDirective,
    NgOptimizedImage,
  ],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
