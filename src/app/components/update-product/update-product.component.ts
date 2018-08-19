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
import { ProductAllergens } from '../../interfaces/ProductAllergens';


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

  productAllergens: ProductAllergens;

  allergensFlag = false;

  products: String[] = [];



  @ViewChild('stockInput') stockStatusInput: ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef;

  @ViewChild('glutenInput') glutenInput: ElementRef;
  @ViewChild('crustaceosInput') crustaceosInput: ElementRef;
  @ViewChild('huevosInput') huevosInput: ElementRef;
  @ViewChild('pescadoInput') pescadoInput: ElementRef;
  @ViewChild('cacahuetesInput') cacahuetesInput: ElementRef;
  @ViewChild('sojaInput') sojaInput: ElementRef;
  @ViewChild('lacteosInput') lacteosInput: ElementRef;
  @ViewChild('frutosSecosInput') frutosSecosInput: ElementRef;
  @ViewChild('apioInput') apioInput: ElementRef;
  @ViewChild('mostazaInput') mostazaInput: ElementRef;
  @ViewChild('sesamoInput') sesamoInput: ElementRef;
  @ViewChild('sulfitosInput') sulfitosInput: ElementRef;
  @ViewChild('altramuzInput') altramuzInput: ElementRef;
  @ViewChild('moluscosInput') moluscosInput: ElementRef;



  constructor(private _dataService: DataService, private router: Router, public toastr: ToastsManager,
              vcr: ViewContainerRef, private ng2ImgToolsService: Ng2ImgToolsService) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.getProductForUpdate();
    this.getAllProducts();
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

      this._dataService.getProductAllergens(this.productUpdating.name).subscribe(data => {
        this.productAllergens = data;
        if (this.productAllergens.gluten === false) {this.glutenInput.nativeElement.value = 'No'; } else {this.glutenInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.crustaceos === false) {this.crustaceosInput.nativeElement.value = 'No'; } else {this.crustaceosInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.huevos === false) {this.huevosInput.nativeElement.value = 'No'; } else {this.huevosInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.pescado === false) {this.pescadoInput.nativeElement.value = 'No'; } else {this.pescadoInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.cacahuetes === false) {this.cacahuetesInput.nativeElement.value = 'No'; } else {this.cacahuetesInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.soja === false) {this.sojaInput.nativeElement.value = 'No'; } else {this.sojaInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.lacteos === false) {this.lacteosInput.nativeElement.value = 'No'; } else {this.lacteosInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.frutosSecos === false) {this.frutosSecosInput.nativeElement.value = 'No'; } else {this.frutosSecosInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.apio === false) {this.apioInput.nativeElement.value = 'No'; } else {this.apioInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.mostaza === false) {this.mostazaInput.nativeElement.value = 'No'; } else {this.mostazaInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.sesamo === false) {this.sesamoInput.nativeElement.value = 'No'; } else {this.sesamoInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.sulfitos === false) {this.sulfitosInput.nativeElement.value = 'No'; } else {this.sulfitosInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.altramuz === false) {this.altramuzInput.nativeElement.value = 'No'; } else {this.altramuzInput.nativeElement.value = 'Sí'; }
        if (this.productAllergens.moluscos === false) {this.moluscosInput.nativeElement.value = 'No'; } else {this.moluscosInput.nativeElement.value = 'Sí'; }
        this.inputName = this.productUpdating.name;
        this.selectedCategory = this.productUpdating.category;
        this.items.push(this.selectedCategory);
        this.inputPrice = this.productUpdating.price;
        this.url = this.productUpdating.imageURL;
        this.sawImage = true;
      });
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

  getAllProducts() {
    this.products = [];
    this._dataService.getAllProducts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
          this.products.push(data[i].name);
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

      var flag = false;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i] === this.inputName) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.showToast(0, 'El nombre del producto ya está siendo ocupado, por favor introduzca otro diferente');
      } else {
        if (!this.imgChanged) {
          this.productUpdating.name = this.inputName;
          this.productUpdating.category = this.selectedCategory;
          this.productUpdating.price = this.inputPrice;
          this.productUpdating.imageURL = null;
          this.productUpdating.stock = this.selectedStatus;
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
            this._dataService.updateProduct(this.productUpdating, aux).subscribe(data => {
              this.showToast(1, 'Producto actualizado');
            });
          });
        });
        }
        if (this.allergensFlag) {
          this.productAllergens.productName = this.productUpdating.name;
          this._dataService.updateProductAllergens(this.productAllergens).subscribe(data => {
          });
        }
      }
    } else {
      this.showToast(0, 'Los campos nombre o categoría o precio estaban incompletos, por favor introduce la información correspondiente');
    }
  }

  setAllergen(id, status) {
    this.allergensFlag = true;
    switch (id) {
      case 0:
        if (status === 'No') {this.productAllergens.gluten = false; } else {this.productAllergens.gluten = true; }
        break;
      case 1:
        if (status === 'No') {this.productAllergens.crustaceos = false; } else {this.productAllergens.crustaceos = true; }
        break;
      case 2:
        if (status === 'No') {this.productAllergens.huevos = false; } else {this.productAllergens.huevos = true; }
        break;
      case 3:
        if (status === 'No') {this.productAllergens.pescado = false; } else {this.productAllergens.pescado = true; }
        break;
      case 4:
        if (status === 'No') {this.productAllergens.cacahuetes = false; } else {this.productAllergens.cacahuetes = true; }
        break;
      case 5:
        if (status === 'No') {this.productAllergens.soja = false; } else {this.productAllergens.soja = true; }
        break;
      case 6:
        if (status === 'No') {this.productAllergens.lacteos = false; } else {this.productAllergens.lacteos = true; }
        break;
      case 7:
        if (status === 'No') {this.productAllergens.frutosSecos = false; } else {this.productAllergens.frutosSecos = true; }
        break;
      case 8:
        if (status === 'No') {this.productAllergens.apio = false; } else {this.productAllergens.apio = true; }
        break;
      case 9:
        if (status === 'No') {this.productAllergens.mostaza = false; } else {this.productAllergens.mostaza = true; }
        break;
      case 10:
        if (status === 'No') {this.productAllergens.sesamo = false; } else {this.productAllergens.sesamo = true; }
        break;
      case 11:
        if (status === 'No') {this.productAllergens.sulfitos = false; } else {this.productAllergens.sulfitos = true; }
        break;
      case 12:
        if (status === 'No') {this.productAllergens.altramuz = false; } else {this.productAllergens.altramuz = true; }
        break;
      case 13:
        if (status === 'No') {this.productAllergens.moluscos = false; } else {this.productAllergens.moluscos = true; }
        break;
    }
  }




}
