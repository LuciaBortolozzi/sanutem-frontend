import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export interface SignupRequestPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  birthday: string;       // NgbDate;
  sex: string;
  role: string;
  license_number: string;
  // terms: boolean;
}
