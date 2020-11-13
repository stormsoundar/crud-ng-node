import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonCoreService } from '../common-core.service';
import { Registration } from '../domain/registration';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
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

  registeredData: Registration[];
  public singleRow;
  public singleData;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public commonCoreService: CommonCoreService
  ) {}

  ngOnInit(): void {
    this.updateRegistration();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRegisteredData(id);
    this.editForm = this.fb.group({
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
    });
  }

  updateGender(e) {
    this.editForm.get('gender').setValue(e, { onlySelf: true });
  }

  updateState(e) {
    this.editForm.get('state').setValue(e, { onlySelf: true });
  }

  // Getter to access form control
  get registerForm() {
    return this.editForm.controls;
  }

  getRegisteredData(id) {
    this.commonCoreService
      .getOneRegisteredData(id)
      .subscribe((data: Registration[]) => {
        // console.log(data);
        this.singleRow = data;
        this.singleData = this.singleRow.data[0];

        this.editForm.setValue({
          firstName: this.singleData['firstName'],
          lastName: this.singleData['lastName'],
          email: this.singleData['email'],
          mobile: this.singleData['mobile'],
          dob: this.singleData['dob'],
          gender: this.singleData['gender'],
          address: this.singleData['address'],
          address2: this.singleData['address2'],
          city: this.singleData['city'],
          state: this.singleData['state'],
          zip: this.singleData['zip'],
        });
      });
  }

  updateRegistration() {
    this.editForm = this.fb.group({
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

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      Swal.fire({
        title: 'Are you sure to Update?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          Swal.fire('Data Updated Successfully!', '', 'success');
          let id = this.activatedRoute.snapshot.paramMap.get('id');
          this.commonCoreService
            .updateOneRegisteredData(id, this.editForm.value)
            .subscribe(
              (res) => {
                this.router.navigateByUrl('/read');
              },
              (error) => {
                console.log(error);
              }
            );
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your file is safe :)', 'error');
        }
      });
    }
  }
}
