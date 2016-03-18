# node-line-counter

A simple command line tool to count the number of lines of code in a given directory. node-line-counter searches recursively and is provided with file types and pathways to use as inclusion/exclusion criteria.

## installation
Install node-line-conter globally with the following command:
```
npm i node-line-counter -g
```

## usage
```
node node-line [configuration]
```
Configuration is .json file formatted like below:
```
{
  "folders": [
    "!**/node_modules",
    "!file-runtime/runtime",
    "!spec-sketch"
  ],
  "files": [
    "**/*.js",
    "!**/temp.js"
  ]
}

```

## example usage

cd to the directory where you would like to read files. node-line-counter scans the directory and sub-directories.

```
$ node-line-counter 'myConfig.js'
./myFile.js 102
./foo/bar.js 90
./foo/foo.js 20

212 lines
```

## author

Cameron Smith, Gourmetjs. [cameron@gourmetjs.com](cameron@gourmetjs.com)

## license

MIT
