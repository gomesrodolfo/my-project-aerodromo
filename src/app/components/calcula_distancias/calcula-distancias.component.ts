import { Component, OnInit } from '@angular/core';

interface Coordenadas {
  origem: {
    latitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
    longitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
  };
  destino: {
    latitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
    longitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
  };
}

//interface para a soma das coordenadas pós conversão
interface CoordenadasSomadas {
  origem: {
    latitude: number;
    longitude: number;
  };
  destino: {
    latitude: number;
    longitude: number;
  };
}

@Component({
  selector: 'app-calcula-distancias',
  templateUrl: './calcula-distancias.component.html',
  styleUrls: ['./calcula-distancias.component.css'],
})
export class CalculaDistanciasComponent implements OnInit, Coordenadas {
  origem!: {
    latitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
    longitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
  };
  destino!: {
    latitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
    longitude: {
      grau: number;
      minutos: number;
      segundos: number;
      sentido: string;
    };
  };

  constructor() {}

  private converteStringParaFloat(
    latitudeOrigem: string,
    longitudeOrigem: string,
    latitudeDestino: string,
    longitudeDestino: string
  ) {
    let coordenadasConvertidas: Coordenadas;

    //retorno
    coordenadasConvertidas = {
      origem: {
        latitude: {
          grau: 0,
          minutos: 0,
          segundos: 0,
          sentido: '',
        },
        longitude: {
          grau: 0,
          minutos: 0,
          segundos: 0,
          sentido: '',
        },
      },
      destino: {
        latitude: {
          grau: 0,
          minutos: 0,
          segundos: 0,
          sentido: '',
        },
        longitude: {
          grau: 0,
          minutos: 0,
          segundos: 0,
          sentido: '',
        },
      },
    };

    //origem
    let getGrausLatitudeOrigem;
    let getMinutosLatitudeOrigem;
    let getSegundosLatitudeOrigem;
    let getGrausLongitudeOrigem;
    let getMinutosLongitudeOrigem;
    let getSegundosLongitudeOrigem;
    let convertGrausLatitudeOrigem: number;
    let convertMinutosLatitudeOrigem: number;
    let convertSegundosLatitudeOrigem: number;
    let convertGrausLongitudeOrigem: number;
    let convertMinutosLongitudeOrigem: number;
    let convertSegundosLongitudeOrigem: number;
    let getValoresLatitudeOrigem;
    let getValoresLongitudeOrigem;
    let sentidoLatitudeOrigem;
    let sentidoLongitudeOrigem;

    //destino
    let getGrausLatitudedeDestino;
    let getGrausLongitudeDestino;
    let getMinutosLatitudeDestino;
    let getSegundosLatitudeDestino;
    let getMinutosLongitudeDestino;
    let getSegundosLongitudeDestino;
    let convertGrausLatitudeDestino: number;
    let convertMinutosLatitudeDestino: number;
    let convertSegundosLatitudeDestino: number;
    let convertGrausLongitudeDestino: number;
    let convertMinutosLongitudeDestino: number;
    let convertSegundosLongitudeDestino: number;
    let getValoresLatitudeDestino;
    let getValoresLongitudeDestino;
    let sentidoLatitudeDestino;
    let sentidoLongitudeDestino;

    getValoresLatitudeOrigem = latitudeOrigem.split(' ');
    sentidoLatitudeOrigem = getValoresLatitudeOrigem[3]
      .split("'", 1)
      .toString();
    getGrausLatitudeOrigem = getValoresLatitudeOrigem[0]
      .split('°', 1)
      .toString();
    getMinutosLatitudeOrigem = getValoresLatitudeOrigem[1]
      .split("'", 1)
      .toString();
    getSegundosLatitudeOrigem = getValoresLatitudeOrigem[2]
      .split("''", 1)
      .toString();
    convertGrausLatitudeOrigem = parseFloat(getGrausLatitudeOrigem);
    convertMinutosLatitudeOrigem = parseFloat(getMinutosLatitudeOrigem);
    convertSegundosLatitudeOrigem = parseFloat(getSegundosLatitudeOrigem);

    getValoresLongitudeOrigem = longitudeOrigem.split(' ');
    sentidoLongitudeOrigem = getValoresLongitudeOrigem[3]
      .split("'", 1)
      .toString();
    getGrausLongitudeOrigem = getValoresLongitudeOrigem[0]
      .split('°', 1)
      .toString();
    getMinutosLongitudeOrigem = getValoresLongitudeOrigem[1]
      .split("'", 1)
      .toString();
    getSegundosLongitudeOrigem = getValoresLongitudeOrigem[2]
      .split("''", 1)
      .toString();
    convertGrausLongitudeOrigem = parseFloat(getGrausLongitudeOrigem);
    convertMinutosLongitudeOrigem = parseFloat(getMinutosLongitudeOrigem);
    convertSegundosLongitudeOrigem = parseFloat(getSegundosLongitudeOrigem);

    getValoresLatitudeDestino = latitudeDestino.split(' ');
    sentidoLatitudeDestino = getValoresLatitudeDestino[3]
      .split("'", 1)
      .toString();
    getGrausLatitudedeDestino = getValoresLatitudeDestino[0]
      .split('°', 1)
      .toString();
    getMinutosLatitudeDestino = getValoresLatitudeDestino[1]
      .split("'", 1)
      .toString();
    getSegundosLatitudeDestino = getValoresLatitudeDestino[2]
      .split("''", 1)
      .toString();
    convertGrausLatitudeDestino = parseFloat(getGrausLatitudedeDestino);
    convertMinutosLatitudeDestino = parseFloat(getMinutosLatitudeDestino);
    convertSegundosLatitudeDestino = parseFloat(getSegundosLatitudeDestino);

    getValoresLongitudeDestino = longitudeDestino.split(' ');
    sentidoLongitudeDestino = getValoresLongitudeDestino[3]
      .split("'", 1)
      .toString();
    getGrausLongitudeDestino = getValoresLongitudeDestino[0]
      .split('°', 1)
      .toString();
    getMinutosLongitudeDestino = getValoresLongitudeDestino[1]
      .split("'", 1)
      .toString();
    getSegundosLongitudeDestino = getValoresLongitudeDestino[2]
      .split("''", 1)
      .toString();
    convertGrausLongitudeDestino = parseFloat(getGrausLongitudeDestino);
    convertMinutosLongitudeDestino = parseFloat(getMinutosLongitudeDestino);
    convertSegundosLongitudeDestino = parseFloat(getSegundosLongitudeDestino);

    //origem convertida
    coordenadasConvertidas.origem.latitude.sentido = sentidoLatitudeOrigem;
    coordenadasConvertidas.origem.longitude.sentido = sentidoLongitudeOrigem;
    coordenadasConvertidas.origem.latitude.grau = convertGrausLatitudeOrigem;
    coordenadasConvertidas.origem.latitude.minutos =
      convertMinutosLatitudeOrigem;
    coordenadasConvertidas.origem.latitude.segundos =
      convertSegundosLatitudeOrigem;
    coordenadasConvertidas.origem.longitude.grau = convertGrausLongitudeOrigem;
    coordenadasConvertidas.origem.longitude.minutos =
      convertMinutosLongitudeOrigem;
    coordenadasConvertidas.origem.longitude.segundos =
      convertSegundosLongitudeOrigem;

    //destino convertido
    coordenadasConvertidas.destino.latitude.sentido = sentidoLatitudeDestino;
    coordenadasConvertidas.destino.longitude.sentido = sentidoLongitudeDestino;
    coordenadasConvertidas.destino.latitude.grau = convertGrausLatitudeDestino;
    coordenadasConvertidas.destino.latitude.minutos =
      convertMinutosLatitudeDestino;
    coordenadasConvertidas.destino.latitude.segundos =
      convertSegundosLatitudeDestino;
    coordenadasConvertidas.destino.longitude.grau =
      convertGrausLongitudeDestino;
    coordenadasConvertidas.destino.longitude.minutos =
      convertMinutosLongitudeDestino;
    coordenadasConvertidas.destino.longitude.segundos =
      convertSegundosLongitudeDestino;

    // console.log(coordenadasConvertidas);

    return coordenadasConvertidas;
  }

