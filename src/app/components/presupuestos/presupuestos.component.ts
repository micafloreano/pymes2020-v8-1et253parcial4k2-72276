import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../services/presupuestos.service';
import {Presupuesto} from '../../models/Presupuesto'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";


@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  Titulo = "Presupuestos";
  Items: Presupuesto[] = [];
  EstadoForm: string;
  FormReg: FormGroup;
  submitted = false;

  constructor(private presupuestosService: PresupuestosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
        this.EstadoForm = 'L';
        this.submitted = false;
        this.getPresupuesto();
        this.FormReg = this.formBuilder.group({
         IdPresupuesto:[0],
         PresupuestoDescripcion: ['',[Validators.required]],
         PresupuestoImporte: ['',[Validators.required]],
    }
     
    );
  }
  getPresupuesto(){
     this.presupuestosService.get()
    .subscribe((res:Presupuesto[])=>{
      this.Items = res;

  });
  }
  Alta(){
    window.scroll(0, 0);
    this.EstadoForm = 'A';
    this.submitted = false;
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid)
     {
      return;
      }
  
  
  
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    // agregar post
    itemCopy.IdEquipo = 0;
    this.presupuestosService.post(itemCopy).subscribe((res: any) => {
        this.getPresupuesto();
        this.Volver();
        
      //t.Alert('Registro agregado correctamente.');
     });
    }
  

  Volver() {
    this.EstadoForm = "L";
  };



}

