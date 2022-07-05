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
  AeroOrigem: any;
  AeroDestino: any;
  CaminhoMinimo: any;
  NomeAeroOrigem: string = '';
  NomeAeroDestino: string = '';

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
    this.AeroOrigem = nomeOrigem;
    this.AeroDestino = nomeDestino;

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
      
      // this.NomeAeroOrigem = this.AeroOrigem;
      // console.log(typeof(this.NomeAeroOrigem));
    // console.log(typeof(this.AeroDestino));

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

    console.log(this.GetCoordenadasTempoEmGraus);

    /*INICIO DO DIJKSTRA*/
    class NodeVertex {
      nameOfVertex: string;
      weight: number;
    }

    class Vertex {
      name: string;
      nodes: NodeVertex[];
      weight: number;

      constructor(theName: string, theNodes: NodeVertex[], theWeight: number) {
        this.name = theName;
        this.nodes = theNodes;
        this.weight = theWeight;
      }
    }

    class Dijkstra {
      vertices: any;
      constructor() {
        this.vertices = {};
      }

      addVertex(vertex: Vertex): void {
        this.vertices[vertex.name] = vertex;
      }

      findPointsOfShortestWay(
        start: string,
        finish: string,
        weight: number
      ): string[] {
        let nextVertex: string = finish;
        let arrayWithVertex: string[] = [];
        while (nextVertex !== start) {
          let minWeigth: number = Number.MAX_VALUE;
          let minVertex: string = '';
          for (let i of this.vertices[nextVertex].nodes) {
            if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
              minWeigth = this.vertices[i.nameOfVertex].weight;
              minVertex = i.nameOfVertex;
            }
          }
          arrayWithVertex.push(minVertex);
          nextVertex = minVertex;
        }
        return arrayWithVertex;
      }

      findShortestWay(start: string, finish: string): string[] {
        let nodes: any = {};
        let visitedVertex: string[] = [];

        for (let i in this.vertices) {
          if (this.vertices[i].name === start) {
            this.vertices[i].weight = 0;
          } else {
            this.vertices[i].weight = Number.MAX_VALUE;
          }
          nodes[this.vertices[i].name] = this.vertices[i].weight;
        }

        while (Object.keys(nodes).length !== 0) {
          let sortedVisitedByWeight: string[] = Object.keys(nodes).sort(
            (a, b) => this.vertices[a].weight - this.vertices[b].weight
          );
          let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
          for (let j of currentVertex.nodes) {
            const calculateWeight: number = currentVertex.weight + j.weight;
            if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
              this.vertices[j.nameOfVertex].weight = calculateWeight;
            }
          }
          delete nodes[sortedVisitedByWeight[0]];
        }
        const finishWeight: number = this.vertices[finish].weight;
        let arrayWithVertex: string[] = this.findPointsOfShortestWay(
          start,
          finish,
          finishWeight
        ).reverse();
        arrayWithVertex.push(finish, finishWeight.toString());
        return arrayWithVertex;
      }
    }

    let dijkstra = new Dijkstra();
    dijkstra.addVertex(
      new Vertex(
        'Guarulhos - Governador André Franco Montoro',
        [
          { nameOfVertex: 'Viracopos', weight: 3 },
          {
            nameOfVertex: 'Guararapes - Gilberto Freyre Internacional',
            weight: 7,
          },
          { nameOfVertex: 'Presidente Juscelino Kubitschek', weight: 4 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Presidente Juscelino Kubitschek',
        [
          {
            nameOfVertex: 'Guarulhos - Governador André Franco Montoro',
            weight: 4,
          },
          { nameOfVertex: 'Viracopos', weight: 6 },
          { nameOfVertex: 'Congonhas', weight: 5 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Viracopos',
        [
          {
            nameOfVertex: 'Guarulhos - Governador André Franco Montoro',
            weight: 3,
          },
          { nameOfVertex: 'Presidente Juscelino Kubitschek', weight: 6 },
          {
            nameOfVertex: 'Guararapes - Gilberto Freyre Internacional',
            weight: 8,
          },
          { nameOfVertex: 'Congonhas', weight: 11 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Congonhas',
        [
          { nameOfVertex: 'Presidente Juscelino Kubitschek', weight: 5 },
          { nameOfVertex: 'Viracopos', weight: 11 },
          {
            nameOfVertex: 'Guararapes - Gilberto Freyre Internacional',
            weight: 2,
          },
          { nameOfVertex: 'Santos Dumont', weight: 2 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Guararapes - Gilberto Freyre Internacional',
        [
          {
            nameOfVertex: 'Guarulhos - Governador André Franco Montoro',
            weight: 7,
          },
          { nameOfVertex: 'Viracopos', weight: 8 },
          { nameOfVertex: 'Congonhas', weight: 2 },
          { nameOfVertex: 'Tancredo Neves', weight: 5 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Santos Dumont',
        [
          { nameOfVertex: 'Congonhas', weight: 2 },
          { nameOfVertex: 'Tancredo Neves', weight: 3 },
        ],
        1
      )
    );
    dijkstra.addVertex(
      new Vertex(
        'Tancredo Neves',
        [
          { nameOfVertex: 'Congonhas', weight: 10 },
          {
            nameOfVertex: 'Guararapes - Gilberto Freyre Internacional',
            weight: 5,
          },
          { nameOfVertex: 'Santos Dumont', weight: 3 },
        ],
        1
      )
    );

    // this.NomeAeroOrigem = this.AeroOrigem;
    // this.NomeAeroDestino = this.AeroDestino;

    // console.log(this.NomeAeroOrigem)
    // this.getStringValue(this.AeroOrigem);

    console.log(
      dijkstra.findShortestWay(
        'Guararapes - Gilberto Freyre Internacional',
        'Tancredo Neves'
      )
    );
    
    // this.AeroOrigem = String(this.AeroOrigem),
    // this.AeroDestino = String(this.AeroDestino);

    
    console.log(this.CaminhoMinimo);
    /*FIM DO DIJKSTRA*/
    //return dijkstra.findShortestWay(this.Aeroporto['Nome'], this.Aeroporto['Nome']);
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

  getStringValue(value: any): string {
    return String(value);
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
