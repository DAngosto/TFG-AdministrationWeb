//MODULES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//INTERFACES
import { Card } from '../interfaces/Card';
import { Collection } from '../interfaces/Collection';
import { Config } from '../interfaces/Config';
import { GamePlayed } from '../interfaces/GamePlayed';

//SETTINGS
import {AppSettings} from '../AppSettings';
import { Product } from '../interfaces/Product';
import { Category } from '../interfaces/Category';
import { Cafeteria } from '../interfaces/Cafeteria';
import { Order } from '../interfaces/Order';
import { ProductAllergens } from '../interfaces/ProductAllergens';
 
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

    /*
    EN:Function in charge of obtaining all the existing API cards.
    ES:Función encargada de obtener todas las cartas existentes de la API.
    */
    getAllItems(){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get<Card[]>(AppSettings.API_ENDPOINT_ITEMS, { headers: headers });
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

    /*
    EN:Function in charge of obtaining all the existing API collections.
    ES:Función encargada de obtener todas las colecciones existentes de la API.
    */
    getAllItemsCollection(){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get<Collection[]>(AppSettings.API_ENDPOINT_ITEMS, { headers: headers });
    }

    /*
    EN:Function in charge of obtaining all the existing API games played.
    ES:Función encargada de obtener todas las partidas jugadas existentes de la API.
    */
    getAllItemsGamesPlayed(){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get<GamePlayed[]>(AppSettings.API_ENDPOINT_ITEMS, { headers: headers });
    }

    /*
    EN:Function in charge of obtaining a specific item from the API.
    ES:Función encargada de obtener un item en concreto de la API.
    */
    getItem(id){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get(AppSettings.API_ENDPOINT_ITEMS + '/' + id, { headers: headers });
    }

    /*
    EN:Function in charge of deleting a specific item from the API.
    ES:Función encargada de eliminar un item en concreto de la API.
    */
    deleteItem(id){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.delete(AppSettings.API_ENDPOINT_ITEMS + '/' + id, { headers: headers });
    }

    //CARD METHODS///
    /*
    EN:Function in charge of creating the new card in the API.
    ES:Función encargada de realizar la creación de la nueva carta en la API.
    */
    uploadCard(name, history, tags, fileURL){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": name,
                "history": history,
                "tags": tags,
                "fileURL": fileURL,
                "itemType": "0",   //0 = carta , 1 = colección
                "publish": false
        }
        let body= JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_ITEMS + '/',body, { headers: headers });
    }

    createProduct(name, category, price, imageURL, stock) {
        console.log(name);
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

    /*
    EN:Function in charge of updating the information stored in a card in the API.
    ES:Función encargada de actualizar la información almacenada de una carta en la API.
    */
    updateCard(card: Card){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": card.name,
                "history": card.history,
                "tags": card.tags,
                "fileURL": card.fileURL,
                "itemType": "0",   //0 = carta , 1 = colección
                "publish": card.publish
        }
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_ITEMS + '/' + card._id,body, { headers: headers });
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
    

    //COLLECTION METHODS///
    /*
    EN:Function in charge of creating the new collection in the API.
    ES:Función encargada de realizar la creación de la nueva colección en la API.
    */
    uploadCollection(name, gamemode, cards){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        let message = {
                "name": name,
                "cards": cards,
                "gamemode": gamemode, //0 = arcade , 1 = survival
                "itemType": "1",   //0 = carta , 1 = colección
                "publish": false
        }
        let body= JSON.stringify(message);
        return this.http.post(AppSettings.API_ENDPOINT_ITEMS + '/',body, { headers: headers });
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

    updateProduct(product: Product, lastname: string) {
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
        return this.http.put(AppSettings.API_ENDPOINT_ITEMS + '/' + lastname, body, { headers: headers });
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

    deleteProduct(product: Product){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
            console.log(product);
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

    

    /*
    EN:Function in charge of saving a collection so its information can be passed between the components.
    ES:Función encargada de guardar una colección para que entre los componentes puedan pasarse su información.
    */

    /*
    changeCollection(collection: Collection) {
        this.messageSource2.next(collection);
    }

    //CONFIG METHODS///
    /*
    EN:Function in charge of updating the game settings in the API.
    ES:Función encargada de actualizar la configuración del juego en la API.
    */
    updateConfigPoints(gamemode, type, value){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        var message;
        if(gamemode==0){
            if(type==0){
                message = {
                    "arcadesuccesspoints" : value 
                }
            }
            else if(type==1){
                message = {
                    "arcadefailpoints" : value 
                }
            } 
        }
        else if (gamemode==1){
            if(type==2){
                var aux = value;
                if(value<5){
                    aux = 5;
                }
                message = {
                    "survivallives" : aux 
                }
            }
        }
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_CONFIG,body, { headers: headers });
    }

    /*
    EN:Function in charge of getting the game settings in the API.
    ES:Función encargada de obtener la configuración del juego en la API.
    */
    getConfig(){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', authorization);
        return this.http.get(AppSettings.API_ENDPOINT_CONFIG,{ headers: headers });

    }

    /*
    EN:Function in charge of updating the image corresponding to the back of the cards in the game in the API.
    ES:Función encargada de actualizar la imagen correspondiente al dorso de las cartas en el juego en la API.
    */
    updateConfigCardCover(url){
        let userToken= localStorage.getItem('tokenUser');
        let authorization = "Bearer " + userToken;
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'true')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Authorization', authorization);
        var aux = AppSettings.API_ENDPOINT + url;
        var message = {
                    "cardCover" : aux 
                }
        let body= JSON.stringify(message);
        return this.http.put(AppSettings.API_ENDPOINT_CONFIG,body, { headers: headers });
    }

}// END OF DataService