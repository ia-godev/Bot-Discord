module.exports = { embedHendler };
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("./data_base.json");
const fs = require("fs");

function addLevel(coins, level, memberId) {
  let ifLevel = level * 100 + 100;
  let levelZero = 100;
  if (coins > ifLevel) {
    db["levels-users"][memberId] = db["levels-users"][memberId] + 1;
  } else if (!db["levels-users"][memberId]){
    if (coins > levelZero) {
      db["levels-users"][memberId] = 1;
    }
  }
}

function randomInt(memberId, max) {
  if (!db["coins-users"][memberId]) {
    db["coins-users"][memberId] = 1 + Math.floor(Math.random() * (1 + max));
  } else if (db["coins-users"][memberId]){
    db["coins-users"][memberId] = db["coins-users"][memberId] + Math.floor(Math.random() * (1 + max));
  }
}

function saveDb() {
  fs.writeFile("./data_base.json", JSON.stringify(db, null, 4), (err) => {
    if (err) {
      console.log("Une erreur est survenue.");
    }
  })
}

function embedHendler(message , title, url, desc, thubnail, fields) {
  let embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(title)
	.setURL(url)
	.setDescription(desc)
	.setThumbnail(thubnail)
	.addFields(fields)
  message.channel.send(embed);
}