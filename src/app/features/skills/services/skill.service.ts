// src/app/core/services/skill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills`;

  constructor(private http: HttpClient) {}

  getSkillAssessment(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/assessment/${employeeId}`);
  }

  saveSkillAssessment(employeeId: number, assessment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assessment/${employeeId}`, assessment);
  }

  getTechnicalSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/technical`);
  }

  getSoftSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/soft`);
  }

  createTechnicalSkill(skill: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/technical`, skill);
  }

  createSoftSkill(skill: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/soft`, skill);
  }

  updateSkill(skillId: number, skill: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${skillId}`, skill);
  }

  deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${skillId}`);
  }
}


