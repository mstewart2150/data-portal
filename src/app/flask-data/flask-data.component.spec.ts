import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaskDataComponent } from './flask-data.component';

describe('FlaskDataComponent', () => {
  let component: FlaskDataComponent;
  let fixture: ComponentFixture<FlaskDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlaskDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlaskDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
