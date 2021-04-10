import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  type = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // 1 snapshot 型別為 string，加號代表強制轉型為 number
    this.type = +this.route.snapshot.paramMap.get('type');

    // 2 paramMap 型別為 observable，透過訂閱後取得型別為 string
    this.route.paramMap.subscribe(params => {
      this.type = +params.get('type');
    });

    // 3 不建議使用 params，取得型別為 any，不易進行 debug
    // this.type = this.route.snapshot.params['type'];

    // 4
    // this.route.params.subscribe(params => {
    //   this.type = params.get('type');
    // });
  }

  plusOne() {
    this.router.navigate(['/utilities/color', this.type + 1])
  }
}
