import { Component, OnInit } from '@angular/core';
import {
  collection,
  addDoc,
  updateDoc,
  Firestore,
  doc,
  getDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asegurado-edit',
  templateUrl: './asegurado-edit.page.html',
  styleUrls: ['./asegurado-edit.page.scss'],
})
export class AseguradoEditPage implements OnInit {
  registroForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    bienAsegurado: new FormControl('', Validators.required),
    monto: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  clienteId: string | null = null;

  cliente: any = {};

  avatar: string = '';

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.clienteId = params.id;
    });

    if (this.clienteId) {
      this.obtenerCliente(this.clienteId);
    }
  }

  incluirCliente = () => {
    console.log('Aqui incluir en firebase');
    let clientesRef = collection(this.firestore, 'clientes');

    addDoc(clientesRef, this.registroForm.value)
      .then((doc) => {
        console.log('Registro hecho');
        this.router.navigate(['/asegurado-list']);
      })
      .catch((error) => {
        console.error('Error al crear el cliente:', error);
      });
  };

  editarCliente = (id: string) => {
    console.log('Aqui editar en firebase');
    let document = doc(this.firestore, 'clientes', id);

    updateDoc(document, this.registroForm.value)
      .then((doc) => {
        console.log('Registro editado');
        this.router.navigate(['/asegurado-list']);
      })
      .catch((error) => {
        console.error('Error al editar el cliente:', error);
      });
  };

  obtenerCliente = (id: string) => {
    console.log('Listar cliente');
    let documentRef = doc(this.firestore, 'clientes', id);

    getDoc(documentRef)
      .then((doc) => {
        if (doc.exists()) {
          console.log('Detalle del cliente:', doc.data());
          this.cliente = doc.data();
          this.registroForm.setValue({
            id: this.clienteId || '',
            nombre: this.cliente['nombre'] || '',
            fecha: this.cliente['fecha'] || '',
            bienAsegurado: this.cliente['bienAsegurado'] || '',
            monto: this.cliente['monto'] || 0,
          });
        } else {
          console.log('No se encontró el cliente con el ID proporcionado.');
        }
      })
      .catch((error) => {
        console.error('Error al consultar el cliente:', error);
      });
  };

  eliminarCliente = (id: string) => {
    console.log('Aqui elimina en firebase');
    const document = doc(this.firestore, 'clientes', id);

    deleteDoc(document)
      .then(() => {
        console.log('Registro eliminado');
        this.router.navigate(['/asegurado-list']);
      })
      .catch((error) => {
        console.error('Error al eliminar el cliente:', error);
      });
  };

  incluirOEditarCliente() {
    let monto = 0;
    if (this.registroForm.value.monto) {
      monto = this.registroForm.value.monto;
    }

    if (this.registroForm.valid) {
      if (monto < 0) {
        this.presentAlert('Debe ser numero mayor a 0');
      } else {
        if (this.clienteId) {
          this.editarCliente(this.clienteId);
        } else {
          this.incluirCliente();
        }
      }
    } else if (monto < 0) {
      this.presentAlert('Debe ser numero mayor a 0');
    } else {
      this.presentAlert('No puede tener campos vacios el formulario.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
