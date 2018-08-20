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
          data[i].imageURL = AppSettings.API_ENDPOINT + data[i].imageURL + '.';
          this.items.push(data[i]);
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No hay productos almacenados actualmente');
      } else {
        this.productAllergensDisplay = this.setProductAllergens(0,'',false,false,false,false,false,false,false,false,false,false,false,false,false,false);
        this.gluten='../../assets/images/gluten.png';
        this.crustaceos='../../assets/images/crustaceos.png';
        this.huevos='../../assets/images/huevos.png';
        this.pescado='../../assets/images/pescado.png';
        this.soja='../../assets/images/soja.png';
        this.lacteos='../../assets/images/lacteos.png';
        this.frutosSecos='../../assets/images/frutosSecos.png';
        this.apio='../../assets/images/apio.png';
        this.mostaza='../../assets/images/mostaza.png';
        this.sesamo='../../assets/images/sesamo.png';
        this.sulfitos='../../assets/images/sulfitos.png';
        this.altramuz='../../assets/images/altramuz.png';
        this.moluscos='../../assets/images/moluscos.png';
        this.cacahuetes='../../assets/images/cacahuetes.png';
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
              data[i].imageURL = AppSettings.API_ENDPOINT + data[i].imageURL + '.';
              this.items.push(data[i]);
              break;
            }
      }
      if (this.items.length === 0) {
        this.showToast(2, 'No hay cartas creadas con la etiqueta especificada');
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
