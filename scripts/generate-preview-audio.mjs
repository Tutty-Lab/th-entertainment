import {mkdir,writeFile} from 'node:fs/promises';
const key=process.env.ELEVENLABS_API_KEY;
if(!key){console.log('No project API key');process.exit(1)}
const prompts={'01-monolith':'Dark luxury nightclub ambience, deep slow sub bass pulse and distant crowd, restrained cinematic minimal texture. Seamless loop, no vocals.','03-grain':'Warm vinyl crackle, smoky underground house ambience, soft muffled rhythmic pulse, analog texture. Seamless loop, no vocals.','04-world-tour':'Epic concert arena ambience with distant crowd, cinematic synth anticipation and gentle bass pulse. Seamless loop, no vocals.'};
await mkdir('templates/audio',{recursive:true});
for(const [name,text] of Object.entries(prompts)){
const response=await fetch('https://api.elevenlabs.io/v1/sound-generation',{method:'POST',headers:{'xi-api-key':key,'Content-Type':'application/json'},body:JSON.stringify({text,duration_seconds:5,loop:true,model_id:'eleven_text_to_sound_v2'})});
if(!response.ok){console.log(name+' HTTP '+response.status);process.exitCode=1;break}
await writeFile(`templates/audio/${name}.mp3`,Buffer.from(await response.arrayBuffer()));console.log(name+' generated');
}
