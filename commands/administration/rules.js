const { EmbedBuilder } = require('discord.js');

const rulesEmbed = new EmbedBuilder()
    .setColor('#ffffff')
    .setTitle('📜 Regras da Comunidade de Afiliados de iGaming 📜')
    .setDescription('Fiquem atentos! Nossos moderadores estão disfarçados entre os membros. Abaixo estão as regras mais importantes:')
    .addFields(
        { name: '1. Proibido enviar links de afiliação recomendar ou mencionar casas de aposta que você roda. (BANIMENTO INSTANTÂNEO)', value: '\u200B' },
        { name: '2. Proibido CTA/Venda de algo no final dos posts do fórum (Apenas com permissão)', value: '\u200B' },
        { name: '3. Proibido vender método dolphyn/bug CPA', value: '\u200B' },
        { name: '4. Proibido enviar/vender ferramentas instaláveis ".exe" para os membros.', value: '\u200B' },
        { name: '5. Proibido vender script de cassino/retro games', value: '\u200B' },
        { name: '6. Respeite todos os membros independente do nível de conhecimento. Todos estão aqui para aprender; vocês devem ser parceiros de negócios, networking em primeiro lugar.', value: '\u200B' },
        { name: '7. Saiba diferenciar o suporte da comunidade e das casas de aposta não resolvemos problemas relacionados a casa!!', value: '\u200B' },
        { name: '8. Proibido divulgar outras comunidades/grupos iGaming', value: '\u200B' },
        { name: 'P.S.', value: 'Não chamamos ninguém no privado para propostas de casas de aposta, afiliação, produtos ou mentoria. Nos avise caso isso aconteça e você será recompensado.' }
    )
    .setFooter({
        text: 'Desenvolvido por: @joaonishikawa',
        iconURL: 'https://yt3.googleusercontent.com/VX5RmPw31V8NUQon04Vv1SDcKEjoIqwR6jHiRgsvryVGfkl0bUunjWabfy4-ov8nkpF5SspnXw=s176-c-k-c0x00ffffff-no-rj'  // Substitua pela URL real da imagem do Capital Club
    })
    .setTimestamp();

module.exports = {
    name: 'rules',
    description: 'Exibe as regras da comunidade',
    execute(message) {
        message.channel.send({ embeds: [rulesEmbed] });
    },
};