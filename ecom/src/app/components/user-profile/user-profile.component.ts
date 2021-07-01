import { UploadImageComponent } from './../upload-image/upload-image.component';
import { UserProfileEditComponent } from './../user-profile-edit/user-profile-edit.component';
import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user:any; 
  constructor(public productsService:ProductsService,public dialog: MatDialog) {
    // this.productsService.getUserProfile().subscribe((res)=>{
    //   console.log(res);
    //   this.user = res;
    // }, (err)=>{
    //   console.log(err);
    // })

    this.productsService.getUser();
   }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(UserProfileEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openUpload(){
    const dialogRef = this.dialog.open(UploadImageComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.productsService.getUser()
      console.log(`Dialog result: ${result}`);
    });
  }

}
