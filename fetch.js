let fs = require('fs');
let unzipper = require('unzipper');
let bent = require('bent');
let getstream = bent(200, 302);
let json = JSON.parse(fs.readFileSync('./agencies.json'));
fs.rmdirSync('./data');
async function a(){
    let wantedFiles = ['routes.txt','shapes.txt','trips.txt'];
    fs.mkdirSync('./data');
    for(let i=0; i<json.length; i++){
        fs.mkdirSync('./data/'+json[i].loc);
        let a = await getstream(json[i].gtfs);
        a.pipe(unzipper.Parse()).on('entry',(entry)=>{
            let fileName = entry.path;
            if(wantedFiles.includes(fileName)){
                entry.pipe(fs.createWriteStream('data/'+json[i].loc+'/'+fileName));
            }else{
                entry.autodrain();
            }
        });
    }
}
// a();