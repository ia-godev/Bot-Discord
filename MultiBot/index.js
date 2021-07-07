const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./json/config.json");
const fun = require("./fun.js");
const prefix = config["prefix"];

client.on("ready", async () =>{
  console.log("Le bot est allumer !");
  client.user.setStatus("online");
  client.user.setActivity("Fortnite");
})

client.on("guildMemberAdd", member => {
  client.channels.cache.get("861348342343925840").send("Bienvenue sur le serveur " + member.user.username + " !");
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	let args = message.content.slice(prefix.length).trim().split(' ');
  console.log(prefix);
  console.log(args);
	const command = args.shift().toLowerCase();
  console.log(command);

  if (command === "gg") {
    return message.channel.send("***Test !***");
  } else if (command === "loto") {
    if (args.length == 0) {
			return message.channel.send("Vous devez métre les chiffres que vous avez choisis (ex:1234) et les points que vous misez (ex:5) !");
		} else {
      args[1] = parseInt(args[0]);
      if (!isNaN(args[0])) {
        message.channel.send("Je rentre !");
        if (args[0].length == 4) {
          return message.channel.send("Bravo c'est 4 chiffres !");
        } else {
          return message.channel.send("Non !");
        }
      } else {
        return message.channel.send("is NaN !");
      }
    }
  }
});

client.login(config.token);