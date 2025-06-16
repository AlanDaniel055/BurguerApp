import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonSearchbar, IonToolbar, IonTitle, IonContent, IonItem, IonLabel } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput;
  model: any = {
    icon: 'search-outline',
    title: 'No Productos Encontrados'
  };
  isLoading: boolean;
  query: any;
  allProducts: any[] = [
    {
      uid: '12wefdss',
      name: 'King Mix',
      short_name: 'kingmix',
      description: 'Combina y mezcla a tu manera: Whopper sin queso',
      price: 109,
      image: 'assets/img/4.jpeg',
    },
    {
      uid: '12wefdefsdss',
      name: 'King Box',
      short_name: 'kingbox',
      description: 'Mucho por poco: Hamburguesa con queso o Crispy Chicken',
      price: 89,
      image: 'assets/img/5.jpg',
    },
    {
      uid: '12wefdssrete',
      name: 'Combo King de Pollo',
      short_name: 'kingpollo',
      description: 'Nuestro original king de pollo, con pollo empanizado',
      price: 129,
      image: 'assets/img/8.jpg',
    },
    {
      uid: '12wefdssrete',
      name: 'Combos del rey',
      short_name: 'rey',
      description: 'Corona tu antojo y sigue comiendo como rey.',
      price: 99,
      image: 'assets/img/6.jpg',
    },
    {
      uid: '12wefdssrete',
      name: 'Combo Whopper + 6 nuggets',
      short_name: 'whopper',
      description: 'Bueno, Bonito y Barato: Elije el tradicional combo Whopper',
      price: 159,
      image: 'assets/img/7.jpg',
    },
  ];

  products: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.products = [];
    if(this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async() => {
        this.products = await this.allProducts.filter((element: any) => {
          return element.short_name.includes(this.query) || 
                 element.name.toLowerCase().includes(this.query) || 
                 element.description.toLowerCase().includes(this.query);
        });
        console.log('Productos filtrados:', this.products);
        this.isLoading = false;
      }, 3000);  // Simulamos un retraso de 3 segundos para ver el estado de carga
    }
  }
}


