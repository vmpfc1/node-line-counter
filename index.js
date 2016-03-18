#!/usr/bin/env node

var fs = require("fs");
var mm = require("micromatch");
var async = require("async");
var argv = require("minimist")(process.argv.slice(2));

// Grab default directory and configuration files if user does not give input
if (argv["directory"] == undefined) {
  var rootLocation = '.';
} else {
  var rootLocation = argv["directory"];
}

if (argv["configuration"] == undefined) {
  var configLocation = 'config.json';
} else {
  var configLocation = argv["configuration"];
}

// Primary function
function grabInput (input, cb) {
  fs.readFile(input, /*'utf8',*/ function (err, data) {

    // change the names of these variables
    stuff = [];
    moreStuff = [];
    onlyExcludeFiles = [];

    //if (err) throw err;  // violates npm style Be very careful never to ever ever throw anything. 
    //It's worse than useless. Just send the error message back as the first argument to the callback.


    var jsonFile = JSON.parse(data);
    var fileArray = stuff.concat(jsonFile["files"], jsonFile["folders"]);
    var onlyExcludeFiles = moreStuff.concat(jsonFile["folders"], "*");

    cb(fileArray, onlyExcludeFiles);
  });
}

grabInput(configLocation, function(includeFiles, excludeFiles) {
  var allFiles = 0;
  var numLines = 0;

  // Checks to see if a path+file is a dir.
  // Then runs scanDir recursively if path+file is non-excluded.
  var itemRead = function (path, file, itemReadCb) {
    function cb(err, stats) {
      if (err) {
        itemReadCb()
        return console.error(err);
      }
      // If stats.isDir = true
      if (!err && stats.isDirectory()) {
      	// Certain folders are excluded from being scanned.
        if (mm((file), excludeFiles).length > 0) { 
          scanDir(path + "/" + file, function() {
            itemReadCb()
          });

          //console.log(path + "/" + file + "  <--- this is a folder");
        }
        else {
          itemReadCb()
        }
      }
      else {
        itemReadCb()
      }
    }
    var filePath = path + "/" + file;
    fs.stat(filePath, cb);
  }

  // Reads the current directory, adding the number of lines in each file we care about to numLines
  function scanDir(path, scanDirCb) {
    function readFiles(err, files, readFilesCb) {
      if (err) {
        return console.error(err, "err1");
      }
      if (!err) {
        // mm discards files that don't match our inclusion criteria
        var validFiles = mm((files), includeFiles);

        // Reads the number of lines from each file, producing a callback when complete
        function readLines(file, readLinesCb) {
          var filePath = path + "/" + file;
          fs.readFile(filePath, function(err, data) {
            if (data != undefined) {
              var array = data.toString().split("\n");
              numLines += array.length;
              console.log(filePath + "  " + array.length);
              allFiles+=1;
            }
            if (readLinesCb) readLinesCb()
          });
        }

        // Run readLines on each thing in validFiles, with cb of 'done'.
        async.each(validFiles, readLines, function() {
          //console.log("done")
          // Once every file is read, itemRead checks each file to see whether its a dir we care about
          async.each(files, function(item, itemReadCb){
            // itemRead is called after completion of all readLines
            itemRead(path, item, itemReadCb);
          },
          // callback once every file and dir in current path has been read
          function(){
            //console.log("done reading items at", path)
            if (readFilesCb) readFilesCb()
          })
        })					
      }
    }

    // fs.readdir reads directory, its callback contains array of all files.
    // Then readFiles triggers. When readFiles completes, its cb is ScanDir again.
    fs.readdir(path, function(err, fileArray) {
      readFiles(err, fileArray, function(){
        //console.log("done reading files in", path)
        scanDirCb()
      })
    });
  }

  scanDir(rootLocation, function() {
    //console.log("done reading directory");
    console.log("\n" + numLines);
  });
});

///////////////////////////////////////////////////////////////////////
// Optimizations - don't stat everything passed to itemRead - find a way to detect all directories in dir. 
// make functions more readable
// need to handle errors in fs callbacks, in particular in Readfiles, readLines, readdir