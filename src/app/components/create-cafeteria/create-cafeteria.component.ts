//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-create-cafeteria',
  templateUrl: './create-cafeteria.component.html',
  styleUrls: ['./create-cafeteria.component.css']
})
export class CreateCafeteriaComponent implements OnInit {

  selectedFile: File = null;
  inputName = '';
  inputLocation = '';
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


  uploadCafeteria() {
    if ((this.inputName !== '') || (this.inputLocation !== '')) {
        this._dataService.createCafeteria(this.inputName, this.inputLocation).subscribe(data => {
          this.showToast(1, 'Cafetería creada');
        });
    } else {
      this.showToast(0, 'El campo nombre o localización no pueden estar incompletos');
    }
  }

}