  // meuObjeto = this.converteStringParaFloat(
  //   "34° 3' 8'' N",
  //   "118° 14' 37'' W'",
  //   "35° 41' 6'' N",
  //   "139° 45' 5'' E"
  // );

  meuObjeto = this.converteStringParaFloat(
    "09° 52' 06.0'' S",
    "067° 53' 53.0'' W",
    "20° 38' 47.0'' S",
    "040° 29' 30.0'' W"
  );

  public converteTempoParaGraus(object: Coordenadas) {
    let coordenadasValores: CoordenadasSomadas;

    coordenadasValores = {
      origem: {
        latitude: 0,
        longitude: 0,
      },
      destino: {
        latitude: 0,
        longitude: 0,
      },
    };

    let minToGrauLatOrigem: number;
    let segToGrauLatOrigem: number;
    let minToGrauLonOrigem: number;
    let segToGrauLonOrigem: number;
    let minToGrauLatDestino: number;
    let segToGrauLatDestino: number;
    let minToGrauLonDestino: number;
    let segToGrauLonDestino: number;

    //converter tempo para graus origem
    minToGrauLatOrigem = object.origem.latitude.minutos * (1 / 60);
    segToGrauLatOrigem = object.origem.latitude.segundos * (1 / 60) * (1 / 60);

    minToGrauLonOrigem = object.origem.longitude.minutos * (1 / 60);
    segToGrauLonOrigem = object.origem.longitude.segundos * (1 / 60) * (1 / 60);

    //converter tempo para graus destino
    minToGrauLatDestino = object.destino.latitude.minutos * (1 / 60);
    segToGrauLatDestino =
      object.destino.latitude.segundos * (1 / 60) * (1 / 60);

    minToGrauLonDestino = object.destino.longitude.minutos * (1 / 60);
    segToGrauLonDestino =
      object.destino.longitude.segundos * (1 / 60) * (1 / 60);

    let somaMinSegLatOrigem =
      object.origem.latitude.grau + minToGrauLatOrigem + segToGrauLatOrigem;
    let somaMinSegLonOrigem =
      object.origem.longitude.grau + minToGrauLonOrigem + segToGrauLonOrigem;
    let somaMinSegLatDestino =
      object.destino.latitude.grau + minToGrauLatDestino + segToGrauLatDestino;
    let somaMinSegLogDestino =
      object.destino.longitude.grau + minToGrauLonDestino + segToGrauLonDestino;

    if (
      object.origem.latitude.sentido === 'S' ||
      object.origem.latitude.sentido == 'W'
    ) {
      somaMinSegLatOrigem = somaMinSegLatOrigem * -1;
    }

    if (
      object.origem.longitude.sentido === 'S' ||
      object.origem.longitude.sentido == 'W'
    ) {
      somaMinSegLonOrigem = somaMinSegLonOrigem * -1;
    }

    if (
      object.destino.latitude.sentido === 'S' ||
      object.destino.latitude.sentido == 'W'
    ) {
      somaMinSegLatDestino = somaMinSegLatDestino * -1;
    }

    if (
      object.destino.longitude.sentido === 'S' ||
      object.destino.longitude.sentido == 'W'
    ) {
      somaMinSegLogDestino = somaMinSegLogDestino * -1;
    }

    coordenadasValores.origem.latitude = somaMinSegLatOrigem;
    coordenadasValores.origem.longitude = somaMinSegLonOrigem;
    coordenadasValores.destino.latitude = somaMinSegLatDestino;
    coordenadasValores.destino.longitude = somaMinSegLogDestino;

    // console.log(coordenadasValores);

    return coordenadasValores;
  }

