import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ToastController } from '@ionic/angular';

export interface Item{
  id: number,
  product_id: number,
  amount: number,
  name: string,
  total_price: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Item[] = [];

  constructor(private itemsService: ItemsService, public toastController: ToastController) { }

  ngOnInit() {
    this.itemsService.getList().subscribe( (items: Item[]) => {
      this.items = items;
    });
  }

  ionViewWillEnter(){
    this.itemsService.getList().subscribe( (items: Item[]) => {
      this.items = items;
    });
  }

  delete(item: Item){
    this.itemsService.deleteItem(item.id).subscribe((data: any)=>{
      if(data.status == 'success'){
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } else {
        this.presentToast('Aquest item no existeix');
      }
    });
  }

  forceError(){
    this.delete({
      id: -1,
      product_id: -1,
      amount: -1,
      name: '',
      total_price: -1
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
