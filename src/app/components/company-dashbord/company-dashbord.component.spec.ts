import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashbordComponent } from './company-dashbord.component';

describe('CompanyDashbordComponent', () => {
  let component: CompanyDashbordComponent;
  let fixture: ComponentFixture<CompanyDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
