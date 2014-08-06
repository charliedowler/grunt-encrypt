/*
 * grunt-encrypt
 * https://github.com/charlie/grunt-encrypt
 *
 * Copyright (c) 2014 charliedowler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var encrypt = require('cf-encrypt');
  var path = require('path');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('encrypt', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    if (!options.key) {
      grunt.fail.warn('Missing key property.');
    }
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          var filename = path.basename(filepath);
          var newFilename = (grunt.file.isDir(options.dest) ? [filepath, 'encrypted'].join('.') : (options.ext) ? [options.dest, options.ext].join('.') : options.dest);
          var contents = encrypt[(options.decrypt) ? 'decrypt' : 'encrypt'](options.key, grunt.file.read(filepath), 'hex');
          if (options.decrypt) {
            var ext = filepath.split('.');
            ext = ext[ext.length - 1];
            newFilename = newFilename.split('.' + ext).join('');
          }
          grunt.file.write(newFilename, contents);
          return true;
        }
      });

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
