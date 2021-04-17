import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      email: new FormControl('user2@example.com', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'blur'    // 決定要驗證的時機點
       }),
      password: this.fb.control('123ABCabc', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ],
        updateOn: 'change'
      }),
      isRememberMe: true,
      extra: this.fb.group({
        name: this.fb.control(''),
        tel: this.fb.control('')
      })
    });
  }

  showError(name, validation) {
    return this.form.get(name).invalid
      && this.form.get(name).dirty
      && this.form.get(name).errors[validation];
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
