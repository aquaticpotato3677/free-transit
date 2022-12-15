# A Map of Free Transit
This is the repo backing [this map](https://aquaticpotato3677.github.io/free-transit/) of free transit. Some agencies, like Milford Transit in Connecticut don't have GTFS, so those are obviously left out. See something missing? [Contribute!](#contributing)
## Initiatives
- 14 of the 15 RTAs in Massachusetts are free this December
    - the CCRTA is only free on Fridays and Saturdays, for some reason
- all buses in Connecticut are free until April
    - they have been free since last Memorial Day
## Behind the map
All the data needed to run this is in `agencies.json`. There, you'll find an array of agencies, with links to their GTFS files and homepages, as well as how long they're free for. 

`fetch.js` fetches and saves `routes.txt`, `shapes.txt`, and `trips.txt`, which `process.js` then transforms into GeoJSON. 

Mapbox GL JS is used to render the map and lines, in `index.html`.

## Contributing
Should be fairly easy, just edit `agencies.json`, adding a unique identifier for `loc` (I've stolen Trillium's scheme because they're *everywhere*), an agency name, timeframe, homepage, and link to GTFS. Open a pull request, and I'll take a look. If you *really* don't want to touch code, just open an issue. 

### Running locally?
Run `fetch.js`, `process.js`, then set up a server to serve `index.html` and `data.json`. You'll need to setup up your own [Mapbox](https://mapbox.com/) account for a token. 