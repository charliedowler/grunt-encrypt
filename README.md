# grunt-encrypt [![Build Status][travis-image]][travis-url]

> Encrypt your files with Grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-encrypt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-encrypt');
```

## The "encrypt" task

### Overview
In your project's Gruntfile, add a section named `encrypt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  encrypt: {
    options: {
      key: 'superSecretKey',
      dest: 'output/encrypted/'
    },
    files: {
        'someFiles': ['path/to/files']
    }
  },
});
```

### Options

#### options.key
Type: `String`
Default value: `null`

A string value used to encrypt a file

#### options.dest
Type: `String`

A string to the output directory, defaults to the source file path

#### options.ext
Type: `String`
Default value: `null`

A string to set the file extension for the encrypted file.

#### files
Type: `Object`

An object containing a map of files. See below for examples.

### Usage Examples

#### Encrypt options
In this example we are encrypting some configuration files and outputing to the same directory. You can set the output directory by passing the `dest` option, you can assign the encryption key by passing the `key` option. By passing the `ext` option the input files become `ftppass.json.encrypted` and `sshKey.encrypted`

```js
grunt.initConfig({
  encrypt: {
    encryptConfigFiles: {
        options: {
            key: process.env.encryptionKey,
            dest: './',
            ext: 'encrypted',
            decrypt: true
        },
        files: {
            'configFiles': ['./ftppass.json', './sshKey'],
        }
    }
  }
});
```

#### Decrypt Options
In this example we are decrypting some configuration files, we are providing the key through environment variables. You can decrypt files by passing the `decrypt` option to the task, If the `dest` option is a directory it will generate the new file with the existing name.

The decrypt option removes the last extension in the filename, for example if you encrypt a file with the filename as  `passwords.json` and you don't provide the `ext` option, `.json` will be removed.

```js
grunt.initConfig({
  encrypt: {
    decryptConfigFiles: {
        options: {
            key: process.env.encryptionKey,
            dest: './',
            decrypt: true
        },
        files: {
            'configFiles': ['./ftppass.encrypted', './sshKey.encrypted'],
        }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 2014-08-06 v0.1.0 Initial release

[travis-url]: http://travis-ci.org/charliedowler/grunt-encrypt
[travis-image]: https://secure.travis-ci.org/charliedowler/grunt-encrypt.png?branch=master