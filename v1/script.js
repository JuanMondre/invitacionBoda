/* ===== CONFIGURACIÓN: editá solo este bloque ===== */
const C={
  n1:"Aldana", n2:"Juan", iniciales:"A & J",
  fechaLarga:"9 de octubre de 2027", fechaCorta:"09 · 10 · 2027",
  fechaISO:"2027-10-09T18:00:00-03:00", limite:"1 de septiembre",
  duracionHoras:8,   
  cerLugar:"Parroquia María Madre de Dios", cerHora:"20:00", cerDir:"Esquina de Av. Paula Albarracín de Sarmiento y Dorrego (Barrio Aramburu)",
  recLugar:"Tierras Negras", recHora:"21:00", recDir:"Calle 11 (a 300 metros al este de la Ruta Nacional 40)",
  mapaCer:"https://maps.app.goo.gl/hrUjFeRv49ePShsx5",  // iglesia (ceremonia)
  mapaRec:"https://maps.app.goo.gl/Kbh7tBLWtjKPTT5C7",  // salón (recepción)
  coords:{cer:{lat:-34.6037,lng:-58.3816},rec:{lat:-34.5800,lng:-58.5200}},
  whatsapp:"5493814790470",
  rsvpEndpoint:"",
  img:{ /* reemplazá por tus fotos (ruta local o URL) */
    hero:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=70",
    historia:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=70",
    fin:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=65"},
  galeria:[
    "photo-1519225421980-715cb0215aed","photo-1522673607200-164d1b6ce486","photo-1583939003579-730e3918a45a",
    "photo-1606800052052-a08af7148866","photo-1460978812857-470ed1c77af0","photo-1537633552985-df8429e8048b"
  ].map(id=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=800&q=70"),
  cronograma:[["20:00","Ceremonia Religiosa"],["21:00","Recepción de invitados"], ["21:30","Ceremonia Civil"],["22:00","Cena"],["23:00","Primer baile"],["00:00","Fiesta"]],
  regalos:[
    {t:"Lista de regalos",d:"Mirá nuestra lista y elegí lo que más te guste.",b:"Ver lista",u:"https://example.com/lista"},
    {t:"Transferencia bancaria",d:"Alias: Aldana.Juan.boda<br>Titular: Aldana Ejemplo",b:"Copiar alias",copy:"Aldana.Juan.boda"},
    {t:"Experiencias",d:"Aportá a nuestra luna de miel y a cenas que vamos a recordar.",b:"Ver experiencias",u:"https://example.com/experiencias"}],
  tarjeta:{
  texto:"Cada invitado abona su tarjeta, que incluye todo lo necesario para disfrutar la noche.",
  precios:[["Adultos","$120.000"],["Niños","$90.000"]],
  //incluye:["Cena","Bebidas","Mesa dulce","Fiesta"],   // editá según lo que incluya
  nota:"Los datos para abonar te los vamos a enviar al confirmar tu asistencia."},
  faq:[
  ["¿Hay estacionamiento?","Sí, habrá estacionamiento disponible en el lugar."],
  ["¿Puedo llevar niños?","[Información editable]"],
  ["¿Hay alojamiento cerca?","[Información editable]"],
  ["¿A qué hora termina?","[Información editable]"]]
};
/* ================================================== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$$("[data-f]").forEach(e=>{if(C[e.dataset.f]!=null)e.textContent=C[e.dataset.f]});
$$("[data-img]").forEach(e=>{const u=C.img[e.dataset.img];if(!u)return;
  if(e.tagName==="IMG")e.src=u;else e.style.backgroundImage=`url(${u})`});
const mapUrl=k=>(k==="cer"?C.mapaCer:C.mapaRec)||`https://www.google.com/maps/search/?api=1&query=${C.coords[k].lat},${C.coords[k].lng}`;
$$("[data-map]").forEach(a=>a.href=mapUrl(a.dataset.map));
$("[data-route]").href=`https://www.google.com/maps/dir/?api=1&destination=${C.coords.rec.lat},${C.coords.rec.lng}`;
$("#mapf").src=`https://maps.google.com/maps?q=${C.coords.rec.lat},${C.coords.rec.lng}&z=14&output=embed`;

$("#tl").innerHTML=C.cronograma.map(([h,t])=>`<li><time>${h}</time><span>${t}</span></li>`).join("");
$("#faq").innerHTML=C.faq.map(([q,a])=>`<div class="card rv"><h3>${q}</h3><p>${a}</p></div>`).join("");
$("#regalos-g").innerHTML=C.regalos.map((g,i)=>`<div class="card rv"><h3>${g.t}</h3><p>${g.d}</p>${g.u?`<a class="btn" href="${g.u}" target="_blank" rel="noopener">${g.b}</a>`:`<button class="btn" data-copy="${g.copy 
}">${g.b}</button>`}</div>`).join("");
$("#tj-texto").textContent=C.tarjeta.texto;
$("#tj-precios").innerHTML=C.tarjeta.precios.map(([t,p])=>`<div class="card rv"><h3>${t}</h3><div class="precio">${p}</div></div>`).join("");
$("#tj-nota").textContent=C.tarjeta.nota;
$$("[data-copy]").forEach(b=>b.onclick=()=>{navigator.clipboard?.writeText(b.dataset.copy);const t=b.textContent;b.textContent="¡Copiado!";setTimeout(()=>b.textContent=t,1800)});
$("#mas").innerHTML=C.galeria.map((u,i)=>`<button data-i="${i}" aria-label="Ampliar foto ${i+1}"><img src="${u}" alt="Foto ${i+1} de la pareja" loading="lazy" style="aspect-ratio:${i%3==0?'3/4':i%3==1?'1/1':'4/5'};object-fit:cover"></button>`).join("");

/* Nav */
const nav=$("#nav"),body=document.body;
addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>60),{passive:true});
const bg=$(".burger");
const tog=o=>{body.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);body.style.overflow=o?"hidden":""};
bg.onclick=()=>tog(!body.classList.contains("open"));
$$("#drawer a").forEach(a=>a.onclick=()=>tog(false));

/* Reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
$$(".rv").forEach(e=>io.observe(e));

/* Cuenta regresiva */
const target=new Date(C.fechaISO).getTime();
function tick(){let t=Math.max(0,target-Date.now());
  const v=[Math.floor(t/864e5),Math.floor(t/36e5)%24,Math.floor(t/6e4)%60,Math.floor(t/1e3)%60];
  ["d","h","m","s"].forEach((k,i)=>$("#"+k).textContent=String(v[i]).padStart(2,"0"))}
tick();setInterval(tick,1000);

/* Calendario: abre Google Calendar con el evento precargado */
$("#ics").onclick=()=>{
  const fmt=d=>d.toISOString().replace(/[-:]|\.\d{3}/g,""),
        ini=new Date(C.fechaISO),
        fin=new Date(ini.getTime()+C.duracionHoras*36e5);
  const p=new URLSearchParams({
    action:"TEMPLATE",
    text:`Boda de ${C.n1} & ${C.n2}`,
    dates:`${fmt(ini)}/${fmt(fin)}`,
    details:`Ceremonia: ${C.cerLugar} (${C.cerHora} hs)\nRecepción: ${C.recLugar} (${C.recHora} hs)\nTe esperamos!`,
    location:`${C.cerLugar}, ${C.cerDir}`,
    ctz:"America/Argentina/Buenos_Aires"
  });
  window.open("https://calendar.google.com/calendar/render?"+p,"_blank","noopener");
};

/* Lightbox */
const lb=$("#lb"),li=$("img",lb);let cur=0;
const show=i=>{cur=(i+C.galeria.length)%C.galeria.length;li.src=C.galeria[cur].replace("w=800","w=1600");lb.classList.add("on")};
$$("#mas button").forEach(b=>b.onclick=()=>show(+b.dataset.i));
$(".x",lb).onclick=()=>lb.classList.remove("on");$(".p",lb).onclick=()=>show(cur-1);$(".n",lb).onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)lb.classList.remove("on")};
addEventListener("keydown",e=>{if(!lb.classList.contains("on"))return;if(e.key==="Escape")lb.classList.remove("on");if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});

/* RSVP */
const F=$("#f");
$$("input[name=asiste]").forEach(r=>r.onchange=()=>$("#acomp").style.display=r.value==="No"?"none":"");
function setErr(el,m){const box=el.closest("fieldset")||el.closest("label");const s=box&&box.querySelector(".err");if(s)s.textContent=m;return !m}
F.onsubmit=e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(F));let ok=true;
  ok&=setErr(F.nombre,d.nombre.trim().length<3?"Ingresá tu nombre y apellido.":"");
  ok&=setErr(F.asiste[0],d.asiste?"":"Elegí una opción.");
  if(!ok)return;
  if(d.asiste==="No")d.acomp=0;
  const msg=`Hola! Soy ${d.nombre}. ${d.asiste==="Sí"?`Confirmo mi asistencia a la boda de ${C.n1} y ${C.n2} con ${d.acomp} acompañante(s).`:`Lamentablemente no podré asistir a la boda de ${C.n1} y ${C.n2}.`}${d.notas?` Comentarios: ${d.notas}`:""}`;
  const wa=`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  F.style.display="none";const o=$("#ok");o.style.display="block";
  $("#okt").innerHTML=(d.asiste==="Sí"?"¡Qué alegría! Te esperamos el "+C.fechaLarga+".":"Lamentamos que no puedas venir. Gracias por avisarnos.")+
    `<br><br>Te estamos llevando a WhatsApp para enviar tu confirmación.<br><br><a class="btn solid" href="${wa}">Abrir WhatsApp</a>`;
  o.scrollIntoView({behavior:"smooth",block:"center"});
  setTimeout(()=>location.href=wa,1200);
};