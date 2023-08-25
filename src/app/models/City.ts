export class City {
    Id?: number;
    countryCode: string;
    name: string;
    constructor(countryCode: string, name: string) {
      (this.countryCode = countryCode), (this.name = name);
    }
  }