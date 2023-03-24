import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<AppDataState<Product[]>> | null=null; // Observable veut dire qu'on a besoin de faire un subscribe lorsque les donnees arrivent et contiennent dollar dans la declaration des variables
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService : ProductsService, private router : Router, private eventDriverService : EventDriverService){ }

  ngOnInit(): void{
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent : ActionEvent) => {
      this.onActionEvent(actionEvent);
    })
  }

  //Seconde Solution
  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADED}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$ = this.productService.getSelectedProduct().pipe(
          map(data=>{
            console.log(data);
            return ({dataState:DataStateEnum.LOADED,data:data})
          }),
          startWith({dataState:DataStateEnum.LOADED}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
        );
  }

  onGetAvailableProducts(){
    this.products$ = this.productService.getAvailableProduct().pipe(
          map(data=>{
            console.log(data);
            return ({dataState:DataStateEnum.LOADED,data:data})
          }),
          startWith({dataState:DataStateEnum.LOADED}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
        );
  }

  onSearch(dataForm:any){
    this.products$ = this.productService.SearchProduct(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADED}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p : Product){
    this.productService.SelectProduct(p).subscribe(data=>{
      p.selected = data.selected;
    })
  }

  onDelete(p:Product){
    let v = confirm("Etes vous sûre ?");
    this.productService.DeleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event : ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionsTypes.GET_SAVE_PRODUCT:
        this.onNewProduct();
        break;
      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;
      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;
      case ProductActionsTypes.EDIT_PRODUCT:
        this.onEdit($event.payload);
        break;
    }
  }

}
