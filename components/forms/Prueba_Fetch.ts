import { headers } from "next/dist/client/components/headers";

interface Context{
name:string;
description:string;
}
 async function getContexts(url:string){
    const res = await fetch(url);
    return res.json();
}
export async function createContext(url:string,data : Omit<Context,"id">) : Promise <Context> {
    const res = await fetch(url,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
}
(async () => {
    // GET Contexts
    // const users =await getContexts("http://localhost:3000/api/context")

    //Create contexts
    const context = await createContext("http://localhost:3000/api/context",{
        name:"Prueba",
    description: "Prueba"});
    

})  ;