import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Command, type ChatInputCommand } from '@sapphire/framework';
import { Log } from '../utils/log-command.decorator';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options });
    }

    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) => builder.setName('ping').setDescription('Ping bot to see if it is alive'));
    }

    @Log('Ping command received')
    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: `Pinging...`, ephemeral: true, fetchReply: true });
        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }
        return interaction.editReply('Failed to retrieve ping :(');
    }
}
