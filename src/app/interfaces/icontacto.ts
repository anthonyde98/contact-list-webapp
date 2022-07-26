export interface Contacto{
    grupoId?: string,
    id?: string,
    nombre: string,
    relacion: string,
    numeros: Array<string>,
    descripcion: string,
    color: string,
    correo: string,
    status?: boolean,
    // fecha?: FieldValue;
  }