const fs = require("fs")
const request = require("request")
const path = require("path")
// read the line ig
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log("Welcome! This will grab the newest/All cosmetics\nType:\n1 -- Grab all the newest cosmetics\n2 -- Grab all cosmetics")
readline.question('', athena => {
	console.log("\n")
	if (athena == "1") {
		console.log("Grabbing newest cosmetics")
		var authRequest = {

			'method': 'GET',
			'url': 'https://fortnite-api.com/v2/cosmetics/br/new',
			'headers': {
				'Content-Type': 'application/json'
			},
		};
		request(authRequest, function (error, response) {
			console.log("\nMaking temp file\n")
			fs.writeFile(path.join(__dirname, "athena_temp.json"), response.body, 'utf8', (err) => {
				const NewestCos = JSON.parse(response.body);
				const athena_temp = require("./athena_temp.json")
				const data2 = athena_temp['data']['items']
				array = [];
				for (const index of data2) {
					const id = index['id']
					const backendtype = index['type']['backendValue']
					const id2 = backendtype + ":" + id
					//if(backendtype == "AthenaCharacter"){
					//console.log(id2)
					/*	Test2 = `
						"${id2}": {
							'attributes': {
								"favorite": False,
								"item_seen": True,
								"level": 1,
								"max_level_bonus": 0,
								"rnd_sel_cnt": 0,
								"variants": [],
								"xp": 0
							},
							"templateId": "${id2}"
						}`
						array.push(Test2);
						
					
						}*/
					//array.push(Test2);

					console.log(id2)
				}
				const readline1 = require('readline').createInterface({
					input: process.stdin,
					output: process.stdout
				});
				console.log("Would you like them to be all marked as seen")
				readline1.question('', athena1 => {
					var IsShown = false
					if (athena1.includes("y")) {
						var IsShown = true
					} else {
						var IsShown = false
					}
				//	console.log(athena1)
					if (athena1.includes("y") || athena1.includes("n")) {
						readline1.close();
						console.log("\n")
						console.log("Making Profile File")

						var writeStream = fs.createWriteStream("newest-cosmetics.json");
						//stream.once('open', function(fd) {
						//	fs.readFileSync
						const start = fs.readFileSync("./resources/start.json")
						const end = fs.readFileSync("./resources/end.json")
						writeStream.write(start);
						fs.writeFileSync('./athena_temp.json', JSON.stringify(NewestCos['data']['items'], null, 2));
						NewestCos['data']['items'].forEach(async (playlist, i) => {
							//	console.log(playlist['variants'][0]['channel'])

							var test69 = `},
						"${playlist['type']['backendValue']}:${playlist['id']}": {
							"attributes": {
							  "favorite": false,
							  "item_seen": ${IsShown},
							  "level": 1,
							  "max_level_bonus": 0,
							  "rnd_sel_cnt": 0, `
							//TEST.write(test69)
							if (playlist['variants'] == null) {
								var test692 = `
							"variants": [],`
							} else {
								var test692 = `
							  "variants": [
								  {
									  "active": "${playlist['variants'][0]['options'][0]['tag']}",
									  "channel": "${playlist['variants'][0]['channel']}",
									  "owned": []
								  }
							  ],`

								//TEST.write(test692)
							}
							// "variants": [],
							var test693 = `
							  "xp": 0
							  },
							  "templateId": "${playlist['type']['backendValue']}:${playlist['id']}"`
							writeStream.write(test69 + test692 + test693);
						})
						
						writeStream.write(end)
						writeStream.end();
						console.log("\nMaking newest-cosmetics.json")
						fs.writeFile(path.join(__dirname, "newest-cosmetics.json"), "{}", (err) => {
						
						console.log("\nMaking The file look better")
						fs.writeFile(path.join(__dirname, "newest-cosmetics.json"), JSON.stringify(require("./newest-cosmetics.json"), null, 2), 'utf8', (err) => {
							if(err){
								console.log(err)
							}else{
								console.log("\nDone Making Profile File")
								console.log("\nDeleting Temp File")
								fs.unlinkSync('athena_temp.json', function (err) {
									if (err) {
										console.log(err)
									}
								})
							}
						})
						})
					} else {
						console.log("Invaild Chose")
					}
				})
			})
			readline.close();
		})
	} else if (athena == "2") {
		var authRequest = {

			'method': 'GET',
			'url': 'https://fortnite-api.com/v2/cosmetics/br/',
			'headers': {
				'Content-Type': 'application/json'
			},
		};
		request(authRequest, function (error, response) {
			fs.writeFile(path.join(__dirname, "athena_temp.json"), response.body, 'utf8', (err) => {
				const NewHotFixes = JSON.parse(response.body);
				const athena_temp = require("./athena_temp.json")
				const data2 = athena_temp['data']
				array = [];
				for (const index of data2) {
					const id = index['id']
					const backendtype = index['type']['backendValue']
					const id2 = backendtype + ":" + id
					array.push(`\nid2`);
				}
				var stream = fs.createWriteStream("all-cosmetics.txt");
				var TEST = fs.createWriteStream("all-cosmetics.json");
				//stream.once('open', function(fd) {
				//	fs.readFileSync
				const start = fs.readFileSync("./resources/start.json")
				const end = fs.readFileSync("./resources/end.json")
				TEST.write(start);

				fs.writeFileSync('./athena_temp.json', JSON.stringify(NewHotFixes['data'], null, 2));
				NewHotFixes['data'].forEach(async (playlist, i) => {
					var test69 = `},
					"${playlist['type']['backendValue']}:${playlist['id']}": {
						"attributes": {
						  "favorite": false,
						  "item_seen": true,
						  "level": 1,
						  "max_level_bonus": 0,
						  "rnd_sel_cnt": 0,
						  "variants": [],
						  "xp": 0
						},
						"templateId": "${playlist['type']['backendValue']}:${playlist['id']}"
					  `
					TEST.write(test69);
					stream.write(playlist['type']['backendValue'] + ":" + playlist['id'] + "\n");


					//	fs.write(fd, buffer, offset, length, position, callback)
					//	fs.createWriteStream('test.txt', playlist['type']['backendValue'] + ":" + playlist['id'])
					console.log(playlist['type']['backendValue'] + ":" + playlist['id'])
				})
				TEST.write(end);
				//});
			}
			)
		})
		//console.log("Saved File since its big")
	} else {
		console.log("invaild option")
		readline.close();
	}
})
