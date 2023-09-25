import { Component } from '@angular/core';
import { ref, uploadBytesResumable, percentage, getDownloadURL, deleteObject, Storage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  addMenu = false
  editMode = false
  editId!: number | string
  uploadPercent!: number
  isUploaded = false
  showProgress!:boolean
  deletedImg = false
  categoryNumber = 1

  public categoryForm!: FormGroup

  public adminCategories: Array<Category> = []

  constructor(
    private categoryBase: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }
  ngOnInit(): void {
    this.getCategories()
    this.initDiscountForm()
  }

  getCategories(): void {
    this.categoryBase.getCategory().subscribe(data => {
      this.adminCategories = data as Category[]
    })
  }

  openAddMenu() {
    this.addMenu = !this.addMenu
  }

  initDiscountForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path:[null, Validators.required],
      img: [null, Validators.required],
    })
  }

  addCategory() {
    if (this.editMode) {
      this.categoryBase.edit(this.categoryForm.value, this.editId as string).then(() => {
        this.getCategories()
        this.categoryForm.reset()
      })
      this.editMode = false
      this.addMenu = false
    }
    else {
      this.categoryBase.create(this.categoryForm.value).then(() => {
        this.getCategories()
        this.categoryForm.reset()
        this.addMenu = false
      })
    }
    this.isUploaded = false
    this.uploadPercent = 0
    this.showProgress = false
  }

  editCategory(category: Category): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      img:category.img
    })
    this.isUploaded = true
    this.addMenu = true
    this.editMode = true
    this.editId = category.id as number
  }

  deleteCategory(category: Category): void {
    this.categoryBase.delete(category.id as string).then(() => {
      this.getCategories()
      this.uploadPercent = 0
    })
  }

  upload(event: any): void {
    this.showProgress = true
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data=>{
      this.categoryForm.patchValue({
        img:data
      })
      this.deletedImg = false
      this.isUploaded = true
    })
    .catch(err=>{
      console.log(err)
    })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = ''
    if (file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e)
      }
    }
    else {
      console.log('Помилка')
    }
    return Promise.resolve(url)
  }

  valueByControl(control:string):string{
    return this.categoryForm.get(control)?.value
  }

  deleteImg():void{
    const task = ref(this.storage, this.valueByControl('img'));
    deleteObject(task).then(()=>{
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        img:[null]
      })
    },()=>{
      this.isUploaded = false
    })
    this.deletedImg = true
    this.showProgress = false
  }
}
