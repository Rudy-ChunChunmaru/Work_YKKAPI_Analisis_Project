import { dataSubHeaderType,dataType,dataLocalstorageType } from "../standard_list/type";
import localforage from "localforage";
import { localstorageMaterialPart } from "../../share/StoreageList";
import { useEffect, useState } from "react";
import LoadDataTable from "@/components/load_data_table";

type BomLoadType = {
    setAllData: React.Dispatch<React.SetStateAction<any|null>>;
    allData : any | null;
    loadWindow: boolean;
    setLoadWindow:React.Dispatch<React.SetStateAction<boolean>>;
}

const Load = ({setAllData,allData,loadWindow,setLoadWindow}:BomLoadType) => {
    const [loadDataLocalstorage,setloadDataLocalstorage] = useState<dataLocalstorageType[] | null | any>(null) 
    
    const [materialHeader, setMaterialHeader] = useState<dataSubHeaderType[]>(new Array());
    const [material, setMaterial] = useState<dataType[][]>(new Array());
    const [partHeader, setPartHeader] = useState<dataSubHeaderType[]>(new Array());
    const [part, setPart] = useState<dataType[][]>(new Array());

    useEffect(()=>{
        if(loadWindow == true) {
            localforage.getItem(localstorageMaterialPart).then(
                (value)=>{
                    console.log(value)
                    value ? setloadDataLocalstorage(value) : setloadDataLocalstorage(null)
                    console.log("read load data success !!!")
                }
            ).catch((error)=>{
                console.log(error);
                console.log("read load data fail !!!")
            })
        }else
            console.log(materialHeader,material,partHeader,part)
        
    },[loadWindow])

    return <div className="w-full h-full flex flex-col justify-center px-5">
        <div className="w-full border-b-2 border-black">Load List</div>
        <div className="w-full p-1">
            {loadWindow && (
                <LoadDataTable 
                setAllData = {setAllData}
                setMaterialHeader={setMaterialHeader} 
                setMaterial={setMaterial} 
                setPartHeader={setPartHeader} 
                setPart={setPart} 
                setLoadWindow={setLoadWindow}
                loadDataLocalstorage={loadDataLocalstorage}
                />
            )}
            {!loadWindow && allData !== null && (
                <div className="flex flex-row gap-5">
                    <div className="grid  grid-cols-3 w-[100%] py-2 bg-zinc-200 rounded-xl px-3">
                        <div className="w-fit">ID</div><div className="w-fit">:</div><div className="w-full">{allData.id}</div>
                        <div className="w-fit">Name</div><div className="w-fit">:</div><div className="w-full">{allData.name}</div>
                        <div className="w-fit">Brand</div><div className="w-fit">:</div><div className="w-full">{allData.brand}</div>
                        <div className="w-fit">Category</div><div className="w-fit">:</div><div className="w-full">{allData.category}</div>
                        <div className="w-fit">Note</div><div>:</div><div>{allData.note}</div>
                    </div>
                    <div className="border-b-2 hover:border-black col-start-3 my-2 bg-red-200 py-2 px-3 w-fit text-center hover:p-5 rounded-xl" onClick={() => {setLoadWindow(true);setAllData(null)}}>Unload Data</div>
                </div>
            )}
        </div>
    </div>
}

export default Load;