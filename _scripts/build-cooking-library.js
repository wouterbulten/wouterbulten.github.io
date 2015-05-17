var lwip = require('lwip');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Imagemin = require('imagemin');
var path = require('path');
var async = require('async');

var dir = path.join(__dirname, '../_cooking-images');
var dest = path.join(__dirname, '../assets/images/cooking');
var tmp = path.join(__dirname, '.tmp-images');

var blogDir = path.join(__dirname, '../cooking');

var desiredHeightThumbnail = 150;
var scaleFactor = 0.3;

var deleteFolderRecursive = function(path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

//We execute tasks in serie
async.series([
	//Create tmp dir
	mkdirp(tmp, function (err) {

		if (err) {
			console.log('Error creating directory: ' + err)
		}

		//Read the directory
		var list = fs.readdirSync(dir);

		list.sort(function(a, b) {
               return fs.statSync(dir + '/' + a).mtime.getTime() - 
                      fs.statSync(dir + '/' + b).mtime.getTime();
        });

		// For every file in the list
		list.forEach(function (file) {

			var imgPath = path.join(dir, file);

			//Create a proper name
			var fileWithoutExt = file.replace(/\.[^/.]+$/, '')
			var name = fileWithoutExt.replace(/-/g, ' ');
			name = name.charAt(0).toUpperCase() + name.slice(1) + '.';

			console.log(name);

			lwip.open(imgPath, function(err, image) {

				if (err) {
					console.log('Error reading image: ' + err);
				}

				var cropSize = Math.min(image.height(), image.width());
				var thumbnail = image.batch()
					.crop(cropSize, cropSize)
					.scale(desiredHeightThumbnail / cropSize)
					.sharpen(0.4)
					.writeFile(path.join(tmp, fileWithoutExt + '_th.jpg'), function(err) {
						if(err) {
							console.log('Error saving image: ' + err);
						}
					});
			});

			lwip.open(imgPath, function(err, image) {
				if (err) {
					console.log('Error reading image: ' + err);
				}

				var popupImage = image.batch()
					.scale(scaleFactor)
					.saturate(0.1)
					.writeFile(path.join(tmp, fileWithoutExt + '_l.jpg'), function(err) {
						if(err) {
							console.log('Error saving image: ' + err);
						}
					});
			});
		});
	}),

	new Imagemin()
		.src(path.join(tmp, '*.{gif,jpg,png,svg}'))
		.dest(dest)
		.use(Imagemin.jpegtran({progressive: true}))
		.run(function (err, files) {}),

	//Delete the blog dir and the contents
	deleteFolderRecursive(blogDir),

	//Create the dir
	mkdirp(blogDir, function (err) {

		if (err) {
			console.log('Error creating directory: ' + err)
		}

		//Read the directory
		var list = fs.readdirSync(dir);

		list.sort(function(a, b) {
               return fs.statSync(dir + '/' + a).mtime.getTime() - 
                      fs.statSync(dir + '/' + b).mtime.getTime();
        });

		var indexOutput  = 
			'---' + '\n' +
			'layout: page' + '\n' +
			'title: Cooking Experiments\n' +
			'---' + '\n'
		;

		// For every file in the list
		list.forEach(function (file) {

			var imgPath = path.join(dir, file);

			//Create a proper name
			var fileWithoutExt = file.replace(/\.[^/.]+$/, '')
			var name = fileWithoutExt.replace(/-/g, ' ');
			name = name.charAt(0).toUpperCase() + name.slice(1) + '.';

			var url = fileWithoutExt.replace(',', '');

			var content = 
				'---' + '\n' +
				'layout: dish' + '\n' +
				'title: ' + name + '\n' +
				//'image: ' + '/assets/images/cooking/' + fileWithoutExt + '_l.jpg' + '\n' +
				'---' + '\n' +
				'<img src="/assets/images/cooking/' + fileWithoutExt + '_l.jpg" title="' + name + '" itemprop="image">'
			;
			fs.writeFile(path.join(blogDir, url + '.html'), content);

			indexOutput += 
				'<a href="/cooking/' + url + '">' +
				'<img src="/assets/images/cooking/' + fileWithoutExt + '_th.jpg" title="' + name + '">' +
				'</a>';
		});

		//Make index
		fs.writeFile(path.join(blogDir, 'index.html'), indexOutput);
	}),

]);



