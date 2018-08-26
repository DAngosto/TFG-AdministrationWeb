// MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';

// SERVICES
import { DataService } from '../../services/data.service';

// INTERFACES

// SETTINGS
import {AppSettings} from '../../AppSettings';
import { Product } from '../../interfaces/Product';

import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Category } from '../../interfaces/Category';
import { Banner } from '../../interfaces/banner';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent implements OnInit {

  bannerUpdating: Banner;
  selectedFile: File = null;
  inputName = '';
  inputCategory = '';
  inputPrice: number;
  url = '';
  sawImage = false;
  imgChanged = false;

  banners: String[] = [];


  selectedStatus: number;

  selectedCategory: string;




  constructor(private _dataService: DataService, private router: Router, public toastr: ToastsManager,
              vcr: ViewContainerRef, private ng2ImgToolsService: Ng2ImgToolsService) {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
    this.getBannerForUpdate();
    this.getAllBanners();
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
  getBannerForUpdate() {
    this._dataService.currentBannerWatching.subscribe(bannerUpdating => this.bannerUpdating = bannerUpdating);
    if (!this.bannerUpdating) {
      this.router.navigate(['/bannersCP']);
    } else {
      this.inputName = this.bannerUpdating.name;
      this.url = AppSettings.API_ENDPOINT +  this.bannerUpdating.url + '.';
      this.sawImage = true;
    }
  }

  getAllBanners() {
    this._dataService.getAllBanners().subscribe(data => {
      this.banners = [];
      for (let i = 0; i < data.length; i++) {
        this.banners.push(data[i].name);
      }
      if(this.banners.length === 0) {
        this.showToast(1, 'No hay letreros almacenados actualmente');
      }
    });
  }

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


  /*
  EN:Function in charge of updating the information of the selected card.
  ES:Función encargada de actualizar la información de la carta seleccionada.
  */
 updateBanner() {
  if (this.bannerUpdating || this.inputName !== '') {
    const aux = this.bannerUpdating.name;

    var flag = false;
    if (this.bannerUpdating.name !== this.inputName) {
    for (let i = 0; i < this.banners.length; i++) {
      if (this.banners[i] === this.inputName) {
        flag = true;
        break;
      }
    }
    }
    if (flag) {
      this.showToast(0, 'El nombre del letrero ya está siendo ocupado, por favor introduzca otro diferente');
    } else {
      if (!this.imgChanged) {
        this.bannerUpdating.name = this.inputName;
        this._dataService.updateBanner(this.bannerUpdating).subscribe(data => {
          this.showToast(1, 'Letrero actualizado');
        });
      } else {

        var aux3 = this.selectedFile.name.split('.');
        var fileName = this.inputName + '.' + aux3[1];
        var aux2 = "web_" + fileName;

        const fd = new FormData();
        fd.append('File', this.selectedFile, fileName);
        this._dataService.uploadProductFile(fd).subscribe(data => {
          const fileURL = data['file'];
          this.bannerUpdating.name = this.inputName;
          this.bannerUpdating.url = fileURL;
          this._dataService.updateBanner(this.bannerUpdating).subscribe(data => {
            this.showToast(1, 'Letrero actualizado');
          });
        });
      }
    }
  } else {
    this.showToast(0, 'Los campos nombre o categoría o precio estaban incompletos, por favor introduce la información correspondiente');
  }
}

}
