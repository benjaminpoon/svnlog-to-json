svnlog2json
========

## Description
`svnlog2json` is a decorator for the `svn log` command.  All it does
is offer the capability to output the `svn log` result in JSON format.

The module also offers the option to save your output to a file via
the `--output-path` param option.  Use this module the same way you
would use `svn log`.  All params passed to this module are passed to
`svn log` in turn with the exception of the `--output-path`.

### Usage

`svnlog2json [PATH] [params]`
`svnlog2json URL[@REV] [PATH...] [params]`

- `[params]` are any number of svn options for `svn log` along with
    the `--output-path` param (@see below).  Note: All `[params]` are
    optional.
- `--output-path` tells `svnlog2json` to output it's output and to
    output it to the location specified by this parameter.

### License
- ISC (http://opensource.org/licenses/ISC)
