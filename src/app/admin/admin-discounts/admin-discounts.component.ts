import { Component } from '@angular/core';
import { ref, uploadBytesResumable, percentage, getDownloadURL, deleteObject, Storage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Discounts } from 'src/app/shared/interface';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent {
  public addMenu!:boolean
  public editMode!:boolean
  public editId!: number|string
  public uploadPercent!: number
  public isUploaded!:boolean
  public showProgress!:boolean
  public deletedImg!:boolean

  public discountForm!: FormGroup

  public adminDiscounts: Array<Discounts> = []

  constructor(
    public discountsBase: DiscountsService,
    public fb: FormBuilder,
    public storage: Storage,

  ) { }
  ngOnInit(): void {
    this.getDiscounts()
    this.initDiscountForm()
  }

  getDiscounts(): void {
    this.discountsBase.getDiscounts().subscribe(data => {
      this.adminDiscounts = data as Discounts[]
    })
  }

  openAddMenu() {
    this.addMenu = !this.addMenu
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      img: [null, Validators.required],
    })
  }

  addDiscount() {
    if (this.editMode) {
      this.discountsBase.edit(this.discountForm.value, this.editId as string).then(() => {
        this.getDiscounts()
        this.discountForm.reset()
      })
      this.editMode = false
      this.addMenu = false
      this.initDiscountForm()
    }
    else {
      this.discountsBase.create(this.discountForm.value).then(() => {
        this.getDiscounts()
        this.discountForm.reset()
        this.addMenu = false
        this.initDiscountForm()
      })
    }
    this.isUploaded = false
    this.uploadPercent = 0
    this.showProgress = false
  }

  editDiscount(discount: Discounts): void {
    this.discountForm.patchValue({
      name: discount.name,
      description: discount.description,
      img:discount.img
    })
    this.isUploaded = true
    this.addMenu = true
    this.editMode = true
    this.editId = discount.id
  }

  deleteDiscount(discount: Discounts): void {
    this.discountsBase.delete(discount.id as string).then(() => {
      this.getDiscounts()
      this.uploadPercent = 0
    })
  }

  upload(event: any): void {
    this.showProgress = true
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data=>{
      this.discountForm.patchValue({
        img:data
      })
      this.isUploaded = true
      this.deletedImg = false
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
        console.log(task)
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
    return this.discountForm.get(control)?.value
  }

  deleteImg():void{
    const task = ref(this.storage, this.valueByControl('img'));
    deleteObject(task).then(()=>{
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        img:[null]
      })
    },()=>{
      this.isUploaded = false
    })
    this.showProgress = false
    this.deletedImg = true
  }

  // convertTimestampToDateTime(timestamp: any) {
  //   const date = new Date(timestamp.seconds*1000);
  //   return date;
  // }
}
