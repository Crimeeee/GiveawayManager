import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Starts a giveaway')
    .addIntegerOption(option =>
        option.setName('duration')
            .setDescription('Duration in minutes')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('prize')
            .setDescription('Prize description')
            .setRequired(true))
    .addIntegerOption(option =>
        option.setName('winners')
            .setDescription('Number of winners')
            .setRequired(false));

export async function execute(interaction) {
    // Check if the user has administrator permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({
            content: "❌ You don't have permissions to use this command.",
            ephemeral: true
        });
    }

    const duration = interaction.options.getInteger('duration');
    const prize = interaction.options.getString('prize');
    const winnersCount = interaction.options.getInteger('winners') || 1;

    const endTimestamp = Date.now() + duration * 60000;

    const startTimestamp = Date.now();
    const startDate = new Date(startTimestamp).toLocaleString('el-GR', {
        timeZone: 'Europe/Athens',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    });

    const endDate = new Date(endTimestamp).toLocaleString('el-GR', {
        timeZone: 'Europe/Athens',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    });

    const embed = new EmbedBuilder()
    .setTitle(`**${prize}**`)
    .setDescription(
        `\`\`\`${prize}\`\`\`\n` +
        `> **React with 🎉 to enter the giveaway!**\n\n` +
        `**Ended at:** \`${endDate}\`\n` +
        `**Hosted by:** ${interaction.user}\n` +
        `**Winners:** Winner Soon...`
    )
    .setColor('#1ABC9C')
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setFooter({ text: `Started at: ${startDate}` });

    await interaction.reply({
        content: '@here', 
        embeds: [embed], 
        fetchReply: true,
        allowedMentions: { parse: ['everyone'] }  // This allows @here to ping everyone
    });

    const giveawayMsg = await interaction.fetchReply();
    await giveawayMsg.react('🎉');

    setTimeout(async () => {
        const fetched = await interaction.channel.messages.fetch(giveawayMsg.id);
        const reaction = fetched.reactions.cache.get('🎉');
        if (!reaction) {
            await interaction.followUp('❌ No one participated.');
            return;
        }

        const users = await reaction.users.fetch();
        const participants = users.filter(u => !u.bot);

        if (participants.size === 0) {
            await interaction.followUp('❌ No one participated in the giveaway.');
            return;
        }

        const shuffled = Array.from(participants.values()).sort(() => Math.random() - 0.5);
        const winners = shuffled.slice(0, winnersCount);
        const winnerMentions = winners.map(w => w.toString()).join(', ');

        const editedEmbed = EmbedBuilder.from(embed)
        .setDescription(
            `\`\`\`${prize}\`\`\`\n` +
            `> **React with 🎉 to enter the giveaway!**\n\n` +
            `**Ended at:** \`${endDate}\`\n` +
            `**Hosted by:** ${interaction.user}\n` +
            `**Winners:** ${winnerMentions}`
        )
        .setFooter({ text: `Ended at: ${endDate}` });
        editedEmbed.setColor('#1ABC9C');

        await giveawayMsg.edit({ embeds: [editedEmbed] });

        await interaction.followUp({
            content: `Congratulations, ${winnerMentions}! You won **${prize}**!`
        });
    }, duration * 60000);
}
