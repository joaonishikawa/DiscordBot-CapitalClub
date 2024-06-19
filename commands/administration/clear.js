module.exports = {
    name: 'clear',
    description: 'Limpa um número específico de mensagens do canal',
    options: [
        {
            name: 'num',
            type: 4, // INTEGER
            description: 'Número de mensagens a serem limpas (entre 1 e 100)',
            required: true,
        },
    ],
    execute: async (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply('Você não tem permissão para usar este comando.');
        }

        const num = interaction.options.getInteger('num');
        if (num < 1 || num > 100) {
            return interaction.reply('O número de mensagens a serem limpas deve estar entre 1 e 100.');
        }

        const channel = interaction.channel;
        await channel.bulkDelete(num, true)
            .then(deleted => interaction.reply(`Limpei ${deleted.size} mensagens.`))
            .catch(err => {
                console.error(err);
                interaction.reply('Houve um erro ao tentar limpar as mensagens.');
            });
    },
};
