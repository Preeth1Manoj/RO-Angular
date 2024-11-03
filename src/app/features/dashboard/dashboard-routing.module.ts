// src/app/features/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SkillAssessmentComponent } from './components/skill-assessment/skill-assessment.component';
import { ProjectPerformanceComponent } from './components/project-performance/project-performance.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'skill-assessment/:id', component: SkillAssessmentComponent },
      { path: 'project-performance/:id', component: ProjectPerformanceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

