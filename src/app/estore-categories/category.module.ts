import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryRoutingModule } from '@app/estore-categories/category-routing.module';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule } from '@angular/forms';
import { SearchSelectModule } from '@app/search-select/search-select.module';
import { EstoreCategoriesComponent } from '@app/estore-categories/estore-categories.component';
import { AddCategoryComponent } from '@app/estore-categories/add-category/add-category.component';
import { CategoryService } from '@app/estore-categories/category.service';

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
    CategoryRoutingModule
  ],
  declarations: [
    EstoreCategoriesComponent, AddCategoryComponent],
  providers: [ CategoryService ]
})
export class CategoryModule { }
