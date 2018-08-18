//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';

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
  url: string = "";
  prevImage: boolean = false;

  items: String[] = [];

  aux: Product;

  sawImage = true;


  selectedStatus: number;

  selectedCategory: string;

  @ViewChild('stockInput') stockStatusInput: ElementRef;
  @ViewChild('categoryInput') categoryInput: ElementRef;


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

  setCategory(categoryname) {
    this.selectedCategory = categoryname;
  }

  /*
  EN:Function in charge of creating the new card in the API.
  ES:Función encargada de realizar la creación de la nueva carta en la API.
  */
  uploadProduct() {
    if (this.selectedFile) {
      if((this.inputName !== '') && (this.selectedCategory !== '') && (this.inputPrice !== NaN)) {
        const fd = new FormData();
        console.log(this.selectedFile);
        this.ng2ImgToolsService.resizeExactCrop([this.selectedFile], 50, 50).subscribe(result => {
          fd.append('File', result, this.selectedFile.name);
          this._dataService.uploadProductFile(fd).subscribe(data => {
          const fileURL = data['file'];
          /*
          this.aux.name = this.inputName;
          this.aux.category = this.inputCategory;
          this.aux.price = this.inputPrice;
          this.aux.imageURL = fileURL;
          this.aux.stock = this.selectedStatus;
          console.log(this.aux);
          */
          this._dataService.createProduct(this.inputName, this.selectedCategory, this.inputPrice, 
                                          fileURL, this.selectedStatus).subscribe(data => {
            this.showToast(1, 'Producto creado');
          });
        });
      });
      } else{
        this.showToast(0, 'Los campos nombre o historia estaban incompletos, por favor introduce la información correspondiente');
      }
    } else {
      this.showToast(0, '¡Selecciona una imagen antes de intentar crear un nuevo producto!');
    }
  }

}
