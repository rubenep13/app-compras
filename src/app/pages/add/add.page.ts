import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ItemsService } from 'src/app/services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  myForm: FormGroup;
  submitted = false;

  constructor(private itemsService: ItemsService, public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      single_price: [Validators.required],
    })
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      return false;
    } else {
      this.itemsService.addItem(this.myForm.value).subscribe(( response )=>{
        console.log(response);
        this.router.navigateByUrl('/home');
      });
    }
  }
}

