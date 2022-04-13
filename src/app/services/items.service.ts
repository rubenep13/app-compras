import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../pages/home/home.page';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(environment.apiUrl+'/items');
  }

  deleteItem(id: number){
    return this.http.delete(environment.apiUrl+'/items/delete/'+id);
  }

  addItem(item: any){
    return this.http.post(environment.apiUrl+'/items/add', item);
  }
}
