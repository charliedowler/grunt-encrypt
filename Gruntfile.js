/*
 * grunt-encrypt
 * https://github.com/charlie/grunt-encrypt
 *
 * Copyright (c) 2014 charliedowler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp/']
    },

    // Configuration to be run (and then tested).
    encrypt: {
      encrypt: {
        options: {
          key: 'test',
          dest: 'test/tmp/encrypted',
          ext: 'encrypted'
        },
        files: {
          'test/encrypted': ['test/fixtures/123']
        }
      },
      decrypt: {
        options: {
          key: 'test',
          dest: 'test/tmp/decrypted',
          decrypt: true
        },
        files: {
          'test/decrypted': ['test/tmp/encrypted.encrypted']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['encrypt', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
