import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import {
  
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAvatar,
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonThumbnail,
  IonText,
  IonListHeader,
  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgIf,
    NgFor,    
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSpinner,
    IonAvatar,
    IonItem,
    IonList,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonThumbnail,
    IonText,
    IonListHeader
  ]
})
export class AccountPage implements OnInit {
  profile: any = {};
  isLoading: boolean = false;
  orders: any[] = [];
  carrito: any = null;

  constructor() {}

  ngOnInit() {
    this.getData();
    this.cargarCarrito();
  }

  getData() {
    this.isLoading = true;

    
    setTimeout(() => {
      this.profile = {
        name: 'Maria Fernanda Robles Matus',
        phone: '9109109100',
        email: 'mariamatus@gmail.com'
      };

      
      this.orders = []; 

      this.isLoading = false;
    }, 1000);
  }

  async cargarCarrito() {
    const data = await Preferences.get({ key: 'cart' });
    if (data?.value) {
      this.carrito = JSON.parse(data.value);
    }
  }

  logout() {
    console.log('Sesión cerrada');
    
  }

  editarPerfil() {
    console.log('Editar perfil...');
    
  }

  reorder(order: any) {
    console.log('Reordenar:', order);
  }

  getHelp(order: any) {
    console.log('Ayuda solicitada para:', order);
  }
}

