import { ReactGrid,Row,Column,CellChange,TextCell } from "@silevis/reactgrid";
import React,{ useEffect,useState } from "react";
import {MaterialListType,PartListType,FromulaType,FromulaListType} from "./type";

type ManufacturingType = {
    allData : any;
    setBom : React.Dispatch<React.SetStateAction<{MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;}>>;
    bom : {MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;};
}

const getColumns = (): Column[] => [
    { columnId: "Description", width: 250 },
    { columnId: "Fabrication", width: 150 },
    { columnId: "ProsesNo", width: 100 },
    { columnId: "Length", width: 200 },
    { columnId: "QtyUnit", width: 200 },
    { columnId: "Remark", width: 250 },
];
  
const headerRow: Row = {
    rowId: "header",
    cells: [
        { text: "Description", type:"header" },
        { text: "Fabrication", type:"header" },
        { text: "ProsesNo", type:"header" },
        { text: "Length", type:"header" },
        { text: "QtyUnit", type:"header" },
        { text: "Remark", type:"header" },
    ]
};

const getRows = (list: MaterialListType[]): Row[] => [
        headerRow,
        ...list.map<Row>((value, index) => ({
          rowId: index,
          cells: [
            { type: "text", text: value.Description ? value.Description : ''},
            { type: "text", text: value.Fabrication ? value.Fabrication : ''},
            { type: "text", text: value.ProsesNo ? value.ProsesNo : ''},
            { type: "text", text: value.Length ? value.Length : ''},
            { type: "text", text: value.QtyUnit ? value.QtyUnit : ''},
            { type: "text", text: value.Remark ? value.Remark : ''},
          ]
        }))
];

    
    

const getList = (): MaterialListType[] => {
    return [
        {
            'Description': '',
            'Fabrication': '',
            'ProsesNo': '',
            'Length': '',
            'QtyUnit': '',
            'Remark': '',
        }
    ]
};

const Manufacturing = ({allData,setBom,bom}:ManufacturingType) => {
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
            return [...allData.dataMaterial.map((value:any)=>{
                const fabricationNo = findColValue(value,'FAB No.');
                const description = findColValue(value,'DESCRIPTION');
                const formulaCuting = findColValue(value,'CUT FORM');
                
                
                return { 
                    'Description': description ? description : '',
                    'Fabrication': fabricationNo ? (fabricationNo?.split("-").length > 1 ? `${fabricationNo?.split("-")[0]}-${fabricationNo?.split("-")[1]}` : fabricationNo ) : '',
                    'ProsesNo': fabricationNo ? (fabricationNo?.split("-").length > 1 ? `${fabricationNo?.split("-")[2]}` : fabricationNo ) : '',
                    'Length': formulaCuting ? formulaCuting : '',
                    'QtyUnit': findColValue(value,'QTY'),
                    'Remark': '',
                }
            }
            )]
        }else return []
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

    const makeFormula = async () =>{
        let newFromulaArray:FromulaListType[] = new Array()

        const chekFromula = async(strformula:string,colom:string) => {
            let status = true

            await bom.Formula.FormulaList.map((value)=>{
                if(value.Formula == strformula && value.Type == 'm' && value.Colom == colom)
                    status = false
            })
                
            return {
                status : status,
                formula : strformula
            }
        }

        const addNewFormula = (Formula:string | undefined,colom:string) => {
            if(newFromulaArray.filter((datavalue)=>datavalue.Formula == Formula && datavalue.Colom == colom).length == 0){
                newFromulaArray.push({
                    'Varibale': '',
                    'Type': 'm',
                    'Colom': colom,
                    'Formula': Formula,
                    'Result': '',
                })
            }
        }

      
        await ['HS','WS',...bom.Formula.variable.map((value)=>value.code)].map((value)=>{
            list.map((valueList)=>{
                if(valueList.Length?.includes(value)){
                    chekFromula(valueList.Length,'Length').then((resultchek)=>{
                        resultchek.status && addNewFormula(valueList.Length,'Length')
                    })
                }
            })
        })

        return newFromulaArray
    }

    const saveFormula = (data:FromulaListType[]) =>{
        const countLengDataM =  bom.Formula.FormulaList.filter((value)=>value.Type == 'm').length;
        const addvariableindataFromula = [
            ...data.map((val,ind)=>{
                const varibale = `m${countLengDataM + ind + 1}`
                return {
                    ...val,
                    Varibale:varibale
                }
            })
        ]

        setBom({...bom,'Formula':{...bom.Formula,
            FormulaList:[...bom.Formula.FormulaList,...addvariableindataFromula]
        }})

        return addvariableindataFromula
    }

    const changeListToFromula = (data:FromulaListType[]) => {
        const listchange = [...list.map((valuelist)=>{
            const vairable = data.find((valuedata)=>valuedata.Formula == valuelist.Length)
            if(vairable)
                return {
                    ...valuelist,
                    Length:vairable.Varibale
                }
            else
                return {
                    ...valuelist,
                }
        })]

        setList(listchange)
    }

    useEffect(()=>{
        if(list != undefined && list != getList())
            setBom({...bom,'MaterialBom':list})
    },[list])

    return <div className="w-full flex flex-col px-5 gap-2">
        <div className="w-full border-b-2 border-black">Manufacturing BOM</div>
        <div className="flex gap-2 bg-blue-200 px-2 py-1 rounded-md">
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList(loadList())}>Load Data</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([])}>Clear</div>

            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([...getList(),...list])}>Add Row</div>

            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>{
                makeFormula().then((data)=>{
                    changeListToFromula(saveFormula(data))
                })
            }}>Make Formula</div>
        </div>
        <div className="w-full text-xs overflow-auto pb-3 border-2 h-96">
            <ReactGrid rows={rows} columns={columns} onCellsChanged={(changes: CellChange<any>[]) => {applyChangesToList(changes)}} />
        </div>
    </div>
}  

export default Manufacturing;