const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { token, prefix } = require('./config.json');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

let keys = {};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    updateStatus();
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args, keys);
    } catch (error) {
        console.error(error);
        message.reply('Houve um erro ao executar esse comando!');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        if (command.name === 'setkeys' || command.name === 'senha') {
            await command.execute(interaction, keys);
        } else {
            await command.execute(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Houve um erro ao executar esse comando!', ephemeral: true });
    }
});

client.login(token);

// Função para atualizar o status
function updateStatus() {
    const statuses = [
        { name: 'Capital Club', type: 'PLAYING' },
        { name: 'Afiliados', type: 'WATCHING' },
        { name: 'comunidade', type: 'LISTENING' },
    ];

    let i = 0;
    setInterval(() => {
        const status = statuses[i];
        client.user.setActivity(status);
        i = (i + 1) % statuses.length;
    }, 10000); // Atualiza a cada 10 segundos
}
