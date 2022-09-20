const dotenv = require('dotenv'); dotenv.config();
const tmi = require('tmi.js');
const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    website:{
        response : "www.google.com"
    },
    upvote:{
        response: (user) => `User ${user} was just upvoted!`
    }
}

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
	options: { debug: true },
	identity: {
		username: 'bonetteshowbot',
		password: 'oauth:0m09q8qk1fm0rxu3b0mbt407uye4fl'
	},
	channels: [ 'mouv' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLowerCase() !== "bonetteshowbot";

    if (!isNotBot) return;

    const [rawn, command, argument] = message.match(regexpCommand);

    const {response} = commands[command] || {};

    if (typeof response === 'function') {
        client.say(channel, response(tags.username));
    } else if (typeof response === 'string') {
        client.say(channel, response);
    }
})	;