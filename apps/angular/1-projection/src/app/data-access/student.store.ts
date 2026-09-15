import { Injectable, signal, untracked } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  public students = signal<Student[]>([]);

  addAll(students: Student[]) {
    const existingIds = new Set(untracked(this.students).map((s) => s.id));
    this.students.set([
      ...untracked(this.students),
      ...students.filter((s) => !existingIds.has(s.id)),
    ]);
  }

  addOne(student: Student) {
    this.students.set([...this.students(), student]);
  }

  deleteOne(id: number) {
    this.students.set(this.students().filter((s) => s.id !== id));
  }
}
