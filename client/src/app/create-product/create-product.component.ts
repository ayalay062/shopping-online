import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createProduct, editProduct } from '../store/actions/products.actions';
import { IProduct } from 'src/models/product.model';
import { ProductService } from '../services/product.service';
import { ICategory } from 'src/models/category.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;

  @Output() submit = new EventEmitter();
  @Input() selectedProduct: IProduct;
  fileInputLabel: string;
  action: string = 'edit';
  categories: ICategory[];
  message: string;
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<IState>, private productService: ProductService) {
    this.productService.getCategories().subscribe(categories => { console.log("categories", categories); this.categories = categories })
    this.buildForm();

  }

  buildForm() {
    this.action = this.selectedProduct ? 'edit' : 'create'
    this.form = this.fb.group({
      name: this.fb.control(this.selectedProduct?.name || '', [Validators.required]),
      categoryId: this.fb.control(this.selectedProduct?.categoryId || '', [Validators.required]),
      price: this.fb.control(this.selectedProduct?.price || '', [Validators.required]),
      image: this.fb.control(this.selectedProduct?.image || '', [Validators.required]),
    });
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.form.get('image').setValue(file);
  }
  ngOnChanges() {
    this.buildForm();
  }

  createOrUpdateProduct(image) {
    const { name, categoryId, price } = this.form.value;
    const params = { name, categoryId, price, image };
    if (this.selectedProduct) {
      this.store.dispatch(editProduct({ productId: this.selectedProduct._id, update: params}));
    } else {
      this.store.dispatch(createProduct(params));
    } 
    this.message = `product successfully ${this.selectedProduct ? 'updated' : 'added'}`;
  
    this.form.reset();
    this.submit.emit();
  }

  create() {
      const image = this.form.get('image').value;
    if (typeof image === 'string') {
      return this.createOrUpdateProduct(image);
    }
    this.productService.uploadImage(image).subscribe({ 
      next: res => {
        return this.createOrUpdateProduct(`upload/${res.uploadedFile.filename}`);
      },
    })

  }

}
