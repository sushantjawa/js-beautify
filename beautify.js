const fs = require('fs');
var beautify = require('js-beautify').js_beautify;

var array = [];
var flag = false;

var test = (filePath) => {
    console.log("result",filePath);
    testing(filePath, (result) => {
        
        var reformattedArray = result.map(obj => {
            if (obj == '') {
                return undefined;
            } else if (obj.charAt(0) == '/' && obj.charAt(1) == '/') {
                console.log("comment");
                return undefined;
            } else if (obj.charAt(0) == '/' && obj.charAt(1) == '*') {
                if (obj.charAt(obj.length - 2) == '*' && obj.charAt(obj.length - 1) == '/') {
                    console.log("single line comment");
                    return undefined;
                } else {
                    console.log("single line comment else");
                    flag = true;
                    return undefined;
                }
            } else if (flag == true) {
                console.log("flag" + flag + obj)
                if (obj.charAt(obj.length - 2) == '*' && obj.charAt(obj.length - 1) == '/') {
                    flag = false;
                    console.log("yes inside");
                    return undefined;
                } else {
                    console.log("multi line comment");
                    return undefined;
                }
            } else
                return obj;
        });
        reformattedArray = reformattedArray.filter(function(element) {
            return element !== undefined;
        });
        var fileName=filePath.slice(filePath.lastIndexOf('\\')+1,filePath.length);
        console.log(fileName)
        var file = fs.createWriteStream(fileName);
        file.on('error', function(err) { console.log(err) });
        reformattedArray.forEach(function(v) {
            file.write(v + '\n');
        });
        file.end(function() {
            var data = fs.readFileSync(fileName);
            fs.writeFileSync(fileName, beautify(data.toString(), {
                indent_size: 4
            }));
     });
    });
}


function testing(fileName, callback) {
    console.log("fileName",fileName);
    var lineReader = require('readline').createInterface({
    input: fs.createReadStream(fileName)
});
    lineReader.on('line', function(line) {
        console.log('Line from file:', line.trim(), line.trim() == '');
        array.push(line.trim());
    }).on('close', () => {
        console.log('Have a great day!');
        callback(array);
    });

}
module.exports ={
    test
};