# eaNhlStatsBot_public
Discord bot to show EASHL Stats WOC 6s 
Fully fonctionnal on repl.it
need node.js V16


dependencies : 
    "@discordjs/rest": "^1.0.0",
    "axios": "^0.26.0",
    "discord-api-types": "^0.36.2",
    "discord.js": "^14.1.2",
    "http": "^0.0.1-security",
    "https": "^1.0.0"
    
process.env are environment variables on repl.it


install depencies manually


run node deploy-commands.js(be careful if you use .env variables it don't work in shell) to deploy commands on your discord server. 

Don't forget to set every .env variables as : 
chelStatsDiscordToken = your doscord token
clientId = Client ID from discord
guildId = guil ID from discord
botOwner  = Id of the only one able to use the bot
MyTeam = the ID of the team you want to watch after.

Enjoy
