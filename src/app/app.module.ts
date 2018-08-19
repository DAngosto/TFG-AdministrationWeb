//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgToolsModule } from 'ng2-img-tools'; 

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'; 
import { CardsControlPanelComponent } from './components/cards-control-panel/cards-control-panel.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { CollectionsControlPanelComponent } from './components/collections-control-panel/collections-control-panel.component';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { UpdateCollectionComponent } from './components/update-collection/update-collection.component';
import { GameConfigurationPanelComponent } from './components/game-configuration-panel/game-configuration-panel.component';
import { AllStatisticsComponent } from './components/all-statistics/all-statistics.component';
import { AllStatisticsCollectionComponent } from './components/all-statistics-collection/all-statistics-collection.component';

//SERVICES
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';

//GUARDS
import { AuthGuard } from './auth.guard';
import { ProductsControlPanelComponent } from './components/products-control-panel/products-control-panel.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { CategoryControlPanelComponent } from './components/category-control-panel/category-control-panel.component';
import { CafeteriaControlPanelComponent } from './components/cafeteria-control-panel/cafeteria-control-panel.component';
import { CreateCafeteriaComponent } from './components/create-cafeteria/create-cafeteria.component';
import { UpdateCafeteriaComponent } from './components/update-cafeteria/update-cafeteria.component';
import { OrdersControlPanelComponent } from './components/orders-control-panel/orders-control-panel.component';




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: MenuComponent },
  { path: 'productsCP',  canActivate: [AuthGuard], component: ProductsControlPanelComponent },
  { path: 'newProduct', canActivate: [AuthGuard], component: CreateProductComponent },
  { path: 'updateProduct', canActivate: [AuthGuard], component: UpdateProductComponent },
  { path: 'categoriesCP',  canActivate: [AuthGuard], component: CategoryControlPanelComponent },
  { path: 'newCategory', canActivate: [AuthGuard], component: CreateCategoryComponent },
  { path: 'updateCategory', canActivate: [AuthGuard], component: UpdateCategoryComponent },
  { path: 'cafeteriasCP',  canActivate: [AuthGuard], component: CafeteriaControlPanelComponent },
  { path: 'newCafeteria', canActivate: [AuthGuard], component: CreateCafeteriaComponent },
  { path: 'updateCafeteria', canActivate: [AuthGuard], component: UpdateCafeteriaComponent },
  { path: 'ordersCP',  canActivate: [AuthGuard], component: OrdersControlPanelComponent },
  { path: 'collectionsCP', canActivate: [AuthGuard], component: CollectionsControlPanelComponent },
  { path: 'newCollection', canActivate: [AuthGuard], component: CreateCollectionComponent },
  { path: 'updateCollection', canActivate: [AuthGuard], component: UpdateCollectionComponent },
  { path: 'GameConfigCP', canActivate: [AuthGuard], component: GameConfigurationPanelComponent },
  { path: 'AllStatisticsCollection', canActivate: [AuthGuard], component: AllStatisticsCollectionComponent },
  { path: 'AllStatistics', canActivate: [AuthGuard], component: AllStatisticsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CreateCardComponent,
    NavBarComponent,
    CardsControlPanelComponent,
    UpdateCardComponent,
    CollectionsControlPanelComponent,
    CreateCollectionComponent,
    UpdateCollectionComponent,
    GameConfigurationPanelComponent,
    AllStatisticsComponent,
    AllStatisticsCollectionComponent,
    ProductsControlPanelComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryControlPanelComponent,
    CafeteriaControlPanelComponent,
    CreateCafeteriaComponent,
    UpdateCafeteriaComponent,
    OrdersControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2ImgToolsModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }) 
  ],
  providers: [AuthenticationService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
