const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],fmt=n=>n.toLocaleString('fr-FR');
const S=[
{t:'Studio Moderne & Lumineux',q:'Haut Agdal',p:4200,m:42,r:'4.9 (24 avis)',g:'g1',x:['Meublé design','Fibre optique','Tram Av. de France (2 min)'],d:"Niché dans une rue résidentielle de Haut Agdal, ce studio allie raffinement contemporain et douceur de vivre. Cuisine américaine équipée, lumière douce toute la journée."},
{t:'Studio Cosy avec terrasse privée',q:'Quartier Hassan',p:3800,m:38,r:'4.7 (19 avis)',g:'g2',x:['Climatisation','Proche Tour Hassan','Cuisine équipée'],d:"Dernier étage, ruelle très calme, terrasse privée de 14 m² avec vue sur la Tour Hassan."},
{t:'Studio Neuf Standing – Prestigia',q:'Hay Riad / Prestigia',p:5000,m:48,r:'4.95 (38 avis)',g:'g3',x:['Piscine résidentielle','Garage sous-sol','Gardiennage 24/7'],d:"Résidence sécurisée neuve (2024), place de parking titrée, charges de syndic incluses."}];
const D=['Lun. 14','Mar. 15','Mer. 16'],T=['10h00','11h30','14h00','16h30','18h00'];
let cur=0,dI=1,tI=4,maxOn=false,V=[];
try{V=JSON.parse(localStorage.getItem('v')||'[]')}catch(e){}
const tags=s=>s.x.map(x=>`<span class="tag">${x}</span>`).join('');
function go(id){
 $$('.s').forEach(e=>e.hidden=e.id!==id);
 $('#nav').hidden=!['search','visits','profile'].includes(id);
 $$('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
 if(id==='search')list();if(id==='visit')visit();if(id==='visits')vl();
 scrollTo(0,0)}
function list(){const a=S.map((s,i)=>[s,i]).filter(([s])=>!maxOn||s.p<=4500);$('#cnt').textContent=a.length;
 $('#list').innerHTML=a.map(([s,i])=>`<article class="card" data-open="${i}" style="margin-bottom:14px"><div class="img ${s.g}"><span class="chip">${s.q}</span><span class="chip r">★ ${s.r}</span></div><div class="row"><h3>${s.t}</h3><b class="acc">${fmt(s.p)} DH<small>/mois</small></b></div><p class="mu">${s.m} m² • Meublé</p><p>${tags(s)}</p><button class="btn sm">Voir le détail →</button></article>`).join('')}
function detail(i){cur=i;const s=S[i];
 $('#detail').innerHTML=`<button class="back" data-go="search">←</button><div class="img big ${s.g}"></div><span class="pill">✔ Vérifié Havaura</span><h1>${s.t}</h1><h2 class="acc">${fmt(s.p)} DH <small>/ mois • charges comprises</small></h2><p class="mu">📍 ${s.q}, Rabat • ${s.m} m²</p><h3>L'Expérience du Lieu</h3><p>${s.d}</p><h3>Équipements inclus</h3><p>${tags(s)}</p><div class="card"><b>Mehdi B. • Superhôte ★ 4.96</b><i class="mu">« J'accorde une attention particulière au confort et à la propreté de mes logements. »</i></div><div class="card"><b>Ce studio vous convient-il ?</b><button class="btn" data-go="visit">Demander une visite</button><button class="btn alt" data-go="search">Ne me plaît pas</button></div>`;go('detail')}
function visit(){const s=S[cur];
 $('#visit').innerHTML=`<button class="back" data-go="detail">←</button><h1>Créneau &amp; Visite</h1><div class="card"><b>${s.t}</b><p class="mu">${s.q}, Rabat • ${s.m} m²</p><b class="acc">${fmt(s.p)} DH/mois</b></div><h3>Date de la visite</h3><div class="grid">${D.map((d,i)=>`<button class="opt ${i==dI?'on':''}" data-d="${i}">${d}</button>`).join('')}</div><h3>Horaires disponibles</h3><div class="grid">${T.map((t,i)=>`<button class="opt ${i==tI?'on':''}" data-t="${i}">${t}</button>`).join('')}</div><textarea maxlength="250" placeholder="Message pour le propriétaire (optionnel)"></textarea><p class="mu">Visite 100% gratuite et sans engagement.</p><button class="btn" id="cf">Confirmer le créneau (${T[tI]}) →</button>`}
function vl(){$('#vlist').innerHTML=V.length?V.map(v=>`<div class="card" style="margin-bottom:12px"><b>${S[v.s].t}</b><p class="mu">${S[v.s].q} • ${fmt(S[v.s].p)} DH/mois</p><span class="pill">${v.d} • ${v.t} • Confirmée</span></div>`).join(''):'<p class="mu">Aucune visite programmée.</p>'}
document.addEventListener('click',e=>{const t=e.target;let n;
 if(n=t.closest('[data-go]'))return go(n.dataset.go);
 if(n=t.closest('[data-open]'))return detail(+n.dataset.open);
 if(n=t.closest('[data-d]')){dI=+n.dataset.d;return visit()}
 if(n=t.closest('[data-t]')){tI=+n.dataset.t;return visit()}
 if(t.id==='cf'){V.push({s:cur,d:D[dI],t:T[tI]});try{localStorage.setItem('v',JSON.stringify(V))}catch(x){}return go('visits')}
 if(t.id==='fl'){maxOn=!maxOn;t.classList.toggle('on',maxOn);return list()}
 if(n=t.closest('.seg button'))n.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===n))});
$$('.otp input').forEach((e,i,a)=>e.oninput=()=>{if(e.value&&a[i+1])a[i+1].focus()});
go('splash');setTimeout(()=>go('welcome'),1600);
