import { ReactGrid,Row,Column,CellChange,TextCell } from "@silevis/reactgrid";
import React,{ useEffect,useState } from "react";
import {MaterialListType,PartListType,FromulaType} from "./type";

type BomManufacturingType = {
    allData : any;
    setBom : React.Dispatch<React.SetStateAction<{MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;}>>;
    bom : {MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;};
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
            { type: "text", text: value.BOM_ID ? value.BOM_ID : ''},
            { type: "text", text: value.BOM_SUB_ID ? value.BOM_SUB_ID : ''},
            { type: "text", text: value.Sequences ? value.Sequences : ''},
            { type: "text", text: value.PageNo ? value.PageNo : ''},
            { type: "text", text: value.Project_No ? value.Project_No : ''},
            { type: "text", text: value.Order_No ? value.Order_No : ''},
            { type: "text", text: value.Item_No ? value.Item_No : ''},
            { type: "text", text: value.ItemUnit ? value.ItemUnit : ''},
            { type: "text", text: value.Item_Code ? value.Item_Code : ''},
            { type: "text", text: value.Unit_Code ? value.Unit_Code : ''},
            { type: "text", text: value.Cls_IOM ? value.Cls_IOM: ''},
            { type: "text", text: value.Description ? value.Description : ''},
            { type: "text", text: value.Color ? value.Color : ''},
            { type: "text", text: value.FabricationNo ? value.FabricationNo : ''},
            { type: "text", text: value.FabNo ? value.FabNo : ''},
            { type: "text", text: value.Length ? value.Length : ''},
            { type: "text", text: value.QtyUnit ? value.QtyUnit : ''},
            { type: "text", text: value.Qty ? value.Qty : ''},
            { type: "text", text: value.Remark ? value.Remark : ''},
            { type: "text", text: value.Remark2 ? value.Remark2 : ''},
            { type: "text", text: value.Remark3 ? value.Remark3 : ''},
            { type: "text", text: value.Remark4 ? value.Remark4 : ''},
            { type: "text", text: value.Weight_M ? value.Weight_M : ''},
            { type: "text", text: value.Weight_kg ? value.Weight_kg : ''},
          ]
        }))
];

    
    

const getList = (): MaterialListType[] => {
    return [
        {
            'BOM_ID': '',
            'BOM_SUB_ID': '',
            'Sequences': '',
            'PageNo': '',
            'Project_No': '',
            'Order_No': '',
            'Item_No': '',
            'ItemUnit': '',
            'Item_Code': '',
            'Unit_Code': '',
            'Cls_IOM': '',
            'Description': '',
            'Color': '',
            'FabricationNo': '',
            'FabNo': '',
            'Length': '',
            'QtyUnit': '',
            'Qty': '',
            'Remark': '',
            'Remark2': '',
            'Remark3': '',
            'Remark4': '',
            'Weight_M': '',
            'Weight_kg': ''
        }
    ]
};

const BomManufacturing = ({allData,setBom,bom}:BomManufacturingType) => {
    const [list,setList] = useState<MaterialListType[]>(bom?.MaterialBom ? bom?.MaterialBom : getList());

    const columns = getColumns();
    const rows = getRows(list);

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
            return [...allData.dataMaterial.map((value:any,index:number)=>{
                const fabricationNo = findColValue(value,'FAB No.')
                const category = allData?.category;
                const description = findColValue(value,'DESCRIPTION');
                return { 
                    'BOM_ID': '',
                    'BOM_SUB_ID': '',
                    'Sequences': '',
                    'PageNo': '',
                    'Project_No': 'Madoguchi_Master.Project_No',
                    'Order_No': 'Madoguchi_Master.Order_No',
                    'Item_No': 'Madoguchi_Detail.Item_No',
                    'ItemUnit': category ? (category == 'inner' ? '2' : (category == 'outer' ? '1' : '' )): '',
                    'Item_Code': '',
                    'Unit_Code': '',
                    'Cls_IOM': category ? category.toUpperCase()  : '',
                    'Description': description ? description : '',
                    'Color': '',
                    'FabricationNo': fabricationNo ? (fabricationNo?.split("-").length > 1 ? `${fabricationNo?.split("-")[0]}-${fabricationNo?.split("-")[1]}` : fabricationNo ) : '',
                    'FabNo': fabricationNo ? (fabricationNo?.split("-").length > 1 ? `${fabricationNo?.split("-")[2]}` : fabricationNo ) : '',
                    'Length': category ? (category == 'inner' ? `MI-${index+1}` : (category == 'outer' ? `MO-${index+1}` : `MX-${index+1}` )): '',
                    'QtyUnit':findColValue(value,'QTY'),
                    'Qty': 'MADELA_ORDER_WINDOW_DETAIL.Qty * QtyUnit',
                    'Remark': '',
                    'Remark2': '',
                    'Remark3': '',
                    'Remark4': '',
                    'Weight_M': 'Prof_Master.M_WEIGHT_F',
                    'Weight_kg': 'Length*Qty*weight_M/1000'
                }
            }
            )]
        }else{
            return []
        }
    }

    const applyChangesToList = (
        changes: CellChange<TextCell>[],
    ) => {
        changes.forEach((change) => {
            try{
                const listIndex = Number(change.rowId);
                const fieldName = String(change.columnId);
                // console.log(listIndex,fieldName,change.newCell.text)
                // console.log(list[listIndex],list[listIndex])
                if(list){
                    setList(
                        [...list.map((value,index)=>{
                            if(index == listIndex){
                                const Colmchange:MaterialListType = value;
                                return {
                                    ...Colmchange,
                                    [fieldName]:change.newCell.text
                                }
                            }else return value;
                        })]
                    )
                }
            }catch(e){
                alert('error on changes proses');
            }
        });
        
    };

    useEffect(()=>{
        if(list != undefined && list != getList())
            setBom({...bom,'MaterialBom':list})
    },[list])

    return <div className="w-full flex flex-col px-5 gap-2">
        <div className="w-full border-b-2 border-black">Manufacturing BOM</div>
        <div className="flex gap-2 bg-blue-200 px-2 py-1 rounded-md">
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList(loadList())}>Load Data</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([])}>Clear</div>
        </div>
        <div className="w-full text-xs overflow-auto pb-3 border-2 h-96">
            <ReactGrid rows={rows} columns={columns} onCellsChanged={(changes: CellChange<any>[]) => {applyChangesToList(changes)}} />
        </div>
    </div>
}  

export default BomManufacturing;