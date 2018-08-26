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
import { Cafeteria } from '../../interfaces/Cafeteria';

@Component({
  selector: 'app-cafeteria-control-panel',
  templateUrl: './cafeteria-control-panel.component.html',
  styleUrls: ['./cafeteria-control-panel.component.css']
})
export class CafeteriaControlPanelComponent implements OnInit {


  itemsTable: Observable<Cafeteria[]>;

  items: Cafeteria[] = [];

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
    this.getAllCafeterias();
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

  

  getAllCafeterias() {
    this._dataService.getAllCafeterias().subscribe(data => {
      console.log(data);
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
      if(this.items.length === 0) {
        this.showToast(1, 'No hay cafeterias almacenadas actualmente');
      }
    });
  }

  

  /*
  EN:Function in charge of passing the data of the card to be updated to the service and performing the redirection.
  ES:Función encargada de pasar los datos de la carta a actualizar al servicio y realizar la redirección.
  */
  updateCafeteria(id) {
    this._dataService.changeCafeteria(this.items[id]);
    console.log(this.items[id]);
    this.router.navigate(['/updateCafeteria']);
  }

  /*
  EN:Function in charge of making the call for the deletion of a letter.
  ES:Función encargada de realizar la llamada para la eliminación de una carta.
  */
  deleteCafeteria(id) {
    this._dataService.deleteCafeteria(this.items[id]).subscribe(data => {
      this.showToast(1, 'Cafetería eliminada');
      this.getAllCafeterias();
    });
  }

}
