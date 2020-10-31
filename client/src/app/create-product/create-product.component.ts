import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createProduct, editProduct } from '../store/actions/products.actions';
import { IProduct } from 'src/models/product.model';
import { ProductService } from '../services/product.service';
import { ICategory } from 'src/models/category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;

  selectedProduct: IProduct;
  fileInputLabel: string;
  action: string = 'edit';
  categories: ICategory[];
  message: string;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<IState>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateProductComponent>
  ) {
    this.productService.getCategories().subscribe((categories) => {
      console.log('categories', categories);
      this.categories = categories;
    });
  }
  ngOnInit() {
    if (this.data && this.data.selectedProduct) {
      this.selectedProduct = this.data.selectedProduct;
    }
    this.buildForm();
  }
  buildForm() {
    this.action = this.selectedProduct ? 'edit' : 'create';
    this.form = this.fb.group({
      name: this.fb.control(this.selectedProduct?.name || '', [
        Validators.required,
      ]),
      categoryId: this.fb.control(this.selectedProduct?.categoryId || '', [
        Validators.required,
      ]),
      price: this.fb.control(this.selectedProduct?.price || '', [
        Validators.required,
      ]),
      image: this.fb.control(this.selectedProduct?.image || '', [
        Validators.required,
      ]),
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
  cancel() {}
  createOrUpdateProduct(image) {
    const { name, categoryId, price } = this.form.value;
    const params = { name, categoryId, price, image };
    if (this.selectedProduct) {
      this.store.dispatch(
        editProduct({ productId: this.selectedProduct._id, update: params })
      );
    } else {
      this.store.dispatch(createProduct(params));
    }
    this.message = `Product successfully ${
      this.selectedProduct ? 'updated' : 'added'
    }`;

   
  setTimeout(() => {
    this.close();
    this.form.reset();
  }, 1000);
  
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close();
    }
  }
  create() {
    const image = this.form.get('image').value;
    if (typeof image === 'string') {
      return this.createOrUpdateProduct(image);
    }
    this.productService.uploadImage(image).subscribe({
      next: (res) => {
        return this.createOrUpdateProduct(
          `upload/${res.uploadedFile.filename}`
        );
      },
    });
  }
}
