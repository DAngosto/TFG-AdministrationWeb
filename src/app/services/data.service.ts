//MODULES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//INTERFACES

//SETTINGS
import {AppSettings} from '../AppSettings';
import { Product } from '../interfaces/Product';
import { Category } from '../interfaces/Category';
import { Cafeteria } from '../interfaces/Cafeteria';
import { Order } from '../interfaces/Order';
import { ProductAllergens } from '../interfaces/ProductAllergens';
import { Review } from '../interfaces/Review';
import { UserSavedOrder } from '../interfaces/UserSavedOrder';
import { UserRole } from '../interfaces/UserRole';
import { User } from '../interfaces/User';
import { WorkingPermit } from '../interfaces/WorkingPermit';
import { OrderAlert } from '../interfaces/OrderAlert';
 
@Injectable()
export class DataService {
    
    product: Product;
    private messageSource = new BehaviorSubject<Product>(this.product);
    currentProductUpdating = this.messageSource.asObservable();

    category: Category;
    private messageSource2 = new BehaviorSubject<Category>(this.category);
    currentCategoryUpdating = this.messageSource2.asObservable();

    cafeteria: Cafeteria;
    private messageSource3 = new BehaviorSubject<Cafeteria>(this.cafeteria);
    currentCafeteriaUpdating = this.messageSource3.asObservable();

    userRole: UserRole;
    private messageSource4 = new BehaviorSubject<UserRole>(this.userRole);
    currentUserRoleUpdating = this.messageSource4.asObservable();

    user: User;
    private messageSource5 = new BehaviorSubject<User>(this.user);
    currentUserUpdating = this.messageSource5.asObservable();

    order: Order;
    private messageSource6 = new BehaviorSubject<Order>(this.order);
    currentOrderWatching = this.messageSource6.asObservable();

    

    constructor(private http:HttpClient) {}

    //COMMON METHODS///
    /*
    EN:Function in charge of uploading a file to the API.
    ES:Función encargada de subir un fichero al API.
    */
    uploadProductFile(fd:FormData){
        let userToken= localStorage.getItem('tokenUser');
        let body= fd;
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders().set('Authorization', authorization);
        console.log(fd);

        /*
        let message = {
            "File": fd
        }
        */
        //let body= JSON.stringify(message)
        //console.log(message);
		return this.http.post(AppSettings.API_ENDPOINT_FILES_PRODUCTS, body, { headers: headers });
    }

    uploadUserFile(fd:FormData){
        let userToken= localStorage.getItem('tokenUser');
        let body= fd;
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders().set('Authorization', authorization);
		return this.http.post(AppSettings.API_ENDPOINT_FILES_USERS, body, { headers: headers });
    }

    
    getAllProducts(){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<Product[]>(AppSettings.API_ENDPOINT_ITEMS, { headers: headers });
    }

