const righthugs = ["⊂(・﹏・⊂)","ლ(・ヮ・ლ)","⊂(・ヮ・⊂)", "⊂(・▽・⊂)", "ლ(・﹏・ლ)", "⊂(･ω･*⊂)", "ლ(･ω･*ლ)","ლ(´ ❥ `ლ)", "⊂(´・ω・｀⊂)"];
const lefthugs = ["(つ◉益◉)つ", "(っಠ‿ಠ)っ", "ʕっ•ᴥ•ʔっ", "（っ・∀・）っ", "(っ⇀⑃↼)っ", "(つ´∀｀)つ", "(つ▀¯▀)つ", "(っ´▽｀)っ", "(づ￣ ³￣)づ", "(.づ◡﹏◡)づ.", "(っ*´∀｀*)っ", "(っ⇀`皿′↼)っ", "(.づσ▿σ)づ."];
const midhugs = ["⊂（♡⌂♡）⊃", "⊂(◉‿◉)つ", "＼(^o^)／", "d=(´▽｀)=b", "⊂( ◜◒◝ )⊃", "⊂((・▽・))⊃"];

const getrandom = array => array[Math.floor(Math.random() * array.length)];

const approveemoji = "✨";
const timeout = 60; // minutes

const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const recievers = msg.mentions.users.map(user => user.id);

        if (recievers.length > 1) recievers[0].hug = getrandom(midhugs);

        if (argstring == "") return `**${getrandom(midhugs)}**`;
        else if (recievers.length == 0) return `**${msg.author.username} ${getrandom(lefthugs)} ${getrandom(righthugs)} ${argstring}**`;
        else {
            let starthug = getrandom(lefthugs);
            const botmsg = await msg.channel.send(`**${msg.author.username}: ${starthug} ${argstring} ?**`);
            botmsg.react(approveemoji);
            
            const collector = botmsg.createReactionCollector(
                (reaction, reacter) => reaction.emoji.name == approveemoji && recievers.includes(reacter.id),
                { time: timeout * 1000 * 60 }
            );

            let hugline = starthug;
            let usernameline = msg.author.username;
            let first = true;

            let joined = [];

            collector.on('collect', (_, user) => {
                if (joined.includes(user.id)) return;
                joined.push(user.id);

                const hug = getrandom(first && recievers.length > 1 ? midhugs : righthugs);
                usernameline += ", " + user.username;
                hugline += " " + hug;

                botmsg.edit(`**${hugline}\n${usernameline}**`);
                first = false;
            });
        };
    },
    help: `
    Usage 1: \`hug @mentions\`.
        Asks the mentioned users for a hug.
        If the mentioned persons reacts with ${approveemoji} within ${timeout} minutes, the hug is accepted and will be completed.
    
    Usage 2: \`hug [text]\`
        Will hug what's provided
    
    Usage 3: \`hug\`
        Will send an ascci hug.
    `
}