//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';
import { Cafeteria } from '../../interfaces/Cafeteria';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {

  selectedFile: File = null;
  inputName = '';
  inputPass = '';
  inputPrice: number;
  url: string = "";
  prevImage: boolean = false;

  items: String[] = [];

  cafeterias: Cafeteria[] = [];


  aux: Product;

  sawImage = true;


  selectedStatus: number;

  selectedCafeteria = '';



  constructor(private _dataService: DataService, private ng2ImgToolsService: Ng2ImgToolsService, 
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllUsers();
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

  getAllUsers() {
    this._dataService.getAllUsers().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].email);
      }
    });
  }

  getAllCafeterias() {
    this._dataService.getAllCafeterias().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.cafeterias.push(data[i]);
      }
    });
  }

  setSelectedCafeteria(location) {
    this.selectedCafeteria = location;
  }




  uploadUserRole() {
    if (this.selectedCafeteria !== '') {
      if ((this.inputName !== '') && (this.inputPass !== '')) {
        let repeated = false;
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i] === this.inputName) {
            repeated = true;
          }
        }
        if (!repeated) {
          this._dataService.getAllUserRoles().subscribe(data => {
            this.items = [];
            var idRole = 0;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === 'WorkerTeam') {
                idRole = data[i].id;
                break;
              }
            }
            if(idRole > 0) {
              this._dataService.createWorkerTeam(this.inputName, this.inputPass, idRole).subscribe(data => {
                this.showToast(1, 'Equipo de trabajo creado');
                for (let i = 0; i < this.cafeterias.length; i++) {
                  var idCafeteria = 0;
                  if (this.cafeterias[i].location === this.selectedCafeteria) {
                    idCafeteria = this.cafeterias[i].id;
                    break;
                  }
                }
                if(idCafeteria > 0) {
                  console.log(this.cafeterias[idCafeteria]);
                  this._dataService.createWorkingPermit(data['id'], idCafeteria).subscribe(data => {
                  });
                } else {
                  this.showToast(0, 'Error encontrando el id de la cafeteria seleccionada');
                }
              });
            } else {
              this.showToast(0, 'Error encontrado el rol de equipo de trabajo');
            }
          });
        } else {
          this.showToast(0, 'El email introducido ya existe actualmente en otro usuario');
        }
      } else {
        this.showToast(0, 'Los campos email o contraseña estaban incompletos, por favor introduce la información correspondiente');
      }
    } else {
      this.showToast(0, 'Selecciona una cafeteria a la que asociar el nuevo equipo de trabajo');
    }
  }

}
