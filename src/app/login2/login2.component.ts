import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  data: any = {
    email: 'user1@example.com',
    password: '123abcABC',
    isRememberMe: true
  };

  origClass = '';

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // 初始化背景色
    this.origClass = document.body.className;
    document.body.className = 'bg-gradient-primary';

    this.form = this.fb.group({
      email: 'user2example.com',
      password: '456defDEF',
      isRememberMe: false
    })
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
