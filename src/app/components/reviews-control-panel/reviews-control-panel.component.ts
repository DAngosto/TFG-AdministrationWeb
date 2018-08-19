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

@Component({
  selector: 'app-reviews-control-panel',
  templateUrl: './reviews-control-panel.component.html',
  styleUrls: ['./reviews-control-panel.component.css']
})
export class ReviewsControlPanelComponent implements OnInit {

  itemsTable: Observable<Review[]>;

  items: Review[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;


  descriptionDisplay: any;

  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllReviews();
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


  getAllReviews() {
    this._dataService.getAllReviews().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i]);
      }
    });
  }

  sawDescription(id) {
    this.descriptionDisplay = this.items[id].description;
  }

  doSpecificSearch() {
    if (this.inputSearch === '') {
      this.getAllReviews();
    } else {
      this.getSpecificItems(this.inputSearch);
    }
  }

  getSpecificItems(user) {
    this.items = [];
    const userLowerCase = user.toLowerCase();
    this._dataService.getAllReviews().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userEmail  === userLowerCase) {
          this.items.push(data[i]);
        }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No existen reviews registradas con ese usuario');
      }
    });
  }

}
