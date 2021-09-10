import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export interface UpdateRequestPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  // dni: string;
  address: string;
  birthday: string;       // NgbDate;
  sex: string;
  // role: string;
  blood_type: string;
  medical_history: string;
  surgeries: string;
  medicines: string;
  license_number: string;
  specialization: string;
  // terms: boolean;
}
