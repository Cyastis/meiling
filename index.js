require('dotenv').config()

const Discord = require('discord.js')
const {prefix} = require('./config.json');
const client = new Discord.Client({
     partials: ['MESSAGE']
});
fetchUser = async id => client.users.fetch(id);



client.login(process.env.BOT_TOKEN)

client.on("ready", () => {

console.log("Bot is ready")

})

client.on("message", message => {
	if (message.content.startsWith(`${prefix}ping`)){
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}kick`)){
		if(message.guild === null){
			guild = client.guilds.cache.get(message.content.split(" ")[2]);
			if(guild === undefined){
				message.channel.send("Invalid Guild ID");
				return;
			};
			if (guild.member(message.content.split(" ")[1]) === null) {
				message.channel.send("User ID Not in Guild");
				return;
			}
			if (guild.member(message.author.id) === null) {
				message.channel.send("You're not in Guild");
				return;
			}
			targetUser = guild.member(message.content.split(" ")[1]);
			authorUser = guild.member(message.author.id);

		} else{
			guild = message.guild;
			let mentionMember = message.mentions.members.first();
			if(mentionMember === undefined){
				if(guild.member(message.content.split(" ")[1]) === null){
					message.channel.send("Invalid user ID");
					return;
				}
				targetUser = guild.member(message.content.split(" ")[1])

			} else{
				targetUser = mentionMember;
			}
			authorUser = message.member
		};
		let authorHighestRole = authorUser.roles.highest.position;
		let mentionHighestRole = targetUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole && !(guild.ownerID === authorUser.id)){
			message.channel.send('That person has a role equal to or higher than yours!');
			return;
		};
		if(!authorUser.hasPermission('KICK_MEMBERS')&& !authorUser.hasPermission('ADMINISTRATOR') && !(guild.ownerID === authorUser.id)) {
			message.channel.send('You have no permissions to do that');
			return;
		};
		if(!targetUser.kickable){
			message.channel.send("I don't have the perms :(");
			return;
		};
		targetUser.kick()
			.then(() => {
				console.log(`kicked ${targetUser.displayName}`);
				message.react("👍");
			})
			.catch(console.error);
		
	} else if (message.content.startsWith(`${prefix}ban`)){
		if(message.guild === null){
			guild = client.guilds.cache.get(message.content.split(" ")[2]);
			if(guild === undefined){
				message.channel.send("Invalid Guild ID");
				return;
			};
			if (guild.member(message.content.split(" ")[1]) === null) {
				message.channel.send("User ID Not in Guild");
				return;
			}
			if (guild.member(message.author.id) === null) {
				message.channel.send("You're not in Guild");
				return;
			}
			targetUser = guild.member(message.content.split(" ")[1]);
			authorUser = guild.member(message.author.id);

		} else{
			guild = message.guild;
			let mentionMember = message.mentions.members.first();
			if(mentionMember === undefined){
				if(guild.member(message.content.split(" ")[1]) === null){
					message.channel.send("Invalid user ID");
					return;
				}
				targetUser = guild.member(message.content.split(" ")[1])

			} else{
				targetUser = mentionMember;
			}
			authorUser = message.member
		};
		let authorHighestRole = authorUser.roles.highest.position;
		let mentionHighestRole = targetUser.roles.highest.position;
		if(mentionHighestRole >= authorHighestRole && !(guild.ownerID === authorUser.id)){
			message.channel.send('That person has a role equal to or higher than yours!');
			return;
		};
		if(!authorUser.hasPermission('BAN_MEMBERS')&& !authorUser.hasPermission('ADMINISTRATOR') && !(guild.ownerID === authorUser.id)) {
			message.channel.send('You have no permissions to do that');
			return;
		};
		if(!targetUser.bannable){
			message.channel.send("I don't have the perms :(");
			return;
		};
		targetUser.ban()
			.then(() => {
				console.log(`banned ${targetUser.displayName}`);
				message.react("👍");
			})
			.catch(console.error);
		
	};
});
