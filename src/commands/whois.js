const nbx = require("noblox.js");
const Discord = require("discord.js");

module.exports = async (message, value) => {
  let channel = message.channel;

  try {
    const userid = await nbx.getIdFromUsername(value);

    const role = await nbx.getRankNameInGroup(process.env.GROUPID, userid);
    await nbx.getPlayerInfo(userid).then((playerInfo) => {
      let infoEmbed = new Discord.MessageEmbed()
        .setURL(`https://www.roblox.com/users/${userid}/profile`)
        .setTitle(`${playerInfo.username}'s profile`)
        .addField(`Status`, playerInfo.status || "Not available")
        .addField(`Account Age (in days)`, playerInfo.age || "Not available")
        .addField(`Join Date`, playerInfo.joinDate || "Not available")
        .addField(`Description`, playerInfo.blurb || "Not available")
        .addField(`Role in Group`, role)
        .setThumbnail(
          `https://www.roblox.com/headshot-thumbnail/image?userId=${userid}&width=420&height=420&format=png`
        )
        .setAuthor(
          message.author.username + `#${message.author.discriminator}`,
          message.author.avatarURL()
        );
      channel.send(infoEmbed);
    });
  } catch (e) {
    const errembed = new Discord.MessageEmbed()
      .setDescription("```diff\n" + `- ${e.message}` + "\n```")
      .setTimestamp()
      .setFooter(`Failed by ${message.author.tag} | ${message.author.id}`)
      .setAuthor(
        "Failed",
        "https://media.discordapp.net/attachments/539579135786352652/641188940983959555/627171202464743434.png"
      );

    channel.send(errembed);
  }
};
