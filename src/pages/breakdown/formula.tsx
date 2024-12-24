import { ReactGrid,Row,Column,CellChange,TextCell } from "@silevis/reactgrid";
import React,{ useEffect,useState } from "react";
import {MaterialListType,PartListType,FromulaType,variableType,logicType,FromulaListType} from "./type";
import formula from "excel-formula";

type BomFormulaType = {
    allData : any;
    setBom : React.Dispatch<React.SetStateAction<{MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;}>>;
    bom : {MaterialBom: MaterialListType[];PartBom: PartListType[];Formula: FromulaType;};
}

export const getVariableData = ():variableType[] => {
    const vardata = [
        {title:'WS1',code:'WS1'},
        {title:'HS1',code:'HS1'},
        {title:'WS2',code:'WS2'},
        {title:'HS2',code:'HS2'},
        {title:'WS3',code:'WS3'},
        {title:'HS3',code:'HS3'},
        {title:'WS4',code:'WS4'},
        {title:'HS4',code:'HS4'},
        {title:'WS5',code:'WS5'},
        {title:'HS5',code:'HS5'},

        {title:'W1',code:'W1'},
        {title:'H1',code:'H1'},
        {title:'W2',code:'W2'},
        {title:'H2',code:'H2'},
        {title:'W3',code:'W3'},
        {title:'H3',code:'H3'},
        {title:'W4',code:'W4'},
        {title:'H4',code:'H4'},
        {title:'W5',code:'W5'},
        {title:'H5',code:'H5'},
        
        {title:'Qty',code:'Q'},
        {title:'GlassThickness',code:'GTH'},
        {title:'Width',code:'W'},
        {title:'Height',code:'H'},
        {title:'Base to Window',code:'F.'},
        {title:'Handle Height',code:'C.'},
        {title:'Outer to Inner',code:'A.'},
    ]

    return [...vardata.map((value)=>{return{title:value.title,code:value.code,value:0}})]
}

const getColumns = (): Column[] => [
    { columnId: "Varibale", width: 100 },
    { columnId: "Type", width: 50 },
    { columnId: "Colom", width: 100 },
    { columnId: "Formula", width: 600 },
    { columnId: "Result", width: 300 },
];

const headerRow: Row = {
    rowId: "header",
    cells: [
        { text: "Varibale", type:"header" },
        { text: "Type", type:"header" },
        { text: "Colom", type:"header" },
        { text: "Formula", type:"header" },
        { text: "Result", type:"header" },
    ]
};

const getRows = (list: FromulaListType[],variable:variableType[]): Row[] => [
    headerRow,
    ...list.map<Row>((value, index) => {
        const resultCalucation =()=> {
            let strFormula = value.Formula ? value.Formula : ''

            variable.map((value)=>{
                while(strFormula.includes(value.code)){
                    strFormula = strFormula.replace(value.code,`${value.value}`)
                }
            })

            try{
                return eval(formula.toJavaScript(strFormula))
            }catch{
                return NaN
            }
        } 

        return ({
            rowId: index,
            cells: [
              { type: "text", text: value.Varibale ? value.Varibale : ''},
              { type: "text", text: value.Type ? value.Type : ''},
              { type: "text", text: value.Colom ? value.Colom : ''},
              { type: "text", text: value.Formula ? value.Formula : ''},
              { type: "text", text: `${resultCalucation()}`},
            ]
        })
    })
];

const getList = (): FromulaListType[] => {
    return [
        {
            'Varibale': '',
            'Type': '',
            'Colom': '',
            'Formula': '',
            'Result': '',
        }
    ]
};

