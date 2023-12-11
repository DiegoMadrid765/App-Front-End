import { City } from "./City";

export class Address{
    Id?:number;
    homeadress:string;
    userId:number;
    cityId:number;
    city?:City
    constructor(homeadress:string,userId:number,cityId:number){
        this.homeadress=homeadress,
        this.userId=userId,
        this.cityId=cityId
    }
}