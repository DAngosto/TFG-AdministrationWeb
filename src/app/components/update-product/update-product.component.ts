// MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// SERVICES
import { DataService } from '../../services/data.service';

// INTERFACES
import { Card } from '../../interfaces/Card';

// SETTINGS
import {AppSettings} from '../../AppSettings';
import { Product } from '../../interfaces/Product';

import { Ng2ImgToolsService } from 'ng2-img-tools';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productUpdating: Product;
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



  @ViewChild('stockInput') stockStatusInput: ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef;


  constructor(private _dataService: DataService, private router: Router, public toastr: ToastsManager,
              vcr: ViewContainerRef, private ng2ImgToolsService: Ng2ImgToolsService) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.getProductForUpdate();
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
  getProductForUpdate() {
    this._dataService.currentProductUpdating.subscribe(productUpdating => this.productUpdating = productUpdating);
    if (!this.productUpdating) {
      this.router.navigate(['/productsCP']);
    } else {
      this.selectedStatus = this.productUpdating.stock;
      if (this.selectedStatus === 0) {
        this.stockStatusInput.nativeElement.value = 'Agotado';
      } else if (this.selectedStatus === 1 ) {
        this.stockStatusInput.nativeElement.value = 'Disponible';
      }
      this.inputName = this.productUpdating.name;
      this.selectedCategory = this.productUpdating.category;
      this.items.push(this.selectedCategory);
      this.inputPrice = this.productUpdating.price;
      this.url = this.productUpdating.imageURL;
      this.sawImage = true;
    }
  }

  getAllCategories() {
    this._dataService.getAllCategories().subscribe(data => {
      this.items = [];
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].name);
      }
    });
  }

  /*
  EN:Function in charge of storing the selected image to be the corresponding one on the back of the cards during the game.
  ES:Función encargada de almacenar la imagen seleccionada para ser la correspondiente del dorso de las cartas durante el juego.
  */
  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File> event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.url = reader.result;
      this.imgChanged = true;
    }
  }

  setStockStatus(status) {
    const aux = status.toLowerCase();
    if (aux === 'agotado') {
      this.selectedStatus = 0;
    } else if (aux === 'disponible') {
      this.selectedStatus = 1;
    }
  }

  setCategory(categoryname) {
    this.selectedCategory = categoryname;
  }

  updateCategories() {
    this.getAllCategories();
  }

  /*
  EN:Function in charge of updating the information of the selected card.
  ES:Función encargada de actualizar la información de la carta seleccionada.
  */
  updateProduct() {
    if ((this.productUpdating) || ((this.inputName !== '') && (this.selectedCategory !== '') && (this.inputPrice !== NaN))) {
      const aux = this.productUpdating.name;
      if (!this.imgChanged) {
        this.productUpdating.name = this.inputName;
        this.productUpdating.category = this.selectedCategory;
        this.productUpdating.price = this.inputPrice;
        this.productUpdating.imageURL = null;
        this.productUpdating.stock = this.selectedStatus;
        console.log(this.productUpdating.stock);
        this._dataService.updateProduct(this.productUpdating, aux).subscribe(data => {
          this.showToast(1, 'Producto actualizado');
        });
      } else {
        const fd = new FormData();
        this.ng2ImgToolsService.resizeExactCrop([this.selectedFile], 50, 50).subscribe(result => {
          fd.append('File', result, this.selectedFile.name);
          this._dataService.uploadProductFile(fd).subscribe(data => {
          const fileURL = data['file'];
          this.productUpdating.name = this.inputName;
          this.productUpdating.category = this.selectedCategory;
          this.productUpdating.price = this.inputPrice;
          this.productUpdating.imageURL = fileURL;
          this.productUpdating.stock = this.selectedStatus;
          console.log(this.productUpdating);
          this._dataService.updateProduct(this.productUpdating, aux).subscribe(data => {
            this.showToast(1, 'Producto actualizado');
          });
        });
      });
      }
    } else {
      this.showToast(0, 'Los campos nombre o categoría o precio estaban incompletos, por favor introduce la información correspondiente');
    }
  }
}
