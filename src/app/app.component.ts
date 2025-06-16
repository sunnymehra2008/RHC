import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  loading = false;
  success = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}
  
   onSubmit(form: NgForm) {
    debugger;

    if (form.invalid) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
    return;
  }

    this.loading = true;
    this.success = false;
    this.errorMessage = '';

    const params = new HttpParams()
      .set('name', this.formData.name)
      .set('email', this.formData.email)
      .set('phone', this.formData.phone)
      .set('service', this.formData.service)
      .set('message', this.formData.message);

    const endpoint = 'https://script.google.com/macros/s/AKfycbzlDuBeN-IeSles6ys-SYFlqj-j-aW9sU7okUffz1V4mvHavXmDmRjF01MNPH4VFar8/exec';
    this.http.get<any>(endpoint, { params }).subscribe({
      next: (data) => {
        
        this.loading = false;
        if (data.result === 'success') {
          debugger;
          this.success = true;
          this.formData = {
          name: '',
          email: '',
          phone: '',
          service: '', // binds to the placeholder
          message: ''
        };
        form.resetForm(this.formData); 
        } else {
          this.errorMessage = 'Submission failed.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error occurred while submitting form.';
      }
    });
  }
}
