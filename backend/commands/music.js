const ytdl = await import("ytdl-core");
const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const notplaying = "Nothing playing!";

const channels = {}

const stop = (channel) => {
    if (!channels[channel]) return;
    try {
        channels[channel].dispatcher.destroy();
    } finally {
        try {
            channels[channel].dcchannel.leave();
        } finally {
            delete channels[channel];
        }
    }
}

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!msg.member.voice.channel) return "You need to join a voice channel to use the music command";

        const channel = msg.member.voice.channel.id;
        
        const splitargstring = argstring.split(" ");

        if (splitargstring[0] != "play" && !channels[channel]) return notplaying;

        switch (splitargstring[0]) {
            case "play":
                channels[channel] = {}

                if (msg.member.voice.channel) channels[channel].dcchannel = msg.member.voice.channel;
                const connection = await channels[channel].dcchannel.join();
                try{
                    channels[channel].dispatcher = connection.play(
                        ytdl(
                            splitargstring[1],
                            { filter: "audioonly" }
                        )
                    );
                    setTimeout(() => stop(channel), 1000 * 60 * 60 * 4);    // to prevent memory leak if someone keeps it running
                    msg.react("👍");
                } catch (e) {
                    console.log(e);
                    msg.channel.send("Please specify a youtube url");
                    channels[channel].dcchannel.leave();
                }
                break;
            case "pause":
                try {
                    channels[channel].dispatcher.pause();
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            case "resume":
                try {
                    channels[channel].dispatcher.resume();
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            case "stop":
                stop(channel);
                msg.react("👍");
                break;
            case "volume":
                try {
                    channels[channel].dispatcher.setVolume(splitargstring[1] / 100);
                    msg.react("👍");
                } catch (e) {
                    return notplaying;
                }
                break;
            default:
                return "That's not a music command!";
        }
    },
    help: `
    Usage: \`music [command]\`.
    
    Available music commands:
        play [youtube url or video id]
            Plays the track from youtube to the voice channel the user is in.
        
        pause
            Pauses the track playing in the voice channel the user is in.
        
        resume
            Resumes the track paused in the voice channel the user is in.
        
        volume [percentage]
            Sets the volume from a percentage. Raising the percentage above 100 is possible, but will decrease sound quality.
        
        stop
            Stops playback and lets the bot leave the channel it's currently in
        
    Requires command caching to be enabled by the bot sysadmin due to technical reasons.
    `
}
