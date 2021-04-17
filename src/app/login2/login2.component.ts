import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator2'

// 身分證字號驗證: 驗證成功回傳 null，驗證失敗回傳 object
function ValidateTwid(c: FormControl): ValidationErrors | null {
  if (!c.value) {
    return null;
  }
  let result = isNationalIdentificationNumberValid(c.value);
  if (result) {
    return null;
  } else {
    return {
      twid: true
    };
  }
}

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {

  data: any = {
    "email": "hello123@gmail.com",
    "password": "123abc",
    "isRememberMe": true,
    "extra": [
      {
        "name": "1111",
        "tel": "1111"
      },
      {
        "name": "2222",
        "tel": "2222"
      },
      {
        "name": "3333",
        "tel": "3333"
      }
    ]
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
      extra: this.fb.array([])
    });

    // 用迴圈方式動態建立 extra 欄位
    for (let i = 0; i< this.data.extra.length; i++) {
      this.getFormArray('extra').push(this.makeExtra());
    }
    // setValue
    this.form.setValue(this.data);
  }

  // reset
  resetForm() {
    // 先清空原本的 FormArray
    this.getFormArray('extra').clear();

    for (let i = 0; i < this.data.extra.length; i++) {
      this.getFormArray('extra').push(this.makeExtra());
    }
    this.form.reset(this.data);
  }

  // 建立 extra 欄位 & 給預設值
  makeExtra() {
    return this.fb.group({
      name: this.makeControl('輸入您的姓名(Name)'),
      tel: this.makeControl('輸入您的電話(09xx000000)'),
      twid: this.makeControl('輸入您的身分證字號', [ValidateTwid])    // 傳入自訂 function 進行驗證
    })
  }

  // 建立 FormControl
  makeControl(placeholder: string, validators?: ValidatorFn[]) {
    let ctl = this.fb.control('');
    // 有傳入驗證器的欄位才需驗證
    if (validators) {
      ctl.setValidators(validators);
    }
    // 設定 formControl 的 placeholder 屬性
    ctl['placeholder'] = placeholder;
    return ctl;
  }

  showError(name, validation) {
    return this.form.get(name).invalid
      && this.form.get(name).dirty
      && this.form.get(name).errors[validation];
  }

  // 將建立好的 extra 加入現有的陣列中
  addExtra() {
    let extra = this.getFormArray('extra');
    extra.push(this.makeExtra());
  }

  // 轉型成 FormArray
  getFormArray(name: string) {
    return this.form.get(name) as FormArray;
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
