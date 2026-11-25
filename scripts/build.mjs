import {mkdir,cp,rm,readFile,writeFile} from 'node:fs/promises';
await rm('public',{recursive:true,force:true});await mkdir('public/templates',{recursive:true});
for(const file of ['index.html','preview.js'])await cp(file,`public/${file}`);
for(const dir of ['01-monolith','03-grain','04-world-tour','shared','img','audio']){try{await cp(`templates/${dir}`,`public/templates/${dir}`,{recursive:true})}catch(e){if(e.code!=='ENOENT')throw e}}
console.log('Built three concepts to public/');
