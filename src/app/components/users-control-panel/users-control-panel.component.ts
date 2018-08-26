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
import { Review } from '../../interfaces/Review';
import { UserSavedOrder } from '../../interfaces/UserSavedOrder';
import { UserRole } from '../../interfaces/UserRole';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-users-control-panel',
  templateUrl: './users-control-panel.component.html',
  styleUrls: ['./users-control-panel.component.css']
})
export class UsersControlPanelComponent implements OnInit {

  itemsTable: Observable<User[]>;

  items: User[] = [];
  roles = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  users: string[] = [];


  descriptionDisplay: any;

  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllUsers();
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
    this._dataService.getAllUserRoles().subscribe(data => {
      this.roles = [];
      for (let i = 0; i < data.length; i++) {
          this.roles[data[i].id.toString()] = data[i].name;
      }
      this.roles['0'] = 'General';
      this._dataService.getAllUsers().subscribe(data => {
        this.items = [];
        for (let i = 0; i < data.length; i++) {
          data[i].imageURL = AppSettings.API_ENDPOINT + data[i].imageURL + '.';
          data[i].userRoleId = this.roles[data[i].userRoleId];
          this.items.push(data[i]);
        }
        if(this.items.length === 0) {
          this.showToast(1, 'No hay usuarios almacenados actualmente');
        }
      });
    });
  }

  searchByRole(role) {
    var id = 0;
    for (let i = 0; i < this.roles.length; i++) {
      if  (this.roles[i] === role) {
        id = i;
        break;
      }
    }
    if (id !== 0) {
      this.roles = [];
      this._dataService.getAllUserRoles().subscribe(data => {
        this.roles = [];
        for (let i = 0; i < data.length; i++) {
          this.roles[data[i].id.toString()] = data[i].name;
        }
        this.roles['0'] = 'General';
        this._dataService.getAllUsersByRole(id).subscribe(data => {
          this.items = [];
          if (data.length < 1) {
            this.showToast(2, 'No existen usuarios pertenecientes al rol seleccionado');
          } else {
            for (let i = 0; i < data.length; i++) {
              data[i].imageURL = AppSettings.API_ENDPOINT + data[i].imageURL + '.';
              data[i].userRoleId = this.roles[data[i].userRoleId];
              this.items.push(data[i]);
            }
          }
          this.searchInput.nativeElement.value = role;
        });
      });
    } else {
      this.searchInput.nativeElement.value = 'General';
      this.getAllUsers();
    }
  }

  updateUser(i) {
    this._dataService.changeUser(this.items[i]);
    this.router.navigate(['/updateWorkerTeam']);
  }


  deleteUser(i) {
    this._dataService.deleteUser(this.items[i].email).subscribe(data => {
      this.showToast(1, 'Usuario eliminado');
    });
    this.getAllUsers();
    /*
    this._dataService.deleteUser(this.items[i]).subscribe(data => {
    });
    */
  }
}
