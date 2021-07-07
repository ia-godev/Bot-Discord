const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const fun = require("./fun");

client.on("ready", async () =>{
  console.log("Le bot est allumer !");
  client.user.setStatus("online");
  client.user.setActivity("!game");
})

client.on("guildMemberAdd", member => {
  client.channels.cache.get("861348342343925840").send("Noublie pas de faire !game " + member.user.username + " !");
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	let args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (command === "game") {
    message.delete();
    let fields = [
      { name: "Vous pouvez jouer au loto : !loto ex:1234 ex:5", value: "Plus le coût de la partie : 5 points."},
      { name: "Ou à la roulette russe : !rouletterusse rouge/noir/blanc ex:5", value: "Plus le coût de la partie : 5 points."}]
    fun.embedHendler(message, "!game", "", "Vous pouvez voir vos points : !points.", "", fields);
  } else if (command === "loto") {
    message.delete();
    if (args[0] && args[1] && !args[2]) {
      const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
      message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '👍') {
            message.reply('up.');
          } else {
            message.reply('down.');
          }
        })
        .catch(collected => {
          message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
        });

      // const emojiUp = "👍";
      // const emojiDown = "👎";
      // message.channel.send("La partie coûte 5 points, veux tu continues.").then(sentMessage => {
      //   sentMessage.react(emojiUp);
      //   console.log(emojiUp);
      //   sentMessage.react(emojiDown);
      // })
      // message.awaitReactions({ max: 1, time: 60*5, errors: ['time'] })
      // .then(collected => {
      //   const reaction = collected.first();
      //   if (reaction.emoji.available === emojiUp) {
      //     message.reply("");
      //   } else {
      //     message.reply("La partie à été annulé.");
      //   }
      // })
      
    } else {
      return message.channel.send("La commande est : !loto (les 4 chiffres choisient : )1234 (les points misés : )5")
    }
  }
});

client.login(config.token);