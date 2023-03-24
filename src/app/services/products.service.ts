import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"}) // Quand on met le providedIn:"root" c'est pour dire que le service est disponible dans toute l'appli sans avoir a le declare dans le app.module
export class ProductsService{
    host = "http://localhost:3000"
    constructor(private http:HttpClient){
        
    }

    getAllProducts():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products");
    }

    getSelectedProduct():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products?selected=true");
    }

    getAvailableProduct():Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products?available=true");
    }

    SearchProduct(keyword:string):Observable<Product[]>{
        return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
    }

    SelectProduct(product:Product):Observable<Product>{
        product.selected = !product.selected;
        return this.http.put<Product>(this.host+"/products/"+product.id,product);
    }

    DeleteProduct(product:Product):Observable<void>{
        product.selected = !product.selected;
        return this.http.delete<void>(this.host+"/products/"+product.id);
    }

    SaveProduct(product:Product):Observable<Product>{
        product.selected = !product.selected;
        return this.http.post<Product>(this.host+"/products",product);
    }

    getProduct(id:number):Observable<Product>{
        return this.http.get<Product>(this.host+"/products/"+id);
    }

    updateProduct(product:Product):Observable<Product>{
        return this.http.put<Product>(this.host+"/products/"+product.id, product);
    }

}