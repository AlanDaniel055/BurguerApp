import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonButtons, IonButton, IonIcon, IonListHeader, IonText, IonFooter,
  IonCol, IonRow, IonCardTitle, IonCardHeader, IonCardContent, IonCard,
  IonBackButton, IonThumbnail, IonModal
} from '@ionic/angular/standalone';
import { IonContent as IonContentElement } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonRow, IonCol, IonFooter, IonText, IonListHeader, IonIcon, IonButton,
    IonButtons, IonLabel, IonItem, IonList, IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail, IonModal,FormsModule
  ]
})
export class CartPage implements OnInit {
  @ViewChild(IonContentElement) content!: IonContentElement;

  model: any = {};
  deliveryCharge = 20;
  instruction: string = '';
  location: any = {};
  direccionTemporal: string = '';
  editandoDireccion: boolean = false;
  mostrandoResumen: boolean = false;
  urlCheck: any;
  url: any = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl();
    this.getModel();
  }

  ionViewWillEnter() {
  this.getModel(); 
}


  checkUrl() {
    const urlParts = this.router.url.split('/');
    const spliced = urlParts.splice(urlParts.length - 2, 2);
    this.urlCheck = spliced[0];
    urlParts.push(this.urlCheck);
    this.url = urlParts;
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  async getModel() {
    const data = await Preferences.get({ key: 'cart' });
    const direccionGuardada = await Preferences.get({ key: 'direccion' });

    this.location = {
      lat: 19.4326,
      lng: -99.1332,
      address: direccionGuardada?.value || ''
    };

    if (data?.value) {
      this.model = JSON.parse(data.value);
      this.calculate();
    }
  }

  async calculate() {
  const items = this.model.items.filter((x: any) => x.quantity > 0);
  this.model.items = items;
  this.model.totalItem = 0;
  this.model.totalPrice = 0;
  this.model.grandTotal = 0;

  for (let item of items) {
    this.model.totalItem += item.quantity;
    this.model.totalPrice += item.price * item.quantity;
  }

  this.model.deliveryCharge = this.deliveryCharge;
  this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
  this.model.grandTotal = (
    parseFloat(this.model.totalPrice) + this.deliveryCharge
  ).toFixed(2);

  if (this.model.totalItem === 0) {
    await Preferences.remove({ key: 'cart' });
    this.model = null;
  } else {
    await Preferences.set({ key: 'cart', value: JSON.stringify(this.model) }); 
  }
}


  quantityPlus(index: number) {
    this.model.items[index].quantity += 1;
    this.calculate();
  }

  quantityMinus(index: number) {
    if (this.model.items[index].quantity > 1) {
      this.model.items[index].quantity -= 1;
    } else {
      this.model.items.splice(index, 1);
    }
    this.calculate();
  }

  editarDireccion() {
    this.direccionTemporal = this.location.address || '';
    this.editandoDireccion = true;
  }

  async guardarDireccion() {
    
    const dir = this.direccionTemporal?.trim();

  console.log('Valor recibido:', dir);

  if (dir) {
    try {
      this.location.address = dir;
      this.editandoDireccion = false;

      await Preferences.set({ key: 'direccion', value: dir });

      console.log('Dirección guardada:', dir);
      alert('Dirección guardada con éxito');
    } catch (error) {
      console.error('Error al guardar dirección en Preferences:', error);
      alert('Error al guardar la dirección. Revisa la consola.');
    }
  } else {
    alert('Por favor, escribe una dirección válida.');
  }
  }

  vaciarCarrito() {
    Preferences.remove({ key: 'cart' });
    this.model = null;
  }

  toggleResumen() {
    this.mostrandoResumen = !this.mostrandoResumen;
  }

  makePayment() {
    if (this.editandoDireccion) {
    const dir = this.direccionTemporal.trim();
    if (!dir) {
      alert('Por favor, escribe una dirección válida antes de continuar.');
      return;
    }
    this.location.address = dir;
    Preferences.set({ key: 'direccion', value: dir });
    this.editandoDireccion = false;
  }

  if (!this.location.address || !this.location.address.trim()) {
    alert('Por favor, ingresa tu dirección de entrega antes de continuar.');
    return;
  }

  this.toggleResumen();
  }

  confirmarPago() {
    console.log('Confirmado:', {
      productos: this.model.items,
      total: this.model.totalPrice,
      envio: this.model.deliveryCharge,
      totalFinal: this.model.grandTotal,
      direccion: this.location.address
    });

    alert('¡Pedido confirmado! Gracias por tu compra.');
    this.vaciarCarrito();
    this.toggleResumen();
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }
}