const Formula = ({allData,setBom,bom}:BomFormulaType) => {
    const [subMenu,setSubMenu] = useState<{variable:boolean,logic:boolean}>({'variable':false,'logic':false})
    const [variable,setVariable] = useState<variableType[]>(bom?.Formula?.variable.length > 0 ? bom.Formula.variable : getVariableData())
    const [logic,setLogic] = useState<logicType[]>(bom?.Formula?.logic ? bom?.Formula?.logic : [])
    const [list,setList] = useState<FromulaListType[]>(bom?.Formula?.FormulaList.length > 0 ? bom.Formula.FormulaList : []);

    const columns = getColumns();
    const rows = getRows(list,variable);

    const getVariableChange = (e:any) => {
        const title = e.target.id;
        const value = e.target.value;
        setVariable([...variable.map(
            (valueVariable)=>{
                if(valueVariable.title === title)
                    valueVariable.value = value
                return valueVariable
            }
        )])
    }

    const getLogicChange = (e:any) => {
        const title = e.target.id.split('-');
        const value = e.target.value;
        setLogic([...logic.map(
            (valueLogic)=>{
                if(valueLogic.id == title[1])
                    valueLogic = { ...valueLogic,
                        [title[0]]:value
                    }
                return valueLogic
                
            }
        )])
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
                                const Colmchange:FromulaListType = value;
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

    const getLogic = async () => {
        let formulaLogic:{variable:string,formula:string}[] = new Array()
        const arrayVariableLogic = [...new Set(logic.map((value)=>{return value.code}))]

        await arrayVariableLogic.map((value)=>{
            const arrayFromulaLogic = [...logic.filter((valueFromulaLogic)=>{
                return valueFromulaLogic.code === value
            })].sort((a,b)=>{
                if ( a.number < b.number ){
                    return -1;
                }
                if ( a.number > b.number ){
                    return 1;
                }
                  return 0;
            })

            let formula = ''
            let fromulaend = ''
            arrayFromulaLogic.map((valueFromulaLogic)=>{
                if(valueFromulaLogic.logic === '><' || valueFromulaLogic.logic === '><=' || valueFromulaLogic.logic === '>=<'|| valueFromulaLogic.logic === '>=<='){
                    let AndFromula = ''
                    if(valueFromulaLogic.logic === '>=<='){
                        AndFromula = `AND(${valueFromulaLogic.variable}>=${valueFromulaLogic.valueInput1},${valueFromulaLogic.variable}<=${valueFromulaLogic.valueInput2})`
                    }else if(valueFromulaLogic.logic === '><='){
                        AndFromula = `AND(${valueFromulaLogic.variable}>${valueFromulaLogic.valueInput1},${valueFromulaLogic.variable}<=${valueFromulaLogic.valueInput2})`
                    }else if(valueFromulaLogic.logic === '>=<'){
                        AndFromula = `AND(${valueFromulaLogic.variable}>=${valueFromulaLogic.valueInput1},${valueFromulaLogic.variable}<${valueFromulaLogic.valueInput2})`
                    }else{
                        AndFromula = `AND(${valueFromulaLogic.variable}>${valueFromulaLogic.valueInput1},${valueFromulaLogic.variable}<${valueFromulaLogic.valueInput2})`
                    }
                    formula += `IF(${AndFromula},${valueFromulaLogic.valueOutput},`
                    fromulaend += ')'
                }else{
                    formula += `IF((${valueFromulaLogic.variable+(valueFromulaLogic.logic ? valueFromulaLogic.logic : '<')+valueFromulaLogic.valueInput1}),${valueFromulaLogic.valueOutput},`
                    fromulaend += ')' 
                }
            })
            formulaLogic.push({variable:value,formula:formula+'0'+fromulaend})
        })
        return formulaLogic
    }

    const changeListToFromula = (formulaLogic:{variable:string,formula:string}[]) => {
        const listchange = [...list.map((valuelist)=>{
            const vairable = formulaLogic.find((valueformulaLogic)=> valuelist.Formula?.includes(valueformulaLogic.variable))
            if(vairable)
                return {
                    ...valuelist,
                    Formula:valuelist.Formula?.replace(vairable.variable,vairable.formula)
                }
            else
                return valuelist
        })]

        setList(listchange)
    }

    useEffect(()=>{
        if(list != undefined)
            setBom({...bom,'Formula':{...bom.Formula,FormulaList:list}})
    },[list])

    
    useEffect(()=>{
        console.log(logic)
        if(variable != getVariableData())
            setBom({...bom,'Formula':{...bom.Formula,variable:variable}})
        if(logic != undefined && logic.length > 0)
            setBom({...bom,'Formula':{...bom.Formula,logic:logic}})
    },
    [subMenu,variable,logic])


    return <div className="w-full flex flex-col px-5 gap-2">
        <div className="w-full border-b-2 border-black">Formula BOM</div>
        <div className="w-full flex flex-col pl-2">
            <div className="w-full px-1 border-b-2 border-black rounded-md hover:border-2 hover:bg-slate-400" onClick={()=>{setSubMenu({...subMenu,'variable':!subMenu.variable})}}>Variabel Formula</div>
            {subMenu.variable && (
                <div className="grid grid-cols-2 gap-1 w-full bg-gray-200 rounded-xl px-4 py-2 text-sm">
                    {variable && variable.map((value)=><div className="flex flex-row gap-10 hover:border-b-2 border-black">
                        <div className="w-[45%]">{value.title}</div>
                        <div className="w-[20%]">{value.code}</div>
                        <div className="w-[45%]"><input type='text' id={value.title} value={value.value} className="rounded-md px-2 border-black border-2" onChange={getVariableChange}/></div>
                    </div>)}
                </div>
            )
            }
            
            
            <div className="w-full px-1 border-b-2 border-black rounded-md hover:border-2 hover:bg-slate-400" onClick={()=>{setSubMenu({...subMenu,'logic':!subMenu.logic})}}>Logic Formula</div>
                {subMenu.logic && (
                    <div className="w-full bg-gray-200 rounded-xl px-4 py-2 text-sm">
                        <table className="w-full border-2 border-black border-collapse">
                            <tr>
                                <th className='border-2 border-black'>
                                    <div 
                                        className="bg-green-100 hover:bg-green-500" 
                                        onClick={()=>setLogic(
                                            [...logic,
                                                {id:logic.length+1,
                                                number:logic.length + 1,
                                                code:'',
                                                variable:'',
                                                logic:'',
                                                valueInput1:0,
                                                valueInput2:0,
                                                valueOutput:'',
                                            }]
                                        )}
                                    >
                                        +
                                    </div>
                                </th>
                                <th 
                                    className='border-2 border-black bg-blue-100 hover:bg-blue-500'
                                    onClick={()=>{
                                        setLogic([...logic.sort((a,b)=>{
                                            if ( a.number < b.number ){
                                                return -1;
                                            }
                                            if ( a.number > b.number ){
                                                return 1;
                                            }
                                              return 0;
                                        })])
                                    }}
                                >Num
                                </th>
                                <th className='border-2 border-black'>Variable</th>
                                <th className='border-2 border-black'>Logic</th>
                                <th className='border-2 border-black'>value</th>
                                <th className='border-2 border-black'>Output</th>
                            </tr>

                            {
                                logic && logic.map(
                                    (value)=>{
                                        if(value)
                                            return(
                                                <tr>
                                                    <td className="border-2 border-black">
                                                        <div 
                                                            id={`${value.id}`}
                                                            className="bg-red-100 hover:bg-red-500 text-center" 
                                                            onClick={(e:any)=>{
                                                                setLogic([...logic.filter((value)=>{
                                                                    return e.target.id != value?.id
                                                                })])
                                                            }}
                                                        >
                                                            -
                                                        </div>
                                                    </td>
                                                    <td className="border-2 border-black">
                                                        <input type="number" id={`number-${value.id}`} className="w-full px-1" value={value.number} onChange={getLogicChange} />
                                                    </td>
                                                    <td className="border-2 border-black">
                                                        <input type="text" id={`code-${value.id}`} className="w-full px-1" value={value.code} onChange={getLogicChange} />
                                                    </td>
                                                    <td className="border-2 border-black">
                                                        IF &nbsp;
                                                        <input type='text' id={`variable-${value.id}`} value={value.variable} className='w-[45%] text-center px-1' onChange={getLogicChange} />
                                                        &nbsp;
                                                        <select 
                                                            id={`logic-${value.id}`} 
                                                            className='w-[45%] text-center' 
                                                            onChange={getLogicChange}
                                                        >
                                                            <option value='<' selected={true}>less ({'<'})</option>
                                                            <option value='<='>less ({'<='})</option>
                                                            <option value='><'>between ({'>,<'})</option>
                                                            <option value='>=<='>between ({'>=,<='})</option>
                                                            <option value='>=<'>between ({'>=,<'})</option>
                                                            <option value='><='>between ({'>,<='})</option>
                                                            <option value='>'>more ({'>'})</option>
                                                            <option value='>='>more ({'>='})</option>
                                                            <option value='='>equal</option>
                                                        </select>
                                                    </td>
                                                    <td className='border-2 border-black'>
                                                        <input type='text' id={`valueInput1-${value.id}`} value={value.valueInput1} className='w-[45%] px-1' onChange={getLogicChange} />
                                                        &nbsp;
                                                        {(value.logic === '><' || value.logic === '><=' || value.logic === '>=<=') && 
                                                            <input type='text' id={`valueInput2-${value.id}`} value={value.valueInput2} className='w-[45%] px-1' onChange={getLogicChange} />
                                                        }
                                                    </td>
                                                    <td className='border-2 border-black'>
                                                        <input type='text' id={`valueOutput-${value.id}`} value={value.valueOutput} className='w-full px-1' onChange={getLogicChange} />
                                                    </td>
                                                </tr>
                                            )   
                                    }
                                    
                                )
                            }

                            <tr>
                                <td className="w-[5%]"></td>
                                <td className="w-[5%]"></td>
                                <td className="w-[20%]"></td>
                                <td className="w-[30%]"></td>
                                <td className="w-[20%]"></td>
                                <td className="w-[20%]"></td>
                            </tr>
                            
                        </table>
                    </div>
                )
                }
        </div>
        <div className="flex gap-2 bg-blue-200 px-2 py-1 rounded-md">
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([])}>Clear</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>setList([...getList(),...list])}>Add Row</div>
            <div className="border-2 border-black rounded-md px-2 hover:px-3" onClick={()=>{
                getLogic().then((data)=>{
                    changeListToFromula(data)
                })
            }}>Change Varabel Logic</div>
        </div>
        <div className="w-full text-xs overflow-auto pb-3 border-2 h-96">
            <ReactGrid rows={rows} columns={columns} onCellsChanged={(changes: CellChange<any>[]) => {applyChangesToList(changes)}} />
        </div>
        
    </div>
} 

export default Formula;