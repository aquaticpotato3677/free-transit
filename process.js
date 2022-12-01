let fs = require('fs');
const csv = require('csv-parse/sync');
let agencies = ['berkshire-ma-us','brockton-ma-us','capeann-ma-us','frta-ma-us','gatra-ma-us','lowell-ma-us','marthasvineyard-ma-us','merrimackvalley-ma-us','montachusett-ma-us','mwrta-ma-us','nantucket-ma-us','pvta-ma-us','srta-ma-us','wrta-ma-us','cttransit-ct-us','seatbus-ct-us','norwalk-ct-us','middletown-ct-us','ninetown-connecticut-us','wrtd-ct-us','hartransit-ct-us','gbt-ct-us','advancetransit-vt-us','ccta-vt-us','ruralcommunity-vt-us','sevt-vt-us','trivalleytransit-vt-us','ulster-ny-us','sullivan-ny-us','beeline-ny-us'];
let json = {
    'sources':[],
    'layers':[]
};
for(let i=0; i<agencies.length; i++){
    let routes = csv.parse(fs.readFileSync('./data/'+agencies[i]+'/routes.txt').toString());
    let trips = csv.parse(fs.readFileSync('./data/'+agencies[i]+'/trips.txt').toString());
    let shapes = csv.parse(fs.readFileSync('./data/'+agencies[i]+'/shapes.txt').toString());
    
    let routesKey = routes[0];
    let routeIdInd = null;
    let routeShortNameInd = null;
    let routeColorInd = null;
    for(let j=0; j<routesKey.length; j++){
        if(routesKey[j]=='route_id') routeIdInd = j;
        if(routesKey[j]=='route_short_name') routeShortNameInd = j;
        if(routesKey[j]=='route_color') routeColorInd = j;
    }
    for(let j=1; j<routes.length; j++){
        let route = routes[j];
        let routeId = route[routeIdInd];
        let routeName = route[routeShortNameInd];
        let routeColor = routeColorInd==null?getRandomColor():route[routeColorInd];
        if(['', undefined, null].includes(routeColor)) routeColor = getRandomColor();
        if(!routeColor.startsWith('#')) routeColor = '#'+routeColor;
        let shapeInd = null;
        let routeInd = null;
        let tripsKey = trips[0];
        for(let k=0; k<tripsKey.length; k++){
            if(tripsKey[k]=='route_id') routeInd = k;
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

        for(let k=1; k<shapes.length; k++){
            let shape = shapes[k];
            let shapeId = shape[0];
            let shapeOrder = shape[3];
            if(routeShapes.has(shapeId)){
                routeShapes.get(shapeId).set(Number(shapeOrder), [shape[2],shape[1]]);
            }
        }
        let features = new Array();
        for(let [key, value] of routeShapes){
            let sorted = [...value].sort((a, b) => a[0] - b[0]);
            let arr = new Array();
            for(let l=0; l<sorted.length; l++){
                arr.push(sorted[l][1]);
            }
            let feature = {
                'type':'Feature',
                'properties':{},
                'geometry':{
                    'type':'LineString',
                    'coordinates':arr
                }
            }
            features.push(feature);
        }
        json.sources.push({
            'id':agencies[i]+routeId,
            'data':{
                'type':'geojson',
                'data':{
                    'type':'FeatureCollection',
                    'features':features
                }
            }
        });
        json.layers.push({
            'id':agencies[i]+routeId,
            'type':'line',
            'source':agencies[i]+routeId,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint':{
                'line-color':routeColor,
                'line-width':5
            }
        })
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