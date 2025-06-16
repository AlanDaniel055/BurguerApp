import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { NavController } from '@ionic/angular';  
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],  
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomePage implements OnInit {

  carrito: any[] = [];
  swiperModules = [IonicSlides];
  productos = [
    { nombre: 'King Mix', descripcion: 'Combina y mezcla a tu manera: Whopper sin queso', precio: 109, imagen: 'assets/img/4.jpeg' },
    { nombre: 'King Box', descripcion: 'Mucho por poco: Hamburguesa con queso o Crispy Chicken', precio: 89, imagen: 'assets/img/5.jpg' },
    { nombre: 'Combos del rey', descripcion: 'Corona tu antojo y sigue comiendo como rey', precio: 99, imagen: 'assets/img/6.jpg' },
    { nombre: 'Combo Whopper + 6 nuggets', descripcion: 'Bueno, Bonito y Barato: Elije el tradicional combo Whopper', precio: 159, imagen: 'assets/img/7.jpg' },
    { nombre: 'Combo king de pollo', descripcion: 'Nuestro original king de pollo, con pollo empanizado', precio: 129, imagen: 'assets/img/8.jpg' }
  ];

  constructor(private navCtrl: NavController, private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  
  async agregarAlCarrito(nombre: string, precio: number) {
    const producto = {
      name: nombre,
      price: precio,
      quantity: 1
    };

    const existingCart = await Preferences.get({ key: 'cart' });

    let cartData: any = {
      restaurant: {
        name: 'Burger Queen',
        address: 'Sucursal Central',
        uid: 'burgerqueen-001'
      },
      items: []
    };

    if (existingCart?.value) {
      cartData = JSON.parse(existingCart.value);

      const index = cartData.items.findIndex((item: any) => item.name === nombre);
      if (index > -1) {
        cartData.items[index].quantity += 1;
      } else {
        cartData.items.push(producto);
      }
    } else {
      cartData.items.push(producto);
    }

    await Preferences.set({
      key: 'cart',
      value: JSON.stringify(cartData)
    });

    this.presentToast('Producto añadido al carrito');
    console.log('Producto añadido al carrito:', producto);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'success'
    });
    await toast.present();
  }

  
  irABusqueda() {
    
    this.navCtrl.navigateForward(['/search', { productos: JSON.stringify(this.productos) }]);
  }

  verDetalleProducto(producto: any) {
  this.router.navigate(['/product-detail'], {
    queryParams: {
      product: JSON.stringify(producto)
    }
  });
}

}



