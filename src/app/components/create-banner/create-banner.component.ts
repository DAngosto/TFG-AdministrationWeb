//MODULES
import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

//SERVICES
import { DataService } from '../../services/data.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {

  selectedFile: File = null;
  inputName = '';
  inputCategory = '';
  inputPrice: number;
  url: string = "";
  prevImage: boolean = false;


  banners: String[] = [];

  aux: Product;

  sawImage = true;


  selectedStatus: number;

  selectedCategory: string;



  constructor(private _dataService: DataService, private ng2ImgToolsService: Ng2ImgToolsService, 
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllBanners();
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


  uploadBanner() {
    if (this.selectedFile) {
      if (this.inputName !== '') {
        var aux = this.selectedFile.name.split('.');
        var fileName = this.inputName + '.' + aux[1];
        var flag = false;
        for (let i = 0; i < this.banners.length; i++) {
          if (this.banners[i] === this.inputName) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.showToast(0, 'El nombre del letrero ya está siendo ocupado, por favor introduzca otro diferente');
        } else {
          const fd = new FormData();
            fd.append('File', this.selectedFile, fileName);
            this._dataService.uploadProductFile(fd).subscribe(data => {
            const fileURL = data['file'];
            this._dataService.createBanner(this.inputName, fileURL, 0).subscribe(data => {
              this.showToast(1, 'Letrero creado');
            });
          });
        }
      } else {
        this.showToast(0, 'El campo nombre estaba incompletos, por favor introduce la información correspondiente');
      }
    } else {
      this.showToast(0, '¡Selecciona una imagen antes de intentar crear un nuevo letrero!');
    }
  }


}
