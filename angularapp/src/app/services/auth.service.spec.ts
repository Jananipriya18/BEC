import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService) as any;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('Frontend_AuthService should send a POST request to register a Admin', () => {
    const newUser = {userId: 1, userName: 'testUser', password: 'testPassword@123', emailID: 'test@example.com', userRole: 'ADMIN', mobileNumber: '1234567890'};

    service['register'](newUser.userName,newUser.password,newUser.userRole,newUser.emailID,newUser.mobileNumber).subscribe((userResponse: any) => {
      expect(userResponse).toBeDefined();
      expect(userResponse.userName).toEqual(newUser.userName);
      expect(userResponse.emailID).toEqual(newUser.emailID);
      // Add more assertions based on your implementation
    });

    const req = httpTestingController.expectOne(`${(service as any).apiUrl}/auth/register`);
    expect(req.request.method).toEqual('POST');

    req.flush(newUser);
  });

  fit('Frontend_AuthService should send a POST request to register a Student', () => {
    const newUser = {userId: 1, userName: 'testUser', password: 'testPassword@123', emailID: 'test@example.com', userRole: 'STUDENT',mobileNumber: '1234567890'};

    service['register'](newUser.userName,newUser.password,newUser.userRole,newUser.emailID,newUser.mobileNumber).subscribe((userResponse: any) => {
      expect(userResponse).toBeDefined();
      expect(userResponse.userName).toEqual(newUser.userName);
      expect(userResponse.emailID).toEqual(newUser.emailID);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/auth/register`);
    expect(req.request.method).toEqual('POST');

    req.flush(newUser);
  });

  fit('Frontend_AuthService should send a POST request to login', () => {
    const email = 'testUser@gmail.com';
    const password = 'Test@123';
    const user: any = { password, email };

    service['login'](user.emailID,user.password).subscribe((loginResponse: any) => {
      expect(loginResponse).toBeDefined();
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toEqual('POST');

    req.flush(user);
  });
});

