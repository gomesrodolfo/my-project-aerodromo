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
import { FormBuilder, FormGroup } from '@angular/forms';
import jsondata from '../assets/data/Voos.json';
import { ThisReceiver } from '@angular/compiler';

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
  nomeAeroporto: string = '';
  objectAeroporto: Aeroporto;
  aeroJson: any = JSON.parse(JSON.stringify(jsondata));
  aeroObject: Aeroporto = <Aeroporto>this.aeroJson;
  Aeroporto: Aeroporto;
  GetCoordenadas: any;
  GetCoordenadasTempo: any;
  GetCoordenadasTempoEmGraus: any;
  CoordenadasSomadas: any;
  Coordenadas: any;

  // formBuilder: FormBuilder = new FormBuilder();

  //aeroLista: Aeroportos[] = voosData;
  checkoutForm = this.formBuilder.group({
    controlAeroportosOrigem: [''],
    controlAeroportosDestino: [''],
  });

  constructor(
    private service: AeroportosService,
    private formBuilder: FormBuilder,
    private calculaDistancia: CalculaDistanciasComponent
  ) {
    console.log('CONSTRUCTOR APP COMPONENT');
  }

  items = this.service.getItems();

  onSubmit() {
    // debugger
    // console.log(JSON.stringify(this.checkoutForm.value));
    this.Coordenadas = JSON.parse(JSON.stringify(this.checkoutForm.value));
    let nomeOrigem: any = Object.values(this.Coordenadas)[0];
    let nomeDestino: any = Object.values(this.Coordenadas)[1];
    let cooordOrigem: any;
    let cooordDestino: any;

    var aero = this.aeroPortos.filter(
      (Aeroporto) => Aeroporto.Nome == nomeOrigem
    );

    aero.forEach((Aeroporto) => {
      // console.log('Origem: ', Aeroporto);
      cooordOrigem = {
        Latitude: Aeroporto['Latitude'],
        Longitude: Aeroporto['Longitude'],
      };
    });

    // console.log(cooordOrigem);

    var aero = this.aeroPortos.filter(
      (Aeroporto) => Aeroporto.Nome == nomeDestino
    );

    aero.forEach((Aeroporto) => {
      cooordDestino = {
        Latitude: Aeroporto['Latitude'],
        Longitude: Aeroporto['Longitude'],
      };
    });

    // console.log(cooordDestino);

    // this.aeroPortos.forEach((aeroportos, index) => {
    //   if (aeroportos['Nome'] === nomeOrigem) {
    //     console.log(nomeOrigem);
    //   }
    //   if (aeroportos['Nome'] === nomeDestino) {
    //     console.log(nomeDestino);
    //   }
    // });

    // this.Coordenadas = this.calculaDistancia.converteStringParaFloat(
    //   aeroObject[nomeOrigem].
    // );

    this.GetCoordenadas = this.calculaDistancia.converteStringParaFloat(
      cooordOrigem.Latitude,
      cooordOrigem.Longitude,
      cooordDestino.Latitude,
      cooordDestino.Longitude
    );
    // console.log(this.GetCoordenadas);
    this.GetCoordenadasTempo = this.calculaDistancia.converteTempoParaGraus(
      this.GetCoordenadas
    );
    // console.log(this.GetCoordenadasTempo);
    this.GetCoordenadasTempoEmGraus =
      this.calculaDistancia.encontraDistanciaOrigemDestino(
        this.GetCoordenadasTempo
      );

    // console.log(this.GetCoordenadasTempoEmGraus);

    return JSON.parse(JSON.stringify(this.checkoutForm.value));
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

    // console.log(this.aeroObject);
    // // EXEMPLO DE ACESSO AO OBJETO DE AEROPORTOS
    // console.log(this.aeroObject[0]['Nome'], ['Latitude'], ['Longitude']);
    // console.log(aeroPortos)

    //Carrega o dado JSON em uma lista de aeroportos
    this.service.List().subscribe(
      (dados) =>
        (this.aeroPortos = JSON.parse(JSON.stringify(dados), (key, value) => {
          return dados;
        }))
    );

    // console.log(this.dados)

    //CHAMA PRIMEIRO E RETORNA UM OBJETO
    /*CalculaDistanciasComponent.converteStringParaFloat(latitudeOrigem: string, longitudeOrigem: string, latitudeDestino: string, longitudeDestino: string): Coordenadas*/
    //converteStringParaFloat;

    // console.log(this.aeroObject[this.Coordenadas[0]]);
    // this.CoordenadasSomadas = this.calculaDistancia.converteStringParaFloat(
    //   this.aeroObject[this.Coordenadas[0]].latitude
    // );
  }
}
