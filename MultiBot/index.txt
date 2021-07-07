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
  if (message.content.startsWith("!stat")) {
    message.delete();
    let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
    let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== "offline").size;
    onlines = onlines - totalbots;
    let totalMembers = message.guild.members.cache.size;
    totalMembers = totalMembers - totalbots;
    const embedStats = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Statistiques')
            .setURL('https://areaofficiel.github.io')
            .setDescription('Voici les statistiques du serveur')
            .addFields({
                name: 'Nombre de membres total sur le serveur : ',
                value: totalMembers,
                inline: true
            }, {
                name: 'Membres connéctés sur le serveur : ',
                value: onlines,
                inline: true
            }, {
                name: 'Nombres de bots sur le serveur : ',
                value: totalbots,
                inline: true
            })
            message.channel.send(embedStats);
    }
  
  if (message.content.startsWith("!stoplevel")) {
    db["status-level"] = false;
    saveDb();
  } else if (message.content.startsWith("!startlevel")) {
    db["status-level"] = true;
    saveDb();
  }

  if (db["status-level"] == true) {
    if (message.content.startsWith("!")) {
      if (message.content.startsWith("!level")) {
        message.delete();
        if (db["coins-users"][message.member.id]) {
          let coins = db["coins-users"][message.member.id];
          let level = db["levels-users"][message.member.id];
          const embedLevel = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Level')
              .setURL('https://areaofficiel.github.io')
              .setDescription('Voici tes infos sur ce serveur')
              .addFields({
                  name: 'Ton nombre de points total : ',
                  value: coins,
                  inline: true
              }, {
                  name: 'Ton level sur le serveur : ',
                  value: level,
                  inline: true
              })
              message.channel.send(embedLevel);
          return embedLevel;
        } else {
          return message.channel.send("Vous n'avez pas encore posté de messages.")
        }
      }
    } else {
      let coins = db["coins-users"][message.member.id];
      let level = db["levels-users"][message.member.id];
      if (!level) {
        randomInt(message.member.id, 10);
      } else if (level >= 1 && level <= 5){
        randomInt(message.member.id, 10);
      } else if (level > 5 && level <= 10){
        randomInt(message.member.id, 8);
      } else if (level > 10 && level <= 20){
        randomInt(message.member.id, 6);
      } else if (level > 20 && level <= 40){
        randomInt(message.member.id, 4);
      } else if (level > 40 && level <= 80){
        randomInt(message.member.id, 2);
      } else if (level > 80){
        coins = coins + 1;
      }
      coins = db["coins-users"][message.member.id];
      addLevel(coins, level, message.member.id);
      saveDb();
    }
  }

  if (message.content.startsWith("!ban")) {
    message.delete();
    logs(message.member.user.username, message.content);
    if (message.member.hasPermission("BAN_MEMBERS")) {
      if (message.mentions.users.first()) {
        let args = message.content.trim().split(/ +/g);
        let userBan = message.mentions.users.first().id;
        let temps = args[2];
        message.guild.members.ban(userBan);
        db["ban"][userBan] = "banni(e)";
        saveDb();
        setTimeout( () => {
          message.guild.members.unban(userBan);
          db["ban"][userBan] = "débanni(e)";
          saveDb();
        }, temps*1000);
      }
    }
  }
})