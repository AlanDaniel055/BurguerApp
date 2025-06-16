import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EditProfileModalComponent {
  @Input() profile: any = { name: '', email: '', phone: '' };

  constructor(private modalCtrl: ModalController) {}

  guardarCambios() {
    this.modalCtrl.dismiss(this.profile);
  }

  cerrar() {
    this.modalCtrl.dismiss(null);
  }
}


