// MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
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
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-workerorders-control-panel',
  templateUrl: './workerorders-control-panel.component.html',
  styleUrls: ['./workerorders-control-panel.component.css']
})
export class WorkerordersControlPanelComponent implements OnInit {

  itemsTable: Observable<Order[]>;

  items: Order[] = [];

  cafeterias: string[] = [];
  workingPermitsOfUser: number[] = [];


  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;


  productsDisplay: any;

  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllCafeterias();
    //this.getAllOrders();
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

  /*
  getAllCafeterias() {
    this._dataService.getAllCafeterias().subscribe(data => {
      this.cafeterias = [];
      for (let i = 0; i < data.length; i++) {
        this.cafeterias.push(data[i].location);
      }
      if (this.cafeterias.length > 0) {
        this.selectedCafeteria(this.cafeterias[0]);
      }
    });
  }
  */

  getAllCafeterias() {
    this._dataService.getUserByEmail(localStorage.getItem('username')).subscribe(data => {
      this._dataService.getAllWorkingPermitsOfUser(data.id).subscribe(data => {
        this.workingPermitsOfUser = [];
        for (let i = 0; i < data.length; i++) {
          this.workingPermitsOfUser.push(data[i].cafeteriaId);
        this._dataService.getAllCafeterias().subscribe(data => {
          var flag = false;
          this.cafeterias = [];
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.workingPermitsOfUser.length; j++) {
              if (data[i].id === this.workingPermitsOfUser[j]) {
                flag = true;
              }
            }
            if (flag == true) {
              flag = false;
              this.cafeterias.push(data[i].location);
            } else {
              flag = false;
            }
          }
          if (this.cafeterias.length === 0) {
            this.showToast(2, 'El equipo de trabajo actual no tiene ninguna cafeteria asignada. Por favor contacte con el administrador.');
          }
          if (this.cafeterias.length > 0) {
            this.selectedCafeteria(this.cafeterias[0]);
          }
        });
        }
      });
    });
  }

  sawProducts(id) {
    this.productsDisplay = this.items[id].products;
  }


  getSpecificItems(cafeteria) {
    this.items = [];
    this._dataService.getAllOrders().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].cafeteria  === cafeteria) {
          if ((data[i].status !== 3) && (data[i].status !== 4)) {
            this.items.push(data[i]);
          }
        }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No hay pedidos solicitados actualmente');
      } else {
        this.getUserNames();
      }
    });
  }


  getUserNames() {
    for (let i = 0; i < this.items.length; i++) {
      this._dataService.getUserByEmail(this.items[i].userEmail).subscribe(data => {
          this.items[i].userName = data.firstName;
      });
    }
  }


  selectedCafeteria (cafeteria) {
      this.getSpecificItems(cafeteria);
  }

  sawOrderDetails(i) {
    this._dataService.changeOrder(this.items[i]);
    this.router.navigate(['/workerOrderDetailsCP']);
  }

  swapStatus(i, type) {
    if (type === 0) {
      if (this.items[i].status === 0) { this.items[i].status = 1; } else { this.items[i].status = 0; }
      this._dataService.updateOrder(this.items[i], this.items[i].id).subscribe(data => {
        this.showToast(1, 'Estado de pedido actualizado');
      });
    } else if (type === 1) {
      this.items[i].status = 3;
      this._dataService.updateOrder(this.items[i], this.items[i].id).subscribe(data => {
        this._dataService.createAlertOrder(this.items[i].userEmail, this.items[i].id).subscribe(data => {
          this.showToast(1, 'Estado de pedido actualizado a "Cliente nunca apareció"');
          this.getAllCafeterias();
        });
      });
    } else {
      this.items[i].status = 4;
      this._dataService.updateOrder(this.items[i], this.items[i].id).subscribe(data => {
        this.showToast(1, 'Estado de pedido actualizado a "Finalizado"');
        this.getAllCafeterias();
      });
    }
  }

  refreshOrders() {
    this.getAllCafeterias();
    this.showToast(2, 'Tabla de pedidos actualizada');
  }

}
