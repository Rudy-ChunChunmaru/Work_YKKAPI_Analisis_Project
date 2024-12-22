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
    Description ?: string;
    Fabrication ?: string;
    ProsesNo ?: string;
    Length ?: string;
    QtyUnit ?: string;
    Remark ?: string;
}

export type PartListType = {
    Description ?: string;
    PartNo ?: string;
    Colour?:string;
    QtyUnit ?: string;
    Remark ?: string;
    FS ?: string;
}

export type FromulaListType = {
    Varibale ?:string;
    Type ?:string;
    Colom ?:string;
    Formula ?:string;
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