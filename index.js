#!/usr/bin/env node

/**
 * Created by edelacruz on 3/2/2015.
 * @requires @program: svn to be on the system path
 */

'use strict';

require('sjljs');

var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    dargs = require('dargs'),
    argv = require('yargs')

        // Param aliases (needed so that they are translated to our full name params here (via `yargs`))
        .alias('op' , 'outputPath')
        .alias('c'  , 'change')
        .alias('x'  , 'extensions')
        .alias('l'  , 'limit')
        .alias('q'  , 'quiet')
        .alias('r'  , 'revision')
        .alias('g'  , 'useMergeHistory')
        .alias('v'  , 'verbose')
        .argv,

    xml2js = require('xml2js'),
    log = console.log;

module.exports = (function () {

    // If not a valid call exit
    if (argv._.length === 0) {

        // Print help message(s)
        log(fs.readFileSync(path.join(__dirname, 'README.md'), {encoding: 'utf-8'}));

        // Exit process
        // process.exit(0);
        return;
    }

    // Setup command string to execute
    var cmdString = 'svn log ' + argv._.shift() + ' ',

        // Allowed command string args
        allowedCmdStringArgs = [
                'change',             // (-c) ARG
                'depth',              // ARG
                'diff',               //
                'diffCmd',            // CMD
                'extensions',         // (-x) ARG
                'incremental',        //
                'internalDiff',       //
                'limit',              // (-l) NUM
                'quiet',              // (-q)
                'revision',           // (-r) REV
                'stopOnCopy',         //
                'targets',            // FILENAME
                'useMergeHistory',    // (-g)
                'verbose',            // (-v)
                'withAllRevprops',    //
                'withNoRevprops',     //
                'withRevprop',        // ARG
                'xml'                 //
        ],

        // Args to append to command string
        cmdStringArgs = {
            xml: true,
            limit: 100
        };

    // Merge allowed command string args passed in
    Object.keys(argv).forEach(function (key) {
            if (allowedCmdStringArgs.indexOf(key) > -1) {
                cmdStringArgs[key] = argv[key];
            }
        });

    // Append path args if any
    if (argv._.length > 0) {
        cmdString += argv._.join(' ') + ' ';
    }

    // Append args for svn
    cmdString += dargs(cmdStringArgs).join(' ');

    // Execute command and get a handle to it
    exec(cmdString, function (err, stdout, stderr) {

        // If err
        if (!sjl.empty(err)) {
            log('An error occurred:\n', err, '\n');
        }

        // If stderr
        if (!sjl.empty(stderr)) {
            log('A standard error occurred:\n', stderr, '\n');
        }

        // If output print/log it
        if (!sjl.empty(stdout)) {

            // Print standard output
            log('standard output:\n', stdout, '\n');

            // If output to path
            if (!sjl.empty(argv.outputPath) && sjl.classOfIs(argv.outputPath, 'String')) {
                xml2js.parseString(stdout, function (xml2jsError, result) {
                    if (!sjl.empty(xml2jsError)) {
                        log('xml2js `parseString` error:\n', xml2jsError);
                        return;
                    }
                    var pathToWriteTo = path.resolve(process.cwd(), argv.outputPath);
                    log('Output written to "' + pathToWriteTo + '".\n');
                    fs.writeFileSync(pathToWriteTo, JSON.stringify(result));

                    log('svnlog2j completed successfully.');
                });

            } // /if output-path

        } // /if stdout

    }); // /exec

}()); // /module.exports
