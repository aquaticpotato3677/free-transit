let fs = require('fs');
let unzipper = require('unzipper');
let bent = require('bent');
let getstream = bent(200, 302);
let json = JSON.parse(fs.readFileSync('./agencies.json'));
fs.mkdirSync('./gtfs');
async function run(){
    let wantedFiles = ['routes.txt','shapes.txt','trips.txt'];
    for(let i=0; i<json.length; i++){
        fs.mkdirSync('./gtfs/'+json[i].loc);
        try{
            let data = await getstream(json[i].gtfs);
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
}
run();
