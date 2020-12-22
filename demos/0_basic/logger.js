//(function(exports, require, module, __filename, __dirname){
    // ****** Module Test Code ****** 
    console.log(module);
    console.log(__filename);
    console.log(__dirname);

    function log(message){
        // Send an HTTP request
        console.log(message);
    }

    module.exports.logTest = log; // export/public methods, properties
//})
