const { roleId } = require('../../config.json');

module.exports = {
    name: 'senha',
    description: 'Verifica a chave e atribui o cargo',
    options: [
        {
            name: 'key',
            type: 3, // STRING
            description: 'A chave a ser verificada',
            required: true,
        },
    ],
    execute: async (interaction, keys) => {
        const key = interaction.options.getString('key');
        if (keys.hasOwnProperty(key) && !keys[key]) {
            const role = interaction.guild.roles.cache.get(roleId);
            if (role) {
                const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
                if (!botMember.permissions.has('MANAGE_ROLES')) {
                    return interaction.reply('O bot não tem permissão para gerenciar cargos.');
                }
                if (botMember.roles.highest.position <= role.position) {
                    return interaction.reply('O cargo do bot não está acima do cargo que está tentando atribuir.');
                }
                await interaction.member.roles.add(role);
                keys[key] = true; // Marca a chave como usada
                await interaction.reply(`Chave correta! ${interaction.member} recebeu o cargo.`);
            } else {
                await interaction.reply('Cargo não encontrado.');
            }
        } else {
            await interaction.reply('Chave incorreta ou já usada.');
        }
    },
};
