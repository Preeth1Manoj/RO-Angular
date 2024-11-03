// src/app/features/dashboard/components/project-performance/project-performance.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-performance',
  templateUrl: './project-performance.component.html',
  styleUrls: ['./project-performance.component.scss']
})
export class ProjectPerformanceComponent implements OnInit {
  performanceForm: FormGroup;
  employeeId: number;
  employee: any;
  projects: any[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.employeeId = +this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadEmployeeData();
    this.loadProjects();
  }

  private initializeForm() {
    this.performanceForm = this.fb.group({
      projectId: ['', Validators.required],
      deliveryDate: [null, Validators.required],
      orgActivity: ['', Validators.required],
      employeeEngagementScore: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      developmentPlan: ['', Validators.required],
      timeManagementScore: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      productivityScore: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      comments: ['']
    });
  }

  private loadEmployeeData() {
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        this.showError('Error loading employee data');
      }
    });
  }

  private loadProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error loading projects');
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.performanceForm.invalid) {
      return;
    }

    this.isLoading = true;
    const performanceData = {
      ...this.performanceForm.value,
      employeeId: this.employeeId,
      evaluationDate: new Date()
    };

    this.projectService.saveProjectPerformance(performanceData).subscribe({
      next: () => {
        this.showSuccess('Performance record saved successfully');
        this.isLoading = false;
        this.performanceForm.reset();
      },
      error: (error) => {
        this.showError('Error saving performance record');
        this.isLoading = false;
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}

