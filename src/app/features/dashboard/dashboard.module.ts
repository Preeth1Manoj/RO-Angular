// src/app/features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SkillAssessmentComponent } from './components/skill-assessment/skill-assessment.component';
import { ProjectPerformanceComponent } from './components/project-performance/project-performance.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    EmployeeListComponent,
    SkillAssessmentComponent,
    ProjectPerformanceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class DashboardModule { }

