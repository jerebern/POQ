import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NameData } from '../objects/name-data';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { NameType } from '../../enum/nameType';

@Component({
  selector: 'app-name-search-dialog',
  imports: [ MatIconModule,MatButtonModule, MatFormFieldModule,MatInputModule,FormsModule,ReactiveFormsModule,MatAutocompleteModule,AsyncPipe],
  templateUrl: './name-search-dialog.html',
  styleUrl: './name-search-dialog.scss'
})
export class NameSearchDialog implements OnInit {

  constructor(){}
  readonly dialogRef = inject(MatDialogRef<NameSearchDialog>)
  filteredOptions: Observable<NameData[]> = new Observable();
  data : NameData[] = inject(MAT_DIALOG_DATA);
  searchInputValue = new FormControl()
  
  ngOnInit(): void {
    this.filteredOptions = this.searchInputValue.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
    private _filter(value ?: string|NameData): NameData[] {
       let filterValue =""
      if(value!=undefined && value!=null){
        if(typeof value == "string"){
          filterValue = value.toUpperCase();
        }
        else if(value.name){
         filterValue = value.name
        }
        return this.data.filter(data => data.name?.toUpperCase().includes(filterValue)).slice(0,50);
      }
      return []
  }

  close(value ?: NameData){
    this.dialogRef.close(value)
  }
  filterResults(){
    for(let elemement of this.data){
      elemement.name?.match(this.searchInputValue.value)
    }
  }
  convertNameTypeToLetter(nameType : NameType){
    if(nameType == NameType.HOMME){
      return "H"
    }
    return "F"
  }

  displayFn(nameData: NameData|null) : string {
    if(nameData!= null && nameData.name){
    return nameData.name
    }
    return ""
  }
  viewClick() {
    this.close(this.searchInputValue.value)
  }
}
