
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
			todoster: {
				input: "./src/plugins/todoster/index.html",
				output: "./build/plugin.todoster.html",
				tokens: [
            { token: "//animate.css", file: "./src/plugins/todoster/css/animate.min.css" },
            { token: "//bootstrap.css", file: "./src/plugins/todoster/css/themes/white-plumb/bootstrap.min.css" },
            { token: "//app.css", file: "./src/plugins/todoster/css/app.css" },
            { token: "//font-awesome.css", file: "./src/plugins/todoster/css/font-awesome.min.css" },
            { token: "//jquery.js", file: "./src/plugins/todoster/vendors/jquery-1.11.1.js" },
            { token: "//moment.js", file: "./src/plugins/todoster/vendors/moment.min.js" },
            { token: "//angular.js", file: "./src/plugins/todoster/vendors/angular-1.2.18.min.js" },
            { token: "//angular-animate.js", file: "./src/plugins/todoster/vendors/angular-animate.min.js" },
            { token: "//app.js", file: "./src/plugins/todoster/app.js" },
            { token: "//DataFactory.js", file: "./src/plugins/todoster/services/DataFactory.js" }
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
	grunt.registerTask("todoster", ["mkdir", "combine:todoster"]);
};
