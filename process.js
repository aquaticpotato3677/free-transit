let fs = require('fs');
const csv = require('csv-parse/sync');
let agencies = [
    {
        "loc": "berkshire-ma-us",
        "name": "BRTA",
        "timeframe": "New Years'",
        "url": "https://berkshirerta.com"
    },
    {
        "loc": "brockton-ma-us",
        "name": "BAT",
        "timeframe": "New Years'",
        "url": "https://www.ridebat.com/"
    },
    {
        "loc": "capeann-ma-us",
        "name": "CATA",
        "timeframe": "New Years'",
        "url": "https://canntran.com/"
    },
    {
        "loc": "frta-ma-us",
        "name": "FRTA",
        "timeframe": "June 30th, 2023",
        "url": "https://frta.org/"
    },
    {
        "loc": "gatra-ma-us",
        "name": "GATRA",
        "timeframe": "New Years'",
        "url": "https://www.gatra.org/"
    },
    {
        "loc": "lowell-ma-us",
        "name": "LRTA",
        "timeframe": "New Years'",
        "url": "https://lrta.com/"
    },
    {
        "loc": "marthasvineyard-ma-us",
        "name": "VTA",
        "timeframe": "New Years'",
        "url": "https://www.vineyardtransit.com/"
    },
    {
        "loc": "merrimackvalley-ma-us",
        "name": "MVRTA",
        "timeframe": "indefinitely",
        "url": "https://www.mvrta.com/"
    },
    {
        "loc": "montachusett-ma-us",
        "name": "MART",
        "timeframe": "New Years'",
        "url": "https://www.mrta.us/"
    },
    {
        "loc": "mwrta-ma-us",
        "name": "MWRTA",
        "timeframe": "until their new fare system arrives",
        "url": "https://mwrta.com/"
    },
    {
        "loc": "nantucket-ma-us",
        "name": "NRTA",
        "timeframe": "New Years'",
        "url": "https://nrtawave.com/"
    },
    {
        "loc": "pvta-ma-us",
        "name": "PVTA",
        "timeframe": "New Years'",
        "url": "https://pvta.com/"
    },
    {
        "loc": "srta-ma-us",
        "name": "SRTA",
        "timeframe": "New Years'",
        "url": "https://www.srtabus.com/"
    },
    {
        "loc": "wrta-ma-us",
        "name": "WRTA",
        "timeframe": "June 2023",
        "url": "https://www.therta.com/"
    },
    {
        "loc": "cttransit-ct-us",
        "name": "CTTransit",
        "timeframe": "March 31, 2023",
        "url": "https://www.cttransit.com/"
    },
    {
        "loc": "seatbus-ct-us",
        "name": "SEAT",
        "timeframe": "March 31, 2023",
        "url": "https://southeastareatransitdistrict.com/"
    },
    {
        "loc": "norwalk-ct-us",
        "name": "NTD",
        "timeframe": "March 31, 2023",
        "url": "https://norwalktransit.com/"
    },
    {
        "loc": "middletown-ct-us",
        "name": "MAT",
        "timeframe": "March 31, 2023",
        "url": "https://www.middletownareatransit.org/"
    },
    {
        "loc": "ninetown-connecticut-us",
        "name": "9 Town",
        "timeframe": "March 31, 2023",
        "url": "https://estuarytransit.org/"
    },
    {
        "loc": "wrtd-ct-us",
        "name": "WRTD",
        "timeframe": "March 31, 2023",
        "url": "https://wrtd.org/"
    },
    {
        "loc": "hartransit-ct-us",
        "name": "HARTransit",
        "timeframe": "March 31, 2023",
        "url": "https://hartransit.com/"
    },
    {
        "loc": "gbt-ct-us",
        "name": "GBT",
        "timeframe": "March 31, 2023",
        "url": "https://gogbt.com/"
    },
    {
        "loc": "advancetransit-vt-us",
        "name": "AT",
        "timeframe": "indefinitely",
        "url": "https://advancetransit.com/"
    },
    {
        "loc": "ccta-vt-us",
        "name": "GMT",
        "timeframe": "June 30, 2023",
        "url": "https://ridegmt.com/"
    },
    {
        "loc": "ruralcommunity-vt-us",
        "name": "RCT",
        "timeframe": "indefinitely",
        "url": "https://www.riderct.org/"
    },
    {
        "loc": "sevt-vt-us",
        "name": "MOOver",
        "timeframe": "indefinitely",
        "url": "https://www.moover.com/"
    },
    {
        "loc": "trivalleytransit-vt-us",
        "name": "TVT",
        "timeframe": "indefinitely",
        "url": "https://www.trivalleytransit.org/"
    },
    {
        "loc": "ulster-ny-us",
        "name": "UCAT",
        "timeframe": "indefinitely",
        "url": "https://ucat.ulstercountyny.gov/"
    },
    {
        "loc": "sullivan-ny-us",
        "name": "Move Sullivan",
        "timeframe": "indefinitely (excepting Highland and Delaware routes)",
        "url": "https://sullivanny.us/Departments/Transportation/MoveSullivan"
    },
    {
        "loc": "beeline-ny-us",
        "name": "Bee Line",
        "timeframe": "December 7-26, 2022",
        "url": "https://transportation.westchestergov.com/bee-line"
    },
    {
        "loc": "pfp-wa-us",
        "name": "PFP",
        "timeframe": "indefinitely",
        "url": "https://mypfp.org/services/transportation/"
    },
    {
        "loc": "wilsonville-or-us",
        "name": "SMART",
        "timeframe": "indefinitely (excepting 1X)",
        "url": "https://www.ridesmart.com/transit"
    },
    {
        "loc": "woodburn-or-us",
        "name": "Woodburn Transit",
        "timeframe": "indefinitely",
        "url": "https://www.woodburn-or.gov/transit"
    },
    {
        "loc": "corvallis-or-us",
        "name": "Corvallis Transit",
        "timeframe": "indefinitely",
        "url": "https://www.corvallisoregon.gov/cts"
    },
    {
        "loc": "clackamascounty-or-us",
        "name": "Clackmas County Connects",
        "timeframe": "indefinitely",
        "url": "https://www.clackamas.us/h3s/connects-shuttle"
    },
    {
        "loc": "graysharbor-wa-us",
        "name": "Grays Harbor Transit",
        "timeframe": "indefinitely",
        "url": "https://www.ghtransit.com/"
    },
    {
        "loc": "valleytransit-wa-us",
        "name": "Valley Transit",
        "timeframe": "indefinitely",
        "url": "https://www.valleytransit.com/"
    },
    {
        "loc": "linktransit-nc-us",
        "name": "Link Transit",
        "timeframe": "indefinitely",
        "url": "https://linktransit.org"
    },
    {
        "loc": "linktransit-wa-us",
        "name": "Link Transit",
        "timeframe": "indefinitely",
        "url": "https://www.linktransit.com"
    }
]
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
                routeShapes.get(shapeId).set(Number(shapeOrder), [shape[shapeLonInd],shape[shapeLatInd]]);
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