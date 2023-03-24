import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  // @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDriverService : EventDriverService) { }

  ngOnInit(): void {
    
  }

  onGetSelectedProducts(){
    //this.productEventEmitter.emit({type : ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDriverService.publishEvent({
      type : ProductActionsTypes.GET_SELECTED_PRODUCTS
    })
  }

  onGetAvailableProducts(){
    //this.productEventEmitter.emit({type : ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDriverService.publishEvent({
      type : ProductActionsTypes.GET_AVAILABLE_PRODUCTS
    })
  }

  onGetAllProducts(){
    //this.productEventEmitter.emit({type : ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDriverService.publishEvent({
      type : ProductActionsTypes.GET_ALL_PRODUCTS
    })
  }

  onNewProduct(){
    //this.productEventEmitter.emit({type : ProductActionsTypes.GET_SAVE_PRODUCT});
    this.eventDriverService.publishEvent({
      type : ProductActionsTypes.GET_SAVE_PRODUCT
    })
  }

  onSearch(id:any){
    //this.productEventEmitter.emit({type : ProductActionsTypes.SEARCH_PRODUCTS, payload : id});
    this.eventDriverService.publishEvent({
      type : ProductActionsTypes.SEARCH_PRODUCTS, 
      payload : id
    })
  }

}
