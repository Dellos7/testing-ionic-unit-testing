import { async, TestBed, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { IonicModule, Platform, MenuController, Menu, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  MenuMock
} from '../../test-config/mocks-ionic';
import { By } from '@angular/platform-browser';
import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('MyApp Component', () => {
  let fixture: ComponentFixture<MyApp>;
  let component: MyApp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      //schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    component.menu = MenuMock.instance(); //We mock the Menu in order not to depend on real dependencies
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });

  it('should call "nav.setRoot" with Page1', fakeAsync(() => {
    spyOn(component.nav, 'setRoot');
    component.ionViewDidLoad();
    tick();
    fixture.detectChanges();
    expect(component.nav.setRoot).toHaveBeenCalledWith('Page1');
  }));

  it('should call close of menu on closeMenuButton click', fakeAsync(() => {
    spyOn(component, 'closeMenu').and.callThrough(); //Will create a spy on 'closeMenu' function but it will be called normally
    fixture.detectChanges();
    let menu = component.menu;

    expect(menu).toBeDefined('menu to be defined');
    //We get the HTML element button by name
    let closeMenuButtonEl: HTMLButtonElement = fixture.debugElement.query(By.css('button[name="closeMenuButton"]')).nativeElement;
    //We simulate the user 'click'
    closeMenuButtonEl.click();
    //Wait for the async operations (click)
    tick();
    fixture.detectChanges();
    //We expect that when we 'click' on the button, the function 'closeMenu' it's called
    expect(component.closeMenu).toHaveBeenCalledTimes(1);
    //We expect that, after calling 'closeMenu' on the component, it calls the 'close' function of the menu
    expect(menu.close).toHaveBeenCalledTimes(1);
  }));

});
