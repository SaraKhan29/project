import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRidePage } from './edit-ride.page';

describe('EditRidePage', () => {
  let component: EditRidePage;
  let fixture: ComponentFixture<EditRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
