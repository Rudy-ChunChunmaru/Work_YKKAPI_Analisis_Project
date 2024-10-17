import localforage from "localforage";

export const localforageConfig = () => {
    localforage.config({
        name: 'M-Aru_App', // Name of the database
        storeName: 'M-Aru_Store', // Name of the data store
        version: 1.0, // Database version
        description: 'Local storage for M-Aru app', // Description for the database
        size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB in this example)
        driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE], // Preferred storage drivers in order
    });
} 

export const localstorageMaterial = "Local_Stroage_Material"
export const localstoragePart = "Local_Stroage_Part"