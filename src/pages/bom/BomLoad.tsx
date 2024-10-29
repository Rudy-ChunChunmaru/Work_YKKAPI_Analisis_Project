import { dataSubHeaderType,dataType,dataLocalstorageType } from "../standard_list/type";
import { bomDataType,bomInfoType } from './type';
import localforage from "localforage";
import { localstorageMaterialPart } from "../../share/StoreageList";
import { useEffect, useState } from "react";
import LoadDataTable from "@/components/load_data_table";

type BomLoadType = {
    setMaterialHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setMaterial: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setPartHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setPart: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setBomInfo: React.Dispatch<React.SetStateAction<bomInfoType | null>>;
    setBomData: React.Dispatch<React.SetStateAction<bomDataType | null>>;
}

const BomLoad = ({setMaterialHeader,setMaterial,setPartHeader,setPart,setBomInfo,setBomData}:BomLoadType) => {
    const [allData,setAllData] = useState<any | null>(null) 
    const [loadDataLocalstorage,setloadDataLocalstorage] = useState<dataLocalstorageType[] | null | any>(null) 
    const [loadWindow,setLoadWindow] = useState<boolean>(true)

    useEffect(()=>{
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
    },[])

    return <div className="w-full h-full flex flex-col justify-center px-5">
        <div className="w-full border-b-2 border-black">Load List</div>
        <div className="w-full">
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
            
        </div>
    </div>
}

export default BomLoad;