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
import { Review } from '../../interfaces/Review';
import { UserSavedOrder } from '../../interfaces/UserSavedOrder';

@Component({
  selector: 'app-usersavedorders-control-panel',
  templateUrl: './usersavedorders-control-panel.component.html',
  styleUrls: ['./usersavedorders-control-panel.component.css']
})
export class UsersavedordersControlPanelComponent implements OnInit {

  itemsTable: Observable<UserSavedOrder[]>;

  items: UserSavedOrder[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;


  descriptionDisplay: any;

  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllUserSavedOrders();
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


  getAllUserSavedOrders() {
    this._dataService.getAllUserSavedOrders().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
    });
  }

  doSpecificSearch() {
    if (this.inputSearch === '') {
      this.getAllUserSavedOrders();
    } else {
      this.getSpecificItems(this.inputSearch);
    }
  }

  getSpecificItems(user) {
    this.items = [];
    const userLowerCase = user.toLowerCase();
    this._dataService.getAllUserSavedOrders().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userEmail  === userLowerCase) {
          this.items.push(data[i]);
        }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No existen pedidos almacenados con el usuario introducido');
      }
    });
  }

}
