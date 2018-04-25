import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Page1 } from './page1';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from '../../app/app.component';
import { StatusBarMock, SplashScreenMock, PlatformMock, NavMock } from '../../../test-config/mocks-ionic';

describe('Page1', () => {
  let de: DebugElement;
  let comp: Page1;
  let fixture: ComponentFixture<Page1>;

  let myAppFixture: ComponentFixture<MyApp>;
  let myAppComp: MyApp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Page1, MyApp],
      imports: [
        IonicModule.forRoot(Page1),
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
    myAppFixture = TestBed.createComponent(MyApp);
    myAppComp = myAppFixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <h3> text', () => {
    fixture.detectChanges();
    const h3 = de.nativeElement;
    expect(h3.innerText).toMatch(/ionic/i,
      '<h3> should say something about "Ionic"');
  });

  it('should show the favicon as <img>', () => {
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain('assets/icon/favicon.ico');
  });

  it('should have expected ion-title', () => {
    fixture.detectChanges();
    const ionTitle: HTMLElement = fixture.debugElement.query(By.css('ion-title')).nativeElement;
    expect(ionTitle.innerText).toContain('Page One');
  });

  it('should have menu icon', () => {
    fixture.detectChanges();
    const ionIconMenu: HTMLElement = fixture.debugElement.query(By.css('ion-navbar button ion-icon[name="menu"]')).nativeElement;
    expect(ionIconMenu.getAttribute("name")).toBe('menu');
  });

  it('should have menu icon', () => {
    fixture.detectChanges();
    const ionIconMenu: HTMLElement = fixture.debugElement.query(By.css('ion-navbar button ion-icon[name="menu"]')).nativeElement;
    expect(ionIconMenu.getAttribute("name")).toBe('menu');
  });

});
