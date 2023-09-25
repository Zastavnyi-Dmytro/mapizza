import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { DiscountsRequest } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  private discountCollection: CollectionReference<DocumentData>
  public currentId!:string

  constructor(
    private afs: Firestore
  ) { 
    this.discountCollection = collection(this.afs, "discounts")
   }

  getDiscounts(){
    return collectionData(this.discountCollection, {idField:'id'})
  }

  getOneDiscount(id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return docData(discountDocumentReference, {idField:'id'})
  }

  create(blog:DiscountsRequest){
    return addDoc(this.discountCollection, blog)
  }

  edit(blog:DiscountsRequest, id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return updateDoc(discountDocumentReference, {...blog})
  }

  delete(id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`)
    return deleteDoc(discountDocumentReference)
  }
}
