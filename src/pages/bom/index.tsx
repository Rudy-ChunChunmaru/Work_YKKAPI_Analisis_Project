import { useState } from "react";
import BomManufacturing from "./BomManufacturing";
import BomPart from "./BomPart";
import BomFormula from "./BomFormula";
import BomLoad from "./BomLoad";
import { dataSubHeaderType,dataType,dataLocalstorageType } from "../standard_list/type";

const Bom = () =>{
    const [loadWindow,setLoadWindow] = useState<boolean>(true)
    const [manfacturingWidnow,setManfacturingWidnow] = useState<boolean>(false)
    const [partWindow,setpartWindow] = useState<boolean>(false)
    const [formulaWindow,setFormulaWindow] = useState<boolean>(false)

    const [loadDataLocalstorage,setloadDataLocalstorage] = useState<dataLocalstorageType[] | null | any>(null) 
    const [materialHeader, setMaterialHeader] = useState<dataSubHeaderType[]>(new Array());
    const [material, setMaterial] = useState<dataType[][]>(new Array());
    const [partHeader, setPartHeader] = useState<dataSubHeaderType[]>(new Array());
    const [part, setPart] = useState<dataType[][]>(new Array());
    const [formulaHeader, setFormulaHeader] = useState<dataSubHeaderType[]>(new Array());
    const [formula, setFormula] = useState<dataType[][]>(new Array());

    return(
        <div className="w-full flex flex-col">
            <div className="flex flex-row gap-2 bg-gray-200 w-full px-5 py-1">
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setLoadWindow(true)}}>Load List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setManfacturingWidnow(true)}}>Manufacturing List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setpartWindow(true)}}>Part List</div>
                <div className="border-2 border-black rounded-md px-1 hover:px-2" onClick={()=>{setFormulaWindow(true)}}>Formula List</div>
            </div>
            {loadWindow && (<BomLoad 
                setloadDataLocalstorage={setloadDataLocalstorage}
                setMaterialHeader={setMaterialHeader} 
                setMaterial={setMaterial} 
                setPartHeader={setPartHeader} 
                setPart={setPart} 
                setFormulaHeader={setFormulaHeader} 
                setFormula={setFormula}
                setLoadWindow={setLoadWindow}
            />)}
            {manfacturingWidnow && (<BomManufacturing/>)}
            {partWindow && (<BomPart/>)}
            {formulaWindow && (<BomFormula/>)}
        </div>
    );          
}

export default Bom;