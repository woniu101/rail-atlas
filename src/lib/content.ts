import {getCollection} from 'astro:content';
import type {Train} from '../data/trains';
import manifest from '../../scripts/assets-manifest.json';
export async function allTrains():Promise<Train[]>{
  const entries=await getCollection('trains',({data})=>data.status==='published');
  return entries.map(({data})=>({...data,description:[]})).sort((a,b)=>a.year-b.year);
}
export async function allArticles(){return getCollection('articles',({data})=>data.status==='published');}
export function imageCredit(slug:string){return manifest.find(x=>x.id===slug&&x.type==='model-render')||manifest.find(x=>x.id===slug);}
export {manifest};
