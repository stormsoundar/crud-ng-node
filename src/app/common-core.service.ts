import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from './domain/registration';

@Injectable({
  providedIn: 'root',
})
export class CommonCoreService {
  public hostUrl = 'http://localhost:3000';
  constructor(public httpClient: HttpClient) {}

  // Create
  public postRegistration(registration: Registration) {
    const url = `${this.hostUrl}/create`;
    return this.httpClient.post(url, registration);
  }

  // Get All
  public getRegisteredData() {
    const url = `${this.hostUrl}/read`;
    return this.httpClient.get(url);
  }

  // Get One
  public getOneRegisteredData(id) {
    const url = `${this.hostUrl}/read/${id}`;
    return this.httpClient.get(url);
  }

  // Update One
  public updateOneRegisteredData(id, data) {
    const url = `${this.hostUrl}/update/${id}`;
    return this.httpClient.put(url, data);
  }

  // Delete One
  public deleteOneRegisteredData(id) {
    const url = `${this.hostUrl}/delete/${id}`;
    return this.httpClient.delete(url);
  }
}
