import localforage from "localforage";
import { localstorageMaterialPart, localstoragePattern } from "@/share/StoreageList";


const SaveStandarList = ({materialHeader,material,partHeader,part}) => {
    const SaveToLoaclStrogate = () => {
        localforage
        .setItem(localstorageMaterialPart, {
            id:'',
            name:'',
            category:'',
            note:'',
            headerMaterial: materialHeader,
            dataMaterial: material,
            headerPart: partHeader,
            dataPart: part
        })
        .then(() => console.log("data Material store to localforage"))
        .catch((error) =>
            console.error(
              "error when data Material store to localforage, massage:",
              error
            )
        );
    }
   return <div className="w-full h-full fix z-10 bg-black">
        <div className="w-[70%]">test</div>
   </div>
}

export default SaveStandarList;
