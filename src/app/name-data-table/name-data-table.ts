import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NameDataRow } from '../name-data-row/name-data-row';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NameType } from '../../enum/nameType';
import { TableFilterType } from '../../enum/table-filter-type';
import replaceSpecialCharacters from 'replace-special-characters';
import { LocalDbService } from '../services/local-db-service';
import { SearchParams } from '../../enum/search-params';

@Component({
  selector: 'app-name-data-table',
  imports: [
    NameDataRow,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CdkColumnDef],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss',
})
export class NameDataTable implements OnInit {
  constructor(private localDbService: LocalDbService) {}
  nameDatas: NameData[] = []; //TODO COMPORTEMENT ICI A REFACTORISER
  @Output() viewEvent = new EventEmitter<NameData>();
  orderType: boolean = false;
  totalUseOrder: boolean = true;
  alphabeticalOrderName: boolean = false;
  filteredNoms: NameData[] = [];
  nameDataArrayIndex: number = 0;
  pageIndex: number = 0;
  typeFormControl = new FormControl('ALL');
  filterdNameFormControl = new FormControl();
  selectedFilters: TableFilterType[] = [];
  indexBound = 100;

  async ngOnInit() {
    await this.initNameData();
    this.initFormsSub();
    this.setnameDataFromPageIndex();
    this.orderByTotalOfUse();
  }

  initFormsSub() {
    this.typeFormControl.valueChanges.subscribe((value) => {
      this.setnameDataFromPageIndex(undefined, true);
    });
    this.filterdNameFormControl.valueChanges.subscribe((value) => {
      if (value == null || value == '') {
      } else {
        this.searchName();
      }
      this.setnameDataFromPageIndex(undefined, true);
    });
  }
  onViewEvent(nameData: NameData) {
    this.viewEvent.emit(nameData);
  }

  get disableNextButton() {
    return this.selectedFilters.find((element) => element == TableFilterType.NAME);
  }
  get disablePreviousButton() {
    if (this.pageIndex > 0) {
      return false;
    }
    return true;
  }

  get totalPage() {
    return Number(this.nameDatas.length / this.indexBound + 1).toFixed();
  }

  setnameDataFromPageIndex(action?: string, resetPageIndex?: boolean) {
    this.nameDatas.length;
    this.filteredNoms = [];
    if (action == 'NEXT' && this.nameDatas.length <= this.nameDatas.length + this.indexBound) {
      this.nameDataArrayIndex += this.indexBound;
      this.pageIndex++;
    } else if (action == 'PREVIOUS' && this.nameDataArrayIndex > 0) {
      this.nameDataArrayIndex -= this.indexBound;
      this.pageIndex--;
    }
    if (resetPageIndex) {
      this.pageIndex = 0;
    }

    let index = structuredClone(this.nameDataArrayIndex);
    while (index < this.nameDatas.length) {
      this.filteredNoms.push(this.nameDatas[index]);
      if (this.filteredNoms.length > 99) {
        break;
      }
      index++;
    }
  }

  resetIndexFromFilter() {
    this.pageIndex = 0;
    this.pageIndex = 0;
  }

  async initNameData() {
    this.resetIndexFromFilter();
    this.nameDatas = await this.localDbService.getNamesDatas();
  }

  async searchName() {
    let type: null | NameType = null;
    let searchStr: null | string = null;
    if (this.typeFormControl.value != null && this.typeFormControl.value != 'ALL') {
      type = this.typeFormControl.value as NameType;
    }
    if (this.filterdNameFormControl.value != null && this.filterdNameFormControl.value != '') {
      searchStr = replaceSpecialCharacters(this.filterdNameFormControl.value);
    }
    this.nameDatas = await this.localDbService.searchNameDatas(new SearchParams(searchStr, type));
    console.log(new SearchParams(searchStr, type));
    console.log(this.nameDatas);
    this.setnameDataFromPageIndex(undefined, true);
  }

  async orderByTotalOfUse() {
    if (!this.totalUseOrder) {
      this.nameDatas = this.nameDatas.sort((a, b) => a.totalUse - b.totalUse);
    } else {
      this.nameDatas = this.nameDatas.sort((a, b) => b.totalUse - a.totalUse);
    }
    this.totalUseOrder = !this.totalUseOrder;
    this.setnameDataFromPageIndex(undefined, true);
  }
  compareStringAlphabetical(nameA: string, nameB: string) {
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  orderByAlphabetical() {
    this.nameDatas.sort((a, b) => {
      if (!this.alphabeticalOrderName) {
        return this.compareStringAlphabetical(a.name!.toUpperCase(), b.name!.toUpperCase());
      } else {
        return this.compareStringAlphabetical(b.name!.toUpperCase(), a.name!.toUpperCase());
      }
    });
    this.alphabeticalOrderName = !this.alphabeticalOrderName;
    this.setnameDataFromPageIndex(undefined, true);
  }
  orderByType() {
    this.nameDatas.sort((a, b) => {
      if (!this.orderType) {
        return this.compareStringAlphabetical(a.nameType!.toUpperCase(), b.nameType!.toUpperCase());
      } else {
        return this.compareStringAlphabetical(b.nameType!.toUpperCase(), a.nameType!.toUpperCase());
      }
    });
    this.orderType = !this.orderType;
    this.setnameDataFromPageIndex();
  }
  grayBackground(rowIndex: number) {
    if (rowIndex % 2 == 1) {
      return '';
    } else {
      return 'grayRow';
    }
  }
}
