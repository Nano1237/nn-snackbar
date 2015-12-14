module.exports = function (grunt) {


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-closure-tools');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.initConfig({
		closureCompiler: {
			options: {
				// [REQUIRED] Path to closure compiler
				compilerFile: 'node_modules/closure-compiler/lib/vendor/compiler.jar',
				checkModified: true,

				compilerOpts: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					externs: [
						'angular.extern.js',
						'nn-snackbar.extern.js'
					]
				}
			},

			// any name that describes your task
			main: {
				// [OPTIONAL] Target files to compile. Can be a string, an array of strings
				// or grunt file syntax (<config:...>, *)
				src: 'nn-snackbar.annotated.js',

				// [OPTIONAL] set an output file
				dest: 'nn-snackbar.min.js'
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'styles.min.css': ['styles.css']
				}
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['styles.css']
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'styles.css': 'src/sass/main.scss'
				}
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			main: {
				files: {
					'nn-snackbar.annotated.js': ['src/nn-snackbar.js']
				}
			}
		},
		jshint: {
			files: ['src/nn-snackbar.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		}
	});


	grunt.registerTask('css-dev', [
		'csslint',
		'sass'
	]);
	grunt.registerTask('css', [
		'css-dev',
		'cssmin'
	]);
	grunt.registerTask('js-dev', [
		'jshint'
	]);
	grunt.registerTask('js', [
		'js-dev',
		'ngAnnotate',
		'closureCompiler'
	]);
	grunt.registerTask('default', [
		'js',
		'css'
	]);

};