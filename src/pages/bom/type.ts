export type  bomDataType = {
    'BomPart':any[],
    'BomMaterial':any[],
    'BomFormula':any[]
}

export type bomInfoType = {
    'id':string,
    'name':string,
    'brand':string,
    'category':string,
    'note':string
}

export type MaterialListType = {
    BOM_ID ?: string;
    BOM_SUB_ID?: string;
    Sequences?:string;
    PageNo?:string;
    Project_No?:string;
    Order_No?:string;
    Item_No?:string;
    ItemUnit?:string;
    Item_Code?:string;
    Unit_Code?:string;
    Cls_IOM?:string;
    Description?:string;
    Color?:string;
    FabricationNo?:string;
    FabNo?:string;
    Length?:string;
    QtyUnit?:string;
    Qty?:string;
    Remark?:string; 
    Remark2?:string;
    Remark3?:string;
    Remark4?:string;
    Weight_M?:string;
    Weight_kg?:string;
}

export type PartListType = {
    BOM_ID ?: string;
    BOM_SUB_ID?: string;
    Sequences?:string;
    PageNo?:string;
    Project_No?:string;
    Order_No?:string;
    Item_No?:string;
    ItemUnit?:string;
    Item_Code?:string;
    Unit_Code?:string;
    Cls_IOM?:string;
    Description?:string;
    PartNo?:string;
    Colour?:string;
    QtyUnit?:string;
    Qty?:string;
    Remark?:string;
    Remark2?:string;
    Remark3?:string;
    Remark4?:string;
    Remark5?:string;
    FS?:string;
}

export type FromulaListType = {
    BOM_ID?:string;
    FormulaCode?:string;
    Type?:string;
    Formula?:string;
    FormulaDesc?:string;
    FormulaSQL?:string;
    Result?:string;
}

export type variableType = {
    title:string;
    code:string;
    value:number;
}

export type logicType = {
    id:number;
    code:string;
    variable:string;
    logic:string;
    valueInput1:number;
    valueInput2:number;
    valueOutput:string;
}

export type FromulaType = {
    variable:variableType[];
    logic:logicType[];
    FormulaList:FromulaListType[];
}