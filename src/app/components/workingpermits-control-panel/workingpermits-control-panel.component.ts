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
import { WorkingPermit } from '../../interfaces/WorkingPermit';
import { Cafeteria } from '../../interfaces/Cafeteria';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-workingpermits-control-panel',
  templateUrl: './workingpermits-control-panel.component.html',
  styleUrls: ['./workingpermits-control-panel.component.css']
})
export class WorkingpermitsControlPanelComponent implements OnInit {

  itemsTable: Observable<Category[]>;

  items: WorkingPermit[] = [];

  cafeterias = [];
  users = [];
  roles = [];



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
    this.getAllWorkingPermits();
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


  getAllWorkingPermits() {
    this._dataService.getAllCafeterias().subscribe(data => {
      this.cafeterias = [];
      for (let i = 0; i < data.length; i++) {
        this.cafeterias[data[i].id.toString()] = data[i].location;
      }
      this._dataService.getAllUsers().subscribe(data => {
        this.items = [];
        for (let i = 0; i < data.length; i++) {
          this.users[data[i].id.toString()] = data[i].email;
        }
        this._dataService.getAllWorkingPermits().subscribe(data => {
          this.items = [];
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i]);
            this.items[i].userEmail = this.users[data[i].userId];
            this.items[i].cafeteriaLocation = this.cafeterias[data[i].cafeteriaId];
          }
        });
      });
    });
  }




  /*
  EN:Function in charge of making the call for the deletion of a letter.
  ES:Función encargada de realizar la llamada para la eliminación de una carta.
  */
 deleteWorkingPermit(i) {
    this._dataService.deleteWorkingPermit(this.items[i].id).subscribe(data => {
      this.showToast(1, 'Asignación de trabajo eliminada');
      this.getAllWorkingPermits();
    });
  }

}
