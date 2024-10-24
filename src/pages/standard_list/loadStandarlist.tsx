import { dataSubHeaderType, dataType,dataLocalstorageType } from "./type";

import localforage from "localforage";
import { localstorageMaterialPart } from "@/share/StoreageList";


import { Grid,_ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import { useEffect, useState } from "react";
import { html } from "gridjs";


type loadStandarListType = {
    setMaterialHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setMaterial: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setPartHeader: React.Dispatch<React.SetStateAction<dataSubHeaderType[]>>;
    setPart: React.Dispatch<React.SetStateAction<dataType[][]>>;
    setLoadWindow: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadStandarList = ({setMaterialHeader,setMaterial,setPartHeader,setPart,setLoadWindow}:loadStandarListType) => {
    
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

    const LoadDataTable = () => {
        const dataloadTodataTable = (): any[] => {
            if(loadDataLocalstorage==null)
                return [];
            else{
                if(Array.isArray(loadDataLocalstorage)){
                    return [...loadDataLocalstorage.map((val)=>([val.id,val.name,val.category,val.note,val.id]))];
                }
                else return []
            }
        }

        const doLoadDataStandarList = () => {
            return loadDataLocalstorage.map((value,index)=>{return value.id=index ? value : })
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
                    {name:"Category" ,sort:true},
                    {name:"Note" ,sort:true},
                    {name:"Actions",sort:false,formatter: (cells) => _(<button className="w-full px-2 border-2 border-black" onClick={()=>console.log(cells)}>LOAD</button>)},
                ]}
                pagination={{
                    limit: 5,
                }}
            />
        </div>
        )
    }



    const LoadDataTableTEST = () => {
        const dataloadTodataTable = (): any[] => {
            if(loadDataLocalstorage==null)
                return [];
            else{
                if(Array.isArray(loadDataLocalstorage)){
                    return [...loadDataLocalstorage.map((val,idx)=>({
                        rowId:idx,
                        cells:[
                            {type:"text",text:val.id ? val.id : ''},
                            {type:"text",text:val.name ? val.name : ''},
                            {type:"text",text:val.category ? val.category : ''}
                        ]
                    }))];
                }
                else return []
            }
        }


        const getHeadersRow: Row = {
            rowId: "header",
            cells: [
              { type: "header", text: "ID" },
              { type: "header", text: "Name" },
              { type: "header", text: "Category"}
            ]
        };

        const getColumns = (): Column[] => [
            { columnId: "ID", width: 150 },
            { columnId: "Name", width: 150 },
            { columnId: "Categoty", width: 150 }
        ];

        const getRows = ():Row[]=> {
            console.log(dataloadTodataTable())
            const rows: Row[] = [
                getHeadersRow,
                ...dataloadTodataTable().map((val) => ({
                    rowId: val.rowId,
                    cells: val.cells
                }))
            ];

            return rows
        }

        const rows = getRows()
        const coloms = getColumns()

        return (
            <div className="flex flex-col justify-start gap-2 text-sm">
                <ReactGrid rows={rows} columns={coloms} enableRangeSelection enableRowSelection/>
            </div>
        )
    }

    return <div className="w-full h-full absolute z-10 bg-slate-950/75">
    <div className="fixed w-full h-full flex justify-center items-center">
        <div className="absolute bg-white w-fit h-fit p-5 rounded-xl flex flex-col justify-start gap-2 ">
            <div className="flex justify-end min-w-32">
                <div className="border-2 p-1 rounded-md hover:bg-red-300 text-xs" onClick={()=>{setLoadWindow(false);}}>CLOSE | X</div>
            </div>
            <div className="mx-2 text-center">
                LOAD DATA
            </div>
            <LoadDataTable />
          </div>
        </div>
   </div>
}

export default LoadStandarList;
