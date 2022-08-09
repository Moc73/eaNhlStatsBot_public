


const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = process.env['clientId']
const guildId = process.env['guildId']
const token = process.env['chelStatsDiscordToken']

const commands = [
  new SlashCommandBuilder().setName('players').setDescription('Show who played the last game'),
  new SlashCommandBuilder().setName('stats').setDescription('Show player stats with current settings'),
  new SlashCommandBuilder().setName('server').setDescription('server info'),
  new SlashCommandBuilder().setName('settings').setDescription('Manage bot settings'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);