import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authentication: AuthenticationApiService
  ) {
  }

  ngOnInit(): void {
    if (this.authentication.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }

    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authentication.login(this.validateForm.value.username, this.validateForm.value.password).subscribe(
        () => {
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 100)
        }
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
}
