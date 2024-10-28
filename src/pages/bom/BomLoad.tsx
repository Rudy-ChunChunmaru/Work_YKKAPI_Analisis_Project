import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { dataSubHeaderType,dataType } from "../standard_list/type";
import localforage from "localforage";
import { localstorageMaterialPart } from "../../share/StoreageList";
import { useEffect, useState } from "react";

type BomLoadType = {
    setloadDataLocalstorage: React.Dispatch<React.SetStateAction<any>>;
    setMaterialHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setMaterial: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setPartHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setPart: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setFormulaHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setFormula: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setLoadWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const BomLoad = ({setloadDataLocalstorage,setMaterialHeader,setMaterial,setPartHeader,setPart,setFormulaHeader,setFormula,setLoadWindow}:BomLoadType) => {

    const [loadDataLocalstorage,setloadDataLocalstorage] = useState<dataLocalstorageType[] | null | any>(null) 

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
        <div className="w-full"></div>
    </div>
}

export default BomLoad;