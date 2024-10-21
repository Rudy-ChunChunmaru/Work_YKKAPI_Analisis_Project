
import {dataSubHeaderType,dataType} from "./type";

type TableMaterialType = {
    materialHeader:dataSubHeaderType[],
    material:dataType[][]
}

const TableMaterial = ({materialHeader,material}:TableMaterialType) => {

    return  <div className="w-fit border-2 border-black sm:w-full">
    <div className="text-md flex w-full justify-between bg-slate-200 px-2 text-left font-bold">
      <div>MATERIAL</div>
      <div
        className="bg-slate-400 px-2 hover:bg-slate-500"
        onClick={async () => {
          let dataTableMaterial;
          try {
            dataTableMaterial =
              document.getElementById("tableMaterial")?.innerHTML;
            await navigator.clipboard.writeText(
              dataTableMaterial ? dataTableMaterial : ""
            );
            // console.log("Content copied to clipboard");
          } catch (err) {
            console.error("Failed to copy: ", err);
          }
        }}
      >
        Copy to Clipbord
      </div>
    </div>
    <div id="tableMaterial" className="px-2" >
      <table
        id="MaterialTable"
        className="w-full table-auto border-collapse border border-slate-500 "
      >
        <thead>
          <tr>
            <th key={materialHeader.length} className="SubHeader border-[0.1rem] border-black text-sm">
              {"No"}
            </th>
            {materialHeader.map((valueHeader, indexHeader) => {
              return (
                <th key={indexHeader} className="SubHeader border-[0.1rem] border-black text-sm">
                  {valueHeader.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {material.map((valueMaterial, indexMaterial) => {
            return (
              <tr key={indexMaterial}>
                <td key={indexMaterial} className="DataBody px-[0.5rem] border-[0.1rem] border-black w-fit text-xs">
                  {indexMaterial+1}
                </td>
                {valueMaterial.map(
                  (valueMaterialCol, indexMaterialCol) => {
                    return (
                      <td key={indexMaterialCol} className="DataBody px-[0.5rem] border-[0.1rem] border-black w-fit text-xs">
                        {valueMaterialCol.value}
                      </td>
                    );
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
}

export default TableMaterial;