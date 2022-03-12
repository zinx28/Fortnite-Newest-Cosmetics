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
			console.log("Making temp file\n")
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
				console.log("n\Making Profile File")
				var TEST = fs.createWriteStream("newest-cosmetics.json");
				//stream.once('open', function(fd) {
				//	fs.readFileSync
			    const start = fs.readFileSync("./resources/start.json")
				const end = fs.readFileSync("./resources/end.json")
				TEST.write(start);
				fs.writeFileSync('./athena_temp.json', JSON.stringify(NewestCos['data']['items'], null, 2));
				NewestCos['data']['items'].forEach(async (playlist, i) => {
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
				})
				TEST.write(end);
				console.log("n\Done Making Profile File")
				console.log("\nDeleting Temp File")
				fs.unlinkSync('athena_temp.json', function (err) {
					if(err){
						console.log(err)
					}
				})
				//const TEST692 = JSON.stringify(array)
				//fs.writeFileSync(path.join(__dirname, "athena.json"), TEST692)
				//	console.log(array)  
			})
		})
		readline.close();
	}else if (athena == "2") {
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
			
			})
		})
		//console.log("Saved File since its big")
	} else {
		console.log("invaild option")
		readline.close(); 	
	}
})
