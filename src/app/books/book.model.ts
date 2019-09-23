export class Book {
   constructor(
     public _id?: number,
     public author?: string,
     public category?: string,
     public title?: string,
     public year?: number,
     public price?: number,
     public inStock?: number
   ) {}
}
