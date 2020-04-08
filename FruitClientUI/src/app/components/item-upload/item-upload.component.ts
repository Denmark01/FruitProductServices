import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AppServiceService } from 'src/app/services/app-service.service';
@Component({
  selector: 'app-item-upload',
  templateUrl: './item-upload.component.html',
  styleUrls: ['./item-upload.component.css']
})
export class ItemUploadComponent implements OnInit {
  percentDone = 0;
  public formData = new FormData();
  uploadSuccess: boolean;
  category: String[];
  unit: String[];
  profileForm = new FormGroup({
    itemName: new FormControl(''),
    maxQty: new FormControl(''),
    price: new FormControl(''),
    unit: new FormControl(''),
    itemCatgry: new FormControl('')
    // maxQuantity: new FormControl('')
    // address: new FormGroup({
    //   street: new FormControl(''),
    //   city: new FormControl(''),
    //   state: new FormControl(''),
    //   zip: new FormControl('')
    // })
  });

  constructor(
    private http: HttpClient,
    private appService: AppServiceService,
  ) { }

  ngOnInit() {
    this.category = ['fruits', 'vegetables'];
    this.unit = ['kg', 'pkt', 'gms', 'pcs'];
  }
submit() {
  console.log(this.profileForm.value.itemCatgry);
}
  onSubmit() {
    console.warn(this.profileForm.value);
    console.log(this.profileForm.value.itemCatgry);
    this.formData.append('itemName', this.profileForm.value.itemName);
    this.formData.append('maxQty', this.profileForm.value.maxQty);
    this.formData.append('price', this.profileForm.value.price);
    this.formData.append('unit', this.profileForm.value.unit);
    this.formData.append('category', this.profileForm.value.itemCatgry);
    // console.log("On Submit " + this.formData.forEach(data => console.log('on submit each '+ data)));
// this.http.post('http://localhost:8087/upload', this.formData, {reportProgress: true, observe: 'events'})
this.appService.uploadItems(this.formData, {reportProgress: true, observe: 'events'})
  .subscribe(event => {
    if (event) {
      console.log('Success ' + event);
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
    }
});
  }

  upload(files: File[]) {
    console.log(files);
Array.from(files).forEach(f => this.formData.append('files', f));
  }

 /*  onFileChanged(files: File[]) {
console.log(files);
const formData = new FormData();
Array.from(files).forEach(f => formData.append('files', f));
formData.append('form', this.profileForm.value);
this.http.post('http://localhost:8087/upload', formData, {reportProgress: true, observe: 'events'})
  .subscribe(event => {
    if (event) {
      console.log('Success ' + event);
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
    }
});
} */


}
