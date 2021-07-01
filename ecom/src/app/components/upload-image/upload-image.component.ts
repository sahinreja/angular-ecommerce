import { ProductsService } from './../../service/products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

interface HTMLInputElement{
  files:string
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  form:FormGroup
  imageData:string
  constructor(public producttService:ProductsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      image:new FormControl(null)
    })
  }


  selectedFile(event:Event){
    // console.log('select file');
    const file:any = (event.target as unknown as HTMLInputElement).files[0];
    this.form.patchValue({image:file})
    const allowType:any = ["image/png" , "image/jpeg" , "image/jpg"];
    if(file && allowType.includes(file.type)){
      const reader = new FileReader()
      reader.onload = () =>{
        this.imageData =  reader.result as string
      }
      reader.readAsDataURL(file)
    }

    console.log(file);
  }

  submit(){
    console.log('submit');
    this.producttService.addProfile(this.form.value.image)
    this.producttService.getUser();
    this.imageData = "";
  }
}
