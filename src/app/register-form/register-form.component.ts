import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {UserContextService} from '../../service/user-context.service';
import {UserService} from '../../service/user.service';
import {Gender} from '../../model/enums/Gender';
import {LoginRequestBody} from '../../model/LoginRequestBody';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  GENDER = Gender;
  formGroup: FormGroup;

  constructor(private router: Router, private userContextService: UserContextService, private userService: UserService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        name: ['', [Validators.required, Validators.maxLength(64)]],
        surname: ['', [Validators.required, Validators.maxLength(64)]],
        nickname: ['', [Validators.required, Validators.maxLength(64)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
        sex: ['', [Validators.required]],
      });
  }


  ngOnInit() {
  }

  register() {
    this.userService.register(this.getRegisterData()).subscribe(response => {
      if (response) {
        const loginRequestBody = new LoginRequestBody();
        loginRequestBody.login = response.login;
        loginRequestBody.password = response.password;
        this.userService.logUserIn(loginRequestBody).subscribe(loginResponse => {
          if (loginResponse) {
            this.userContextService.setUser(loginResponse as User);
            this.router.navigate(['/']);
          }
        });
      }
    });
  }


  private getRegisterData() {
    if (this.isRegisterFormValid()) {
      return this.formGroup.value as User;
    }
  }

  private isRegisterFormValid() {
    return this.formGroup.valid;
  }

  click() {
    console.log(this.formGroup, 'this.registerGroup');
  }


}
