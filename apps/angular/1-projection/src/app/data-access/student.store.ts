import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  public students = signal<Student[]>([]);

  addAll(students: Student[]) {
    const existingIds = new Set(this.students().map((s) => s.id));
    this.students.set([
      ...this.students(),
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
