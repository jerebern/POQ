import { NameType } from './nameType';

export class SearchParams {
  private nameType: NameType | null;
  private searchName: string | null;
  constructor(searchName: string | null, nameType: null | NameType) {
    this.searchName = searchName;
    this.nameType = nameType;
  }

  public get NameType() {
    return this.nameType;
  }
  public get SearchName() {
    return this.searchName?.toLocaleUpperCase().trim();
  }
}
