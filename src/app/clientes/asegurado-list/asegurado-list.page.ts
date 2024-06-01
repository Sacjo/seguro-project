import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { deleteDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-asegurado-list',
  templateUrl: './asegurado-list.page.html',
  styleUrls: ['./asegurado-list.page.scss'],
})
export class AseguradoListPage implements OnInit {
  constructor(
    private readonly firestore: Firestore,
    private alertCtrl: AlertController
  ) {}

  listaClientes = new Array();
  maxResults = 8;
  ultimoClienteRecuperado: any = null;
  isSearch: boolean = false;
  query = '';

  ngOnInit() {
    this.listaClientes = new Array();
    this.ultimoClienteRecuperado = null;
    this.listarClientesSinFiltro();
  }

  ionViewWillEnter() {
    this.listaClientes = new Array();
    this.ultimoClienteRecuperado = null;
    this.listarClientesSinFiltro();
  }

  listarClientesSinFiltro = () => {
    console.log('Listar clientes sin filtro');
    const clientesRef = collection(this.firestore, 'clientes');

    let q;
    if (this.ultimoClienteRecuperado) {
      q = query(
        clientesRef,
        limit(this.maxResults),
        startAfter(this.ultimoClienteRecuperado)
      );
    } else {
      q = query(clientesRef, limit(this.maxResults));
    }

    const querySnapshot = getDocs(q).then((re) => {
      if (!re.empty) {
        this.ultimoClienteRecuperado = re.docs[re.docs.length - 1];

        re.forEach((doc) => {
          let cliente: any = doc.data();
          cliente.id = doc.id;
          if (!this.listaClientes.some((a) => a.id === cliente.id)) {
            this.listaClientes.push(cliente);
          }
        });
      } else {
        console.log('No hay más clientes para cargar.');
      }
    });

    console.log(this.listaClientes);
  };

  onIonInfinite(ev: any) {
    this.listarClientesSinFiltro();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clickSearch = () => {
    this.isSearch = true;
  };

  clearSearch = () => {
    this.isSearch = false;
    this.query = '';

    this.listaClientes = new Array();
    this.ultimoClienteRecuperado = null;

    this.listarClientesSinFiltro();
  };

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaClientes = new Array();
    this.ultimoClienteRecuperado = null;
    this.listarClientes();
  };

  listarClientes = () => {
    console.log('listar clientes');
    const clientesRef = collection(this.firestore, 'clientes');

    if ((this.query + '').length > 0) {
      let q = undefined;
      if (this.ultimoClienteRecuperado) {
        q = query(
          clientesRef,
          where('nombre', '>=', this.query.toUpperCase()),
          where('nombre', '<=', this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults),
          startAfter(this.ultimoClienteRecuperado)
        );
      } else {
        q = query(
          clientesRef,
          where('nombre', '>=', this.query.toUpperCase()),
          where('nombre', '<=', this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults)
        );
      }

      getDocs(q).then((re) => {
        if (!re.empty) {
          let listaClientes = new Array();

          for (let i = 0; i < re.docs.length; i++) {
            const doc: any = re.docs[i].data();
            if (
              doc.nombre
                .toUpperCase()
                .startsWith(this.query.toUpperCase().charAt(0))
            ) {
              listaClientes.push(re.docs[i]);
            }
          }

          this.ultimoClienteRecuperado = re.docs[listaClientes.length - 1];

          for (let i = 0; i < listaClientes.length; i++) {
            const doc: any = listaClientes[i];
            let cliente: any = doc.data();
            cliente.id = doc.id;
            this.listaClientes.push(cliente);
          }
        }
      });
    } else {
      this.listarClientesSinFiltro();
    }
  };

  eliminarCliente = (id: string) => {
    console.log('Eliminando cliente');
    const document = doc(this.firestore, 'clientes', id);

    deleteDoc(document)
      .then(() => {
        console.log('Cliente eliminado');
        this.listaClientes = new Array();
        this.ultimoClienteRecuperado = null;
        this.listarClientesSinFiltro(); 
      })
      .catch((error) => {
        console.error('Error al eliminar el cliente:', error);
      });
  };
}
