import { MaterialListType,PartListType,FromulaType } from "../breakdown/type";

export type dataSubHeaderType = {
    title: string;
    colom_start: number;
    colom_end: number;
  };
  
export type dataType = {
    title: string;
    value: string;
  };

export type dataLocalstorageType = {
    id:string,
    name:string,
    brand:string,
    category:string,
    note:string,
    headerMaterial:dataSubHeaderType[],
    dataMaterial:dataType[][],
    headerPart:dataSubHeaderType[],
    dataPart:dataType[][]
    breakdown?:{'MaterialBom':MaterialListType[],'PartBom':PartListType[],'Formula':FromulaType}
}