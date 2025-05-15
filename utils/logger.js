import { config } from 'dotenv';

config();  // Φορτώνει τις μεταβλητές περιβάλλοντος από το .env αρχείο

export async function logGiveaway(client, prize, winner) {
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
    if (!logChannel) return;
    logChannel.send(`📢 Το giveaway για **${prize}** έληξε. 🏆 Νικητής: ${winner}`);
}
