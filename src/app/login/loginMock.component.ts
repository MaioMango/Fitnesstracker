import { of } from 'rxjs';
import { throwError } from 'rxjs';

export class MockAuthService {
    login(login: string, password: string) {
      if (login === 'test' && password === 'password') {
        return of({ login });
      } else {
        return throwError({ error: { message: 'Login fehlgeschlagen' } });
      }
    }
  }
