// standar list pagess
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";

import TableMaterial from "./tableMaterial";
import {dataSubHeaderType,dataType} from "./type";
import TablePart from "./tablePart";
import SaveStandarList from "./saveStandarlist";

function Standar_list() {
  const [proses, setProses] = useState<boolean>(true);
  const [nameExeclSheet, setNameExeclSheet] = useState<string>("");
  const [dataExecl, setDataExecl] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");

  const [saveWindow, setSaveWindow] = useState<boolean>(false);

  // useEffect(() => {
  //   let getlocalstoragematerial: { status: boolean; value?: any } = {
  //     status: false,
  //     value: undefined,
  //   };
  //   // console.log("test");
  //   localforage
  //     .getItem(localstorageMaterial)
  //     .then((valuematerial) => {
  //       getlocalstoragematerial = { status: true, value: valuematerial };
  //     })
  //     .catch((error) => {
  //       getlocalstoragematerial = { status: false, value: undefined };
  //     });
  //   if (getlocalstoragematerial.status) {
  //     console.log(getlocalstoragematerial.value);
  //   }
  // }, []);

  const handleChange = async (e: any) => {
    e.preventDefault();
    console.log("reading input file:");
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    // console.log(worksheet);
    setNameExeclSheet(workbook.SheetNames[0]);
    setDataExecl(jsonData);
  };

  const startProsesData = async () => {
    if (dataExecl.length > 0) {
      prosesDataTitle();
      if (proses) {
        const resultProsesReadHeader = await prosesReadHeader();
        // console.log(resultProsesReadHeader);
        await prosesDataMaterial(resultProsesReadHeader[0][1]);
        await prosesDataPart(resultProsesReadHeader[0][2]);
        await storeToLocalforage();
      } else alert("proses fail");
    } else alert("proses fail");
  };

  const prosesDataTitle: VoidFunction = async () => {
    setProses(true);
    // console.log(dataExecl[0]);
    let readTitle = "";
    try {
      dataExecl[0].forEach((value: string) => {
        if (value !== "") {
          if (readTitle != "") readTitle += " -- ";
          readTitle += value;
          // console.log(value);
        }
      });
    } catch (err: any) {
      alert(err.message);
      setProses(false);
    } finally {
      if (readTitle !== "") {
        setTitle(readTitle);
      } else setProses(false);
    }
  };

  type ReadHeaderType = {
    result: boolean;
    name: string;
    colom_start: number;
    colom_end: number;
    row_start: number;
    row_end: number;
  };
  const prosesReadHeader = async () => {
    const titleHeaderExcel: string[][] = [
      ["ADDITIONAL DATA", "MATERIALS", "PARTS"],
      ["SPECIAL NOTE"],
    ];
    let resultProsesReadHeader: ReadHeaderType[][] = new Array();

    const row_start = (
      valueTitleHeaderExceldata: string[],
      indexTitleHeaderExceldata: number
    ) => {
      let rowProsesReadHeaderCol_start: number = -1;
      if (indexTitleHeaderExceldata < titleHeaderExcel.length - 1) {
        dataExecl.forEach((valueRowExecl: string[], indexRowExecl: number) => {
          let joinValueRowExecl: string = "";
          valueRowExecl.forEach((valueColExecl: string) => {
            if (valueColExecl !== "") {
              if (joinValueRowExecl !== "") {
                joinValueRowExecl += "-";
              }
              joinValueRowExecl += valueColExecl;
            }
          });
          if (valueTitleHeaderExceldata.join("-") === joinValueRowExecl) {
            rowProsesReadHeaderCol_start = indexRowExecl;
          }
        });
      } else {
        dataExecl.forEach((valueRowExecl: string[], indexRowExecl: number) => {
          if (valueTitleHeaderExceldata[0] === valueRowExecl[0]) {
            rowProsesReadHeaderCol_start = indexRowExecl;
          }
        });
      }
      return rowProsesReadHeaderCol_start;
    };

    const row_end = (indexTitleHeaderExceldata: number) => {
      let rowProsesReadHeaderCol_end: number = -1;
      if (indexTitleHeaderExceldata < titleHeaderExcel.length - 1) {
        // console.log(titleHeaderExcel[indexTitleHeaderExceldata+1])
        dataExecl.forEach((valueRowExecl: string[], indexRowExecl: number) => {
          if (
            titleHeaderExcel[indexTitleHeaderExceldata + 1][0] ===
            valueRowExecl[0]
          ) {
            rowProsesReadHeaderCol_end = indexRowExecl;
          }
        });
      } else {
        rowProsesReadHeaderCol_end = dataExecl.length - 1;
      }
      return rowProsesReadHeaderCol_end;
    };

    const col_start = (
      valueTitleHeaderdata: string,
      indexTitleHeaderdata: number,
      resultRowStart: number
    ) => {
      let colProsesReadHeaderCol_start: number = -1;
      if (resultRowStart !== -1) {
        if (indexTitleHeaderdata === 0) {
          colProsesReadHeaderCol_start = 0;
        } else {
          dataExecl[resultRowStart].forEach(
            (valueColExecl: string, indexColExecl: number) => {
              if (valueTitleHeaderdata === valueColExecl) {
                colProsesReadHeaderCol_start = indexColExecl;
              }
            }
          );
        }
      }
      return colProsesReadHeaderCol_start;
    };

    const col_end = (
      valueTitleHeaderExceldata: string[],
      indexTitleHeaderdata: number,
      resultRowStart: number
    ) => {
      let colProsesReadHeaderCol_end: number = -1;
      if (indexTitleHeaderdata < valueTitleHeaderExceldata.length - 1) {
        colProsesReadHeaderCol_end =
          col_start(
            valueTitleHeaderExceldata[indexTitleHeaderdata + 1],
            indexTitleHeaderdata + 1,
            resultRowStart
          ) - 1;
      } else {
        colProsesReadHeaderCol_end = dataExecl[resultRowStart].length - 1;
      }
      return colProsesReadHeaderCol_end;
    };

    try {
      titleHeaderExcel.forEach(
        (valueTitleHeaderExcel: string[], indexTitleHeaderExcel: number) => {
          let statusProsesReadHeader: boolean = true;
          let resultProsesReadHeaderCol: ReadHeaderType[] = new Array();

          const resultRowStart = row_start(
            valueTitleHeaderExcel,
            indexTitleHeaderExcel
          );
          const resultRowEnd = row_end(indexTitleHeaderExcel);
          if (resultRowStart === -1 || resultRowEnd === -1)
            statusProsesReadHeader = false;

          valueTitleHeaderExcel.forEach(
            (valueTitleHeader: string, indexTitleHeader: number) => {
              const resultColStart = col_start(
                valueTitleHeader,
                indexTitleHeader,
                resultRowStart
              );
              const resultcolEnd = col_end(
                valueTitleHeaderExcel,
                indexTitleHeader,
                resultRowStart
              );

              resultProsesReadHeaderCol = [
                ...resultProsesReadHeaderCol,
                {
                  result: statusProsesReadHeader,
                  name: valueTitleHeader,
                  colom_start: resultColStart,
                  colom_end: resultcolEnd,
                  row_start: resultRowStart,
                  row_end: resultRowEnd,
                },
              ];
            }
          );

          // console.log(resultProsesReadHeaderCol);
          resultProsesReadHeader.push(resultProsesReadHeaderCol);
          if (!statusProsesReadHeader) console.error("proses read header fail");
        }
      );
    } catch (err: any) {
      alert(err.message);
    }
    // console.log(resultProsesReadHeader);
    return resultProsesReadHeader;
  };




  const readSubHeader: (
    dataSubHeaderExecl: any,
    typeHeader: string
  ) => dataSubHeaderType[] = (dataSubHeaderExecl, typeHeader) => {
    let dataReadSubHeader: dataSubHeaderType[] = new Array();
    dataSubHeaderExecl.forEach(
      (valueSubHeader: string, indexSubHeader: number) => {
        if (valueSubHeader != "") {
          dataReadSubHeader = [
            ...dataReadSubHeader,
            {
              title: valueSubHeader,
              colom_start: indexSubHeader,
              colom_end: indexSubHeader,
            },
          ];
        } else {
          if (dataReadSubHeader.length > 0) {
            if (
              typeHeader != "PARTS" &&
              dataReadSubHeader[dataReadSubHeader.length - 1].title === "※"
            ) {
              dataReadSubHeader[dataReadSubHeader.length - 1].colom_end += 1;
            }
          }
        }
      }
    );
    return dataReadSubHeader;
  };

  // ------------------------------------------------------------------ material

  const [materialHeader, setMaterialHeader] = useState<dataSubHeaderType[]>(
    new Array()
  );
  const [material, setMaterial] = useState<dataType[][]>(new Array());
  const prosesDataMaterial = async (dataTitleHeader: ReadHeaderType) => {
    if (dataTitleHeader.result) {
      try {
        const dataSubHeaderExecl = dataExecl[
          dataTitleHeader.row_start + 1
        ].slice(dataTitleHeader.colom_start, dataTitleHeader.colom_end + 1);
        // console.log(dataSubHeaderExecl);
        const dataSubHeader: dataSubHeaderType[] = readSubHeader(
          dataSubHeaderExecl,
          dataTitleHeader.name
        );
        setMaterialHeader(dataSubHeader);

        let dataMaterial: dataType[][] = new Array();
        for (
          let rowIndex = dataTitleHeader.row_start + 2;
          rowIndex <= dataTitleHeader.row_end - 1;
          rowIndex++
        ) {
          // console.log(dataExecl[rowIndex].slice(dataTitleHeader.colom_start, dataTitleHeader.colom_end+1));
          const Fabric: string = dataExecl[rowIndex]
            .slice(
              dataTitleHeader.colom_start + dataSubHeader[2].colom_start,
              dataTitleHeader.colom_start + 1 + dataSubHeader[2].colom_end
            )
            .join("");
          const Qty: string = dataExecl[rowIndex].slice(
            dataTitleHeader.colom_start + dataSubHeader[3].colom_start,
            dataTitleHeader.colom_start + 1 + dataSubHeader[3].colom_end
          )
          .join("");
        
          let dataMaterialCol: dataType[] = new Array();
          if (Fabric !== "" && Qty !== '') {
            dataSubHeader.forEach(
              (valueSubHeader: dataSubHeaderType, indexSubHeader: number) => {
                dataMaterialCol[indexSubHeader] = {
                  title: valueSubHeader.title,
                  value:
                    indexSubHeader === 5
                      ? dataExecl[rowIndex]
                          .slice(
                            dataTitleHeader.colom_start +
                              valueSubHeader.colom_start,
                            dataTitleHeader.colom_start +
                              1 +
                              valueSubHeader.colom_end
                          )
                          .filter(Boolean)
                          .join("  ")
                      : dataExecl[rowIndex]
                          .slice(
                            dataTitleHeader.colom_start +
                              valueSubHeader.colom_start,
                            dataTitleHeader.colom_start +
                              1 +
                              valueSubHeader.colom_end
                          )
                          .filter(Boolean)
                          .join(""),
                };
              }
            );
            dataMaterial = [...dataMaterial, [...dataMaterialCol]];
          } else {
            if (dataMaterial.length !== 0) {
              dataSubHeader.forEach(
                (valueSubHeader: dataSubHeaderType, indexSubHeader: number) => {
                  const dataExeclSlice = dataExecl[rowIndex].slice(
                    dataTitleHeader.colom_start + valueSubHeader.colom_start,
                    dataTitleHeader.colom_start + 1 + valueSubHeader.colom_end
                  );
                  if (dataExeclSlice.join("") != "") {
                    let spase = " ";
                    if (indexSubHeader == 5) spase = String.fromCharCode(13);
                    if (indexSubHeader == 0) spase = ",";
                    dataMaterial[dataMaterial.length - 1][
                      indexSubHeader
                    ].value +=
                      spase +
                      (indexSubHeader === 5
                        ? dataExeclSlice.filter(Boolean).join("  ")
                        : dataExeclSlice.filter(Boolean).join(""));
                  }
                }
              );
            }
          }
        }
        setMaterial(dataMaterial);
      } catch (err: any) {
        alert(err.message);
        setProses(false);
      }
    } else {
      alert("proses fail colom head fail !!!");
      setProses(false);
    }
  };

  // ------------------------------------------------------------------ Part

  const [partHeader, setPartHeader] = useState<dataSubHeaderType[]>(
    new Array()
  );
  const [part, setPart] = useState<dataType[][]>(new Array());
  const prosesDataPart = async (dataTitleHeader: ReadHeaderType) => {
    if (dataTitleHeader.result) {
      try {
        const dataSubHeaderExecl = dataExecl[
          dataTitleHeader.row_start + 1
        ].slice(dataTitleHeader.colom_start, dataTitleHeader.colom_end + 1);
        // console.log(dataSubHeaderExecl)
        const dataSubHeader: dataSubHeaderType[] = readSubHeader(
          dataSubHeaderExecl,
          dataTitleHeader.name
        );
        // console.log(dataSubHeader)

        setPartHeader(dataSubHeader);

        let dataPart: dataType[][] = new Array();
        let condisionAtSite: boolean = false;
        for (
          let rowIndex = dataTitleHeader.row_start + 2;
          rowIndex <= dataTitleHeader.row_end - 1;
          rowIndex++
        ) {
          const Part: string = dataExecl[rowIndex]
            .slice(
              dataTitleHeader.colom_start + dataSubHeader[2].colom_start,
              dataTitleHeader.colom_start + 1 + dataSubHeader[2].colom_end
            )
            .join("");
          const Qty: string = dataExecl[rowIndex].slice(
              dataTitleHeader.colom_start + dataSubHeader[3].colom_start,
              dataTitleHeader.colom_start + 1 + dataSubHeader[3].colom_end
            )
            .join("");
          let dataPartCol: dataType[] = new Array();
          if (Part !== "" && Qty !== "") {
            dataSubHeader.forEach(
              (valueSubHeader: dataSubHeaderType, indexSubHeader: number) => {
                dataPartCol[indexSubHeader] = {
                  title: valueSubHeader.title,
                  value: dataExecl[rowIndex]
                    .slice(
                      dataTitleHeader.colom_start + valueSubHeader.colom_start,
                      dataTitleHeader.colom_start + 1 + valueSubHeader.colom_end
                    )
                    .filter(Boolean)
                    .join("  "),
                };
              }
            );
            dataPartCol = [
              ...dataPartCol,
              {
                title: "At Site",
                value: condisionAtSite ? "S" : "",
              },
            ];
            dataPart = [...dataPart, [...dataPartCol]];
          } else {
            if (
              dataExecl[rowIndex]
                .slice(
                  dataTitleHeader.colom_start + dataSubHeader[0].colom_start,
                  dataTitleHeader.colom_start + 1 + dataSubHeader[0].colom_end
                )
                .join("") === "(AT SITE)"
            ) {
              condisionAtSite = true;
            } else {
              if (dataPart.length !== 0) {
                dataSubHeader.forEach(
                  (
                    valueSubHeader: dataSubHeaderType,
                    indexSubHeader: number
                  ) => {
                    const dataExeclSlice = dataExecl[rowIndex].slice(
                      dataTitleHeader.colom_start + valueSubHeader.colom_start,
                      dataTitleHeader.colom_start + 1 + valueSubHeader.colom_end
                    );
                    let spase = " ";
                    if (indexSubHeader == 7) spase = ",";
                    if (dataExeclSlice.join("") != "") {
                      dataPart[dataPart.length - 1][indexSubHeader].value +=
                        spase + dataExeclSlice.filter(Boolean).join("");
                    }
                  }
                );
              }
            }
          }
        }
        // console.log(dataPart);
        setPart(dataPart);
      } catch (err: any) {
        alert(err.message);
        setProses(false);
      }
    } else {
      alert("proses fail colom head fail !!!");
      setProses(false);
    }
  };

  return (
    <div className="w-full h-full">
      {saveWindow && 
        (<SaveStandarList materialHeader={materialHeader} material={material} partHeader={partHeader} part={part} setSaveWindow={setSaveWindow}  />)
      }
      <div className="flex w-full flex-col justify-between bg-gray-200 px-2 py-1">
        <div className="my-auto flex flex-row justify-start w-full gap-3">
          <div>
            file excel:{" "}
            <input
              type="file"
              value=""
              onInput={(e) => handleChange(e)}
              className="rounded-md bg-orange-500 p-1 hover:bg-orange-300"
            />
          </div>
          {nameExeclSheet && (
            <div className="my-auto"><input
            type="button"
            value="Proses Data"
            onClick={() => startProsesData()}
            className="rounded-md bg-orange-500 p-1 hover:bg-orange-300 my-auto"
          />&nbsp;&nbsp;&nbsp;{nameExeclSheet}</div>
          )}
        </div>
        <div className="my-auto flex flex-row justify-start w-full gap-2 py-1">
            <input
              type="button"
              value="- LOAD -"
              onClick={() => {setSaveWindow(!saveWindow)}}
              className="rounded-md bg-orange-500 p-1 hover:bg-orange-300"
            />
            {proses && materialHeader.length > 0 && material.length > 0 && partHeader.length > 0 && part.length > 0 &&  (
              <input
                type="button"
                value="- SAVE -"
                onClick={() => {setSaveWindow(!saveWindow)}}
                className="rounded-md bg-orange-500 p-1 hover:bg-orange-300"
              />
            )}
        </div>
      </div>
      <div className="w-full text-center text-xl font-bold">{title}</div>

      <div className="flex flex-col justify-between gap-2 px-5">
        {/* MATERIAL TABLE  */}
        {materialHeader.length > 0 && material.length > 0 && (
          <TableMaterial materialHeader={materialHeader} material={material} />
        )}
        {/* PART TABLE  */}
        {partHeader.length > 0 && part.length > 0 && (
          <TablePart  partHeader={partHeader} part={part} />
        )}
      </div>
    </div>
  );
}

export default Standar_list;
