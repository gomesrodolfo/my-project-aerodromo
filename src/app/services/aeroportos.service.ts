import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AeroportosService {
  url = 'http://localhost:3000/employess'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}
}
