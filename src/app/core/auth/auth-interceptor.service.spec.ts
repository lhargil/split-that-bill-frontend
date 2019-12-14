import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [AuthService]
  }));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
