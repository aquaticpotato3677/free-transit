import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

async function handleRequest(req){
    let {pathname} = new URL(req.url);
    if(pathname == '/') {
        let data = await Deno.readFile('./index.html');
        return new Response(data, {
            headers:{
                'content-type':'text/html'
            }
        });
    }else if(pathname == '/data.json'){
        let data = await Deno.readFile('./data.json');
        return new Response(data, {
            headers:{
                'content-type':'application/json'
            }
        });
    }
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handleRequest);