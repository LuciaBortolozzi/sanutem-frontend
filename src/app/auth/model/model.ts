export class Appointments {
  constructor(
    public idAppointments: number,
    public date: string,
    public hour: string,
    public freeAppointment: boolean,
    public userNamePatient: string,
    public userNameProfessional: string
  ) {
  }
}

export class Pets {
  constructor(
    public id: number,
    public name: string,
    public sex: string,
    public birthday: Date,
    public species: string,
    public breed: string,
    public medicalHistory: string,
    public surgeries: string,
    public medicines: string
  ) {
  }
}

export class Users {
  constructor(
    public id: string,
    public dni: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public sex: string,
    public birthday: string,
    public password: string,
    public created: string,
    public enabled: string,
    public role: string = null,
    public homeAddress: string) {
  }
}
