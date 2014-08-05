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
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
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
          var contents = encrypt[(options.decrypt) ? 'decrypt' : 'encrypt'](options.key, grunt.file.read(filepath), 'hex');
          grunt.file.write(path.join(options.dest, filename) || [filepath, 'encrypted'].join('.'), contents);
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
