import localforage from "localforage";
import { localstorageMaterialPart, localstoragePattern } from "@/share/StoreageList";
import { dataSubHeaderType,dataType } from './type';
import { useState } from "react";

type SaveStandarListType = {
    materialHeader:dataSubHeaderType[],
    material:dataType[][],
    partHeader:dataSubHeaderType[],
    part:dataType[][],
    setSaveWindow: React.Dispatch<React.SetStateAction<boolean>>
}


const SaveStandarList = ({materialHeader,material,partHeader,part,setSaveWindow}:SaveStandarListType) => {
    const [number_id,setNumber_id] = useState<string>('test-id')
    const [name,setName] = useState<string>('')
    const [category,setCategory] = useState<string>('')
    const [note,setNote] = useState<string>('')

    const SaveToLoaclStrogate = () => {
        localforage
        .setItem(localstorageMaterialPart, {
            id:'',
            name:'',
            category:'',
            note:'',
            headerMaterial: materialHeader,
            dataMaterial: material,
            headerPart: partHeader,
            dataPart: part
        })
        .then(() => console.log("data Material store to localforage"))
        .catch((error) =>
            console.error(
              "error when data Material store to localforage, massage:",
              error
            )
        );
    }
   return <div className="w-full h-full absolute z-10 bg-slate-950/75">
        <form className="fixed w-full h-full flex justify-center items-center">
            <div className="absolute bg-white w-fit p-5 rounded-xl flex flex-col justify-start gap-2 ">
                <div className="flex justify-end min-w-32">
                    <div className="border-2 p-1 rounded-md hover:bg-red-300 text-xs" onClick={()=>setSaveWindow(false)}>CLOSE | X</div>
                </div>
                <div className="mx-2 text-center">
                    SAVE DATA
                </div>
                <div className="flex flex-col justify-start gap-2 text-sm">
                    <div className="flex flex-row justify-between gap-4"><div>NUMBER ID :</div><input className="border-2 border-black rounded-md px-1" type="text" id="Number_id" name="Number_id" value={number_id} readOnly onChange={(e)=>{setNumber_id(e.target.value)}} /></div>
                    <div className="flex flex-row justify-between gap-4"><div>NAME :</div><input className="border-2 border-black rounded-md px-1" type="text" id="Name" name="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                    <div className="flex flex-row justify-between gap-4"><div>CATEGORY :
                        </div><select className="border-2 border-black rounded-md px-1" id="Category" name="Category" onChange={(e)=>{setCategory(e.target.value)}}>
                            <option value="" selected disabled hidden>Select</option>
                            <option value="inner">INNER</option>
                            <option value="outer">OUTER</option>
                        </select></div>
                    <div className="flex flex-row justify-between gap-4"><div>NOTE :</div><input className="border-2 border-black rounded-md px-1" type="text" id="Note" name="Note" value={note} onChange={(e)=>{setNote(e.target.value)}} /></div>
                    <br></br>
                    <div className="flex flex-row justify-between gap-4">
                        <div>MATERIAL ROW :</div><div>{material.length}</div>
                        <div>PART ROW :</div><div>{part.length}</div>
                    </div>
                </div>
                <br></br>
                <div className="mx-auto p-2 border-2 hover:bg-blue-300 text-xs rounded-md">SAVE</div>
            </div>
        </form>
   </div>
}

export default SaveStandarList;
