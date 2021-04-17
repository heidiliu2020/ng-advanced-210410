import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  data: any = {
    email: 'user2@example.com',
    password: '123defDef',
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
      email: [
        'user1@example.com',
        [
          Validators.required,  // 驗證是否有填寫
          Validators.email
        ]
      ],
      password: [
        '123abcABC',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      ],
      isRememberMe: true
    })
  }

  onSubmit(form: FormGroup) {
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
