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
import { UserRole } from '../../interfaces/UserRole';

@Component({
  selector: 'app-update-userrole',
  templateUrl: './update-userrole.component.html',
  styleUrls: ['./update-userrole.component.css']
})
export class UpdateUserroleComponent implements OnInit {

  userRoleUpdating: UserRole;
  selectedFile: File = null;
  inputName = '';
  inputDescription = '';
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
    this.getUserRoleForUpdate();
    this.getAllUserRoles();
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
 getUserRoleForUpdate() {
    this._dataService.currentUserRoleUpdating.subscribe(userRoleUpdating => this.userRoleUpdating = userRoleUpdating);
    if (!this.userRoleUpdating) {
      this.router.navigate(['/userRolesCP']);
    } else {
      this.inputName = this.userRoleUpdating.name;
      this.inputDescription = this.userRoleUpdating.description;
    }
  }

  getAllUserRoles() {
    this._dataService.getAllUserRoles().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].name);
      }
    });
  }


  /*
  EN:Function in charge of updating the information of the selected card.
  ES:Función encargada de actualizar la información de la carta seleccionada.
  */
  updateCategory() {
    if ((this.userRoleUpdating) || ((this.inputName !== '') && (this.inputDescription !== '') )) {
      var flag = false;
      if (this.userRoleUpdating.name !== this.inputName) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.inputName) {
          flag = true;
          break;
        }
      }
      }
      if (flag) {
        this.showToast(0, 'El nombre del rol ya está siendo ocupado, por favor introduzca otro diferente');
      } else {
        var firstName = this.userRoleUpdating.name;
        this.userRoleUpdating.name = this.inputName;
        this.userRoleUpdating.description = this.inputDescription;
        this._dataService.updateUserRole(this.userRoleUpdating, firstName).subscribe(data => {
          this.showToast(1, 'Rol de usuario actualizado');
        });
      }
    } else {
      this.showToast(0, 'El campo nombre o descripción no puede estar incompletos');
    }
  }

}
