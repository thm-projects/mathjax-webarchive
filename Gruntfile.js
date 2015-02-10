"use strict";

module.exports = function (grunt) {
	require("time-grunt")(grunt);

	var outDir = "build";
	var tmpDir = "build/war";
	var mathjaxPath = "bower_components/MathJax";
	var mathjaxFiles = [
		"MathJax.js",
		"config/Safe.js",
		"config/TeX-AMS_HTML.js",
		"extensions",
		"fonts/HTML-CSS/TeX/*",
		"!fonts/HTML-CSS/TeX/png",
		"images",
		"jax/element",
		"jax/input/TeX",
		"jax/output/HTML-CSS",
		"jax/output/NativeMML",
		"jax/output/SVG/*",
		"!jax/output/SVG/fonts",
		"jax/output/SVG/fonts/TeX",
		"localization/de",
		"localization/en"
	];
	var lintJsFiles = "Gruntfile.js";

	grunt.initConfig({
		clean: {
			build: outDir
		},

		jscs: {
			src: lintJsFiles,
			options: {
				config: ".jscs.json"
			}
		},

		jshint: {
			src: lintJsFiles,
			options: {
				jshintrc: ".jshintrc"
			}
		},

		/* Use symlink since globbing for war task does not work as expected */
		symlink: {
			war: {
				expand: true,
				cwd: mathjaxPath,
				src: mathjaxFiles,
				dest: tmpDir
			}
		},

		war: {
			dist: {
				/* jshint ignore: start */
				options: {
					war_dist_folder: outDir,
					war_name: "mathjax",
					webxml_display_name: "MathJax"
				},
				/* jshint ignore: end */
				expand: true,
				cwd: tmpDir,
				src: "**"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-symlink");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-war");

	grunt.registerTask("lint", ["jscs", "jshint"]);
	grunt.registerTask("package", ["symlink", "war"]);
	grunt.registerTask("default", ["clean", "package"]);
};
