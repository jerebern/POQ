import { NameType } from "../../enum/nameType"
import { Year } from "./year"

export interface NameData {
    years : Year[]
    name : string|null,
    nameType : NameType
    totalUse : number
}
