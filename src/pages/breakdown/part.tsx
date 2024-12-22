import { ReactGrid,Row,Column,CellChange,TextCell } from "@silevis/reactgrid";
import React,{ useEffect,useState } from "react";
import {MaterialListType,PartListType,FromulaType} from "./type";

type PartType = {
    allData : any;
    setBom : React.Dispatch<React.SetStateAction<{MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;}>>;
    bom : {MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;};
}

const getColumns = (): Column[] => [
    { columnId: "Description", width: 250 },
    { columnId: "PartNo", width: 150 },
    { columnId: "Colour", width: 150 },
    { columnId: "QtyUnit", width: 200 },
    { columnId: "Remark", width: 250 },
    { columnId: "FS", width: 150 },
];

const headerRow: Row = {
    rowId: "header",
    cells: [
        { text: "Description", type:"header" },
        { text: "PartNo", type:"header" },
        { text: "Colour", type:"header" },
        { text: "QtyUnit", type:"header" },
        { text: "Remark", type:"header" },
        { text: "FS", type:"header" },
    ]
};

const getRows = (list: PartListType[]): Row[] => [
    headerRow,
    ...list.map<Row>((value, index) => ({
      rowId: index,
      cells: [
        { type: "text", text: value.Description ? value.Description : ''},
        { type: "text", text: value.PartNo ? value.PartNo : ''},
        { type: "text", text: value.Colour ? value.Colour : ''},
        { type: "text", text: value.QtyUnit ? value.QtyUnit : ''},
        { type: "text", text: value.Remark ? value.Remark : ''},
        { type: "text", text: value.FS ? value.FS : ''},
      ]
    }))
];


const getList = (): PartListType[] => {
    return [
        {
            'Description': '',
            'PartNo': '',
            'Colour': '',
            'QtyUnit': '',
            'Remark': '',
            'FS': '',
        }
    ]
};

const Part = ({allData,setBom,bom}:PartType) => {

    const [list,setList] = useState<PartListType[]>(bom?.PartBom ? bom?.PartBom : []);

    const columns = getColumns();
    const rows = getRows(list);

    const loadList = ():PartListType[] =>{
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

        const generateFormula = (qtyUnit:string,formulaLength:string):{result:boolean,code?:string} => {
            let result = true;
            let code = '';
            let rumus = '';
           
            if(bom?.Formula){
                if(qtyUnit)
                    rumus = qtyUnit
                if(formulaLength)
                    rumus += `*(${formulaLength})`

                
                if(rumus){
                    if(bom && bom?.Formula && bom.Formula?.FormulaList){
                        const FormulaList = bom.Formula.FormulaList;
                        console.log(FormulaList);
                        if(Array.isArray(FormulaList) && FormulaList.length){
                            
                        }
                        // setBom({..bom,'Formula':{...bom.Formula,FormulaList:[...bom.Formula.FormulaList.map((value)=>{

                        // })]}})

                    }
                   
                }else result = false


            }

            return({
             result:result,
             code:code
            })

        }

        if(allData?.dataPart && Array.isArray(allData.dataPart)){
            return [...allData.dataPart.map((value:any,index:number)=>{
                const colour = findColValue(value,'COLOR');
                const fs = findColValue(value,'At Site');
                const remark = findColValue(value,'REMARKS');
                const qtyUnit = findColValue(value,'QTY')
                const partNo = findColValue(value,'PART No.')
                const description = findColValue(value,'DESCRIPTION');

                const formulaLength = findColValue(value,'LENGTH')  
                let formulaStirng = ''
                if(formulaLength)
                    formulaStirng = qtyUnit + '*(' + formulaLength + ')';
                
                let isnum = true
                if(qtyUnit)
                    isnum = /^\d+$/.test(qtyUnit);

                let resultGenerate 
                if((!isnum || formulaLength) && qtyUnit)
                    resultGenerate =  generateFormula(qtyUnit,formulaLength ? formulaLength : '')

                return { 
                    'Description':description ? description : '',
                    'PartNo': partNo ? partNo : '',
                    'Colour': colour ? colour : '',
                    'QtyUnit': formulaStirng ? formulaStirng : (qtyUnit ? qtyUnit : ''),
                    'Remark': remark ? remark : '',
                    'FS': fs ? fs : ''
                }
            }
            )]
        }else return [];  
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
            setBom({...bom,'PartBom':list})
    },[list])

    return <div className="w-full flex flex-col px-5 gap-2">
        <div className="w-full border-b-2 border-black">Part BOM</div>
        <div className="flex gap-2 bg-blue-200 px-2 py-1 rounded-md">
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList(loadList())}>Load Data</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([])}>Clear</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([...getList(),...list])}>Add Row</div>
        </div>
        <div className="relative rela w-full text-xs overflow-auto p-b-3 border-2 h-96">
            <ReactGrid rows={rows} columns={columns} onCellsChanged={(changes: CellChange<any>[]) => {applyChangesToList(changes)}} />
        </div>
    </div>
}  

export default Part;