import * as XLSX from 'xlsx'
import { useState } from 'react'
import './App.css'

function App() {
  const [proses, setProses] = useState<boolean>(true);
  const [nameExeclSheet, setNameExeclSheet] = useState<string>('');
  const [dataExecl, setDataExecl] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');


  const handleChange = async (e:any) => {
    e.preventDefault();
    console.log('reading input file:'); 
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
    });
    setNameExeclSheet(workbook.SheetNames[0]);
    setDataExecl(jsonData);
  };

  const startProsesData = async () => {
    if(dataExecl.length > 0){
      prosesDataTitle();
      if(proses){
       const resultProsesReadHeader = await prosesReadHeader();
       console.log(resultProsesReadHeader);
      prosesDataMaterial(resultProsesReadHeader[0][1]);
      }else
        alert('proses fail')  
    }else
      alert('proses fail')
  }

  const prosesDataTitle:VoidFunction = async () => {
    setProses(true);
    // console.log(dataExecl[0]);
    let readTitle = '';
    try{
        dataExecl[0].forEach((value:string) => {
          if(value !== ''){
            if(readTitle != '')
              readTitle += ' -- ';
            readTitle += value;
            // console.log(value);
          }
        })
    }catch(err:any){
      alert(err.message);
      setProses(false);
    }finally{
      if(readTitle !== ''){
        setTitle(readTitle);
      }else
        setProses(false);
    }
  }

  type ReadHeaderType = {
    result: boolean,
    name:string,
    colom_start: number,
    colom_end: number,
    row_start: number,
    row_end: number,
  }
  const prosesReadHeader = async () => {
    const titleHeaderExcel:string[][]= [['ADDITIONAL DATA','MATERIALS','PARTS'],['SPECIAL NOTE']];
    let resultProsesReadHeader:ReadHeaderType[][] = new Array();

    const row_start = (valueTitleHeaderExceldata:string[], indexTitleHeaderExceldata:number) =>{
      let rowProsesReadHeaderCol_start:number = -1;
      if(indexTitleHeaderExceldata < titleHeaderExcel.length-1){
        dataExecl.forEach((valueRowExecl:string[], indexRowExecl:number)=>{
          let joinValueRowExecl:string = '';
          valueRowExecl.forEach((valueColExecl:string) => {
            if(valueColExecl !== ''){
              if(joinValueRowExecl !== ''){
                joinValueRowExecl += '-';
              }
              joinValueRowExecl += valueColExecl;
            }
          })
          if(valueTitleHeaderExceldata.join('-') ===  joinValueRowExecl){
            rowProsesReadHeaderCol_start = indexRowExecl;
          }
        })
      }else{
        dataExecl.forEach((valueRowExecl:string[], indexRowExecl:number)=>{
          if(valueTitleHeaderExceldata[0] === valueRowExecl[0]){
            rowProsesReadHeaderCol_start = indexRowExecl;
          }
        })
      }
      return rowProsesReadHeaderCol_start;
    }

    const row_end = (indexTitleHeaderExceldata:number) => {
      let rowProsesReadHeaderCol_end:number = -1;
      if(indexTitleHeaderExceldata < titleHeaderExcel.length-1){
        // console.log(titleHeaderExcel[indexTitleHeaderExceldata+1])
        dataExecl.forEach((valueRowExecl:string[], indexRowExecl:number)=>{
          if(titleHeaderExcel[indexTitleHeaderExceldata+1][0] === valueRowExecl[0]){
            rowProsesReadHeaderCol_end = indexRowExecl;
          }
        })
      }else{
        rowProsesReadHeaderCol_end = dataExecl.length-1;
      }
      return rowProsesReadHeaderCol_end;
    }

    const col_start = (valueTitleHeaderdata:string, indexTitleHeaderdata:number, resultRowStart:number) => {
      let colProsesReadHeaderCol_start:number = -1;
      if(resultRowStart !== -1){
        if(indexTitleHeaderdata === 0){
          colProsesReadHeaderCol_start = 0;
        }else {
          dataExecl[resultRowStart].forEach((valueColExecl:string, indexColExecl:number)=>{
            if(valueTitleHeaderdata === valueColExecl){
              colProsesReadHeaderCol_start = indexColExecl;
            }
          })
        }
      }
      return colProsesReadHeaderCol_start;
    }

    const col_end = (valueTitleHeaderExceldata:string[], indexTitleHeaderdata:number, resultRowStart:number) => {
      let colProsesReadHeaderCol_end:number = -1;
      if(indexTitleHeaderdata < valueTitleHeaderExceldata.length-1){
        colProsesReadHeaderCol_end = col_start(valueTitleHeaderExceldata[indexTitleHeaderdata+1], indexTitleHeaderdata+1,resultRowStart)-1;
      }else{
        colProsesReadHeaderCol_end = dataExecl[resultRowStart].length-1;
      }
      return colProsesReadHeaderCol_end;
    }

    try{
      titleHeaderExcel.forEach( (valueTitleHeaderExcel:string[], indexTitleHeaderExcel:number)=>{
        let statusProsesReadHeader:boolean = true;
        let resultProsesReadHeaderCol:ReadHeaderType[] = new Array(); 

        const resultRowStart = row_start(valueTitleHeaderExcel,indexTitleHeaderExcel);
        const resultRowEnd = row_end(indexTitleHeaderExcel);
        if(resultRowStart === -1 || resultRowEnd === -1)
          statusProsesReadHeader = false;

        valueTitleHeaderExcel.forEach( (valueTitleHeader:string , indexTitleHeader:number)=> {
          const resultColStart = col_start(valueTitleHeader, indexTitleHeader,resultRowStart);
          const resultcolEnd = col_end(valueTitleHeaderExcel, indexTitleHeader,resultRowStart);

          resultProsesReadHeaderCol = [...resultProsesReadHeaderCol,{
            result: statusProsesReadHeader,
            name: valueTitleHeader,
            colom_start: resultColStart,
            colom_end: resultcolEnd,
            row_start: resultRowStart,
            row_end: resultRowEnd,
          }]
         
        })

        // console.log(resultProsesReadHeaderCol);
        resultProsesReadHeader.push(resultProsesReadHeaderCol);
        if(!statusProsesReadHeader)
          console.error('proses read header fail');

      })
    }
    catch(err:any){
      alert(err.message);
    }
    // console.log(resultProsesReadHeader);
    return resultProsesReadHeader;
  }

  // ------------------------------------------------------------------ material
  type dataSubHeaderType = {
    title:string,
    colom_start:number,
    colom_end:number,
  };
  const [material, setMaterial] = useState<any[]>([]);
  const prosesDataMaterial = async (dataTitleHeader:ReadHeaderType) => {
    if(dataTitleHeader.result){
      let dataMaterial:any[];
      try{
        const dataSubHeaderExecl = dataExecl[dataTitleHeader.row_start+1].slice(dataTitleHeader.colom_start, dataTitleHeader.colom_end+1)
        console.log(dataSubHeaderExecl);
        let dataSubHeader:dataSubHeaderType[] = new Array()
        dataSubHeaderExecl.forEach((valueSubHeader:string,indexSubHeader:number) =>{
          if(valueSubHeader != ''){
            dataSubHeader = [...dataSubHeader,{
              title:valueSubHeader,
              colom_start:indexSubHeader,
              colom_end:indexSubHeader,
            }]
          }else{
            if(dataSubHeader.length > 0)
              dataSubHeader[dataSubHeader.length-1].colom_end += 1;
          }
        })
        console.log(dataSubHeader);

        for(let rowIndex = dataTitleHeader.row_start+1; rowIndex <= dataTitleHeader.row_end; rowIndex++){
          // console.log(dataExecl[rowIndex].slice(dataTitleHeader.colom_start, dataTitleHeader.colom_end+1));
          let dataMaterialCol:any[];
          dataSubHeader.forEach((valueSubHeader:dataSubHeaderType)=>{
            
          })
        }
      }catch(err:any){
        alert(err.message);
        setProses(false);
      }
    }else{
      alert('proses fail colom head fail !!!');
      setProses(false);
    }
  }
 

  return (
    <>
      <div>
      file excel: <input type='file' value='' onInput={(e) => handleChange(e)}/>
      {
      nameExeclSheet && 
      <div>name excel sheet: {nameExeclSheet}</div>
      }
      </div>
      <div><input type='button' value='proses data' onClick={() => startProsesData()} /></div>
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            <th>fab_no</th>
            <th>descrpition</th>
            <th>qty</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </>
  )
}

export default App
