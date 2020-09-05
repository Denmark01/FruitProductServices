import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AppReduxService } from 'src/app/services/app-redux.service';
import { alertMsg, alertType } from 'src/app/utils/config';
import { NgRedux } from 'ng2-redux';
import { IItemFruitState } from '../items-fruit/item.fruit.reducer';
import { LOADER_OFF, LOGIN_LOADER } from 'src/app/containers/login/login.action';

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
  onlyImage = true;
  profileForm = new FormGroup({
    itemName: new FormControl(''),
    maxQty: new FormControl(''),
    price: new FormControl(''),
    unit: new FormControl(''),
    itemCatgry: new FormControl(''),
    selectImage: new FormControl(''),
    categoryName: new FormControl(''),
    // maxQuantity: new FormControl('')
    // address: new FormGroup({
    //   street: new FormControl(''),
    //   city: new FormControl(''),
    //   state: new FormControl(''),
    //   zip: new FormControl('')
    // })
  });
  username: any;
  userId: any;
  isAdmin: any;
  shopname: string;
  roleId: any;
  selectedCity: string;
  cities: any;
  imgList: any;
  show: boolean;
  isLoading: boolean;
  subCatStatus: any;
  subCatName: any;
  constructor(
    private http: HttpClient,
    private appService: AppServiceService,
    private reduxService: AppReduxService,
    private ngRedux: NgRedux<IItemFruitState>,
  ) { }

  ngOnInit() {
    this.category = ['FRUITS', 'VEGETABLES', 'CAKE'];
    this.unit = ['KG', 'PKT', 'GMS', 'PCS', 'DOZEN'];
    this.reduxService.getSubCatName('FRUITS');
    this.cities = [
      {id: 1, name: 'Vilnius'},
      {id: 2, name: 'Kaunas'},
      {id: 3, name: 'Pavilnys', disabled: true},
      {id: 4, name: 'Pabradė'},
      {id: 5, name: 'Klaipėda'}
  ];

  this.profileForm.get('itemCatgry').valueChanges.subscribe(selectedValue => {
    console.log(this.profileForm.get('itemCatgry').value);
    this.reduxService.getSubCatName(this.profileForm.get('itemCatgry').value);
    setTimeout(() => {
      
    });
  });

     this.ngRedux.subscribe(() => {
      const store: any = this.ngRedux.getState();
      this.username = store.login.username;
      this.userId = store.login.user_id;
       this.isAdmin = store.login.is_admin;
       this.shopname = store.login.shopName;
       this.roleId = store.login.roleId;
       this.imgList = store.itemFruit.img_name;
       this.isLoading = store.login.login_loader;
       this.subCatName = store.itemFruit.sub_cat;
    });
  }

  subCat(val) {
    this.subCatStatus = val;
  }

submit() {
  console.log(this.profileForm.value.itemCatgry);
}
  onSubmit() {
    if (this.profileForm.value.itemName && this.profileForm.value.price
      && this.profileForm.value.itemCatgry && this.profileForm.value.unit && this.profileForm.value.itemCatgry 
      && this.profileForm.value.categoryName) {
        if (!this.formData.get('files') && this.show) {
          this.reduxService.notification(alertMsg.fileUpload, alertType.danger);
          return;
        }

      this.formData.append('itemName', this.profileForm.value.itemName);
      this.formData.append('maxQty', this.profileForm.value.maxQty ? this.profileForm.value.maxQty : 10);
      this.formData.append('price', this.profileForm.value.price);
      this.formData.append('unit', this.profileForm.value.unit);
      this.formData.append('category', this.profileForm.value.itemCatgry);
      this.formData.append('username', this.username);
      this.formData.append('userId', this.userId);
      this.formData.append('shopname', this.shopname);
      this.formData.append('isUpload', this.show ? 'Y' : 'N');
      this.formData.append('selectImage', this.profileForm.value.selectImage);
      this.formData.append('categoryName', this.profileForm.value.categoryName);

      this.ngRedux.dispatch({type: LOGIN_LOADER});

      console.log('select image ' + this.profileForm.value.selectImage);
      this.appService.uploadItems(this.formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event) {
            if (event.type === HttpEventType.UploadProgress) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.uploadSuccess = true;
            }
            if (event.status === 200) {
              this.ngRedux.dispatch({type: LOADER_OFF});
              this.reset();
              this.reduxService.notification(alertMsg.uploadSuccess, alertType.success);
              if (this.show) {
                this.reduxService.getImageName();
              }
            }
          }
        }, error => {
          this.ngRedux.dispatch({type: LOADER_OFF});
          this.reduxService.notification(alertMsg.internalError, alertType.danger);
        });
    } else {
      this.reduxService.notification(alertMsg.fillDetails, alertType.danger);
    }
  }

  reset () {
    this.profileForm.reset();
  }

  showImage(val) {
    this.onlyImage = val;
  }

  chang(val) {
    this.show = val;
  }

  onlyImageSubmit() {
    this.appService.uploadMultipleImage(this.formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event) {
            if (event.type === HttpEventType.UploadProgress) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.uploadSuccess = true;
            }
            if (event.status === 200) {
              this.reduxService.notification(alertMsg.uploadSuccess, alertType.success);
            }
          }
        }, error => {
          this.reduxService.notification(alertMsg.internalError, alertType.danger);
        });
  }

  upload(files: File[]) {
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
