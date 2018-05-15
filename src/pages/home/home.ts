import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';

import { AddItemPage} from "../add-item/add-item";
import {ItemDetailPage} from "../item-detail/item-detail";
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];
  constructor(public navCtrl: NavController,
  // public actionSheetCtrl: ActionSheetController,
  // public alertCtrl:AlertController,
  public modalCtrl: ModalController,
  public dataService:DataProvider
  ) {
    this.dataService.getData().then((todos)=>{
      if(todos){
        this.items = todos;
      }
    })
  }
  public ionViewDidLoad(){
    // this.items = [
    //   {title: 'hi1', description: 'test1'},
    //   {title: 'hi2', description: 'test2'},
    //   {title: 'hi3', description: 'test3'}
    // ];
  }

  public addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item)=>{
      if(item){
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  public viewItem(item){
    console.dir(item);
    this.navCtrl.push(ItemDetailPage,{
      item:item
    });
  }
  //
  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Modify your album',
  //     buttons: [
  //       {
  //         text: 'Destructive',
  //         role: 'destructive',
  //         handler: () => {
  //           console.log('Destructive clicked');
  //         }
  //       },{
  //         text: 'Archive',
  //         handler: () => {
  //           console.log('Archive clicked');
  //         }
  //       },{
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }
  //
  // showAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'New Friend!',
  //     subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }
  //
  // showPrompt() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Login',
  //     message: "Enter a name for this new album you're so keen on adding",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
}
