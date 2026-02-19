import { useState, useEffect, useRef } from "react";

const C = {
  cream:"#F4EEE3", stone:"#E0D5C4", clay:"#B8724A", clayDeep:"#8C4E2A",
  moss:"#3A4636", mossMid:"#5A6855", dust:"#C8A99A", midnight:"#1E2018",
  white:"#FDFAF5", ink:"#2A2318", gold:"#C4943A"
};

const GF = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');`;

const PAGES = ["home","cranio","tcm","tuina","schmerz","aroma","uebermich"];
const NAV = [
  {id:"home",label:"Start"},
  {id:"cranio",label:"Craniosakrale Energetik"},
  {id:"tcm",label:"TCM Ernährung"},
  {id:"tuina",label:"Tuina & Schröpfen"},
  {id:"schmerz",label:"G-Well Pointer"},
  {id:"aroma",label:"Aromatherapie"},
  {id:"uebermich",label:"Über mich"},
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    if(!ref.current) return;
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold:0.08});
    obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return [ref, vis];
}

function Reveal({children, delay=0, style={}}) {
  const [ref,vis] = useReveal();
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(28px)",transition:`opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,...style}}>{children}</div>;
}

function Label({n,text,light=false}) {
  return <div style={{fontSize:"0.62rem",letterSpacing:"0.3em",textTransform:"uppercase",color:light?C.dust:C.clay,marginBottom:"3rem",display:"flex",alignItems:"center",gap:"1rem"}}>
    {n} — {text}
    <span style={{display:"block",width:"3rem",height:"1px",background:light?C.dust:C.clay,opacity:0.5}}/>
  </div>;
}

function Heading({children,light=false,size="clamp(2rem,3.5vw,3.8rem)"}) {
  return <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:size,lineHeight:1.1,marginBottom:"1.2rem",color:light?C.cream:C.moss}}>{children}</h2>;
}

function Lead({children,light=false}) {
  return <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.2rem,1.8vw,1.7rem)",fontWeight:300,lineHeight:1.5,color:light?C.stone:C.moss,marginBottom:"2rem"}}>{children}</p>;
}

function Tag({children,bg=C.clay,color=C.white}) {
  return <span style={{display:"inline-block",fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",background:bg,color,padding:"0.3rem 0.75rem",borderRadius:"2px",marginBottom:"1.5rem"}}>{children}</span>;
}

function CriticalNote({children}) {
  return <div style={{background:"rgba(184,114,74,0.08)",borderLeft:`3px solid ${C.clay}`,padding:"1.5rem 2rem",margin:"2rem 0",fontSize:"0.83rem",lineHeight:1.7,color:"#4A3828"}}>{children}</div>;
}

function Btn({children,onClick,dark=false,outline=false}) {
  const [hov,setHov]=useState(false);
  const base = outline
    ? {background:"transparent",color:dark?C.cream:C.clay,border:`1px solid ${dark?C.dust:C.clay}`,padding:"0.85rem 2.2rem",fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}
    : {background:hov?(dark?"#C8A99A":C.clayDeep):(dark?C.dust:C.clay),color:dark?C.midnight:C.white,border:"none",padding:"0.9rem 2.4rem",fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"};
  return <button style={base} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}>{children}</button>;
}

function BreathingCircle({size=340,dark=false}) {
  const c = dark?C.dust:C.clay;
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{position:"absolute",inset:`${i*12}%`,borderRadius:"50%",border:`1px solid ${c}`,opacity:0.35,animation:`breathe 7s ease-in-out infinite ${i*1.2}s`}}/>
      ))}
      <style>{`@keyframes breathe{0%,100%{transform:scale(1);opacity:0.35}50%{transform:scale(1.05);opacity:0.7}}`}</style>
    </div>
  );
}

function ServiceCard({icon,title,desc,onClick,delay=0}) {
  const [hov,setHov]=useState(false);
  return (
    <Reveal delay={delay}>
      <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{padding:"2.5rem 2rem",border:`1px solid ${C.stone}`,background:hov?C.cream:C.white,cursor:"pointer",transition:"background .3s",borderLeft:`3px solid ${hov?C.clay:C.stone}`,transition:"all .3s"}}>
        <div style={{fontSize:"1.6rem",marginBottom:"1rem"}}>{icon}</div>
        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:400,color:C.moss,marginBottom:"0.7rem"}}>{title}</h3>
        <p style={{fontSize:"0.82rem",lineHeight:1.7,color:"#5A5040",margin:0}}>{desc}</p>
        <div style={{marginTop:"1.2rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:C.clay}}>Mehr erfahren →</div>
      </div>
    </Reveal>
  );
}

