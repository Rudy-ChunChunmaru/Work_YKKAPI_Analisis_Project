import { useEffect, useState } from "react";
import Load from "./load";
import {MaterialListType,PartListType,FromulaType} from "./type";
import Manufacturing from "./manufacturing";
import Part from "./part"
import Formula, { getVariableData } from "./formula";

import localforage from "localforage";
import { dataLocalstorageType } from "../standard_list/type";
import { localstorageMaterialPart } from "@/share/StoreageList";
import Previewxlsx from "./previewxlsx";

const Breakdown = () =>{
    const [window,setWindow] = useState<{'loadbom':boolean,'manufacturing':boolean,'part':boolean,'formula':boolean,'previewxlsx':boolean}>({'loadbom':true,'manufacturing':false,'part':false,'formula':false,'previewxlsx':false})
    const [allData,setAllData] = useState<dataLocalstorageType | null>(null)
    const [bom,setBom] = useState<{'MaterialBom':MaterialListType[],'PartBom':PartListType[],'Formula':FromulaType}>({'MaterialBom':new Array(),'PartBom':new Array(),'Formula':{FormulaList:new Array(), variable:getVariableData(), logic:new Array()}})
    const [loadWindow,setLoadWindow] = useState<boolean>(true)
    const [dataLocalstorage,setDataLocalstorage] = useState<dataLocalstorageType[] | null>(null)

    useEffect(()=>{
        localforage.getItem(localstorageMaterialPart).then((value:dataLocalstorageType[] | null | any)=>{
            console.log("data load ready")
            value == null ? setDataLocalstorage(new Array()) : setDataLocalstorage(value)
        }).catch(()=>{
            alert('error load data localstorage !!!');
        })
        console.log(dataLocalstorage)
    },[])

    useEffect(()=>{
        console.log(allData)
        if(allData == null)
            setBom({'MaterialBom':new Array(),'PartBom':new Array(),'Formula':{FormulaList:new Array(), variable:new Array(), logic:new Array()}})
        else{
            if(allData?.breakdown){
                setBom(allData.breakdown)
            }else{
                setBom({'MaterialBom':new Array(),'PartBom':new Array(),'Formula':{FormulaList:new Array(), variable:new Array(), logic:new Array()}})
            }
        }
    },[allData])

    const LoadDataAlert = () => {
        if(!window.loadbom)
            return(
                <div className=" w-full flex-col flex py-2 px-5 bg-red-200">
                    <div className="w-fit mx-auto">Load Data First</div>
                    <div className="w-fit mx-auto border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':true,'manufacturing':false,'part':false,'formula':false,'previewxlsx':false})}}>Go to Load Data</div>
                </div>
            )
        else return
    }

    const SaveToLoaclStrogate = () =>{
        const LocalStrogateKey = () =>{
            let keyindex = -1
            if(allData != null && dataLocalstorage != null){
                dataLocalstorage.some((val,indx)=>{
                    if(val.id == allData.id){
                        keyindex = indx
                    }
                })
                return keyindex
            }else return keyindex
        }
        const key = LocalStrogateKey()
        if(key != -1){
            const updateLocalstorage = dataLocalstorage;
            if(updateLocalstorage != null && Array.isArray(updateLocalstorage) && allData != null){
                if(updateLocalstorage[key]){
                    updateLocalstorage[key] = {...allData,breakdown:bom}
                    localforage
                    .setItem(localstorageMaterialPart, updateLocalstorage)
                    .then(() => {
                        alert('save successfully !!!')
                    })
                    .catch(() =>
                        alert("error when data Material store to localforage")
                    );
                }else alert('error data storage update !!!')
            }else alert('error data storage load !!!')
        }else alert('error find index key !!!')
    }
    
    return(
        <div className="w-full flex flex-col ">
            <div className="flex flex-row justify-between w-full h-fit bg-gray-200 px-5 py-1">
                <div className="flex flex-row gap-2">
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':true,'manufacturing':false,'part':false,'formula':false,'previewxlsx':false})}}>Load List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':true,'part':false,'formula':false,'previewxlsx':false})}}>Manufacturing List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':true,'formula':false,'previewxlsx':false})}}>Part List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':false,'formula':true,'previewxlsx':false})}}>Formula List</div>
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setWindow({'loadbom':false,'manufacturing':false,'part':false,'formula':false,'previewxlsx':true})}}>Pre View Xlsx</div>
                </div>
                {!allData && <div>No Load Data</div>}
                {allData && <div className="flex flex-row justify-end gap-2">
                    {allData?.id && <div>{allData?.id}</div> }
                    {allData?.name && <div>{allData?.name}</div> }
                    {allData?.brand && <div>{allData?.brand}</div> }
                    {allData?.category && <div>{allData?.category}</div> }
                    <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{SaveToLoaclStrogate()}}>Save</div>
                </div>}
            </div>
            {window.loadbom && (<Load 
                setAllData={setAllData}
                allData={allData}
                loadWindow={loadWindow}
                setLoadWindow={setLoadWindow}
            />)}
            {(allData == null) ? <LoadDataAlert /> : (
                <>
                    {(window.manufacturing) &&  <Manufacturing allData={allData} bom={bom} setBom={setBom} />}
                    {(window.part) &&  <Part allData={allData} bom={bom} setBom={setBom} />}
                    {(window.formula) && <Formula allData={allData} bom={bom} setBom={setBom} />}
                    {(window.previewxlsx) && <Previewxlsx />}
                </>   
            )}
        </div>
    );          
}

export default Breakdown;