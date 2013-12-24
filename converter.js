

var csv2json = function(csvRawString, delimiter, hasHeader) {
    if (delimiter == undefined) {
        delimiter = ",";
    }

    if (hasHeader == undefined) {
        hasHeader = true;
    }

    var json = [];
    
    var rows = csvRawString.trim().split('\n');

    var header, content;
    if (hasHeader) {
        // First line is header
        header = [];
        rows[0].split(delimiter).forEach(function(col) {
            header.push(col.trim())
        });
        //console.log(header)
        rows.splice(0,1)
    } 

    // Process each row
    rows.forEach(function(row) {
        var cols = row.split(delimiter);
        var item = {};
        for (var i = 0; i < cols.length; i++) {
            item[hasHeader ? header[i] : i] = cols[i];
        }
        json.push(item);
    })

   return json;
}

var objects2geojson = function(objects) {
    var geojson = {"type": "FeatureCollection", "features": []};
    var keywords = ["lat", "lng"]


    objects.forEach(function(item) {
        var feature = {};
        feature.type = "Feature";
        feature.geometry = {};
        feature.geometry.type = "Point";
        feature.geometry.coordinates = [parseFloat(item["lng"]), parseFloat(item["lat"])];
        feature.properties = {};
      
        Object.keys(item).forEach(function(key) {
            if (keywords.indexOf(key) == -1) {
                feature.properties[key] = item[key];
            }
        })
        geojson.features.push(feature)
    })

    return geojson;
}

var csv2geojson = function(csvRawString, delimiter, hasHeader) {

    var objects = csv2json(csvRawString, delimiter, hasHeader)

    return objects2geojson(objects);

}

exports.csv2json = csv2json;
exports.objects2geojson = objects2geojson;
exports.csv2geojson = csv2geojson;
