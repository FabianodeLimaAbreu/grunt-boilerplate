module.exports=function(grunt){
	grunt.initConfig({
		//Tasks Configurations
		clean:{
			//Clean the dist folder, and after clean all the styles and scripts, except the final file and exceptions
			build:{
				src:['dist']
			},
			stylesheets:{
				//The line bellow can be changed accordding to the project. For more exceptions add in the line below
				src:['dist/css/**.css','!dist/css/app.min.css']
			},
			scripts:{
				//The line bellow can be changed accordding to the project
				src:['dist/js/**.js','!dist/js/app.min.js']
			},
			temporary:{
				//Clean the temporary folder that the usemin create when is in action
				src:['.tmp']
			}
		},
		copy:{
			//Copy all the files, except the config files
			build:{

				//The line bellow can be changed accordding to the project. For more exceptions add in the line below
				src:['**','!node_modules/**','!**/Gruntfile.js','!**/package.json','!**/*.less'], //  **/*.less is for less files
				dest:'dist',
				expand:true
			}
		},
		//Usemin Task
		useminPrepare:{
			html:['dist/**/*.html']
		},
		usemin:{
			html:['dist/**/*.html']
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	//Register tasks
	grunt.registerTask(
		'default',
		'In action with grunt',
		['build']
	);
	grunt.registerTask(
		//Clean and call the minifier task
		'build',
		'To deploy',
		['clean','copy','minifier']
	);
	//minifier task
	grunt.registerTask(
		'minifier',
		'To minifier the css and js files, clean the other files after',
		['useminPrepare','usemin','concat','uglify','cssmin','clean:stylesheets','clean:scripts','clean:temporary']
	);
}