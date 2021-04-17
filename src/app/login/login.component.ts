import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  data: any = {
    email: 'user@example.com',
    password: '1234abcd',
    isRememberMe: true
  };

  origClass = '';

  constructor() { }

  ngOnInit(): void {
    this.origClass = document.body.className;
    document.body.className = 'bg-gradient-primary';
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      console.log('成功送出表單', form.value);
    } else {
      console.log('送出失敗，請填寫正確格式', form.value);
    }
  }

  ngOnDestroy(): void {
    document.body.className = this.origClass;
  }

}
