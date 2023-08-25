export class ProductDTO{
    id?:number;
    name:string;
    description:string;
    price:number;
    image:File;
    stock:string;
    hidden:number=0;
    constructor(name:string,price:number, image:File,description:string,stock:string,hidden:number){
        this.name=name;
        this.price=price;
        this.image=image;
        this.description=description;
        this.stock=stock;
        this.hidden=hidden;
    }
}
export class Product{
    id?:number;
    name:string;
    description:string;
    price:number;
    imageurl:string;
    stock:string;
    constructor(name:string,price:number, imageurl:string,description:string,stock:string){
        
        this.name=name;
        this.price=price;
        this.imageurl=imageurl;
        this.description=description;
        this.stock=stock;
    }
}