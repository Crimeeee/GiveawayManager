import { EmbedBuilder } from 'discord.js';

export function giveawayEmbed(prize, duration) {
    return new EmbedBuilder()
        .setTitle('🎉 Giveaway Ξεκίνησε!')
        .setDescription(`Δώρο: **${prize}**\nΧρόνος: **${duration} λεπτά**\nΑντιδράστε με 🎉 για συμμετοχή!`)
        .setColor('Random')
        .setFooter({ text: 'Λήγει σε:' })
        .setTimestamp(Date.now() + duration * 60000);
}
