module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                    sourceMap: false,
                    presets: ['env']
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: './',
                        src: ['<%= pkg.name %>.js'],
                        dest: './dist'
                    }]
                }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            presets: ['env']
                        }]
                    ],
                    browserifyOptions: {
                        standalone: '<%= pkg.name %>'
                    }
                },
                files: {
                    './dist/<%= pkg.name %>.js': ['./<%= pkg.name %>.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    // grunt.registerTask('default', ['less', 'browserify', 'uglify', 'copy']);
    grunt.registerTask('default', ['browserify']);

    grunt.registerTask('generate-lib', ['babel'])
};