import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonCoreService } from '../common-core.service';
import { Registration } from '../domain/registration';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  submitted = false;
  registrationForm: FormGroup;
  public registration = new Registration();
  public Gender: any = ['Male', 'Female', 'Other'];
  public State: any = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public httpClient: HttpClient,
    public commonCoreService: CommonCoreService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('([A-Za-z])+')]],
      lastName: ['', [Validators.required, Validators.pattern('([A-Za-z])+')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((?!(0))[0-9]{10})$')],
      ],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('([A-Za-z])+')]],
      state: ['', [Validators.required]],
      zip: [
        '',
        [Validators.required, Validators.pattern('^((?!(0))[0-9]{6})$')],
      ],
      agree: ['', Validators.required],
    });
  }

  updateGender(e) {
    this.registrationForm.get('gender').setValue(e, { onlySelf: true });
  }

  updateState(e) {
    this.registrationForm.get('state').setValue(e, { onlySelf: true });
  }

  // Getter to access form control
  get registerForm() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      this.registration = this.registrationForm.value;
      this.commonCoreService.postRegistration(this.registration).subscribe(
        (registration: Registration) => {
          Swal.fire('Data Registered Successfully!');
          this.router.navigateByUrl('/read');
          this.registrationForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
