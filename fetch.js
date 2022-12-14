let fs = require('fs');
let unzipper = require('unzipper');
let bent = require('bent');
let getstream = bent(200, 302);
let json = JSON.parse(fs.readFileSync('./agencies.json'));
fs.rmSync('./data', {recursive:true});
fs.mkdirSync('./data');
async()=>{
    let wantedFiles = ['routes.txt','shapes.txt','trips.txt'];
    for(let i=0; i<json.length; i++){
        fs.mkdirSync('./data/'+json[i].loc);
        let data = await getstream(json[i].gtfs);
        data.pipe(unzipper.Parse()).on('entry',(entry)=>{
            let fileName = entry.path;
            if(wantedFiles.includes(fileName)){
                entry.pipe(fs.writeFile('./data/'+json[i].loc+'/'+fileName));
            }else{
                entry.autodrain();
            }
        });
    }
}
