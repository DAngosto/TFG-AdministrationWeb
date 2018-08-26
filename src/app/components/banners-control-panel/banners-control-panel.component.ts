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
import { Banner } from '../../interfaces/banner';

@Component({
  selector: 'app-banners-control-panel',
  templateUrl: './banners-control-panel.component.html',
  styleUrls: ['./banners-control-panel.component.css']
})
export class BannersControlPanelComponent implements OnInit {

  itemsTable: Observable<Category[]>;

  items: Banner[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  bannerURL: string="";


  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllBanners();
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


  getAllBanners() {
    this._dataService.getAllBanners().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
      if(this.items.length === 0) {
        this.showToast(1, 'No hay letreros almacenados actualmente');
      }
    });
  }

  sawBanner(i) {
    this.bannerURL = AppSettings.API_ENDPOINT +  this.items[i].url + '.';
  }




  swapStatus(i) {
    if (this.items[i].status === 0) {
      this.items[i].status = 1;
      this._dataService.updateBanner(this.items[i]).subscribe(data => {
        this.showToast(1, 'Estado actualizado');
      });
    } else {
      this.items[i].status = 0;
      this._dataService.updateBanner(this.items[i]).subscribe(data => {
        this.showToast(1, 'Estado actualizado');
      });
    }
  }


  /*
  EN:Function in charge of passing the data of the card to be updated to the service and performing the redirection.
  ES:Función encargada de pasar los datos de la carta a actualizar al servicio y realizar la redirección.
  */
  updateBanner(id) {
    this._dataService.changeBanner(this.items[id]);
    this.router.navigate(['/updateBanner']);
  }

  /*
  EN:Function in charge of making the call for the deletion of a letter.
  ES:Función encargada de realizar la llamada para la eliminación de una carta.
  */
  deleteBanner(i) {
    this._dataService.deleteBanner(this.items[i].id).subscribe(data => {
      this.showToast(1, 'Letrero eliminada');
      this.getAllBanners();
    });
  }



}
