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
import { UserRole } from '../../interfaces/UserRole';

@Component({
  selector: 'app-userroles-control-panel',
  templateUrl: './userroles-control-panel.component.html',
  styleUrls: ['./userroles-control-panel.component.css']
})
export class UserrolesControlPanelComponent implements OnInit {

  itemsTable: Observable<UserRole[]>;

  items: UserRole[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  users: string[] = [];


  descriptionDisplay: any;

  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllUserRoles();
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


  getAllUserRoles() {
    this._dataService.getAllUserRoles().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
      if(this.items.length = 0) {
        this.showToast(1, 'No hay roles almacenados actualmente');
      }
    });
  }

  updateUserRole(i) {
    this._dataService.changeUserRole(this.items[i]);
    this.router.navigate(['/updateUserRole']);
  }


  getAllUsersByRoleName(i) {
    this._dataService.getAllUsersByRole(this.items[i].id).subscribe(data => {
      if (data.length > 0) {
        this.showToast(0, 'No es posible borrar el rol debido a que existen usuarios perteneciendo a dicho rol actualmente.');
      } else {
        this._dataService.deleteUserRole(this.items[i].name).subscribe(data => {
          this.showToast(1, 'Rol eliminado');
          this.getAllUserRoles();
        });
      }
    });
  }

  deleteUserRole(i) {
    this.getAllUsersByRoleName(i);
  }

}
