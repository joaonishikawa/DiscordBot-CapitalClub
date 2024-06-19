const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'addemoji',
    description: 'Adiciona um novo emoji ao servidor com a imagem enviada ou um emoji de outro servidor',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
            return message.reply('Você não tem permissão para usar este comando.');
        }

        if (args.length === 0) {
            return message.reply('Por favor, forneça um nome para o emoji.');
        }

        const nome = args[0];

        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();

            try {
                const emoji = await message.guild.emojis.create({
                    attachment: attachment.url,
                    name: nome,
                });
                message.reply(`Emoji ${emoji} adicionado com sucesso!`);
            } catch (error) {
                console.error(error);
                message.reply('Houve um erro ao tentar adicionar o emoji.');
            }
        } else if (args[1]) {
            const emojiRegex = /<(a?):[^:]+:(\d+)>/;
            const match = args[1].match(emojiRegex);

            if (match) {
                const animated = match[1] === 'a';
                const emojiId = match[2];
                const url = `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? 'gif' : 'png'}`;

                try {
                    const emoji = await message.guild.emojis.create({
                        attachment: url,
                        name: nome,
                    });
                    message.reply(`Emoji ${emoji} adicionado com sucesso!`);
                } catch (error) {
                    console.error(error);
                    message.reply('Houve um erro ao tentar adicionar o emoji.');
                }
            } else {
                message.reply('Por favor, forneça um emoji válido de outro servidor.');
            }
        } else {
            message.reply('Por favor, anexe uma imagem ou forneça um emoji de outro servidor.');
        }
    },
};
