import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import {Component} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Aeroporto } from '../models/aeroportos';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AeroportosService {
  private _http: HttpClient;
  url = '../../assets/data/Voos.json';
  handleError: any;
  //url = 'http://localhost:3000/employess'; // api rest fake
  // injetando o HttpClient

  selecionarOrigemDestino = new EventEmitter();

  constructor(HttpClient: HttpClient) {
    this._http = HttpClient;
  }
  TestMethod() {
    return 'Olá aqui do service';
  }
  List() {
    console.log('peguei o JSON');
    return this._http.get<Aeroporto[]>(this.url);
    //pipe tap para debugar
    // .pipe(
    //   tap(console.log)
    // )
  }

  getItems(){
    return this._http.get<Aeroporto[]>(this.url);
  }

  getCalculaOrigemDestino() {
    this.selecionarOrigemDestino.emit(this._http.get<Aeroporto[]>(this.url));
  }
}



