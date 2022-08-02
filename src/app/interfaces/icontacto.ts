import { FieldValue } from 'firebase/firestore';

export interface Contacto{
    grupoId?: string,
    id?: string,
    nombre: string,
    relacion: string,
    numeros: Array<any>,
    descripcion: string,
    color: string,
    correo: string,
    status?: boolean,
    fecha?: FieldValue;
  }