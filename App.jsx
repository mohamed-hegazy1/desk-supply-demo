import { useEffect, useMemo, useState } from 'react';
import { products, filterProducts, cartTotal, restoreCart } from './model.js';
import './style.css';

function ProductArt({kind, tone}) {
  return <svg viewBox="0 0 320 210" aria-hidden="true" className={`product-art art-${tone}`}>
    <ellipse cx="160" cy="174" rx="85" ry="12" fill="#17251c" opacity=".09" />
    {kind === 'lamp' && <g stroke="#24382e" strokeWidth="7" strokeLinejoin="round"><path d="M160 162V78l46-29" fill="none"/><path d="m179 57 41-22 25 45-66 0z" fill="#314e3e"/><path d="M130 169h62" strokeWidth="12" strokeLinecap="round"/></g>}
    {kind === 'keyboard' && <g transform="translate(56 65) rotate(-7 100 45)"><rect width="210" height="98" rx="12" fill="#d8d2c5" stroke="#7c847a" strokeWidth="3"/>{Array.from({length:36},(_,i)=><rect key={i} x={10+(i%12)*16} y={10+Math.floor(i/12)*20} width="12" height="14" rx="2" fill={i===11?'#e89b66':'#faf7f0'}/>)}<rect x="50" y="74" width="110" height="14" rx="3" fill="#faf7f0"/></g>}
    {kind === 'headphones' && <g fill="none" stroke="#31483e" strokeWidth="14"><path d="M109 122V91a51 51 0 0 1 102 0v31"/><rect x="95" y="105" width="31" height="57" rx="13" fill="#4b6657"/><rect x="194" y="105" width="31" height="57" rx="13" fill="#4b6657"/></g>}
    {kind === 'notebook' && <g transform="rotate(-11 160 110)"><rect x="107" y="44" width="113" height="137" rx="7" fill="#9e613f"/><rect x="100" y="39" width="113" height="137" rx="7" fill="#bf8359"/><path d="M116 40v135" stroke="#925a39" strokeWidth="3"/><path d="M143 79h40m-40 10h30" stroke="#f2dcc1" strokeWidth="2"/></g>}
    {kind === 'stand' && <g fill="#a8b0aa" stroke="#65796a" strokeWidth="3"><path d="m106 150 18-54 84 0 17 54-22 7-13-40h-49l-14 40z"/><path d="m92 75 127-10 14 29-131 12z" fill="#c5cdc6"/></g>}
    {kind === 'mug' && <g fill="#e4cbaa" stroke="#a1835e" strokeWidth="3"><path d="M120 76h77v63q-4 32-38 32t-39-32z"/><path d="M197 88h13q30 0 16 35-5 14-29 10" fill="none" strokeWidth="8"/><ellipse cx="159" cy="76" rx="38" ry="9" fill="#bda17d"/></g>}
  </svg>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(() => { try { return restoreCart(localStorage.getItem('desk-supply-cart')); } catch { return {}; } });
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => { try { localStorage.setItem('desk-supply-cart', JSON.stringify(cart)); } catch { setStorageWarning(true); } }, [cart]);
  useEffect(() => { if(!notice) return; const timer = setTimeout(()=>setNotice(''),2400); return ()=>clearTimeout(timer); },[notice]);
  const visible = useMemo(()=>filterProducts(products, query, category, sort),[query,category,sort]);
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const money = cents => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
  function add(product) { setCart(c=>({...c,[product.id]:Math.min((c[product.id]||0)+1,9)})); setNotice(`${product.name} added to your bag.`); }
  function quantity(id, amount) { setCart(c=> { const next={...c}; if(amount<=0) delete next[id]; else next[id]=Math.min(9,amount); return next; }); }
  return <>
    <div className="demo-strip">PORTFOLIO DEMO <span>No real purchases. Sample products and prices.</span></div>
    <header className="header"><a href="#" className="wordmark" aria-label="Desk Supply home">desk<span> / </span>supply<span className="brand-dot">●</span></a><nav aria-label="Main navigation"><a href="#collection">Collection</a><button className="bag-button" onClick={()=>setOpen(true)}>Your bag <span>{count}</span></button></nav></header>
    <main>
      <section className="hero"><div><p className="eyebrow">LESS CLUTTER. MORE CLARITY.</p><h1>Make room<br/>for good work.</h1><p className="hero-copy">Considered essentials for your everyday workspace. Small details. A better desk.</p><a href="#collection" className="primary">Explore the collection <span>↗</span></a></div><div className="hero-art"><div className="hero-circle"/><div className="hero-lamp"><ProductArt kind="lamp" tone="sage"/></div><div className="hero-notebook"><ProductArt kind="notebook" tone="sand"/></div><span className="hero-caption">OBJECTS WITH PURPOSE / 01</span></div></section>
      <section id="collection" className="collection"><div className="section-title"><div><p className="eyebrow">THE EVERYDAY EDIT</p><h2>A place for everything.</h2></div><p>{visible.length} essentials</p></div>
        <div className="controls"><div className="categories" role="group" aria-label="Product category">{['All','Workspace','Tech','Lifestyle'].map(c=><button key={c} className={category===c?'selected':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="search-sort"><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Search products" placeholder="Find your essential" value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div></div>
        <div className="grid">{visible.map(p=><article className="product" key={p.id}><div className={`art-wrap bg-${p.tone}`}><ProductArt kind={p.kind} tone={p.tone}/><span className="tag">{p.tag}</span><button className="add" aria-label={`Add ${p.name} to bag`} onClick={()=>add(p)} disabled={cart[p.id]>=9}>{cart[p.id]>=9?'✓':'+'}</button></div><div className="product-meta"><div><p className="category-label">{p.category}</p><h3>{p.name}</h3><p className="product-description">{p.description}</p></div><strong>{money(p.price)}</strong></div></article>)}</div>
        {!visible.length && <div className="empty"><h3>No essentials found.</h3><p>Try another search or reset your filters.</p><button className="primary" onClick={()=>{setQuery('');setCategory('All');setSort('featured');}}>Reset filters</button></div>}
      </section><section className="bottom-note"><span>01 / SIMPLE BY DESIGN</span><p>A calmer space starts<br/>with the things you keep.</p><span>FRONTEND LEARNING PROJECT<br/>REACT · CSS · LOCAL STORAGE</span></section>
    </main><footer><span className="wordmark">desk / supply</span><p>A sample storefront. No checkout, payment or delivery service.</p><a href="#collection">Back to collection ↑</a></footer>
    <div className="notice" role="status">{notice}</div>
    {open && <dialog ref={node=>{if(node && !node.open) node.showModal();}} aria-labelledby="bag-title" className="bag-dialog" onCancel={()=>setOpen(false)}><div className="bag-heading"><h2 id="bag-title">Your bag <small>({count})</small></h2><button autoFocus aria-label="Close bag" onClick={()=>setOpen(false)}>✕</button></div><p className="bag-demo">Demo only. Nothing here can be purchased.</p>{storageWarning&&<p role="alert">Your browser blocked storage. The bag will not be saved.</p>}{!count?<div className="empty"><h3>A little room for something good.</h3><p>Your bag is empty.</p><button className="primary" onClick={()=>setOpen(false)}>Browse essentials</button></div>:<><div className="bag-items">{products.filter(p=>cart[p.id]).map(p=><div className="bag-item" key={p.id}><ProductArt kind={p.kind} tone={p.tone}/><div><h3>{p.name}</h3><p>{money(p.price)} each</p><div className="quantity"><button aria-label={`Decrease ${p.name} quantity`} onClick={()=>quantity(p.id,cart[p.id]-1)}>−</button><output aria-label={`${p.name} quantity`}>{cart[p.id]}</output><button aria-label={`Increase ${p.name} quantity`} disabled={cart[p.id]>=9} onClick={()=>quantity(p.id,cart[p.id]+1)}>+</button><button className="remove" onClick={()=>quantity(p.id,0)} aria-label={`Remove ${p.name}`}>Remove</button></div></div><strong>{money(p.price*cart[p.id])}</strong></div>)}</div><div className="total"><span>Sample subtotal</span><strong>{money(cartTotal(cart))}</strong></div><p className="bag-demo">No taxes, shipping or checkout are calculated in this demo. Up to 9 of each item.</p><button className="primary continue" onClick={()=>setOpen(false)}>Keep exploring ↗</button></>}</dialog>}
  </>;
}