function SympBadge({children}) {
  return <span style={{display:"inline-block",border:`1px solid ${C.stone}`,borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.78rem",color:C.moss,margin:"0.3rem",background:C.white}}>{children}</span>;
}

function HomePage({nav}) {
  useEffect(()=>{ document.title="WURZELKIND – Craniosacral Therapie Mattersburg | Marion Sailer-Riegler"; },[]);
  return (
    <>
      <section style={{minHeight:"100vh",background:C.moss,display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative",overflow:"hidden",paddingTop:"70px"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"6rem 4rem 5rem",position:"relative",zIndex:2}}>
          <div style={{fontSize:"0.65rem",letterSpacing:"0.3em",textTransform:"uppercase",color:C.dust,marginBottom:"1.5rem"}}>Mattersburg · Burgenland</div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3rem,5.5vw,6.5rem)",fontWeight:300,lineHeight:1.0,color:C.cream,marginBottom:"1.5rem"}}>
            Dein Kind<br/>darf sich<br/><em style={{color:C.clay,fontStyle:"italic"}}>wohlfühlen.</em>
          </h1>
          <p style={{fontSize:"0.88rem",color:C.stone,lineHeight:1.8,maxWidth:"380px",marginBottom:"2.5rem"}}>
            Spezialisierte Craniosacral Therapie für Säuglinge und Kleinkinder – sanft, fundiert, mit Herz. In der Praxis von Marion Sailer-Riegler, Mattersburg.
          </p>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
            <Btn dark onClick={()=>window.open("tel:+4365036319 69")}>Termin anfragen</Btn>
            <Btn outline dark onClick={()=>nav("cranio")}>Zur Cranio Therapie</Btn>
          </div>
        </div>
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184,114,74,0.25) 0%, transparent 70%)`}}/>
          <BreathingCircle size={380} dark/>
          <div style={{position:"absolute",bottom:"2.5rem",right:"2.5rem",fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:C.mossMid,letterSpacing:"0.1em",textAlign:"right",lineHeight:2}}>
            CST · TCM · Tuina · Aroma<br/>
            Säuglinge · Kleinkinder · Erwachsene<br/>
            J.N. Berger-Str. 19 · Mattersburg
          </div>
        </div>
      </section>
      <section style={{padding:"7rem 4rem",background:C.white,maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"6rem",alignItems:"center"}}>
          <Reveal>
            <Label n="01" text="Philosophie"/>
            <Heading>"Der erste Atem zählt."</Heading>
            <p style={{fontSize:"0.92rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Jedes Kind kommt mit einer Geschichte auf die Welt — dem Weg durch den Geburtskanal, dem ersten Atemzug, den ersten Stunden. Manche dieser Geschichten hinterlassen Spuren: Verspannungen, Unruhe, Schlafprobleme, Trinkschwierigkeiten.
            </p>
            <p style={{fontSize:"0.92rem",lineHeight:1.9,color:"#5A5040",marginBottom:"2rem"}}>
              <strong style={{color:C.clay}}>Wurzelkind</strong> steht für das Wissen, dass ein Kind, das sich in seinem Körper wohlfühlt, tiefer Wurzeln schlägt — sicherer bondet, besser schläft, freier wächst.
            </p>
            <Btn onClick={()=>nav("uebermich")}>Über Marion Sailer-Riegler</Btn>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
              {[
                {n:"27",unit:"Jahre",label:"Pflegeerfahrung als DGKP"},
                {n:"∞",unit:"Ruhe",label:"für dich und dein Kind"},
                {n:"5",unit:"Methoden",label:"CST · TCM · Tuina · G-Well · Aroma"},
                {n:"1",unit:"Mensch",label:"Persönliche Ein-Frau-Praxis"},
              ].map((s,i)=>(
                <div key={i} style={{padding:"2rem 1.5rem",border:`1px solid ${C.stone}`,background:i%2===0?C.cream:C.white}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",fontWeight:300,color:C.clay,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:C.moss,margin:"0.3rem 0 0.5rem"}}>{s.unit}</div>
                  <div style={{fontSize:"0.75rem",color:"#5A5040"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section style={{padding:"5rem 4rem 7rem",background:C.cream,maxWidth:"1400px",margin:"0 auto"}}>
        <Reveal>
          <Label n="02" text="Leistungen"/>
          <Heading>Was ich für dich und dein Kind tue.</Heading>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:0,border:`1px solid ${C.stone}`,marginTop:"3rem"}}>
          {[
            {icon:"◉",title:"Craniosakrale Energetik",desc:"Sanfte Arbeit am craniosakralen System – spezialisiert auf Neugeborene, Säuglinge und Kleinkinder. Hilft bei Koliken, Schlafproblemen, Stillschwierigkeiten und nach schwierigen Geburten.",id:"cranio"},
            {icon:"⊹",title:"TCM Ernährungsberatung",desc:"Traditionelle Chinesische Medizin für Babys, Kleinkinder und Mütter. Beikost-Einführung, saisonale Ernährung, Unterstützung bei Verdauungsproblemen.",id:"tcm"},
            {icon:"⌇",title:"Tuina & Kinder-Schröpfen",desc:"Sanfte Tuina-Massage und therapeutisches Schröpfen für Kinder und Erwachsene. Stärkt das Immunsystem, löst Blockaden, fördert den Energiefluss.",id:"tuina"},
            {icon:"⚡",title:"Schmerzbehandlung G-Well",desc:"Elektrisch-neurologische Schmerztherapie mit dem G-Well Pointer. Wirksam bei chronischen Schmerzen, Verspannungen und funktionellen Beschwerden.",id:"schmerz"},
            {icon:"✿",title:"Aromatherapie",desc:"Heilsame ätherische Öle für das gesamte Familiensystem. Unterstützend bei Stress, Schlafstörungen, Immunschwäche und emotionalen Belastungen.",id:"aroma"},
            {icon:"♥",title:"Lebens- & Sozialberatung",desc:"Elternbegleitung und systemische Beratung für junge Familien. Orientierung in intensiven Lebensphasen – ohne Bewertung, mit echtem Zuhören.",id:"uebermich"},
          ].map((s,i)=>(
            <div key={i} style={{borderRight:`1px solid ${C.stone}`,borderBottom:`1px solid ${C.stone}`}}>
              <ServiceCard {...s} delay={i*0.08} onClick={()=>nav(s.id)}/>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:"6rem 4rem",background:C.moss,color:C.cream}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <Label n="03" text="Wann kommen Familien zu mir" light/>
            <Heading light size="clamp(2rem,3.5vw,3.5rem)">Dein Kind zeigt, was es braucht.<br/><em style={{color:C.clay}}>Ich übersetze.</em></Heading>
            <p style={{color:C.stone,marginBottom:"2.5rem",fontSize:"0.9rem",lineHeight:1.8}}>Viele Eltern kommen zu mir, wenn sie nicht mehr weiterwissen. Wenn das Baby einfach nicht schläft, schreit, sich nicht satt trinkt. Du bist nicht allein damit.</p>
            <div style={{marginBottom:"3rem",lineHeight:2.5}}>
              {["Mein Baby schläft nicht","Dreimonatskoliken","Stillschwierigkeiten","Nach Kaiserschnitt","Nach Saugglocke / Zange","Schiefhals / Schiefer Kopf","Schreikindsyndrom","Schlechtes Trinken","Nach schwieriger Geburt","Entwicklungsverzögerung","Rückenschmerzen (Eltern)","Chronische Verspannungen"].map(s=><SympBadge key={s}>{s}</SympBadge>)}
            </div>
            <Btn dark onClick={()=>window.open("tel:+436503631969")}>Jetzt Termin anfragen</Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CranioPage({nav}) {
  useEffect(()=>{ document.title="Craniosakrale Energetik | Wurzelkind"; },[]);
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>Craniosakrale Energetik</Heading><p>Inhalte folgen...</p><Btn onClick={()=>nav("home")}>Zurück</Btn></section>;
}

function TCMPage() {
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>TCM Ernährung</Heading><p>Inhalte folgen...</p></section>;
}

function TuinaPage() {
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>Tuina & Schröpfen</Heading><p>Inhalte folgen...</p></section>;
}

function SchmerzPage() {
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>G-Well Pointer</Heading><p>Inhalte folgen...</p></section>;
}

function AromaPage() {
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>Aromatherapie</Heading><p>Inhalte folgen...</p></section>;
}

function UeberMichPage() {
  return <section style={{padding:"10rem 4rem",textAlign:"center"}}><Heading>Über mich</Heading><p>Inhalte folgen...</p></section>;
}

function Navbar({current, nav}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",h);
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(253,250,245,0.96)":"rgba(253,250,245,0.88)",backdropFilter:"blur(12px)",borderBottom:`1px solid rgba(184,114,74,${scrolled?0.2:0.1})`,transition:"all .3s"}}>
      <div style={{maxWidth:"1400px",margin:"0 auto",padding:"0 2rem",height:"68px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={()=>nav("home")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,fontWeight:500}}>
          WURZELKIND
        </button>
        <div style={{display:"flex",gap:"0.2rem",alignItems:"center"}}>
          {NAV.filter(n=>n.id!=="home").map(n=>(
            <button key={n.id} onClick={()=>nav(n.id)}
              style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.64rem",letterSpacing:"0.12em",textTransform:"uppercase",color:current===n.id?C.clay:C.moss,padding:"0.5rem 0.7rem",transition:"color .2s",fontFamily:"'DM Sans',sans-serif"}}>
              {n.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer({nav}) {
  return <footer style={{background:C.midnight,color:C.stone,padding:"4rem",textAlign:"center",fontSize:"0.7rem"}}>© 2025 Wurzelkind · Marion Sailer-Riegler</footer>;
}

export default function App() {
  const [page, setPage] = useState("home");
  useEffect(()=>{
    const style = document.createElement("style");
    style.textContent = GF + `*{margin:0;padding:0;box-sizing:border-box} body{background:${C.white};font-family:'DM Sans',sans-serif;}`;
    document.head.appendChild(style);
    return ()=>document.head.removeChild(style);
  },[]);

  const nav = (p) => {
    setPage(p);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const pages = {
    home: <HomePage nav={nav}/>,
    cranio: <CranioPage nav={nav}/>,
    tcm: <TCMPage/>,
    tuina: <TuinaPage/>,
    schmerz: <SchmerzPage/>,
    aroma: <AromaPage/>,
    uebermich: <UeberMichPage/>,
  };

  return (
    <div>
      <Navbar current={page} nav={nav}/>
      <main>{pages[page]||pages.home}</main>
      <Footer nav={nav}/>
    </div>
  );
}
