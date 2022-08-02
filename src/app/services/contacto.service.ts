import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, collectionData, query, CollectionReference, updateDoc, doc, getDoc, docData, DocumentReference, serverTimestamp, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { orderBy, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Contacto } from '../interfaces/icontacto';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private token: string = "";

  constructor(private fire: Firestore, private appService: AppService) { 
    this.token = this.appService.getTokenGroup() || "";
  }

  async agregarContacto(contacto: Contacto){
    let col = collection(this.fire, "contacto");
    
    await addDoc(col, {...contacto, groupId: this.token, status: true, fecha: serverTimestamp()});
  }

  obtenerContactosConFiltro(filtro: any): Observable<Contacto[]>{
    let contactos = collectionData<Contacto>( 
      query<Contacto>(
        collection(this.fire, "contacto") as CollectionReference<Contacto>, 
        where('groupId', '==', this.token), 
        orderBy("fecha"),
        where("status", "==", true)
      ), {idField: 'id'} 
    );
    
    return contactos.pipe(
      map(contacto => {
        if(filtro.nombre == "numeros"){
          return contacto.filter((value: any) => {
            for(let element of value[filtro.nombre]){
              if(element["numero"].includes(filtro.dato)){
                return true;
              } 
            };
          })
        }
        else{
          return contacto.filter((value: any) => {
            return value[filtro.nombre].toLowerCase().indexOf(filtro.dato.toLowerCase()) > -1; 
          })
        }
      })
    );
  }

  async actualizarContacto(datos: any, id: string){
    let documento = doc(this.fire, "contacto", id);

    await updateDoc(documento, datos);
  }

  async obtenerContacto(id: string){
    let documento = doc(this.fire, "contacto", id);

    let docSnap = await getDoc(documento);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  }

  setToken(token: string){
    this.token = token;
  }
}