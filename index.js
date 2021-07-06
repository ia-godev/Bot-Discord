const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const db = require("./data_base.json");
const fs = require("fs");

bot.on("ready", async () =>{
  console.log("Le bot est allumer !");
  bot.user.setStatus("online");
  bot.user.setActivity("Fortnite");
})

bot.on("guildMemberAdd", member => {
  bot.channels.cache.get("861348342343925840").send("Bienvenue sur le serveur " + member.user.username + " !");
})

// Comande
bot.on("message", message => {

  if (message.content.startsWith("!clear")) {
    message.delete();
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      logs(message.member.user.username, message.content);
      let args = message.content.trim().split(/ +/g);
      if (args[1]) {
        if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
          message.channel.bulkDelete(args[1]);
        } else if (args[1] === "*") {
          message.channel.bulkDelete(99);
        }
      }
    }
  }

  if (message.content.startsWith("!msgbv")) {
    message.delete();
    logs(message.member.user.username, message.content);
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (message.content.length > 5) {
        let message_bienvenue = message.content.slice(7);
        message.channel.send("***"+message_bienvenue+"***");
      }
    }
  }

  if (message.content.startsWith("!warn")) {
    message.delete();
    logs(message.member.user.username, message.content);
    if (message.member.hasPermission("BAN_MEMBERS")) {
      if (message.mentions.users.first()) {
        let userWarn = message.mentions.users.first().id;
        if (db["warn"][userWarn] == 2) {
          message.guild.members.ban(userWarn);
          db["warn"][userWarn] = 3;
          db["ban"][userWarn] = "banni(e)";
          saveDb();
        } else if (db["warn"][userWarn] == 1) {
          db["warn"][userWarn] = 2;
          saveDb();
        } else if (!db["warn"][userWarn]) {
          db["warn"][userWarn] = 1;
          saveDb();
        }
      }
    }
  }

  // if (message.content.startsWith("!ban")) {
  //   message.delete();
  //   logs(message.member.user.username, message.content);
  //   if (message.member.hasPermission("BAN_MEMBERS")) {
  //     if (message.mentions.users.first()) {
  //       let userBanId = message.mentions.users.first().id;
  //       console.log(userBanId);
  //       message.guild.members.ban(userBanId);
  //       let userBan = message.content.slice(8, 26);
  //       console.log(userBan);
  //       db["ban"][userBan] = userBanId;
  //       saveDb();
  //     }
  //   }
  // }
})

// Function
function logs(author, command) {
  bot.channels.cache.get("861615314210390016").send(author + " a fais la comande : " + command);
}

function saveDb() {
  fs.writeFile("./data_base.json", JSON.stringify(db, null, 4), (err) => {
    if (err) {
      console.log("Une erreur est survenue.");
    }
  })
}

bot.login(config.token);