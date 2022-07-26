import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COLORS, INFO } from 'src/app/constants/global.constants';
import { Contacto } from 'src/app/interfaces/icontacto';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  private colors = COLORS;
  private info = INFO;
  @Input() contacto!: Contacto;
  colores = [
    this.colors.grey.light, this.colors.red.dark, this.colors.orange, 
    this.colors.blue.light, this.colors.green.light, this.colors.yellow, 
    this.colors.green.dark, this.colors.blue.dark, this.colors.pink, 
    this.colors.red.light, this.colors.purple, this.colors.grey.dark
  ];
  relacion = [
    {id: this.info.contacto.relaciones.familiar.key, nombre: this.info.contacto.relaciones.familiar.value}, 
    {id: this.info.contacto.relaciones.amistad.key, nombre: this.info.contacto.relaciones.amistad.value}, 
    {id: this.info.contacto.relaciones.conocido.key, nombre: this.info.contacto.relaciones.conocido.value}, 
    {id: this.info.contacto.relaciones.trabajo.key, nombre: this.info.contacto.relaciones.trabajo.value},
    {id: this.info.contacto.relaciones.otro.key, nombre: this.info.contacto.relaciones.otro.value}
  ];
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      numeros: this.fb.array([this.crearInputTelefono()]),
      correo: ["", [Validators.required, Validators.email]],
      color: ["", [Validators.required]],
      relacion: [this.relacion[0].nombre, [Validators.required]]
    })
   }

  ngOnInit(): void {
    if(this.contacto)
      this.editForm();
  }

  private editForm(){
    for(let i = 1; i < this.contacto.numeros.length; i++)
    {
      this.agregarInputTelefono();
    }

    for(let i = 0; i < this.contacto.numeros.length; i++)
      this.contactFormGroups.controls[i].get('numero')?.patchValue(this.contacto.numeros[i])

    this.contactForm.patchValue({
      nombre: this.contacto.nombre,
      descripcion: this.contacto.descripcion,
      correo: this.contacto.correo,
      color: this.contacto.color,
      relacion: this.contacto.relacion
    })
  }

  setContacto(){
    let contacto = this.contactForm.value;
    console.log(contacto);
  }

  get contactFormGroups() {
    return this.contactForm.get("numeros") as FormArray
  }

  crearInputTelefono(): FormGroup{
    return new FormGroup({
      numero: new FormControl("", [Validators.pattern(/[8][0|2|4][9][0-9]{7}$/), Validators.required])
    })
  }

  getFormArray(): FormArray{
    return this.contactForm.get('numeros') as FormArray;
  }

  agregarInputTelefono(){
    const numeros = this.contactForm.get("numeros") as FormArray;
    numeros.push(this.crearInputTelefono());
  }

  eliminarInputTelefono(i: number){
    const numeros = this.contactForm.get("numeros") as FormArray;
    if(numeros.length > 1){
      numeros.removeAt(i);
    }
    else{
      numeros.reset();
    }
  }

  estiloInput(inputName: string): string{
    let resp = "";

    if(this.contactForm.get(inputName)?.invalid && this.contactForm.get(inputName)?.touched)
      resp ="red";
    else if(this.contactForm.get(inputName)?.valid && this.contactForm.get(inputName)?.touched) 
      resp = "green";
    else
      resp = "black";
    
    return resp;
  }

}
