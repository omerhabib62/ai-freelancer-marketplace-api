import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects = [];
  private idCounter = 1;

  findAll() {
    return this.projects;
  }

  findOne(id: number) {
    return this.projects.find((p) => p.id === id);
  }

  create(project: any) {
    const newProject = { ...project, id: this.idCounter++ };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: number, update: any) {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.projects[idx] = { ...this.projects[idx], ...update };
    return this.projects[idx];
  }

  remove(id: number) {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const removed = this.projects.splice(idx, 1);
    return removed[0];
  }
}
