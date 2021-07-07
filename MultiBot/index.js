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
	const command = args.shift().toLowerCase();

  if (command === "clear") {
    message.delete();
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (args[1]) {
        if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
          message.channel.bulkDelete(args[1]);
        } else if (args[1] === "*") {
          message.channel.bulkDelete(99);
        }
      }
    }
  } else if (command === "claer") {
    message.channel.bulkDelete(99);
  }
});

client.login(config.token);