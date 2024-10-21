import localforage from "localforage";
import { localstorageMaterial, localstoragePart } from "@/share/StoreageList";


const SaveLoadStandarList = ({materialHeader,material,partHeader,part}) => {
    
    localforage
        .setItem(localstorageMaterial, {
            headerMaterial: materialHeader,
            dataMaterial: material,
        })
        .then(() => console.log("data Material store to localforage"))
        .catch((error) =>
            console.error(
              "error when data Material store to localforage, massage:",
              error
            )
        );

    localforage
        .setItem(localstoragePart, { headerPart: partHeader, dataPart: part })
        .then(() => console.log("data Part store to localforage"))
        .catch((error) =>
            console.error(
              "error when data Part store to localforage, massage:",
              error
            )
        );
    
}

export default SaveLoadStandarList;
