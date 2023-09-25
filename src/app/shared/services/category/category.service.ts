import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { CategoryRequest } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection: CollectionReference<DocumentData>


  constructor(
    private afs: Firestore
  ) {  
    this.categoryCollection = collection(this.afs, "categories")
  }

  getCategory(){
    return collectionData(this.categoryCollection, {idField:'id'})
  }

  create(category:CategoryRequest){
    return addDoc(this.categoryCollection, category)
  }

  edit(category:CategoryRequest, id:string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return updateDoc(categoryDocumentReference, {...category})
  }

  delete(id:string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`)
    return deleteDoc(categoryDocumentReference)
  }
}
