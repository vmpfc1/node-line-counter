# node-line-counter

A simple command line tool to count the number of lines of code in a given directory. node-line-counter searches recursively and is provided with file types and pathways to use as inclusion/exclusion criteria.

## installation
Install node-line-counter globally with the following command:
```
npm i node-line-counter -g
```

## usage
```
node-line-counter [configuration]
```
Configuration is a .json file formatted like below, which is the default:
```
{
  "folders": [
    "!**/node_modules",
    "!**/_build",
    "!**/_test",
    "!**/_doc",
    "!**/verify",
    "!gourmet-builder/lib",
    "!gourmet-server/lib",
    "!gourmet-runtime/runtime",
    "!benchmark",
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
$ node-line-counter
./myFile.js 102
./foo/bar.js 90
./foo/foo.js 20

212 lines
```

## author

Cameron Smith, Gourmetjs. [vmpfc1@gmail.com](vmpfc1@gmail.com)

## license

MIT
