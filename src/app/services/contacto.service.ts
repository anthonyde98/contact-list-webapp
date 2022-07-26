import { Injectable } from '@angular/core';
import { Contacto } from '../interfaces/icontacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private contactos: Contacto[] = [
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafad",
      nombre: "Anthony Delanoy Peralta Pérez",
      relacion: "Familiar",
      numeros:  ["8298195019", "8298235419"],
      descripcion: "Soy yo, we.",
      color: "rgba(100, 149, 237, 0.600)",
      correo: "anthonyde98@gmail.com",
      status: true,
    },
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafada",
      nombre: "Styven Anthony Peralta Perez",
      numeros: ["8492345678"],
      relacion: "Familiar",
      descripcion: "Es el styven, we.",
      color: "rgba(255, 0, 0, 0.600)",
      correo: "styvenanthony@gmail.com",
      status: true,
    },
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafads",
      nombre: "Anthony Delanoy Peralta Pérez",
      relacion: "Familiar",
      numeros:  ["8298195019", "8298235419"],
      descripcion: "Soy yo, we.",
      color: "rgba(100, 149, 237, 0.600)",
      correo: "anthonyde98@gmail.com",
      status: true,
    },
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafadd",
      nombre: "Styven Anthony Peralta Perez",
      numeros: ["8492345678"],
      relacion: "Familiar",
      descripcion: "Es el styven, we.",
      color: "rgba(255, 0, 0, 0.600)",
      correo: "styvenanthony@gmail.com",
      status: true,
    },
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafadc",
      nombre: "Anthony Delanoy Peralta Pérez",
      relacion: "Familiar",
      numeros:  ["8298195019", "8298235419"],
      descripcion: "Soy yo, we.",
      color: "rgba(100, 149, 237, 0.600)",
      correo: "anthonyde98@gmail.com",
      status: true,
    },
    {
      grupoId: "asdasdasdasd",
      id: "asdasnkadfafadv",
      nombre: "Styven Anthony Peralta Perez",
      numeros: ["8492345678"],
      relacion: "Amistad",
      descripcion: "Es el styven, we.",
      color: "rgba(255, 0, 0, 0.600)",
      correo: "styvenanthony@gmail.com",
      status: true,
    },
  ]; 
  constructor() { }

  getContactos(){
    return this.contactos;
  }

  getContacto(id: string | null){
    return this.contactos.find(contacto => contacto.id === id)
  }
}
