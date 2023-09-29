import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from '../../interface';
import { CollectionReference, Firestore, DocumentData, collection, doc, updateDoc, collectionData, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>()
  private url = environment.BACKEND_URL
  private api = { auth: `${this.url}/auth` }
  private userCollection: CollectionReference<DocumentData>

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) { 
    this.userCollection = collection(this.afs, "users")
  }

  login(credential:Login):Observable<any>{
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  }

  getOneUser(id:string){
    const userDocumentReference = doc(this.afs, `users/${id}`)
    return docData(userDocumentReference, {idField:'id'})
  }

  edit(users:User, id:number){
    const userDocumentReference = doc(this.afs, `users/${id}`)
    return updateDoc(userDocumentReference, {...users})
  }
}
