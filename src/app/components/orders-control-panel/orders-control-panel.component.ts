// MODULES
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// SERVICES
import { DataService } from '../../services/data.service';

// INTERFACES
import { Card } from '../../interfaces/Card';

// SETTINGS
import {AppSettings} from '../../AppSettings';
import { Product } from '../../interfaces/Product';
import { Category } from '../../interfaces/Category';
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-orders-control-panel',
  templateUrl: './orders-control-panel.component.html',
  styleUrls: ['./orders-control-panel.component.css']
})
export class OrdersControlPanelComponent implements OnInit {

  itemsTable: Observable<Order[]>;

  items: Order[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;


  productsDisplay: any;

  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllOrders();
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


  getAllOrders() {
    this._dataService.getAllOrders().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        /*
        var date = new Date(data[i].activatedDate*1000);
        var day = date.getUTCDay();
        var month = date.getUTCMonth();
        var year = date.getUTCFullYear();
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime =  day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        data[i].activatedDate = formattedTime;
        */
        this.items.push(data[i]);
      }
    });
  }

  sawProducts(id) {
    this.productsDisplay = this.items[id].products;
  }

  doSpecificSearch() {
    if (this.inputSearch === '') {
      this.getAllOrders();
    } else {
      this.getSpecificItems(this.inputSearch);
    }
  }

  getSpecificItems(user) {
    this.items = [];
    const userLowerCase = user.toLowerCase();
    this._dataService.getAllOrders().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userEmail  === userLowerCase) {
          this.items.push(data[i]);
        }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No existen pedidos registrados con ese usuario');
      }
    });
  }

}
