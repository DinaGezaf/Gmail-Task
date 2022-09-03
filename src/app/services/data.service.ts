import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Email } from '../model/email.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _emails: BehaviorSubject<Email[]>;
  private dataStore: { emails: Email[] };

  constructor(private http: HttpClient) {
    this.dataStore = { emails: [] };
    this._emails = new BehaviorSubject<Email[]>([]);
  }

  get emails(): Observable<Email[]> {
    return this._emails.asObservable();
  }

  loadAll() {
    const emailsUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<Email[]>(emailsUrl).subscribe(
      (data) => {
        this.dataStore.emails = data;
        this._emails.next(Object.assign({}, this.dataStore).emails);
      },
      (error) => {
        console.log('Failed to fetch emails');
      }
    );
  }
  getPrimaryEmails() {
    return this.http
      .get<Email>('assets/primary.json')
      .toPromise()
      .then((res: any) => <Email[]>res.primaryEmails)
      .then((data) => {
        return data;
      });
  }
  getPromotionEmails() {
    return this.http
      .get<Email>('assets/primary.json')
      .toPromise()
      .then((res: any) => <Email[]>res.promotionsEmails)
      .then((data) => {
        return data;
      });
  }
  getSocialEmails() {
    return this.http
      .get<Email>('assets/primary.json')
      .toPromise()
      .then((res: any) => <Email[]>res.socialEmails)
      .then((data) => {
        return data;
      });
  }
}
