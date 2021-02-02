import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {UserContextService} from '../../service/user-context.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  formGroup: FormGroup;
  registerSuccess: boolean;

  constructor(private router: Router, private userContextService: UserContextService, private userService: UserService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
        name: ['', [Validators.required, Validators.maxLength(64)]],
        surname: ['', [Validators.required, Validators.maxLength(64)]],
        nickname: ['', [Validators.required, Validators.maxLength(64)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]]
      });
  }


  ngOnInit() {
  }

  register() {
    this.userService.register(this.getRegisterData()).subscribe(response => {
      this.registerSuccess = !!response;
    });
  }


  getRegisterData() {
    if (this.isRegisterFormValid()) {
      return this.formGroup.value as User;
    }
  }

  isRegisterFormValid() {
    return this.formGroup.valid;
  }

}
