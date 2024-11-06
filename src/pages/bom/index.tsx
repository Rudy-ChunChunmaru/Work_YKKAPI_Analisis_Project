import { useEffect, useState } from "react";
import BomManufacturing from "./BomManufacturing";
import BomPart from "./BomPart";
import BomFormula from "./BomFormula";
import BomLoad from "./BomLoad";

import {MaterialListType,PartListType} from "./type";

const Bom = () =>{
    const [window,setWindow] = useState<{'loadbom':boolean,'manufacturing':boolean,'part':boolean,'formula':boolean}>({'loadbom':true,'manufacturing':false,'part':false,'formula':false})
    const [allData,setAllData] = useState<any | null>(null)
    const [bom,setBom] = useState<{'MaterialBom':MaterialListType[],'PartBom':PartListType[],'FormulaBom':{}[]} | null>(null)
    const [loadWindow,setLoadWindow] = useState<boolean>(true)

    useEffect(()=>{
        if(allData == null)
            setBom(null)
        
    },[allData])

    const LoadDataAlert = () => {
        if(!window.loadbom)
            return(
                <div className=" w-full flex-col flex py-2 px-5 bg-red-200">
                    <div className="w-fit mx-auto">Load Data First</div>
                    <div className="w-fit mx-auto border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':true,'manufacturing':false,'part':false,'formula':false})}}>Go to Load Data</div>
                </div>
            )
        else
            return
        
    }
    

    return(
        <div className="w-full flex flex-col ">
            <div className="flex flex-row justify-between w-full h-fit bg-gray-200 px-5 py-1">
                <div className="flex flex-row gap-2">
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':true,'manufacturing':false,'part':false,'formula':false})}}>Load List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':true,'part':false,'formula':false})}}>Manufacturing List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':true,'formula':false})}}>Part List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':false,'formula':true})}}>Formula List</div>
                </div>
                {!allData && <div>No Load Data</div>}
                {allData && <div className="flex flex-row justify-end gap-2">
                    {allData?.id && <div>{allData?.id}</div> }
                    {allData?.name && <div>{allData?.name}</div> }
                    {allData?.brand && <div>{allData?.brand}</div> }
                    {allData?.category && <div>{allData?.category}</div> }
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{}}>Save</div>
                </div>}
            </div>
            {window.loadbom && (<BomLoad 
                setAllData={setAllData}
                allData={allData}
                loadWindow={loadWindow}
                setLoadWindow={setLoadWindow}
            />)}
            {(allData == null) ? <LoadDataAlert /> : (
                <>
                    {(window.manufacturing) &&  <BomManufacturing allData={allData} setBom={setBom} bom={bom} />}
                    {(window.part) &&  <BomPart allData={allData} setBom={setBom} bom={bom} />}
                    {(window.formula) && <BomFormula allData={allData} />}
                </>   
            )}
        </div>
    );          
}

export default Bom;