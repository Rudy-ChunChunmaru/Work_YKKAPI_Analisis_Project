
import {dataSubHeaderType,dataType} from "./type";

type TablePartType = {
    partHeader:dataSubHeaderType[],
    part:dataType[][],
}

const TablePart = ({partHeader,part}:TablePartType) => {
  return (
    <div className="w-fit border-2 border-black sm:w-full">        
        <div className="text-md flex w-full justify-between bg-slate-200 px-2 text-left font-bold">
            <div>PART</div>
            <div
            className="bg-slate-400 px-2 hover:bg-slate-500"
            onClick={async () => {
                let dataTablePart;
                try {
                dataTablePart =
                    document.getElementById("tablePart")?.innerHTML;
                await navigator.clipboard.writeText(
                    dataTablePart ? dataTablePart : ""
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
        <div id="tablePart" className="px-2">
            <table
            className="w-full table-auto border-collapse border border-slate-500"
            >
                <thead>
                    <tr>
                    <th key={1} className="SubHeader border-[0.1rem] border-black text-sm">
                        {"No"}
                    </th>
                    {partHeader.map((valueHeader, indexHeader) => {
                        return (
                        <th key={indexHeader+1} className="SubHeader border-[0.1rem] border-black text-sm">
                            {valueHeader.title}
                        </th>
                        );
                    })}
                    <th key={partHeader.length} className="SubHeader border-[0.1rem] border-black text-sm">
                        {"At Site"}
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {part.map((valuePart, indexPart) => {
                    return (
                        <tr key={indexPart}>
                        <td key={indexPart} className="DataBody px-[0.5rem] border-[0.1rem] border-black w-fit text-xs">
                            {indexPart + 1}
                        </td>
                        {valuePart.map((valuePartCol, indexPartCol) => {
                            return (
                            <td key={indexPartCol} className="DataBody px-[0.5rem] border-[0.1rem] border-black w-fit text-xs">
                                {valuePartCol.value}
                            </td>
                            );
                        })}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
  
}

export default TablePart;