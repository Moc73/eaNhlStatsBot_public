//requirements for nhl api request
const axios = require('axios').default;
const http = require('http');
const https = require('https');
const options =
{
  headers: {
    //'Referer':'https://proclubs.ea.com/api-docs/index.html?url=/swagger.json'
    "Referer": "https://www.ea.com",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36", accept: "application/json",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
  }
}
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
// on the instance
const instance = axios.create({
  httpAgent,  // httpAgent: httpAgent -> for non es6 syntax
  httpsAgent,
});

const { Client, GatewayIntentBits, Partials } = require('discord.js');
//Discord bot instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] })
//requirements to add commands folder
const fs = require('node:fs');
const path = require('node:path');
//******************editable variables****************************/
//env variable hidden from public
const token = process.env['chelStatsDiscordToken']
const clientId = process.env['clientId']
const guildId = process.env['guildId']
const botOwner = process.env['botOwner']
//Team ID on NHL22
const eaTeamID = process.env['MyTeam']
//NHL Variables
const nbmatch = 1
const matchTypeList = {
  privateGames: 'club_private',
  sixSFinals: 'gameType10',
  sixSSeason: 'gameType5'
}
const platform = 'ps4';
const matchType = matchTypeList['privateGames'];
const url = 'https://proclubs.ea.com/api/nhl/clubs/matches?platform=' + platform + '&clubIds=' + eaTeamID + '&matchType=' + matchType + '&maxResultCount=' + nbmatch

//functions
async function makeGetRequest(url, options) {
  const response = await axios.get(url, options, timeout = 500, { httpAgent })
  var temp = response.data;
  for (var k in temp) {
    return temp[k].players[eaTeamID]
  }
}

//start Discord instance
client.once('ready', () => {
  console.log('The bot is ready');
});
//interactions with commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;


  const { commandName } = interaction;
  if (interaction.user.id === botOwner) {
    if (commandName === 'players') {
      all = await makeGetRequest(url, options)
      const everyPlayers = []
      const playerPosition = []
      for (eachCase in all) {
        everyPlayers.push(all[eachCase].playername)
        playerPosition.push(all[eachCase].position)
      }
      const replyEmbed = {
        color: 0x0099ff,
        title: 'List of players on last game',
        fields: [
          {
            name: everyPlayers[0],
            value: playerPosition[0],
          },
          {
            name: everyPlayers[1],
            value: playerPosition[1],
          },
          {
            name: everyPlayers[2],
            value: playerPosition[2],
          },
          {
            name: everyPlayers[3],
            value: playerPosition[3],
          },
          {
            name: everyPlayers[4],
            value: playerPosition[4],
          },
          {
            name: everyPlayers[5],
            value: playerPosition[5],
          },
        ],
      };

      await interaction.reply({ embeds: [replyEmbed] });
    } else if (commandName === 'server') {
      await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'settings') {

    } else if (commandName === 'stats') {
      //makeGetRequest(url, options)
      all = await makeGetRequest(url, options)
      var count = 0
      for (eachPlayer in all) {
        if (all[eachPlayer].position === 'goalie') {
          const replyEmbed = {
            color: 0x0099ff,
            title: all[eachPlayer].playername,
            fields: [
              {
                name: 'Last game Stats',
                value: 'Who will be the best ?'
              },
              {
                name: 'Save%',
                value: all[eachPlayer].glsavepct,
                inline: true,
              },
              {
                name: 'NbSaves',
                value: all[eachPlayer].glsaves,
                inline: true,
              },
              {
                name: 'BrkSaves',
                value: all[eachPlayer].glbrksaves,
                inline: true,
              },
              /*{
                name: '\u200b',
                value: '\u200b',
                inline: false,
              },*/
              {
                name: 'pk Clear Zone',
                value: all[eachPlayer].glpkclearzone,
                inline: true,
              },
              {
                name: 'Poke Check',
                value: all[eachPlayer].glpokechecks,
                inline: true,
              },
              {
                name: 'Gl shots',
                value: all[eachPlayer].glshots,
                inline: true,
              },
            ],
          };
          if (count === 0) {

            await interaction.reply({ embeds: [replyEmbed] });
            count++
          } else {
            await interaction.followUp({ embeds: [replyEmbed] });
          }
        } else {
          const replyEmbed = {
            color: 0x0099ff,
            title: all[eachPlayer].playername,
            fields: [
              {
                name: 'Last game Stats',
                value: 'Who will be the best ?'
              },
              {
                name: 'Defense',
                value: all[eachPlayer].ratingDefense,
                inline: true,
              },
              {
                name: 'Offense',
                value: all[eachPlayer].ratingOffense,
                inline: true,
              },
              {
                name: 'TeamPlay',
                value: all[eachPlayer].ratingTeamplay,
                inline: true,
              },
              /*{
                name: '\u200b',
                value: '\u200b',
                inline: false,
              },*/
              {
                name: 'Hits',
                value: all[eachPlayer].skhits,
                inline: true,
              },
              {
                name: 'Inter',
                value: all[eachPlayer].skinterceptions,
                inline: true,
              },
              {
                name: 'Poss',
                value: all[eachPlayer].skpossession,
                inline: true,
              },
            ],
          };
          if (count === 0) {

            await interaction.reply({ embeds: [replyEmbed] });
            count++
          } else {
            await interaction.followUp({ embeds: [replyEmbed] });
          }
        }

      }

    }
  } else { 
    console.log(botOwner);
    console.log(interaction.user.id)
    await interaction.reply('You are not authorized to do that!') }
}
);
//Login to discord
client.login(token);





