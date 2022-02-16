const fs = require("fs")
const request = require("request")
const path = require("path")
// read the line ig
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
console.log("Welcome! This will grab the newest/All cosmetics\nType:\n1 -- Grab all the newest cosmetics\n")
console.log("\n2 -- This has been disabled atm\n")
readline.question('', athena => {
	if (athena == "1") {
		var authRequest = {

			'method': 'GET',
			'url': 'https://fortnite-api.com/v2/cosmetics/br/new',
			'headers': {
				'Content-Type': 'application/json'
			},
		};
		request(authRequest, function (error, response) {
			fs.writeFile(path.join(__dirname, "athena_temp.json"), response.body, 'utf8', (err) => {
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
				//const TEST692 = JSON.stringify(array)
				//fs.writeFileSync(path.join(__dirname, "athena.json"), TEST692)
				//	console.log(array)  
			})
		})
		readline.close();
	} else {
		console.log("invaild option")
		readline.close(); 	
	}
})
