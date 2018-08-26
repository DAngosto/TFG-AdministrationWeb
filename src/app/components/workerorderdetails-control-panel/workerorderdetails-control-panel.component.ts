// MODULES
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// SERVICES
import { DataService } from '../../services/data.service';

// INTERFACES

// SETTINGS
import {AppSettings} from '../../AppSettings';
import { Product } from '../../interfaces/Product';
import { ProductAllergens } from '../../interfaces/ProductAllergens';
import { Order } from '../../interfaces/Order';
import { ProductOrderDisplay } from '../../interfaces/ProductOrderDisplay';

@Component({
  selector: 'app-workerorderdetails-control-panel',
  templateUrl: './workerorderdetails-control-panel.component.html',
  styleUrls: ['./workerorderdetails-control-panel.component.css']
})
export class WorkerorderdetailsControlPanelComponent implements OnInit {

  itemsTable: Observable<Product[]>;

  items: ProductOrderDisplay[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  productAllergensDisplay: ProductAllergens;

  orderWatching: Order;

  totalPrice: number;
  client: string;





  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getOrderProducts();
  }

  /*
  EN:Function in charge of displaying a Toast message on the screen.
  ES:Función encargada de mostrar un mensaje Toast en la pantalla.
  */
  showToast(type, message) {
    switch (type) {
      case 0:
            this.toastr.error(message);
            break;
      case 1:
            this.toastr.success(message);
            break;
      case 2:
            this.toastr.info(message);
            break;
      case 3:
            this.toastr.warning(message);
            break;
    }
  }


  getOrderProducts() {
    this.items = [];
    this._dataService.currentOrderWatching.subscribe(orderWatching => this.orderWatching = orderWatching);
    if (!this.orderWatching) {
      this.router.navigate(['/workerOrdersCP']);
    } else {
      const productsFormatted = this.orderWatching.products.split(',');
      if (productsFormatted.length === 0) {
        const productFormatted = this.orderWatching.products.split('-');
        this._dataService.getProductByName(productFormatted[0]).subscribe(data => {
          var urlformatted = data.imageURL.split('/');
          data.imageURL = AppSettings.API_ENDPOINT + '/' + urlformatted[0] + '/' + urlformatted[1] + '/' + 'web_' + urlformatted[2] + '.';
          this.items.push(this.setProduct(data.name, data.category, data.imageURL, productFormatted[1], data.price));
        });
      } else {
        for (let i = 0; i < productsFormatted.length; i++) {
          var productFormatted = productsFormatted[i].split('-');
          this._dataService.getProductByName(productFormatted[0]).subscribe(data => {
            var urlformatted = data.imageURL.split('/');
            data.imageURL = AppSettings.API_ENDPOINT + '/' + urlformatted[0] + '/' + urlformatted[1] + '/' + 'web_' + urlformatted[2] + '.';
            this.items.push(this.setProduct(data.name, data.category, data.imageURL, productFormatted[1], data.price));
          });
        }
      }
      this.client = this.orderWatching.userName;
      this.totalPrice = this.orderWatching.totalPrice;
    }
  }

  swapStatus() {
    this.orderWatching.status = 2;
    this._dataService.updateOrder(this.orderWatching, this.orderWatching.id).subscribe(data => {
      
      this.showToast(1, 'Pedido Completado a la espera de ser recogido y pagado');
      this.router.navigate(['/workerOrdersCP']);
    });
  }

  /*
  swapStockStatus(id) {
    if (this.items[id].stock === 0) {
      this.items[id].stock = 1;
      this._dataService.updateProductStockStatus(this.items[id]).subscribe(data => {
        this.showToast(1, 'Producto actualizado');
      });
    } else {
      this.items[id].stock = 0;
      this._dataService.updateProductStockStatus(this.items[id]).subscribe(data => {
        this.showToast(1, 'Producto actualizado');
      });
    }
  }
  */

  setProduct(name,category,imageURL,amount,price) : ProductOrderDisplay{
    var aux: ProductOrderDisplay = {name,category,imageURL,amount,price};
    aux.name = name;
    aux.category = category;
    aux.imageURL = imageURL;
    aux.amount = amount;
    aux.price = price;
    return aux;
}



  /*
  EN:Function in charge of emptying the items stored in the component.
  ES:Función encargada de vaciar los items almacenados en el componente.
  */
  clearData() {
    this.items = [];
  }


}
