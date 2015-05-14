// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            }
            
        },
        sass: {
          app: {
            // Takes every file that ends with .scss from the scss 
            // directory and compile them into the css directory. 
            // Also changes the extension from .scss into .css. 
            // Note: file name that begins with _ are ignored automatically
            files: [{
              expand: true,
              cwd: '_sass',
              src: ['*.scss'],
              dest: 'css',
              ext: '.css'
            }]
          },
          options: {
            sourceMap: true, 
            outputStyle: 'nested', 
            imagePath: "../",
          }
        },
        copy: {
          css: {
            files: [
              // includes files within path
              {expand: true, src: ['css/*'], dest: '_site', filter: 'isFile'},              
            ],
          },
        },
        connect: {
            server: {
              options: {
                port: 9001,
                base: '_site',
                //directory: '_site',
                livereload: true, 
                //keepalive: true
                }
            }
        },
        watch: {
            jekyll: {
                files: [
                    '_includes/*.html',
                    '_layouts/*.html',
                    '_posts/*.markdown',
                    '_config.yml',
                    'index.html'                
                ],
                tasks: ['shell:jekyllBuild'],
                options: {
                    livereload: true,
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: ['_sass/{,*/}*.{scss,sass}'],                                   
                tasks: ['sass', 'copy'],
                options: {
                    livereload: true,
                    spawn: false
                    
                },

            },
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('sassCopy', ['sass']);
    grunt.registerTask('default', ['sass', 'copy',  'connect', 'watch']);
};