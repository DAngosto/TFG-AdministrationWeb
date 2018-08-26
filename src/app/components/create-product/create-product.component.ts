//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';
import { ProductAllergens } from '../../interfaces/ProductAllergens';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  selectedFile: File = null;
  inputName = '';
  inputCategory = '';
  inputPrice: number;
  url = '';
  prevImage = false;

  items: String[] = [];

  aux: Product;

  sawImage = true;


  selectedStatus: number;

  selectedCategory: String;

  productAllergens: ProductAllergens;


  products: String[] = [];


  @ViewChild('stockInput') stockStatusInput: ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef;


  constructor(private _dataService: DataService, private ng2ImgToolsService: Ng2ImgToolsService, 
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllCategories();
    this.getAllProducts();
    this.productAllergens =  this.setProductAllergens(0,'',false,false,false,false,false,false,false,false,false,false,false,false,false,false);

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
      if (this.items.length > 0) {this.selectedCategory = this.items[0]; }
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
  EN:Function in charge of storing the selected image to be the corresponding one in the new Card and preview it on the screen.
  ES:Función encargada de almacenar la imagen seleccionada para ser la correspondiente de la nueva Carta y previsualizarla en la pantalla.
  */
  onFileSelected(event){
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File> event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
        this.prevImage = true;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.url = reader.result;
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

  setAllergen(id, status) {
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

  setCategory(categoryname) {
    this.selectedCategory = categoryname;
  }

  /*
  EN:Function in charge of creating the new card in the API.
  ES:Función encargada de realizar la creación de la nueva carta en la API.
  */
  uploadProduct() {
    if (this.selectedFile) {
      if ((this.inputName !== '') && (this.selectedCategory !== null) && (this.inputPrice !== NaN)) {
        var aux = this.selectedFile.name.split('.');
        var fileName = this.inputName + '.' + aux[1];
        var aux2 = "web_" + fileName;
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
          const fd = new FormData();
            fd.append('File', this.selectedFile, fileName);
            this._dataService.uploadProductFile(fd).subscribe(data => {
            const fileURL = data['file'];
            this._dataService.createProduct(this.inputName, this.selectedCategory, this.inputPrice,
                                            fileURL, this.selectedStatus).subscribe(data => {
              this.showToast(1, 'Producto creado');
              this.productAllergens.productName = this.inputName;
              this._dataService.createProductAllergens(this.productAllergens).subscribe(data => {

                const fd2 = new FormData();
                this.ng2ImgToolsService.resizeExactCrop([this.selectedFile], 50, 50).subscribe(result => {
                  fd2.append('File', result, aux2);
                  this._dataService.uploadProductFile(fd2).subscribe(data => {
                  });
                });
              });
            });
          });
        }
      } else {
        this.showToast(0, 'Los campos nombre o precio estaban incompletos, por favor introduce la información correspondiente');
      }
    } else {
      this.showToast(0, '¡Selecciona una imagen antes de intentar crear un nuevo producto!');
    }
  }

  setProductAllergens(id,productName,gluten,crustaceos,huevos,pescado,cacahuetes,soja,lacteos,frutosSecos,apio,mostaza,sesamo,sulfitos,altramuz,moluscos) : ProductAllergens{
    var aux: ProductAllergens = {id,productName,gluten,crustaceos,huevos,pescado,cacahuetes,soja,lacteos,frutosSecos,apio,mostaza,sesamo,sulfitos,altramuz,moluscos};
    aux.gluten = gluten;
    aux.crustaceos = crustaceos;
    aux.huevos = huevos;
    aux.pescado = pescado;
    aux.soja = soja;
    aux.lacteos = lacteos;
    aux.frutosSecos = frutosSecos;
    aux.apio = apio;
    aux.mostaza = mostaza;
    aux.sesamo = sesamo;
    aux.sulfitos = sulfitos;
    aux.altramuz = altramuz;
    aux.moluscos = moluscos;
    return aux;
}

}
