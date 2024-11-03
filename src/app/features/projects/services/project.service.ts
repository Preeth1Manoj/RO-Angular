// src/app/core/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProject(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveProjectPerformance(performance: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/performance`, performance);
  }

  getProjectPerformance(projectId: number, employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}/performance/${employeeId}`);
  }

  getAllPerformanceRecords(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/performance/employee/${employeeId}`);
  }
}
