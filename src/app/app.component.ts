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
import jsondata from '../assets/data/Voos.json';

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
  nomeAeroporto: string = '';
  objectAeroporto: Aeroporto;
  aeroJson: any = JSON.parse(JSON.stringify(jsondata));
  aeroObject: Aeroporto = <Aeroporto>this.aeroJson;
  Aeroporto: Aeroporto;
  // formBuilder: FormBuilder = new FormBuilder();

  //aeroLista: Aeroportos[] = voosData;
  checkoutForm = this.formBuilder.group({
    controlAeroportosOrigem: [''],
    controlAeroportosDestino: ['']
  });

  constructor(
    private service: AeroportosService,
    private formBuilder: FormBuilder
  ) {
    console.log('CONSTRUCTOR APP COMPONENT');
  }

  items = this.service.getItems();

  onSubmit() {
    console.log(JSON.stringify(this.checkoutForm.value));
  }

  getAeroporto() {
    return this.Aeroporto;
  }

  setAeroporto(Aeroporto: Aeroporto) {
    this.Aeroporto = Aeroporto;
  }

  ngOnDestroy(): void {
    console.log(`${this.aeroPortos} foi destruído`);
  }

  myFunc(Aeroporto: Aeroporto) {
    console.log(Aeroporto);
  }

  ngOnInit(): void {
    // debugger;
    console.log('INIT APP COMPONENT');

    //Carrego o JSON em um objeto acessível

    console.log(this.aeroObject);
    // EXEMPLO DE ACESSO AO OBJETO DE AEROPORTOS
    console.log(this.aeroObject[0]['Nome'], ['Latitude'], ['Longitude']);
    // console.log(aeroPortos)

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
