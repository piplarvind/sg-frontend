import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsRoutingModule } from '@app/estore-products/products-routing.module';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { EstoreProductsComponent } from '@app/estore-products/estore-products.component';
import { AddProductComponent } from '@app/estore-products/add-product/add-product.component';
import { ProductsService } from '@app/estore-products/products.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    GooglePlaceModule,
    SearchSelectModule,
    SharedModule,
    FormsModule,
    ProductsRoutingModule
  ],
  declarations: [ EstoreProductsComponent, AddProductComponent],
  providers: [ ProductsService ]
})
export class ProductsModule { }
