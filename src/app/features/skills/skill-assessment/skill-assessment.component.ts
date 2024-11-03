// src/app/features/dashboard/components/skill-assessment/skill-assessment.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../../../../core/services/skill.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skill-assessment',
  templateUrl: './skill-assessment.component.html',
  styleUrls: ['./skill-assessment.component.scss']
})
export class SkillAssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  employeeId: number;
  employee: any;
  isLoading = false;
  proficiencyLevels = [
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'EXPERT',
    'MASTER'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private skillService: SkillService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.employeeId = +this.route.snapshot.params['id'];
    this.initializeForm();
    this.loadEmployeeData();
    this.loadSkillAssessment();
  }

  private initializeForm() {
    this.assessmentForm = this.fb.group({
      assessmentDate: [new Date(), Validators.required],
      technicalSkills: this.fb.array([]),
      softSkills: this.fb.array([]),
      comments: [''],
      status: ['InProgress']
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

  private loadSkillAssessment() {
    this.isLoading = true;
    this.skillService.getSkillAssessment(this.employeeId).subscribe({
      next: (data) => {
        if (data) {
          this.populateForm(data);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error loading skill assessment');
        this.isLoading = false;
      }
    });
  }

  private populateForm(data: any) {
    this.assessmentForm.patchValue({
      assessmentDate: new Date(data.assessmentDate),
      comments: data.comments,
      status: data.status
    });

    // Populate technical skills
    const technicalSkillsArray = this.assessmentForm.get('technicalSkills') as FormArray;
    data.technicalSkills.forEach((skill: any) => {
      technicalSkillsArray.push(this.createSkillFormGroup(skill));
    });

    // Populate soft skills
    const softSkillsArray = this.assessmentForm.get('softSkills') as FormArray;
    data.softSkills.forEach((skill: any) => {
      softSkillsArray.push(this.createSkillFormGroup(skill));
    });
  }

  private createSkillFormGroup(skill: any = {}) {
    return this.fb.group({
      id: [skill.id],
      name: [skill.name, Validators.required],
      proficiencyLevel: [skill.proficiencyLevel, Validators.required],
      comments: [skill.comments]
    });
  }

  addTechnicalSkill() {
    const technicalSkills = this.assessmentForm.get('technicalSkills') as FormArray;
    technicalSkills.push(this.createSkillFormGroup());
  }

  addSoftSkill() {
    const softSkills = this.assessmentForm.get('softSkills') as FormArray;
    softSkills.push(this.createSkillFormGroup());
  }

  removeSkill(skillArray: FormArray, index: number) {
    skillArray.removeAt(index);
  }

  onSubmit() {
    if (this.assessmentForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.skillService.saveSkillAssessment(this.employeeId, this.assessmentForm.value).subscribe({
      next: () => {
        this.showSuccess('Skill assessment saved successfully');
        this.isLoading = false;
      },
      error: (error) => {
        this.showError('Error saving skill assessment');
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




