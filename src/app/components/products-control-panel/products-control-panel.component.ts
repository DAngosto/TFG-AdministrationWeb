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
import { ProductAllergens } from '../../interfaces/ProductAllergens';

@Component({
  selector: 'app-products-control-panel',
  templateUrl: './products-control-panel.component.html',
  styleUrls: ['./products-control-panel.component.css']
})
export class ProductsControlPanelComponent implements OnInit {

  itemsTable: Observable<Product[]>;

  items: Product[] = [];

  inputSearch = '';
  url: any;
  nameDisplay: any;
  historyDisplay: any;
  tagsDisplay: any;
  visualizeImage = false;

  productAllergensDisplay: ProductAllergens;

  gluten: string="";
  crustaceos: string="";
  huevos: string="";
  pescado: string="";
  soja: string="";
  lacteos: string="";
  frutosSecos: string="";
  apio: string="";
  mostaza: string="";
  sesamo: string="";
  sulfitos: string="";
  altramuz: string="";
  moluscos: string="";
  cacahuetes: string="";




  constructor(private _dataService: DataService,  private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
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
  EN:Function in charge of getting all the existing cards.
  ES:Función encargada de obtener todas las cartas existentes.
  */

  getAllProducts() {
    this.clearData();
    this._dataService.getAllProducts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
              var aux = data[i].imageURL.split('/');
              data[i].imageURL = AppSettings.API_ENDPOINT + aux[0] + '/' + aux[1] + '/web_' +  aux[2] + '.';
          this.items.push(data[i]);
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No hay productos almacenados actualmente');
      } else {
        this.productAllergensDisplay = this.setProductAllergens(0,'',false,false,false,false,false,false,false,false,false,false,false,false,false,false);
        this.gluten= AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/gluten.png.';
        this.crustaceos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/crustaceos.png.';
        this.huevos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/huevos.png.';
        this.pescado=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/pescado.png.';
        this.soja=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/soja.png.';
        this.lacteos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/lacteos.png.';
        this.frutosSecos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/frutosSecos.png.';
        this.apio=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/apio.png.';
        this.mostaza=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/mostaza.png.';
        this.sesamo=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/sesamo.png.';
        this.sulfitos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/sulfitos.png.';
        this.altramuz=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/altramuz.png.';
        this.moluscos=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/moluscos.png.';
        this.cacahuetes=AppSettings.API_ENDPOINT_FILES_PRODUCTS + '/cacahuetes.png.';
      }
    });
  }

  

  /*
  EN:Function in charge of performing a specific search obtaining those cards that have the tag entered.
  ES:Función encargada de realizar una búsqueda específica obteniendo aquellas cartas que tengan la etiqueta introducida.
  */
  getSpecificItems(category) {
    this.clearData();
    const categoryLowerCase = category.toLowerCase();
    this._dataService.getAllProducts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
            if (data[i].category.toLowerCase() === categoryLowerCase) {
              var aux = data[i].imageURL.split('/');
              data[i].imageURL = AppSettings.API_ENDPOINT + aux[0] + '/' + aux[1] + '/web_' +  aux[2] + '.';
              this.items.push(data[i]);
              break;
            }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No hay productos almacenados actualmente');
      }
    });
  }

  /*
  EN:Function in charge of passing the data of the card to be updated to the service and performing the redirection.
  ES:Función encargada de pasar los datos de la carta a actualizar al servicio y realizar la redirección.
  */
  updateProduct(id) {
    this._dataService.changeProduct(this.items[id]);
    this.router.navigate(['/updateProduct']);
  }

  swapStockStatus(id) {
    if (this.items[id].stock === 0) {
      this.items[id].stock = 1;
      this._dataService.updateProductStockStatus(this.items[id]).subscribe(data => {
        this.showToast(1, 'Producto actualizado');
      });
    } else {
      this.items[id].stock = 0;
      this._dataService.updateProductStockStatus(this.items[id]).subscribe(data => {
        this.showToast(1, 'Producto actualizado');
      });
    }
  }

  /*
  EN:Function in charge of making the call for the deletion of a letter.
  ES:Función encargada de realizar la llamada para la eliminación de una carta.
  */
  deleteProduct(id) {
    this._dataService.deleteProduct(this.items[id]).subscribe(data => {
      this.showToast(1, 'Producto eliminado');
      this.getAllProducts();
    });
  }

  /*
  EN:Function in charge of emptying the items stored in the component.
  ES:Función encargada de vaciar los items almacenados en el componente.
  */
  clearData() {
    this.items = [];
  }

  /*
  EN:Function in charge of performing a specific search or displaying all existing cards.
  ES:Función encargada de realizar una búsqueda específica o mostrar todas las cartas existentes.
  */
  doSpecificSearch() {
    if (this.inputSearch === '') {
      this.getAllProducts();
    } else {
      this.getSpecificItems(this.inputSearch);
    }
  }

  sawProductAllergens(id) {
    this.productAllergensDisplay = this.setProductAllergens(0,'',false,false,false,false,false,false,false,false,false,false,false,false,false,false);
    this._dataService.getProductAllergens(this.items[id].name).subscribe(data => {
      this.productAllergensDisplay = data;
    });
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
