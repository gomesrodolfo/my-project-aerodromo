import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import voosData from '../assets/data/Voos.json';
import { AeroportosService } from './services/aeroportos.service';
import { AeroClasse } from './models/aero-classe.model';
import { Aeroporto } from './models/aeroportos';
import { AeroClasseModel } from './models/aeroClasseModel';
import { CalculaDistanciasComponent } from './components/calcula_distancias/calcula-distancias.component';
import { HomeComponent } from './components/home/home.component';
import { tap, map, observable } from 'rxjs';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-project-aerodromo';
  message: string;
  dados: any;
  aeroPortos: Aeroporto[];
  aeroPortos$: Observable<Aeroporto[]>;
  MyMap: Map<string, string>;
  // formBuilder: FormBuilder = new FormBuilder();

  //aeroLista: Aeroportos[] = voosData;
  constructor(
    private service: AeroportosService,
    private formBuilder: FormBuilder
  ) {
    console.log('CONSTRUCTOR APP COMPONENT');
  }

  items = this.service.getItems();

  checkoutForm = this.formBuilder.group({
    latitude: '',
    longitude: '',
  });

  onSubmit(): void {
    // Process checkout data here
    this.items = this.service.List();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  ngOnDestroy(): void {
    console.log(`${this.aeroPortos} foi destruído`);
  }

  // pegaDados(Aeroporto) {
  //   console.log(this.dados.);
  // }

  ngOnInit(): void {
    console.log('INIT APP COMPONENT');

    //Carrega o dado JSON em uma lista de aeroportos
    this.service.List().subscribe(
      (dados) =>
        (this.aeroPortos = JSON.parse(JSON.stringify(dados), (key, value) => {
          return dados;
        }))
    );

    // console.log(this.dados)
  }
}
