import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  formdata: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formdata = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]], 
      password: ['', [Validators.required, Validators.minLength(8)]] 
    });
  }

  onLogin() {
    if (this.formdata.valid) {
      const username = this.formdata.value.username;
      const password = this.formdata.value.password;

      console.log('Username:', username);
      console.log('Password:', password);
    }
  }
}
