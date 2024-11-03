import { useEffect, useState } from "react";
import BomManufacturing from "./BomManufacturing";
import BomPart from "./BomPart";
import BomFormula from "./BomFormula";
import BomLoad from "./BomLoad";
import { dataSubHeaderType,dataType } from "../standard_list/type";
import { bomDataType,bomInfoType } from './type';

const Bom = () =>{
    const [window,setWindow] = useState<{'loadbom':boolean,'manufacturing':boolean,'part':boolean,'formula':boolean}>({'loadbom':true,'manufacturing':false,'part':false,'formula':false})

    const [allData,setAllData] = useState<any | null>(null) 
    const [loadWindow,setLoadWindow] = useState<boolean>(true)

    useEffect(()=>{
        
    },[allData])
    
   
    return(
        <div className="w-full flex flex-col">
            <div className="flex flex-row gap-2 bg-gray-200 w-full px-5 py-1">
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':true,'manufacturing':false,'part':false,'formula':false})}}>Load List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':true,'part':false,'formula':false})}}>Manufacturing List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':true,'formula':false})}}>Part List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':false,'formula':true})}}>Formula List</div>
            </div>
            {window.loadbom && (<BomLoad 
                setAllData={setAllData}
                allData={allData}
                loadWindow={loadWindow}
                setLoadWindow={setLoadWindow}
            />)}
            {window.manufacturing && (<BomManufacturing/>)}
            {window.part && (<BomPart/>)}
            {window.formula && (<BomFormula/>)}
        </div>
    );          
}

export default Bom;