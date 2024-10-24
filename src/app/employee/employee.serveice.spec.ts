import { TestBed } from '@angular/core/testing';

import { EmployeeServeiceService } from './employee.serveice';

describe('EmployeeServeiceService', () => {
  let service: EmployeeServeiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServeiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
