import fs from 'fs';
import unzipper from 'unzipper';
import fetch from 'node-fetch';
let json = JSON.parse(fs.readFileSync('./agencies.json'));
fs.mkdirSync('./gtfs');
let wantedFiles = ['routes.txt','shapes.txt','trips.txt'];
for(let i=0; i<json.length; i++){
    fs.mkdirSync('./gtfs/'+json[i].loc);
    console.log(json[i].loc);
    try{
        let data = (await fetch(json[i].gtfs)).body;
        data.pipe(unzipper.Parse()).on('entry',(entry)=>{
            let fileName = entry.path;
            if(wantedFiles.includes(fileName)){
                entry.pipe(fs.createWriteStream('./gtfs/'+json[i].loc+'/'+fileName));
            }else{
                entry.autodrain();
            }
        });
    }catch(e) {
        console.log(e);
        console.log(json[i].loc);
    }
}