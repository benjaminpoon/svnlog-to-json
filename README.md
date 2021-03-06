svnlog2json
========

## Description
`svnlog2json` is a decorator for the `svn log` command.  This 
module accepts all the same svn log params as svn (except for the
short hand params which have to be written with '--' 
instead of '-'). It offers the capability to output the `svn log` 
result in JSON format (which it does by default when an 
`--output-path` is specified) or in XML format when `--to-xml` is 
passed in.

The module offers the option to save your output to a file via
the `--output-path` param option.  Use this module the same way you
would use `svn log`.  All params passed to this module are passed to
`svn log` in turn with the exception of the `--output-path`

### Usage

**Using module alias 1:**

`svnlog2j [PATH] [params]`

`svnlog2j URL[@REV] [PATH...] [params]`

**Using module alias 2:**

`svnlog2json [PATH] [params]`

`svnlog2json URL[@REV] [PATH...] [params]`

- **`[params]`** are any number of svn options for `svn log` along with
    the `--output-path` param (@see below).  Note: All `[params]` are
    optional.

### Module specific params:
- **--output-path** - The path to output the output to.

    **Aliases:**
    - `--to-file-path`

- **--to-xml** - Tells the module to save the file in XML format.

    **Aliases:**
    - `--save-as-xml`
    
### Caveats 
- Short named params for svn must be passed in with two dashes instead of
one at this time; E.g., 
```
svnlog2j URL@rev --l=3 // --l=3 gets passed to svn as --limit=3
// this command will print the `svn log` revision messages for upto 3 revisions
```

### Resources:
- **`svn log`** docs (http://svnbook.red-bean.com/en/1.7/svn.ref.svn.c.log.html)

### License
- ISC (http://opensource.org/licenses/ISC)
