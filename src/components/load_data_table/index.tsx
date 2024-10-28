import { useState,useEffect } from "react"
import localforage from "localforage"
import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { localstorageMaterialPart } from "../../share/StoreageList";
import { dataSubHeaderType, dataType,dataLocalstorageType } from "../../pages/standard_list/type";

type LoadDataTableType = {
    setMaterialHeader:React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setMaterial:React.Dispatch<React.SetStateAction<dataType[][]>>;
    setPartHeader:React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setPart:React.Dispatch<React.SetStateAction<dataType[][]>>;
    setLoadWindow:React.Dispatch<React.SetStateAction<boolean>>;
    loadDataLocalstorage:React.Dispatch<React.SetStateAction<dataLocalstorageType[]>>;
}


const LoadDataTable = ({setMaterialHeader,setMaterial,setPartHeader,setPart,setLoadWindow,loadDataLocalstorage}:LoadDataTableType) => {
    const [refes,setRefes]=useState<boolean>(false)

    useEffect(()=>{},[refes])

    const dataloadTodataTable = (): any[] => {
        if(loadDataLocalstorage==null)
            return [];
        else{
            if(Array.isArray(loadDataLocalstorage)){
                return [...loadDataLocalstorage.map((val)=>(val && [val.id,val.name,val?.brand,val.category,val.note,val.id,val.id]))];
            }
            else return []
        }
    }

    const doLoadDataStandarList = (filtervalue:any):void => {
        if(loadDataLocalstorage!==null && Array.isArray(loadDataLocalstorage)){
            loadDataLocalstorage.map((val)=>{
                if(val.id==filtervalue && typeof filtervalue == 'string' ){
                    if(Array.isArray(val.headerMaterial)){
                        setMaterialHeader(val.headerMaterial)
                        if(Array.isArray(val.dataMaterial)) {
                            setMaterial(val.dataMaterial)
                            console.log('material loaded !!!')

                            if(Array.isArray(val.headerPart)){
                                setPartHeader(val.headerPart)
                                if(Array.isArray(val.dataPart)){
                                    setPart(val.dataPart)
                                    console.log('part loaded !!!')
                                    setLoadWindow(false);
                                    return;
                                }
                            }
                        }
                    }
                    
                }
            })
        }
    }

    const doDeleteDataStandarList = (filtervalue:any) => {
        if(loadDataLocalstorage!==null && Array.isArray(loadDataLocalstorage)){
            let keydeleted
            const updateLoadDataLocalstorage = loadDataLocalstorage
            loadDataLocalstorage.map((val,idx)=>{
                if(val.id==filtervalue && typeof filtervalue == 'string' )
                    keydeleted = idx
            })
            if(keydeleted!==undefined){
                updateLoadDataLocalstorage.splice(keydeleted,1)
                localforage.setItem(localstorageMaterialPart,[...updateLoadDataLocalstorage]).then(
                    ()=>{console.log('delete data succesfull !!!');setRefes(!refes)}
                ).catch(
                    (e)=>{console.log(e)}
                )
            }
        }
    }


    return (
    <div className="flex flex-col justify-start gap-2 text-sm">
        <Grid
            data={[ 
                ...dataloadTodataTable()
            ]}
            columns={[
                {name:"ID" ,sort:true},
                {name:"Name" ,sort:true},
                {name:"Brand" ,sort:true},
                {name:"Category" ,sort:true},
                {name:"Note" ,sort:true},
                {name:"Load",sort:false,formatter: (cells) => _(<button className="w-fit px-2 border-2 border-black rounded-md" onClick={()=>doLoadDataStandarList(cells)}>LOAD</button>)},
                {name:"Delete",sort:false,formatter: (cells) => _(<button className="w-fit px-2 border-2 border-black rounded-md" onClick={()=>doDeleteDataStandarList(cells)}>DELETE</button>)},
            ]}
            pagination={{
                limit: 5,
            }}
        />
    </div>
    )
}


export default LoadDataTable