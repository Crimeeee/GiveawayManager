export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
      if (!interaction.isChatInputCommand()) return;
  
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.error(`No command matching ${interaction.commandName} found.`);
        return;
      }
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Υπήρξε σφάλμα στην εκτέλεση της εντολής.', ephemeral: true });
      }
    }
  };
  