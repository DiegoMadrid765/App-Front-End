import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Address } from 'src/app/models/Address';
import { City } from 'src/app/models/City';
import { Country } from 'src/app/models/Country';
import { Gender } from 'src/app/models/Select';
import { User } from 'src/app/models/User';
import { CountryService } from 'src/app/services/country.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  minDate: Date = new Date();
  @Input() dato: string = "";
  emailtaken = false;
  loading = false;
  countries: Country[] = [];
  cities: City[] = [];
  selectedCountry!: Country;
  citiesloaded: boolean = false;
  selectedCity: City = {
    name: '',
    Id: 0,
    countryCode: '',
  };
  genders: Gender[] = [
    { name: 'Male', value: 'Male' },
    {
      name: 'Female',
      value: 'Female',
    },
  ];
  selectedGender: string = '';

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private httpLogin: LoginService,
    private messageService: MessageService,
    private httpcountry: CountryService,
    private httpUser: UserService,
    private router: Router
  ) {
    title.setTitle('Register');
    this.formRegister = fb.group(
      {
        names: ['', Validators.required],
        lastnames: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', Validators.required],
        birthdate: [this.minDate, Validators.required],
        gender: [this.genders[0].value, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],

        homeaddress: ['', Validators.required],
      },
      {
        validators: [this.checkPassword],
      } as AbstractControlOptions
    );
    this.getCountries();
  }

  ngOnInit() {
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
  }

  checkPassword(group: FormGroup): any {
    const password1 = group.controls['password'].value;
    const password2 = group.controls['confirmpassword'].value;
    return password1 === password2 ? null : { notSame: true };
  }

  checkEmail() {
    const Object: any = {
      email: this.formRegister.value.email,
    };

    this.httpLogin.checkEmail(Object).subscribe(
      (data) => {
        if (data.message == 'yes') {
          this.emailtaken = false;
        } else {
          this.emailtaken = true;
        }
      },
      () => {
        this.emailtaken = true;
      }
    );
  }
  VerForumulario() {
    console.log(this.formRegister);

  }
  registerUser() {
    if (this.formRegister.valid && !this.emailtaken) {
      this.loading = true;
      const user: User = {
        Id: 0,
        names: this.formRegister.value.names.trim(),
        lastnames: this.formRegister.value.lastnames.trim(),
        password: this.formRegister.value.password,
        birthdate: this.formRegister.value.birthdate,
        gender: this.formRegister.value.gender,
        email: this.formRegister.value.email.trim(),
        address: {
          homeadress: this.formRegister.value.homeaddress,
          cityId: this.formRegister.value.city,
          userId: 0,
        },
      };

      this.httpUser.registerUser(user).subscribe(
        () => {
          this.showMessage(
            'User registered succesfully',
            `the user ${user.names.toUpperCase()} ${user.lastnames.toUpperCase()} has been registered succesfully, now check your email to activate your account`,
            'success'
          );
          this.formRegister.reset();
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/welcome/login']);
          }, 10000);
        },
        (error) => {

          this.loading = false;
          this.showMessage(error.error.title, error.error.description, error.error.type);
        }
      );
    }
  }
  showMessage(title: string, description: string, logo: string) {
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
    });
  }

  getCountries() {
    this.httpcountry.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }
  changeCountrySelected() {

    this.selectedCountry = this.formRegister.value.country;
    console.log(this.selectedCountry);
    this.cities = [];
    this.getCitiesByCode(this.selectedCountry.code);
  }
  getCitiesByCodeandName(code: string, name: string) {
    this.httpcountry.getCitiesByCodeandName(code, name).subscribe((data) => {
      this.cities = data;
    });
  }

  getCitiesByCode(code: string) {
    this.httpcountry.getCitiesByCode(code).subscribe((data) => {


      this.cities = data;
      console.log(this.cities);
    });
  }

  changeSelectedCity() {
    this.selectedCity = this.formRegister.value.city;
  }
  filter(event: any) {
    if (event.filter == null || !this.selectedCity) {
      return;
    }
    if (event.filter.trim().length >= 3) {
      this.getCitiesByCodeandName(this.selectedCountry.code, event.filter);
    }
  }
}
