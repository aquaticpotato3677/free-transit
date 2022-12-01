# A Map of Free Transit
This is the repo backing [this map](https://free-transit.deno.dev) of free transit. Obviously the data is far from complete, but it's a start.
## Initiatives
- 14 of the 15 RTAs in Massachusetts are free this December
    - the CCRTA is only free on Fridays and Saturdays, for some reason
- all buses in Connecticut are free until April
    - they have been free since last Memorial Day
- Vermont doesn't have a statewide initiative, but many agencies are free
## Behind the map
This is not super automated: instead of having a list of URLs to download from, ```process.js``` reads from a ```/data``` directory which contains all of the GTFS files for these agencies. You can find links for those at [transit.land](https://transit.land).

It then reads in the list of routes, finds all trips that run on that route, and finds the shapes that correspond to those trips. It's super jank, but it (kinda) works. After that, it processes all of those shapes into a geojson format, which gets read by ```index.html``` and is displayed using [mapbox](https://www.mapbox.com/mapbox-gljs). 

Finally, this is hosted with a direct integration with [Deno Deploy](https://dash.deno.com) to this repo. 