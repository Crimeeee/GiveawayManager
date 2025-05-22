import { Events } from 'discord.js';
import chalk from 'chalk';

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(chalk.green('\n---------------------------------------'));
        console.log(chalk.green('[INFO] Bot is now online and ready.'));
        console.log(chalk.green(`[INFO] Logged in as: ${client.user.tag}`));
        console.log(chalk.green(`[INFO] Bot is connected to ${client.guilds.cache.size} servers.`));
        console.log(chalk.green(`[INFO] Successfully loaded ${client.commands.size} command(s).`));
        console.log(chalk.green(`[INFO] Current time: ${new Date().toLocaleString()}`));
        console.log(chalk.green('---------------------------------------'));
    }
};
// You need to install chalk for colors!