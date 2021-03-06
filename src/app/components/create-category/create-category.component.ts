//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  selectedFile: File = null;
  inputName = '';
  inputCategory = '';
  inputPrice: number;
  url: string = "";
  prevImage: boolean = false;

  items: String[] = [];

  aux: Product;

  sawImage = true;


  selectedStatus: number;

  selectedCategory: string;



  constructor(private _dataService: DataService, private ng2ImgToolsService: Ng2ImgToolsService, 
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllCategories();
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

  getAllCategories() {
    this._dataService.getAllCategories().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].name);
      }
    });
  }


  uploadCategory() {
    if (this.inputName !== '') {
      let repeated = false;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] === this.inputName) {
          repeated = true;
        }
      }
      if (!repeated) {
        this._dataService.createCategory(this.inputName).subscribe(data => {
          this.showToast(1, 'Categoría creada');
        });
      } else {
        this.showToast(0, 'La Categoria introducida ya existe actualmente');
      }
    } else {
      this.showToast(0, 'El campo nombre estaba incompleto, por favor introduce la información correspondiente');
    }
  }
}
