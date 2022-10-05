import tmi from 'tmi.js'
import {BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME} from './constants'
const sqlite3 = require('sqlite3')
const dbname = 'main.db'

const options ={
	options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options);

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!commande') {
		client.say(channel, `@${tags.username} Contenue de la commande.`);
	}
    
});

let db = new sqlite3.Database(dbname, err => {

    if (err)
        throw err
    
    console.log ('DB started on ' + dbname)

	client.on('message', (channel, tags, message, self) => {
		const user = tags.username
		db.get(`SELECT * FROM messagePower WHERE Username = '${user}'`, (err, dataUsername) =>{
			if(err)
				throw err
			if(dataUsername === undefined){
				db.run(`INSERT INTO messagePower(Username, Power) VALUES('${user}', '1')`)
				console.log('Nouvel utilisateur')
			}else{
				const newPower = dataUsername.Power + 1	
				db.run(`UPDATE messagePower SET Power = ${newPower} WHERE Username = '${dataUsername.Username}'`)
			}
			
		})
		
	}); 
		
}) 
