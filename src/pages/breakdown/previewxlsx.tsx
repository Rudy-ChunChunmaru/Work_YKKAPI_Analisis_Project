import * as XLSX from 'xlsx';
import { useState } from 'react';


const Previewxlsx = () =>{
    const [file,setFile] = useState<any>()

    const loaddataxlsx = async () =>{
        const load = fetch("src/assets/xlsx/TM.xlsx",{method:'GET'})
        
        return load

    }



    return <div className="px-5">
        
        <div onClick={()=>loaddataxlsx().then(data=>console.log(data))}>test</div>
      
    </div>
}

export default Previewxlsx