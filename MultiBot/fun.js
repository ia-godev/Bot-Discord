const db = require("./json/data_base.json");
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