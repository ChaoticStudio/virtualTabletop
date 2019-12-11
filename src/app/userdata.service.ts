import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(private _auth: AuthService, private _http: HttpClient) {}

  getUserName() {
    return this._http.get('/api/userdata' + '?jwt=' + this._auth.getToken())
  }
}
