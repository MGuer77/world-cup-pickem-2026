export interface DBUser { nickname:string; predictions:Record<string,string>; points:number; correct:number; updatedAt:number; }
export interface DBChatMessage { id:string; nickname:string; text:string; timestamp:number; }
export interface LeaderboardRow { nickname:string; predictions:Record<string,string>; points:number; correct:number; total:number; accuracy:number; }
function lsGet<T>(k:string):T|null { if(typeof window==="undefined")return null; try{const r=localStorage.getItem(`wc2026_${k}`);return r?JSON.parse(r)as T:null;}catch{return null;} }
function lsSet(k:string,v:unknown){if(typeof window==="undefined")return;try{localStorage.setItem(`wc2026_${k}`,JSON.stringify(v));}catch{}}
async function sharedGet<T>(k:string):Promise<T|null>{try{// @ts-expect-error artifact storage
const r=await window.storage?.get(k,true);return r?JSON.parse(r.value)as T:null;}catch{return null;}}
async function sharedSet(k:string,v:unknown){try{// @ts-expect-error artifact storage
await window.storage?.set(k,JSON.stringify(v),true);}catch{}}
export function getAllUsers():Record<string,DBUser>{return lsGet<Record<string,DBUser>>("users")??{};}
export function upsertUser(nickname:string,predictions:Record<string,string>){const users=getAllUsers();const key=nickname.toLowerCase();const ex=users[key];users[key]={nickname,predictions,points:ex?.points??0,correct:ex?.correct??0,updatedAt:Date.now()};lsSet("users",users);sharedSet("users",users);}
export async function syncUsersFromShared(){const remote=await sharedGet<Record<string,DBUser>>("users");if(!remote)return;const local=getAllUsers();const merged={...remote};for(const[k,lv]of Object.entries(local)){const rv=remote[k];if(!rv){merged[k]=lv;continue;}merged[k]={...rv,predictions:Object.keys(lv.predictions).length>=Object.keys(rv.predictions??{}).length?lv.predictions:rv.predictions,points:Math.max(lv.points,rv.points),correct:Math.max(lv.correct,rv.correct),updatedAt:Math.max(lv.updatedAt,rv.updatedAt)};}lsSet("users",merged);}
export function getLeaderboard():LeaderboardRow[]{return Object.values(getAllUsers()).map(u=>({nickname:u.nickname,predictions:u.predictions??{},points:0,correct:0,total:Object.keys(u.predictions??{}).length,accuracy:0}));}
export function getChatMessages():DBChatMessage[]{return lsGet<DBChatMessage[]>("chat")??[];}
export async function syncChatFromShared():Promise<DBChatMessage[]>{const remote=await sharedGet<DBChatMessage[]>("chat");const local=getChatMessages();if(!remote)return local;const byId:Record<string,DBChatMessage>={};[...remote,...local].forEach(m=>{byId[m.id]=m;});const merged=Object.values(byId).sort((a,b)=>a.timestamp-b.timestamp).slice(-200);lsSet("chat",merged);return merged;}
export async function addChatMessage(nickname:string,text:string):Promise<DBChatMessage>{const msg:DBChatMessage={id:`${Date.now()}_${Math.random().toString(36).slice(2,7)}`,nickname,text:text.slice(0,300),timestamp:Date.now()};const updated=[...getChatMessages(),msg].slice(-200);lsSet("chat",updated);await sharedSet("chat",updated);return msg;}
