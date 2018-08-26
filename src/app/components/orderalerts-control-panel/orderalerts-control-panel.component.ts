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
import { Category } from '../../interfaces/Category';
import { OrderAlert } from '../../interfaces/OrderAlert';

@Component({
  selector: 'app-orderalerts-control-panel',
  templateUrl: './orderalerts-control-panel.component.html',
  styleUrls: ['./orderalerts-control-panel.component.css']
})
export class OrderalertsControlPanelComponent implements OnInit {

  itemsTable: Observable<Category[]>;

  items: OrderAlert[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllOrderAlerts();
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


  getAllOrderAlerts() {
    this._dataService.getAllOrderAlerts().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
      if(this.items.length === 0) {
        this.showToast(1, 'No hay alertas actualmente');
      }
    });
  }

  changeContactedStatus(i) {
    this._dataService.updateOrderAlertContactedStatus(this.items[i].id).subscribe(data => {
      this.showToast(1, 'Usuario contactado registrado');
      this.getAllOrderAlerts();
    });
  }


  /*
  EN:Function in charge of making the call for the deletion of a letter.
  ES:Función encargada de realizar la llamada para la eliminación de una carta.
  */
  deleteOrderAlert(id) {
    this._dataService.deleteOrderAlert(this.items[id].id).subscribe(data => {
      this.showToast(1, 'Alerta eliminada');
      this.getAllOrderAlerts();
    });
  }

}
