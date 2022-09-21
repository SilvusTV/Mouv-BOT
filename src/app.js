import tmi from 'tmi.js'
import {BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME} from './constants'

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
	if(message.toLowerCase() === '!commandes') {
		client.say(channel, `@${tags.username} Les commandes sont : \n→ !invités : donne la liste des invités de ce soir \n→ !numéros : donne la liste des numéros à retenir !`);
	}
    if(message.toLowerCase() === '!invités') {
		client.say(channel, `@${tags.username} Les invités de ce soir sont les mêmes que la semaine dernière : →Djimo et →Bolemvn   (!djimo et !bole disponible !).`);
	}
    if(message.toLowerCase() === '!numéros') {
		client.say(channel, `@${tags.username} Pour participer à l'émission, vous pouvez nous appeler ici : 0145242020. Si vous voulez passer dans la prochaine émission, envoyez nous un message What'sApp ici : 0617340800 !`);
	}
    if(message.toLowerCase() === '!djimo') {
		client.say(channel, `@${tags.username} Suivez l'actualitée de Djimo ici : https://www.instagram.com/djimoofficiel`);
	}
    if(message.toLowerCase() === '!bole') {
		client.say(channel, `@${tags.username} Suivez l'actualitée de Bolemvn ici : https://www.instagram.com/bolemvn7binks`);
	}
});