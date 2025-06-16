import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonTabButton, IonTabBar, IonTab, IonTabs, IonLabel, IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonBadge, IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon,  CommonModule, FormsModule]
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
