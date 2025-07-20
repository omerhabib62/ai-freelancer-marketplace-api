import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningService {
  private courses = [];
  private idCounter = 1;

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find((c) => c.id === id);
  }

  create(course: any) {
    const newCourse = { ...course, id: this.idCounter++ };
    this.courses.push(newCourse);
    return newCourse;
  }

  update(id: number, update: any) {
    const idx = this.courses.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.courses[idx] = { ...this.courses[idx], ...update };
    return this.courses[idx];
  }

  remove(id: number) {
    const idx = this.courses.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    const removed = this.courses.splice(idx, 1);
    return removed[0];
  }
}