    getAllCategories() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<Category[]>(AppSettings.API_ENDPOINT_CATEGORIES, { headers: headers });
    }

    getAllCafeterias() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<Cafeteria[]>(AppSettings.API_ENDPOINT_CAFETERIAS, { headers: headers });
    }

    getAllOrders() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<Order[]>(AppSettings.API_ENDPOINT_ORDERS, { headers: headers });
    }

    getProductAllergens(productName: string) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<ProductAllergens>(AppSettings.API_ENDPOINT_PRODUCTALLERGENS + '/' + productName, { headers: headers });
    }

    getAllReviews() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<Review[]>(AppSettings.API_ENDPOINT_REVIEWS, { headers: headers });
    }

    getAllUserSavedOrders() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<UserSavedOrder[]>(AppSettings.API_ENDPOINT_USERSAVEDORDERS, { headers: headers });
    }

    getAllUserRoles() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<UserRole[]>(AppSettings.API_ENDPOINT_USERSROLES, { headers: headers });
    }

    getAllUsers() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<User[]>(AppSettings.API_ENDPOINT_USERS, { headers: headers });
    }

    getAllUsersByRole(id) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<User[]>(AppSettings.API_ENDPOINT_USERSBYROLEID + '/' + id, { headers: headers });
    }

    getUserByEmail(email) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<User>(AppSettings.API_ENDPOINT_USERS + '/' + email + '.', { headers: headers });
    }

    getUserById(id) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<User>(AppSettings.API_ENDPOINT_USERSBYID + '/' + id, { headers: headers });
    }

    getRoleByName(name) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<UserRole>(AppSettings.API_ENDPOINT_USERSROLES + '/' + name, { headers: headers });
    }

    getAllWorkingPermitsOfUser(userid) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<WorkingPermit[]>(AppSettings.API_ENDPOINT_WORKINGPERMITS + '/' + userid, { headers: headers });
    }

    getAllWorkingPermits() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.get<WorkingPermit[]>(AppSettings.API_ENDPOINT_WORKINGPERMITS, { headers: headers });
    }

    /*
    EN:Function in charge of obtaining a specific item from the API.
    ES:Función encargada de obtener un item en concreto de la API.
    */
    getProductByName(name){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get<Product>(AppSettings.API_ENDPOINT_ITEMS + '/' + name, { headers: headers });
    }

    getAllOrderAlerts() {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get<OrderAlert[]>(AppSettings.API_ENDPOINT_ORDERALERTS, { headers: headers });
    }


    createProduct(name, category, price, imageURL, stock) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "name": name,
            "category": category,
            "stock": stock,
            "price": price,
            'imageURL': imageURL
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_ITEMS , body, { headers: headers });
    }

    createCategory(name) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "name": name
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_CATEGORIES , body, { headers: headers });
    }

    createCafeteria(campusName, location) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            'campusName': campusName,
            'location': location
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_CAFETERIAS , body, { headers: headers });
    }

    createProductAllergens(productAllergens: ProductAllergens) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "productName": productAllergens.productName,
            "gluten": productAllergens.gluten,
            "crustaceos": productAllergens.crustaceos,
            "huevos": productAllergens.huevos,
            "pescado": productAllergens.pescado,
            "cacahuetes": productAllergens.cacahuetes,
            "soja": productAllergens.soja,
            "lacteos": productAllergens.lacteos,
            "frutosSecos": productAllergens.frutosSecos,
            "apio": productAllergens.apio,
            "mostaza": productAllergens.mostaza,
            "sesamo": productAllergens.sesamo,
            "sulfitos": productAllergens.sulfitos,
            "altramuz": productAllergens.altramuz,
            "moluscos": productAllergens.moluscos
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_PRODUCTALLERGENS , body, { headers: headers });
    }

    createUserRole(name, description) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            'name': name,
            'description': description
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_USERSROLES , body, { headers: headers });
    }

    createWorkerTeam(email, pwd, role) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "email": email,
            "hashedPassword": pwd,
            "firstName": ' ',
            "lastName": ' ',
            "imageURL": 'files/users/default.png',
            "userRoleId": role
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_USERS , body, { headers: headers });
    }

    createWorkingPermit(idUser, idCafeteria) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "userId": idUser,
            "cafeteriaId": idCafeteria
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_WORKINGPERMITS , body, { headers: headers });
    }

    createAlertOrder(userEmail, orderId) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "userEmail": userEmail,
            "orderId": orderId
        };
        let body = JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_ORDERALERTS , body, { headers: headers });
    }

    /*
    EN:Function in charge of saving a card so its information can be passed between the components.
    ES:Función encargada de guardar una carta para que entre los componentes puedan pasarse su información.
    */
    changeProduct(product: Product) {
        this.messageSource.next(product);
    }

    changeCategory(category: Category) {
        this.messageSource2.next(category);
    }

    changeCafeteria(cafeteria: Cafeteria) {
        this.messageSource3.next(cafeteria);
    }

    changeUserRole(userRole: UserRole) {
        this.messageSource4.next(userRole);
    }

    changeUser(user: User) {
        this.messageSource5.next(user);
    }

    changeOrder(order: Order) {
        this.messageSource6.next(order);
    }



    updateProductStockStatus(product: Product) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": product.name,
                "category": product.category,
                "stock": product.stock,
                "price": product.price
        };
        console.log(message);
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_ITEMS + '/' + product.name, body, { headers: headers });
    }

    updateProduct(product: Product, firstname: string) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": product.name,
                "category": product.category,
                "stock": product.stock,
                "price": product.price,
                'imageURL': product.imageURL
        };
        console.log(message);
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_ITEMS + '/' + firstname, body, { headers: headers });
    }

    updateCategory(category: Category) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": category.name
        };
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_CATEGORIES + '/' + category.id, body, { headers: headers });
    }

    updateCafeteria(cafeteria: Cafeteria) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "campusName": cafeteria.campusName,
                'location': cafeteria.location
        };
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_CAFETERIAS + '/' + cafeteria.id, body, { headers: headers });
    }

    updateProductAllergens(productAllergens: ProductAllergens) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
            "productName": productAllergens.productName,
            "gluten": productAllergens.gluten,
            "crustaceos": productAllergens.crustaceos,
            "huevos": productAllergens.huevos,
            "pescado": productAllergens.pescado,
            "cacahuetes": productAllergens.cacahuetes,
            "soja": productAllergens.soja,
            "lacteos": productAllergens.lacteos,
            "frutosSecos": productAllergens.frutosSecos,
            "apio": productAllergens.apio,
            "mostaza": productAllergens.mostaza,
            "sesamo": productAllergens.sesamo,
            "sulfitos": productAllergens.sulfitos,
            "altramuz": productAllergens.altramuz,
            "moluscos": productAllergens.moluscos
        };
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_PRODUCTALLERGENS + '/' + productAllergens.productName, body, { headers: headers });
    }

    updateUserRole(userRole: UserRole, firstName: string) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": userRole.name,
                'description': userRole.description
        };
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_USERSROLES + '/' + firstName, body, { headers: headers });
    }

    updateOrder(order: Order, id) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "status": order.status
        };
        let body= JSON.stringify(message);
        return this.http.put<Order>(AppSettings.API_ENDPOINT_ORDERS + '/' + id, body, { headers: headers });
    }

    updateOrderAlertContactedStatus(id) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "contacted": true
        };
        let body= JSON.stringify(message);
        return this.http.put<OrderAlert>(AppSettings.API_ENDPOINT_ORDERALERTS + '/' + id, body, { headers: headers });
    }

    deleteProduct(product: Product){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_ITEMS + '/' + product.name, { headers: headers });
    }

    deleteCategory(category: Category){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_CATEGORIES + '/' + category.id, { headers: headers });
    }

    deleteCafeteria(cafeteria: Cafeteria){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_CAFETERIAS + '/' + cafeteria.id, { headers: headers });
    }

    deleteUserRole(name){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_USERSROLES + '/' + name, { headers: headers });
    }

    deleteUser(name){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_USERS + '/' + name + '.', { headers: headers });
    }

    deleteWorkingPermit(id){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_WORKINGPERMITS + '/' + id, { headers: headers });
    }

    deleteOrderAlert(id) {
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_ORDERALERTS + '/' + id, { headers: headers });
    }

}// END OF DataService