import { Injectable, signal, untracked } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  public teachers = signal<Teacher[]>([]);

  addAll(teachers: Teacher[]) {
    const existingIds = new Set(untracked(this.teachers).map((t) => t.id));
    this.teachers.set([
      ...untracked(this.teachers),
      ...teachers.filter((t) => !existingIds.has(t.id)),
    ]);
  }

  addOne(teacher: Teacher) {
    this.teachers.set([...this.teachers(), teacher]);
  }

  deleteOne(id: number) {
    this.teachers.set(this.teachers().filter((t) => t.id !== id));
  }
}
