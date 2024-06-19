module.exports = {
    name: 'setkeys',
    description: 'Define novas chaves',
    options: [
        {
            name: 'keys',
            type: 3, // STRING
            description: 'As chaves a serem definidas, separadas por vírgula',
            required: true,
        },
    ],
    execute: async (interaction, keys) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Você não tem permissão para usar este comando.');
        }

        const newKeys = interaction.options.getString('keys').split(',').map(key => key.trim());
        newKeys.forEach(key => {
            keys[key] = false; // Define cada nova chave como não usada
        });
        await interaction.reply(`Chaves adicionadas: ${newKeys.join(', ')}. Cada chave pode ser usada uma única vez.`);
    },
};
