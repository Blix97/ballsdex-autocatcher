module.exports = async (client) => {
    for (const server of client.config.farmServers) {
        const guilds = [...client.guilds.cache.values()].filter(sv => sv.name === server || sv.id === server)
        for (const guild of guilds) {
            const channel = guild.channels.cache.find(channel => 
                channel.type === 'GUILD_TEXT' && 
                channel.permissionsFor(guild.members.me).has('SEND_MESSAGES') &&
                channel.name === client.config.farmChannelName
            ) || guild.channels.cache.find(channel => 
                channel.type === 'GUILD_TEXT' && 
                channel.permissionsFor(guild.members.me).has('SEND_MESSAGES')
            );
    
            await channel.send(client.config.farmMessage);
            await wait(client.config.farmCooldown)
        }
    }
}

function wait(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}
