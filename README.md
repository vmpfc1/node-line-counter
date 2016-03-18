# node-line-counter
Disclaimer: still in production.

A simple command line tool to count the number of lines of code in a given directory. node-line-counter searches recursively and is provided with file types and pathways to use as inclusion/exclusion criteria.

## installation
Install node-line-conter with the following command:
```
figure out how to actually do this part !!!!
```

## usage
```
node node-line [directory] [configuration]
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

```
$ node node-line . 'config.js'
3524 lines in 167 files
```

## author

Cameron Smith, Gourmet. [cameron@gourmetjs.com](cameron@gourmetjs.com)

## license

MIT