  teste1 = this.converteTempoParaGraus(this.meuObjeto);

  public encontraDistanciaOrigemDestino(
    valoresDeCoordenadas: CoordenadasSomadas
  ) {
    valoresDeCoordenadas.origem.latitude =
      valoresDeCoordenadas.origem.latitude * (3.13159 / 180);

    valoresDeCoordenadas.origem.longitude =
      valoresDeCoordenadas.origem.longitude * (3.13159 / 180);

    valoresDeCoordenadas.destino.latitude =
      valoresDeCoordenadas.destino.latitude * (3.13159 / 180);

    valoresDeCoordenadas.destino.longitude =
      valoresDeCoordenadas.destino.longitude * (3.13159 / 180);

    // console.log(valoresDeCoordenadas);

    let diferençaCoordenadas = {
      latitude:
        valoresDeCoordenadas.origem.latitude -
        valoresDeCoordenadas.destino.latitude,
      longitude:
        valoresDeCoordenadas.origem.longitude -
        valoresDeCoordenadas.destino.longitude,
    };

    if (diferençaCoordenadas.latitude < 0) {
      diferençaCoordenadas.latitude = diferençaCoordenadas.latitude * -1;
    }

    if (diferençaCoordenadas.longitude < 0) {
      diferençaCoordenadas.longitude = diferençaCoordenadas.longitude * -1;
    }

    // console.log(diferençaCoordenadas);

    let Haversine = //equacao de Haversine
      (Math.pow(Math.sin(diferençaCoordenadas.latitude / 2), 2) +
        Math.cos(valoresDeCoordenadas.origem.latitude)) *
      Math.cos(valoresDeCoordenadas.destino.latitude) *
      Math.pow(Math.sin(diferençaCoordenadas.longitude / 2), 2);

    let eqIntermediaria =
      2 * Math.atan(Math.sqrt(Haversine) / Math.sqrt(1 - Haversine));

    // console.log(eqIntermediaria);

    let distEntreOrigemDestino = (6371 * eqIntermediaria).toFixed(2); //6371 é o raio da terra

    // console.log(distEntreOrigemDestino);
    return distEntreOrigemDestino;
  }

  distanciaTotal = this.encontraDistanciaOrigemDestino(this.teste1);

  ngOnInit(): void {}
}
