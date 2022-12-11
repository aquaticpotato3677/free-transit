let fs = require('fs');
const csv = require('csv-parse/sync');
let agencies = JSON.parse(fs.readFileSync('./agencies.json').toString());
let json = {
    'type': 'FeatureCollection',
    'features':[]
};
for(let i=0; i<agencies.length; i++){
    let routes = csv.parse(fs.readFileSync('./data/'+agencies[i].loc+'/routes.txt').toString());
    let trips = csv.parse(fs.readFileSync('./data/'+agencies[i].loc+'/trips.txt').toString());
    let shapes = csv.parse(fs.readFileSync('./data/'+agencies[i].loc+'/shapes.txt').toString());
    
    let routesKey = routes[0];
    let routeIdInd = null;
    let routeShortNameInd = null;
    let routeColorInd = null;
    let routeLongNameInd = null;
    let routeUrlInd = null;
    for(let j=0; j<routesKey.length; j++){
        if(routesKey[j].trim()=='route_id') routeIdInd = j;
        if(routesKey[j]=='route_short_name') routeShortNameInd = j;
        if(routesKey[j]=='route_color') routeColorInd = j;
        if(routesKey[j]=='route_long_name') routeLongNameInd = j;
        if(routesKey[j]=='route_url') routeUrlInd = j;
    }
    for(let j=1; j<routes.length; j++){
        let route = routes[j];
        let routeId = route[routeIdInd].replaceAll('"','');
        let routeName = route[routeShortNameInd].replaceAll('"','');
        if(routeName=='') routeName = route[routeLongNameInd];
        let routeColor = routeColorInd==null?getRandomColor():route[routeColorInd];
        if(['', undefined, null].includes(routeColor)) routeColor = getRandomColor();
        if(!routeColor.startsWith('#')) routeColor = '#'+routeColor;
        let routeUrl = agencies[i].url;
        if(routeUrlInd!=null) routeUrl = route[routeUrlInd].replaceAll('"','');
        if(routeUrl=='') routeUrl = agencies[i].url;
        let shapeInd = null;
        let routeInd = null;
        let tripsKey = trips[0];
        for(let k=0; k<tripsKey.length; k++){
            if(tripsKey[k].trim()=='route_id') routeInd = k;
            if(tripsKey[k]=='shape_id') shapeInd = k;
        }
        // find all trips and shapes that match this route id
        let routeShapes = new Map();
        for(let k=1; k<trips.length; k++){
            let trip = trips[k];
            if(trip[routeInd]==routeId){
                if(!routeShapes.has(trip[shapeInd])) routeShapes.set(trip[shapeInd], new Map());
            }
        }
        if(routeShapes.size==0) continue;
        let shapeIdInd = null;
        let shapeLonInd = null;
        let shapeLatInd = null;
        let shapeOrderInd = null;
        let shapesKey = shapes[0];
        for(let k=0; k<shapesKey.length; k++){
            if(shapesKey[k].trim()=='shape_id') shapeIdInd = k;
            if(shapesKey[k]=='shape_pt_sequence') shapeOrderInd = k;
            if(shapesKey[k]=='shape_pt_lon') shapeLonInd = k;
            if(shapesKey[k]=='shape_pt_lat') shapeLatInd = k;
        }
        for(let k=1; k<shapes.length; k++){
            let shape = shapes[k];
            let shapeId = shape[shapeIdInd];
            let shapeOrder = shape[shapeOrderInd];
            if(routeShapes.has(shapeId)){
                routeShapes.get(shapeId).set(Number(shapeOrder), [Number(shape[shapeLonInd]),Number(shape[shapeLatInd])]);
            }
        }
        for(let [key, value] of routeShapes){
            let sorted = [...value].sort((a, b) => a[0] - b[0]);
            if(sorted.length==0) continue;
            let arr = new Array();
            for(let l=0; l<sorted.length; l++){
                arr.push(sorted[l][1]);
            }
            let feature = {
                'type':'Feature',
                'properties':{
                    'id': agencies[i].loc+routeId,
                    'color':routeColor,
                    'popup': '<a href='+routeUrl+'>'+agencies[i].name+' '+routeName+'</a><br>free until: '+agencies[i].timeframe
                },
                'geometry':{
                    'type':'LineString',
                    'coordinates':arr
                }
            }
            
            json.features.push(feature);
        }
    }
}

fs.writeFileSync('./data.json',JSON.stringify(json));

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}