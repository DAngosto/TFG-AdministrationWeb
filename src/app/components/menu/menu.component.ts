//MODULES
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//SERVICES
import { DataService } from '../../services/data.service';
import { Product } from '../../interfaces/Product';

declare var Morris:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  actualUsersNumber: number;
  actualProductsNumber: number;
  actualProductsWithStockNumber: number;
  actualOrdersNumber: number;
  actualCafeteriasNumber: number;
  actualWorkersNumber: number;
  actualAppusersNumber: number;
  actualAdminsNumber: number;
  actualAlertsNumber: number;
  actualProductsWithNoStockNumber: number;
  actualOrdersStatus0Number: number;
  actualOrdersStatus1Number: number;
  actualOrdersStatus2Number: number;
  actualOrdersStatus3Number: number;
  actualOrdersStatus4Number: number;


  constructor(private _dataService: DataService, private router:Router) { }

  ngOnInit() {
    this.getAllItems();
  }

  /*
  EN:Function in charge of getting all the existing cards.
  ES:Función encargada de obtener todos los items existentes.
  */
 
  getAllItems() {
    this.cleanData();
    this._dataService.getAllProducts().subscribe(products => {
      this.actualProductsNumber = products.length;
      for (let i = 0; i < products.length; i++) {
          if (products[i].stock !== 0) {
            this.actualProductsWithStockNumber += 1;
          } else {
            this.actualProductsWithNoStockNumber += 1;
          }
      }
      this._dataService.getAllUsers().subscribe(users => {
          this.actualUsersNumber = users.length;
          for (let i = 0; i < users.length; i++) {
            if (users[i].userRoleId == '2') {
              this.actualWorkersNumber += 1;
            } else if (users[i].userRoleId == '1') {
                this.actualAppusersNumber += 1;
            } else if (users[i].userRoleId == '3') {
              this.actualAdminsNumber += 1;
            }
          }
          this._dataService.getAllOrders().subscribe(orders => {
            this.actualOrdersNumber = orders.length;
            for (let i = 0; i < orders.length; i++) {
              if (orders[i].status === 0) {
                this.actualOrdersStatus0Number += 1;
              } else if (orders[i].status === 1) {
                  this.actualOrdersStatus1Number += 1;
              } else if (orders[i].status === 2) {
                this.actualOrdersStatus2Number += 1;
              } else if (orders[i].status === 3) {
                this.actualOrdersStatus3Number += 1;
              } else if (orders[i].status === 4) {
                this.actualOrdersStatus4Number += 1;
              }
            }
            this._dataService.getAllOrderAlerts().subscribe(alerts => {
              this.actualAlertsNumber = alerts.length;
              this.loadStatistics();
            });
          });
      });
    });
  }

  /*
  EN:Function in charge of deleting the data shown in the charts.
  ES:Función encargada de eliminar los datos mostrados en las gráficas.
  */
  cleanCharts() {
    $('#morris-donut-chart-usersregistered').empty();
    $('#morris-bar-chart-productsvs').empty();
    $('#morris-donut-chart-mostusedjokers').empty();
  }

  /*
  EN:Function in charge of entering the corresponding data in the charts.
  ES:Función encargada de introducir los datos corrspondientes en las gráficas.
  */
  loadStatistics() {
    this.cleanCharts();
    Morris.Donut({
      element: 'morris-donut-chart-usersregistered',
      data: [
        {label: 'Usuarios de la Aplicación', value: this.actualAppusersNumber},
        {label: 'Trabajadores', value: this.actualWorkersNumber},
        {label: 'Administradores', value: this.actualAdminsNumber}
      ]
    });

    Morris.Bar({
      element: 'morris-bar-chart-productsvs',
      data: [
        { y: 'Total de productos: ' + this.actualProductsNumber,
        a: this.actualProductsWithStockNumber, b: this.actualProductsWithNoStockNumber },
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Disponibles', 'No Disponibles']
    });

    Morris.Donut({
      element: 'morris-donut-chart-ordersdistribution',
      data: [
        {label: 'Pendiente de Aceptación', value: this.actualOrdersStatus0Number},
        {label: 'En proceso', value:  this.actualOrdersStatus1Number},
        {label: 'Pediente de Pagar y Recoger por Cliente', value:  this.actualOrdersStatus2Number},
        {label: 'Cliente nunca apareció', value:  this.actualOrdersStatus3Number},
        {label: 'Finalizado', value:  this.actualOrdersStatus4Number}
      ]
    });
  }


  cleanData() {
    this.actualProductsNumber = 0;
    this.actualProductsWithStockNumber = 0;
    this.actualUsersNumber = 0;
    this.actualOrdersNumber = 0;
    this.actualCafeteriasNumber = 0;
    this.actualWorkersNumber = 0;
    this.actualAppusersNumber = 0;
    this.actualAdminsNumber = 0;
    this.actualAlertsNumber = 0;
    this.actualProductsWithNoStockNumber = 0;
    this.actualOrdersStatus0Number = 0;
    this.actualOrdersStatus1Number = 0;
    this.actualOrdersStatus2Number = 0;
    this.actualOrdersStatus3Number = 0;
    this.actualOrdersStatus4Number = 0;
  }

}/// END OF COMPONENT MenuComponent ///
