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
import { User } from '../../interfaces/User';
import { Cafeteria } from '../../interfaces/Cafeteria';
import { WorkingPermit } from '../../interfaces/WorkingPermit';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.css']
})
export class UpdateWorkerComponent implements OnInit {

  userUpdating: User;
  selectedFile: File = null;
  inputName = '';
  inputCategory = '';
  inputPrice: number;
  url = '';
  sawImage = false;
  imgChanged = false;

  items: String[] = [];


  selectedStatus: number;

  selectedCategory: string;

  selectedCafeteria = '';
  cafeterias: Cafeteria[] = [];

  workingPermitsOfUser: number[] = [];






  constructor(private _dataService: DataService, private router: Router, public toastr: ToastsManager,
              vcr: ViewContainerRef, private ng2ImgToolsService: Ng2ImgToolsService) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.getUserForUpdate();
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
  getUserForUpdate() {
    this._dataService.currentUserUpdating.subscribe(userUpdating => this.userUpdating = userUpdating);
    if (!this.userUpdating) {
      this.router.navigate(['/usersCP']);
    } else {
      this.inputName = this.userUpdating.email;
    }
  }

  getAllCafeterias() {

    this._dataService.getAllWorkingPermitsOfUser(this.userUpdating.id).subscribe(data => {
      this.workingPermitsOfUser = [];
      for (let i = 0; i < data.length; i++) {
        this.workingPermitsOfUser.push(data[i].cafeteriaId);
      }
      
      this._dataService.getAllCafeterias().subscribe(data => {
        var flag = false;
        this.cafeterias = [];
        
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.workingPermitsOfUser.length; j++) {
            
           

            
            if (data[i].id === this.workingPermitsOfUser[j]) {
              flag = true;
            }
            
            
            
          }
          if (flag === false) {
            this.cafeterias.push(data[i]);
          } else {
            flag = false;
          }
        }
        //this.cafeterias.push(data[0]);
        //console.log(this.cafeterias.length);
        if (this.cafeterias.length === 0) {
          this.showToast(2, 'No existen cafeterias sin asignar para el usuario seleccionado');
        }
        
      });
      
    });
  }

  setSelectedCafeteria(location) {
    this.selectedCafeteria = location;
  }


  /*
  EN:Function in charge of updating the information of the selected card.
  ES:Función encargada de actualizar la información de la carta seleccionada.
  */
  createNewWorkingPermit() {
    if ((this.selectedCafeteria !== '')) {
        for (let i = 0; i < this.cafeterias.length; i++) {
          var idCafeteria = 0;
          if (this.cafeterias[i].location === this.selectedCafeteria) {
            idCafeteria = this.cafeterias[i].id;
            break;
          }
        }
        if (idCafeteria > 0) {
          this._dataService.createWorkingPermit(this.userUpdating.id, idCafeteria).subscribe(data => {
            this.showToast(1, 'Nuevo Permiso de Trabajo Asignado');
            if (this.cafeterias.length === 1) {
              this.cafeterias = [];
              this.selectedCafeteria = '';
              this.showToast(2, 'No existen mas cafeterías posibles a la que asociar el equipo de trabajo');
            }
          });
        } else {
          this.showToast(0, 'Error encontrando el id de la cafeteria seleccionada');
        }
    } else {
      this.showToast(0, 'Selecciona una cafeteria a la que asociar el equipo de trabajo');
    }
  }

}
