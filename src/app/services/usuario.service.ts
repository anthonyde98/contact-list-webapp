import { Injectable } from '@angular/core';
import { collection, collectionData, query, Firestore, doc, arrayRemove, updateDoc, getDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/iusuario';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ContactoService } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private token = "";

  constructor(private fire: Firestore, private appService: AppService, private authService: AuthService, private contactoService: ContactoService) {
    this.token = this.appService.getTokenGroup() || "";
   }


  obtenerGrupo(usuarioId: string){
    let usuarios = collectionData<any>(
      query<any>(
        collection(this.fire, "usuario")
      ), {idField: 'id'}
    );

    return usuarios.pipe(
      map(usuario => {
        let us = [];
        for(let i = 0; i < usuario.length; i++){
          for(let j = 0; j < usuario[i].usuarios.length; j++){
            if(usuario[i].usuarios[j].codigo == usuarioId)
              us.push({usuario: usuario[i].usuarios[j], grupoId: usuario[i].id});
          }
        }
        return us;
      })
    );
  }

  async cerrarSesion(dispositivo: Usuario, token: string){
    let documento = doc(this.fire, "usuario", token);
    await updateDoc(documento, {usuarios: arrayRemove(dispositivo)})
  }

  
  setTokenGroup(uuid: string, deviceData: string){
    this.obtenerGrupo(uuid || "").subscribe(data => {
      if(data){
        if(data.length === 1){
          this.authService.iniciarSesion(data[0].grupoId, deviceData);
          this.contactoService.setToken(data[0].grupoId);
          this.appService.setFirstTime(true);
        }
      }
    });
  }

  async canLog(): Promise<boolean>{
    const uuid = this.appService.getUUIDFromLocal();

    if(uuid === "" || uuid === null || uuid === undefined)
      return false;

    if(this.token === "" || this.token === null || this.token === undefined)
      return false;

    let documento = doc(this.fire, "usuario", this.token);

    const docSnap = await getDoc(documento);

    if(!docSnap.exists()){
      return false;
    }
    
    for(let usuario of docSnap.data()['usuarios']){
      if(usuario.codigo === uuid){
        return true;
      }
    }

    return false;
  }

  log(uuid: string){
    let usuarios = collectionData<any>(
      query<any>(
        collection(this.fire, "usuario")
      ), {idField: 'id'}
    );

    return usuarios.pipe(
      map(usuario => {
        let us = [];
        for(let i = 0; i < usuario.length; i++){
          for(let j = 0; j < usuario[i].usuarios.length; j++){
            if(usuario[i].usuarios[j].codigo == uuid)
              us.push({usuario: usuario[i].usuarios[j], grupoId: usuario[i].id});
          }
        }
        return us.length > 0;
      })
    );
  }
}
