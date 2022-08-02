import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { COLORS, INFO } from 'src/app/constants/global.constants';
import { Contacto } from 'src/app/interfaces/icontacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  private colors = COLORS;
  private info = INFO;
  @Input() contacto!: Contacto;
  accion = "Agregar";
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

  constructor(private fb: FormBuilder, private contactoService: ContactoService, private toast: ToastrService, private router: Router) {
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['contacto'].currentValue){
      this.editForm();
      this.accion = "Editar";
    }
  }

  private editForm(){
    for(let i = 1; i < this.contacto.numeros.length; i++)
    {
      this.agregarInputTelefono();
    }

    this.contactForm.patchValue({
      nombre: this.contacto.nombre,
      descripcion: this.contacto.descripcion,
      numeros: this.contacto.numeros,
      correo: this.contacto.correo,
      color: this.contacto.color,
      relacion: this.contacto.relacion
    })
  }

  setContacto(){
    let contacto: Contacto = this.contactForm.value;
    
    if(this.contacto){
      this.saveEditedData(contacto);
    }
    else{
      this.saveContactData(contacto);
    }
  }

  private saveContactData(data: Contacto){
    this.contactoService.agregarContacto(data).then(() => {
      this.toast.success("Contacto agregado.", "Contacto");
      this.resetForm();
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }).catch(error => {
      this.toast.error("Hubo un error al agregar el contacto.", "Contacto");
    })
  } 

  private saveEditedData(data: Contacto){
    this.contactoService.actualizarContacto(data, this.contacto.id || "").then(() => {
      this.toast.success("Contacto editado.", "Contacto");
      this.router.navigateByUrl("list");
    }).catch(error => {
      this.toast.error("Hubo un error al editar el contacto.", "Contacto");
    })
  }

  private resetForm(){
    this.contactForm.reset();
    this.contactForm.get("relacion")?.setValue(this.relacion[0].nombre);
    this.contactFormGroups.clear();
    this.agregarInputTelefono();
  }

  get contactFormGroups() {
    return this.contactForm.get("numeros") as FormArray
  }

  private crearInputTelefono(): FormGroup{
    return new FormGroup({
      numero: new FormControl("", [Validators.pattern(/[8][0|2|4][9][0-9]{7}$/), Validators.required])
    })
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
