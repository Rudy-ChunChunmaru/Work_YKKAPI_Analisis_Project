import { ReactGrid,Row,Column } from "@silevis/reactgrid";
import React,{ useState } from "react";
import {MaterialListType} from "./type";

type BomManufacturingType = {
    allData : any;
    setBom : React.Dispatch<React.SetStateAction<{MaterialBom: MaterialListType[];PartBom: {}[];FormulaBom: {}[];} | null>>;
    bom : {MaterialBom: MaterialListType[];PartBom: {}[];FormulaBom: {}[];} | null;
}


const getColumns = (): Column[] => [
    { columnId: "BOM_ID", width: 50 },
    { columnId: "BOM_SUB_ID", width: 75 },
    { columnId: "Sequences", width: 75 },
    { columnId: "PageNo", width: 50 },
    { columnId: "Project_No", width: 100 },
    { columnId: "Order_No", width: 100 },
    { columnId: "Item_No", width: 75 },
    { columnId: "ItemUnit", width: 100 },
    { columnId: "Item_Code", width: 100 },
    { columnId: "Unit_Code", width: 100 },
    { columnId: "Cls_IOM", width: 75 },
    { columnId: "Description", width: 200 },
    { columnId: "Color", width: 50 },
    { columnId: "FabricationNo", width: 150 },
    { columnId: "FabNo", width: 50 },
    { columnId: "Length", width: 50 },
    { columnId: "QtyUnit", width: 75 },
    { columnId: "Qty", width: 50 },
    { columnId: "Remark", width: 150 },
    { columnId: "Remark2", width: 150 },
    { columnId: "Remark3", width: 150 },
    { columnId: "Remark4", width: 150 },
    { columnId: "Weight_M", width: 150 },
    { columnId: "Weight_kg", width: 150 },
];
  
const headerRow: Row = {
    rowId: "header",
    cells: [
        { text: "BOM_ID", type:"header" },
        { text: "BOM_SUB_ID", type:"header" },
        { text: "Sequences", type:"header" },
        { text: "PageNo", type:"header" },
        { text: "Project_No", type:"header" },
        { text: "Order_No", type:"header" },
        { text: "Item_No", type:"header" },
        { text: "ItemUnit", type:"header" },
        { text: "Item_Code", type:"header" },
        { text: "Unit_Code", type:"header" },
        { text: "Cls_IOM", type:"header" },
        { text: "Description", type:"header" },
        { text: "Color", type:"header" },
        { text: "FabricationNo", type:"header" },
        { text: "FabNo", type:"header" },
        { text: "Length", type:"header" },
        { text: "QtyUnit", type:"header" },
        { text: "Qty", type:"header" },
        { text: "Remark", type:"header" },
        { text: "Remark2", type:"header" },
        { text: "Remark3", type:"header" },
        { text: "Remark4", type:"header" },
        { text: "Weight_M", type:"header" },
        { text: "Weight_kg", type:"header" }
    ]
};

const getRows = (list: MaterialListType[]): Row[] => [
    headerRow,
    ...list.map<Row>((value, index) => ({
      rowId: index,
      cells: [
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:'Madoguchi_Master.Project_No'},
        { type: "text", text:'Madoguchi_Master.Order_No'},
        { type: "text", text:'Madoguchi_Detail.Item_No'},
        { type: "text", text: value.Cls_IOM == 'inner' ? '2' : (value.Cls_IOM == 'outer' ? '1' : '')},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text: value.Cls_IOM ? value.Cls_IOM.toUpperCase() : ''},
        { type: "text", text: value.Description ? value.Description : ''},
        { type: "text", text:''},
        { type: "text", text: value.FabricationNo ? value.FabricationNo : ''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''},
        { type: "text", text:''}
      ]
    }))
];

const getList = (): MaterialListType[] => {
    return [
        {  },
        {  },
        {  }
    ]
};

const BomManufacturing = ({allData,setBom,bom}:BomManufacturingType) => {

    const [list,setList] = useState<MaterialListType[]>(getList());

    const rows = getRows(list);
    const columns = getColumns();


    const loadList = ():MaterialListType[] =>{
        const findColValue = (valCol:any,title:string):string | undefined => {
            if(Array.isArray(valCol)){
                let resultValue = ''
                valCol.map((valueCol)=>{
                    if(valueCol?.title)
                        if(valueCol.title === title){
                            resultValue = valueCol?.value
                            return;
                        } 
                })
                return resultValue;
            }
            else return undefined
        }

        if(allData?.dataMaterial && Array.isArray(allData.dataMaterial)){
            return [...allData.dataMaterial.map((value:any)=>{return { 
                'Description': findColValue(value,'DESCRIPTION'),
                'Cls_IOM': allData?.category ? allData.category : '',
                'FabricationNo': findColValue(value,'FAB No.')
            } }
            )]
        }else{
            return []
        }
    }

    return <div className="w-full flex flex-col px-5 gap-2">
        <div className="w-full border-b-2 border-black">Manufacturing BOM</div>
        <div className="flex gap-2 bg-blue-200 px-2 py-1 rounded-md">
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList(loadList())}>Load Data</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3">Clear</div>
        </div>
        <div className="w-full text-xs overflow-auto p-b-3 border-2">
            <ReactGrid rows={rows} columns={columns} />
        </div>
    </div>
}  

export default BomManufacturing;