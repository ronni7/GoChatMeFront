import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {LoginRequestBody} from '../../model/LoginRequestBody';
import {Router} from '@angular/router';
import {UserContextService} from '../../service/user-context.service';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private router: Router, private userContextService: UserContextService, private userService: UserService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      });
  }

  ngOnInit() {
  }

  login() {
    this.userService.logUserIn(this.getFormData()).subscribe(response => {
      if (response) {
        this.userContextService.setUser(response as User);
        this.router.navigate(['/']);
      }
    });
  }

  isFormValid() {
    return this.formGroup.valid;
  }

  getFormData() {
    if (this.isFormValid()) {
      return this.formGroup.value as LoginRequestBody;
    }
  }
}
