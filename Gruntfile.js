
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    mkdir: {
      all: {
        options: {
          create: ["build"]
        },
      },
    },
    downloadfile: {
      files: [
        {url: 'https://code.jquery.com/jquery-2.1.3.min.js', dest: 'build'},
        {url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js', dest: 'build'},
        {url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css', dest: 'build'},
        {url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js', dest: 'build'},
        {url: 'https://raw.githubusercontent.com/davidshimjs/qrcodejs/master/qrcode.min.js', dest: 'build'}
      ]
    },
		combine: {
			test: {
				input: "./src/plugins/example/ui.html",
				output: "./build/plugin.example.html",
				tokens: [
					{ token: "//airbitz-bridge.js", file: "./lib/js/airbitz-bridge-fake.js" },
					{ token: "//airbitz-core.js", file: "./lib/js/airbitz-core.js" },
					{ token: "//jquery.js", file: "./build/jquery-2.1.3.min.js" },
					{ token: "//bootstrap.js", file: "./build/bootstrap.min.js" },
					{ token: "//bootstrap.css", file: "./build/bootstrap.min.css" },
					{ token: "//qrcode.min.js", file: "./build/qrcode.min.js" }
				]
			},
			android: {
				input: "./src/plugins/example/ui.html",
				output: "./build/android.plugin.example.html",
				tokens: [
					{ token: "//airbitz-bridge.js", file: "./lib/js/airbitz-bridge.js" },
					{ token: "//airbitz-core.js", file: "./lib/js/airbitz-core.js" },
					{ token: "//jquery.js", file: "./build/jquery-2.1.3.min.js" },
					{ token: "//bootstrap.js", file: "./build/bootstrap.min.js" },
					{ token: "//bootstrap.css", file: "./build/bootstrap.min.css" },
					{ token: "//qrcode.min.js", file: "./build/qrcode.min.js" }
				]
			}
		}
	});

	grunt.file.defaultEncoding = 'utf-8';
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.loadNpmTasks("grunt-downloadfile");
	grunt.loadNpmTasks("grunt-combine");
  grunt.loadNpmTasks("grunt-serve");
	grunt.registerTask("default", ["mkdir", "downloadfile", "combine:test"]);
	grunt.registerTask("android", ["mkdir", "downloadfile", "combine:android"]);
};
