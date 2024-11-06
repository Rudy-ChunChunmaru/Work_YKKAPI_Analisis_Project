import { useEffect, useState } from "react";

type BomFormulaType = {
    allData : any;
}

type variableType = {
    title:string;
    code:string;
    value:number;
}

const getVariableData = ():variableType[] => {
    const vardata = [
        {title:'Qty',code:'Q'},
        {title:'GlassThickness',code:'GT'},
        {title:'Width',code:'W'},
        {title:'Height',code:'H'},

        {title:'outer.h1',code:'OH1'},
        {title:'inner.h1',code:'IH1'},
        {title:'outer.h2',code:'OH2'},
        {title:'inner.h2',code:'IH2'},
        {title:'outer.h3',code:'OH3'},
        {title:'inner.h3',code:'IH3'},
        {title:'outer.h4',code:'OH4'},
        {title:'inner.h4',code:'IH4'},
       
        
        {title:'HandleHeight1',code:'HH1'},
        {title:'HandleHeight2',code:'HH2'},
    ]


    return [...vardata.map((value)=>{return{title:value.title,code:value.code,value:0}})]
}

type logicType = {
    id:number;
    code:string;
    variable:string;
    logic:string;
    valueInput1:number;
    valueInput2:number;
    valueOutput:string;
}


const BomFormula = ({allData}:BomFormulaType) => {
    const [subMenu,setSubMenu] = useState<{variable:boolean,logic:boolean}>({'variable':false,'logic':false})
    const [variable,setVariable] = useState<variableType[] >(getVariableData())
    const [logic,setLogic] = useState<(logicType | undefined)[]>([])

    const [list,setList] = useState<{}[]>()

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
                if(valueLogic){
                    if(valueLogic.id == title[1])
                        valueLogic = { ...valueLogic,
                            [title[0]]:value
                        }
                    return valueLogic
                }
            }
        )])
    }
    
    useEffect(()=>{},
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
                            <th className='border-2 border-black'>Make Variable</th>
                            <th className='border-2 border-black'>Logic</th>
                            <th className='border-2 border-black'>Input</th>
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
                                                            setLogic([...logic.map((value)=>{
                                                                if(e.target.id != value?.id)
                                                                    return value;
                                                            })])
                                                        }}
                                                    >
                                                        -
                                                    </div>
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
                                                        <option value='more'>more</option>
                                                        <option value='between'>between</option>
                                                        <option value='less'>less</option>
                                                    </select>
                                                </td>
                                                <td className='border-2 border-black'>
                                                    <input type='text' id={`valueInput1-${value.id}`} value={value.valueInput1} className='w-[45%] px-1' onChange={getLogicChange} />
                                                    &nbsp;
                                                    {value.logic === 'between' && <input type='text' id={`valueInput2-${value.id}`} value={value.valueInput2} className='w-[45%] px-1' onChange={getLogicChange} />}
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
                            <td className="w-[20%]"></td>
                            <td className="w-[30%]"></td>
                            <td className="w-[25%]"></td>
                            <td className="w-[20%]"></td>
                        </tr>
                        
                    </table>
                </div>
            )
            }
        </div>
        
    </div>
} 

export default BomFormula;