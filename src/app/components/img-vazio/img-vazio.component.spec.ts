import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgVazioComponent } from './img-vazio.component';

describe('ImgVazioComponent', () => {
  let component: ImgVazioComponent;
  let fixture: ComponentFixture<ImgVazioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgVazioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgVazioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
