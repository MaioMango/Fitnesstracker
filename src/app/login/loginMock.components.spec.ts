import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from './loginMock.component';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should return true when login is successful', (done) => {
    service.login('test', 'password').subscribe(result => {
      expect(result).toEqual({ login: 'test' });
      done();
    });
  });
  
  it('should return an error when login is unsuccessful', (done) => {
    service.login('wrong', 'credentials').subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toEqual({ error: { message: 'Login fehlgeschlagen' } });
        done();
      }
    });
  });
});
