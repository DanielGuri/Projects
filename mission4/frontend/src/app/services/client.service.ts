import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  public async getAll(): Promise<ClientModel[]> {
    const observable = this.httpClient.get<ClientModel[]>(environment.clientsUrl);
    const clients = await firstValueFrom(observable);
    return clients;
  }

}
