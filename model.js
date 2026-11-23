export const products = [
 {id:'arc-lamp', name:'Arc desk lamp', category:'Workspace', price:6800, kind:'lamp', tone:'sage', tag:'THE FOCUS EDIT', description:'A softer light for your next idea.'},
 {id:'form-keyboard', name:'Form mechanical keyboard', category:'Tech', price:8900, kind:'keyboard', tone:'sand', tag:'DESK FAVOURITE', description:'Tactile keys. A quieter kind of focus.'},
 {id:'quiet-headphones', name:'Quiet wireless headphones', category:'Tech', price:12000, kind:'headphones', tone:'clay', tag:'TUNE IN', description:'Your own little pocket of quiet.'},
 {id:'daily-notebook', name:'Daily notebook', category:'Lifestyle', price:1800, kind:'notebook', tone:'sand', tag:'START SOMETHING', description:'For the ideas worth writing down.'},
 {id:'rise-stand', name:'Rise laptop stand', category:'Workspace', price:4200, kind:'stand', tone:'sage', tag:'A NEW PERSPECTIVE', description:'A little lift for your everyday setup.'},
 {id:'slow-mug', name:'Slow morning mug', category:'Lifestyle', price:2400, kind:'mug', tone:'clay', tag:'TAKE A MOMENT', description:'Keep your favourite ritual close.'}
];
export function filterProducts(list, query='', category='All', sort='featured') {
 const term=query.trim().toLowerCase();
 const found=list.filter(p=>(category==='All'||p.category===category)&&`${p.name} ${p.description}`.toLowerCase().includes(term));
 if(sort==='price-asc') found.sort((a,b)=>a.price-b.price);
 if(sort==='price-desc') found.sort((a,b)=>b.price-a.price);
 return found;
}
export function restoreCart(raw) {
 try {
  const value=JSON.parse(raw);
  if(!value || typeof value!=='object' || Array.isArray(value)) return {};
  return Object.fromEntries(products.filter(p=>Number.isInteger(value[p.id])&&value[p.id]>0).map(p=>[p.id,Math.min(value[p.id],9)]));
 } catch { return {}; }
}
export function cartTotal(cart) { return products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0); }
