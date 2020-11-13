import { Component, OnInit } from '@angular/core';
import { CommonCoreService } from '../common-core.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  public registeredList: any = [];

  constructor(private commonCoreService: CommonCoreService) {}

  ngOnInit(): void {
    this.readRegisteredData();
  }

  readRegisteredData() {
    this.commonCoreService
      .getRegisteredData()
      .subscribe((registeredList: any) => {
        this.registeredList = registeredList.data;
      });
  }

  removeOneRegisteredData(data, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.commonCoreService
          .deleteOneRegisteredData(data.id)
          .subscribe((data) => {
            this.registeredList.splice(index, 1);
          });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your file is safe :)', 'error');
      }
    });
  }
}
