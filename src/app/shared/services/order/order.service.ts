import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order, Products } from '../../interface';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCollection: CollectionReference<DocumentData>
  public orders:Array<Products> = []

  constructor(
    private afs: Firestore
  ) { 
    this.orderCollection = collection(this.afs, "orders")
  }

  changeBasket = new Subject<boolean>();
  changeTotal = new Subject<number>();
  changeCount = new Subject<number>();

  create(order:Order) {
    return addDoc(this.orderCollection, order)
  }

  getOrders(){
    return collectionData(this.orderCollection, {idField:'id'})
  }

  delete(id:string){
    const orderCollection = doc(this.afs, `orders/${id}`)
    return deleteDoc(orderCollection)
  }

  edit(order:boolean, id:string){
    const orderDocumentReference = doc(this.afs, `orders/${id}`)
    if(order){
      return updateDoc(orderDocumentReference, {status:false})
    }
    else{
      return updateDoc(orderDocumentReference, {status:true})
    }
  }
}
