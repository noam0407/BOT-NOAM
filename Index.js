const { Client, Collection, MessageReaction, MessageEmbed, ReactionUserManager } = require('discord.js');
const { TOKEN, PREFIX, hostedBy, everyoneMention } = require('./config');
const { readdirSync } = require("fs");
const config = require('./config.js');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
client.config = config;

var version = '1.0';
var servers = {};
var list = [];



client.commands = new Collection();
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

const loadEvents = (dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    console.log(events);

    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      console.log(evtName);
      client.on(evtName, evt.bind(null, client));
      console.log(`Évènement chargé: ${evtName}`);
    };
  });
};

loadCommands();
loadEvents();

client.on('messageReactionAdd', async(reaction, user) => {

  const cdseconds = 5;
  const message = reaction.message;
  const member = message.guild.members.cache.get(user.id);

  if(user.bot) return;

  if(
      ["📂", "❓", "⚪", "❌"].includes(reaction.emoji.name)
  ) {
      switch(reaction.emoji.name) {

// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // Open Ticket // // // // // // // // //
        case "📂":
          
          if(reaction.message.channel.id !== "795604387716268056") return console.log('L\'émoji a été utilisé dans un autre salon')

          reaction.users.remove(user);

          let username1 = user.username;
          let categoryID1 = "788092322473967618";
          let channel = await message.guild.channels.create(`𝘋𝘰𝘴𝘴𝘪𝘦𝘳-${username1}`, {type: 'text', parent: message.guild.channels.cache.get(categoryID1)})
          .catch(err => {
              message.channel.send('Il y a eu une erreur dans le [MessageReactionAdd]')
          });

          channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
          channel.updateOverwrite(member, {
              'VIEW_CHANNEL': true,
              'SEND_MESSAGES': false,
              'ADD_REACTIONS': true
          });
          channel.updateOverwrite(message.guild.roles.cache.find(r => r.name == '🔰 • Support'), {
              'VIEW_CHANNEL': true,
              'SEND_MESSAGES': false
          });

          var embed = new MessageEmbed()
          .setTitle('__**Kyro RP 👑**__')
          .setDescription(`\n Bonjour/Bonsoir ${member}, \n \n Si vous souhaitez nous posez une question, réagissez avec ❓. \n \n Si vous souhaitez faire une demande, réagissez avec ⚪.`)
          .setTimestamp()
          .setFooter('Kyro RP 👑')

          channel.send(embed).then(async msg => {
              msg.react('❓'), // Help
              msg.react('⚪') // Orders
              //msg.react('❌') // Close
          }).catch(err => {
              console.log('Erreur Message Introuvable')
          });

          break; 


// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // Help // // // // // // // // //
            case "❓":

                  if(!message.channel.name.startsWith('𝘋𝘰𝘴𝘴𝘪𝘦𝘳')) return;
      
                  let usernames1 = user.username;
      
                  reaction.users.remove(user);
      
                  await message.channel.edit({ name: `𝘈𝘪𝘥𝘦-${usernames1}` })
      
                  await message.channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
                  await message.channel.updateOverwrite(member, {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': true,
                      'ADD_REACTIONS': true
                  });
                  await message.channel.updateOverwrite(message.guild.roles.cache.find(r => r.name == '🔰 • Support'), {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': true
                  });
      
                  var embed1 = new MessageEmbed()
                  .setTitle('__**Kyro RP 👑**__')
                  .setDescription(`\n \n Bonjour/Bonsoir ${member}, en quoi pourrons-nous vous aider ? D'écrivez-nous votre souci afin de vous aidé. \n \n Si vous souhaitez fermer votre dossier, réagissez avec ❌. \n \n`)
                  .setTimestamp()
                  .setFooter('Kyro RP 👑')

                  message.delete()
      
                  message.channel.send(embed1).then(async msg => msg.react('❌')); // Close
      
            break;


// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // Autre // // // // // // // // // // //
            case "⚪":

                if(!message.channel.name.startsWith('𝘋𝘰𝘴𝘴𝘪𝘦𝘳')) return;
      
                  let usernames5 = user.username;
      
                  reaction.users.remove(user);
      
                  await message.channel.edit({ name: `𝘉𝘶𝘨-𝘈𝘶𝘵𝘳𝘦-${usernames5}` })
      
                  await message.channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
                  await message.channel.updateOverwrite(member, {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': true,
                      'ADD_REACTIONS': true
                  });
                  await message.channel.updateOverwrite(message.guild.roles.cache.find(r => r.name == '🔰 • Support'), {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': true
                  });
      
                  var embed5 = new MessageEmbed()
                  .setTitle('__**Kyro RP 👑**__')
                  .setDescription(`\n Bonjour/Bonsoir ${member} envoyez-nous votre candidature, et par la suite nous vous feront passer un examen oral \n \n Si vous souhaitez fermer votre dossier, réagissez avec ❌. \n \n Bien à vous, L\'équipe Kyro RP 👑`)
                  .setTimestamp()
                  .setFooter('Kyro RP 👑')

                  message.delete()
      
                  message.channel.send(embed5).then(async msg => msg.react('❌')) // Close

            break;

                
// // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // Close // // // // // // // // // // //
            case "❌":

                  if(!message.channel.name.startsWith('𝘋𝘰𝘴𝘴𝘪𝘦𝘳') && !message.channel.name.startsWith('𝘈𝘪𝘥𝘦') && !message.channel.name.startsWith('𝘉𝘶𝘨-𝘈𝘶𝘵𝘳𝘦')) return;
      
                  let usernames6 = user.username;
      
                  reaction.users.remove(user);
      
                  await message.channel.edit({ name: `𝘍𝘦𝘳𝘮𝘦-${usernames6}` })
      
                  await message.channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
                  await message.channel.updateOverwrite(member, {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': false,
                      'ADD_REACTIONS': true
                  });
                  await message.channel.updateOverwrite(message.guild.roles.cache.find(r => r.name == '🔰 • Support'), {
                      'VIEW_CHANNEL': true,
                      'SEND_MESSAGES': false
                  });
      
                  var embed6 = new MessageEmbed()
                  .setTitle('__**Kyro RP 👑**__')
                  .setDescription(`\n Votre dossier ve se supprimer dans 10 secs\n`)
                  .setTimestamp()
                  .setFooter('Kyro RP 👑')
      
                  message.channel.send(embed6)
    
                  setTimeout(() => {
                    message.channel.delete()
                  }, cdseconds * 1500)  
      
            break;
      }
  }
})


client.login(TOKEN);