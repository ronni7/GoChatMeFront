import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPanelTempComponent } from './login-panel-temp.component';

describe('LoginPanelTempComponent', () => {
  let component: LoginPanelTempComponent;
  let fixture: ComponentFixture<LoginPanelTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPanelTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPanelTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
