import { Component, OnInit, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Presupuesto } from "../models/presupuesto"

@Injectable({
  providedIn: 'root'
})

export class PresupuestosService {
  resourceUrl: string;

  constructor(private httpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/presupuestos"
   }

   get(){
     return this.httpCliente.get(this.resourceUrl)
   }

  post(obj:Presupuesto) {
    return this.httpCliente.post(this.resourceUrl, obj);
  }

}