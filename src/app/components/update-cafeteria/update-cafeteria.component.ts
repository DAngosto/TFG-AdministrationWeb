// MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// SERVICES
import { DataService } from '../../services/data.service';

// INTERFACES

// SETTINGS
import {AppSettings} from '../../AppSettings';
import { Product } from '../../interfaces/Product';

import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Category } from '../../interfaces/Category';
import { Cafeteria } from '../../interfaces/Cafeteria';

@Component({
  selector: 'app-update-cafeteria',
  templateUrl: './update-cafeteria.component.html',
  styleUrls: ['./update-cafeteria.component.css']
})
export class UpdateCafeteriaComponent implements OnInit {

  cafeteriaUpdating: Cafeteria;
  selectedFile: File = null;
  inputName = '';
  inputLocation = '';
  inputPrice: number;
  url = '';
  sawImage = false;
  imgChanged = false;

  items: String[] = [];


  selectedStatus: number;

  selectedCategory: string;




  constructor(private _dataService: DataService, private router: Router, public toastr: ToastsManager,
              vcr: ViewContainerRef, private ng2ImgToolsService: Ng2ImgToolsService) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.getCafeteriaForUpdate();
    this.getAllCafeterias();
    //this.getAllCategories();
    
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
  EN:Function in charge of obtaining the information of the card susceptible to being modified and to introduce its data in the corresponding fields.
  ES:Función encargada de obtener la información de la carta susceptible a ser modificada e introducir sus datos en los campos correspondientes.
  */
  getCafeteriaForUpdate() {
    this._dataService.currentCafeteriaUpdating.subscribe(cafeteriaUpdating => this.cafeteriaUpdating = cafeteriaUpdating);
    if (!this.cafeteriaUpdating) {
      this.router.navigate(['/cafeteriasCP']);
    } else {
      this.inputName = this.cafeteriaUpdating.campusName;
      this.inputLocation = this.cafeteriaUpdating.location;
    }
  }

  getAllCafeterias() {
    this._dataService.getAllCafeterias().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].location);
      }
    });
  }


  /*
  EN:Function in charge of updating the information of the selected card.
  ES:Función encargada de actualizar la información de la carta seleccionada.
  */
  updateCafeteria() {
    if ((this.cafeteriaUpdating) || ((this.inputName !== '') && (this.inputLocation !== '') )) {
      var flag = false;
      if (this.cafeteriaUpdating.location !== this.inputLocation) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.inputLocation) {
          flag = true;
          break;
        }
      }
      }
      if (flag) {
        this.showToast(0, 'La localización de la cafeteria ya está siendo ocupada, por favor introduzca otra diferente');
      } else {
        this.cafeteriaUpdating.campusName = this.inputName;
        this.cafeteriaUpdating.location = this.inputLocation;
        this._dataService.updateCafeteria(this.cafeteriaUpdating).subscribe(data => {
          this.showToast(1, 'cafetería actualizada');
        });
      }
    } else {
      this.showToast(0, 'El campo nombre o localización no pueden estar incompletos');
    }
  }

}
