import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupdata: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.signupdata = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ]

    });

  }
  onSignUp() {
    if (this.signupdata.valid) {
      const username = this.signupdata.value.username;
      const password = this.signupdata.value.password;
      const email = this.signupdata.value.email;

      console.log(username, password, email)

    }
  }

}
