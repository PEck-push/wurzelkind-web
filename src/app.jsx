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

/* ---- BREATHING CIRCLE ---- */
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

/* ---- SERVICE CARD ---- */
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

/* ---- SYMPTOM BADGE ---- */
function SympBadge({children}) {
  return <span style={{display:"inline-block",border:`1px solid ${C.stone}`,borderRadius:"20px",padding:"0.4rem 1rem",fontSize:"0.78rem",color:C.moss,margin:"0.3rem",background:C.white}}>{children}</span>;
}

/* ======== PAGES ======== */

function HomePage({nav}) {
  useEffect(()=>{ document.title="WURZELKIND – Craniosacral Therapie Mattersburg | Marion Sailer-Riegler"; },[]);
  return (
    <>
      {/* HERO */}
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

      {/* BRAND STATEMENT */}
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

      {/* SERVICES */}
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

      {/* SYMPTOM NAVIGATOR */}
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

      {/* QUOTE */}
      <section style={{padding:"7rem 4rem",background:C.white,textAlign:"center"}}>
        <Reveal>
          <div style={{maxWidth:"700px",margin:"0 auto"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,2.5vw,2.8rem)",fontWeight:300,lineHeight:1.4,color:C.moss,fontStyle:"italic",marginBottom:"2rem"}}>
              "In jedem Körper steckt die Kraft zur Selbstheilung. Meine Aufgabe ist es, diesen Weg freizumachen."
            </div>
            <div style={{fontSize:"0.65rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay}}>Marion Sailer-Riegler · DGKP · Craniosacral Therapeutin · Mattersburg</div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT STRIP */}
      <section style={{background:C.midnight,padding:"4rem",display:"flex",flexWrap:"wrap",gap:"3rem",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:C.cream,marginBottom:"0.5rem"}}>Termin vereinbaren</div>
          <div style={{fontSize:"0.8rem",color:C.stone}}>Telefonisch oder per WhatsApp · Nach Vereinbarung</div>
        </div>
        <div style={{display:"flex",gap:"2rem",flexWrap:"wrap",alignItems:"center"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.78rem",color:C.dust,lineHeight:2}}>
            <div>+43 650 363 19 69</div>
            <div>marion@gsundheitswerkstatt.at</div>
            <div>J.N. Berger-Str. 19 · 7210 Mattersburg</div>
          </div>
          <Btn dark onClick={()=>window.open("tel:+436503631969")}>Anrufen</Btn>
        </div>
      </section>
    </>
  );
}

function CranioPage({nav}) {
  useEffect(()=>{ document.title="Craniosakrale Energetik für Babys & Neugeborene | Wurzelkind Mattersburg"; },[]);
  const worries = [
    {q:"Ist das wirklich sicher für mein Neugeborenes?",a:"Ja. Die Craniosacral Therapie arbeitet mit einem Druck von weniger als 5 Gramm – kaum mehr als das Gewicht einer Münze. Neugeborene reagieren besonders feinfühlig auf diese Berührungsqualität. In über 27 Jahren klinischer Erfahrung ist Marion Sailer-Riegler auf diese Zartheit spezialisiert."},
    {q:"Mein Kind ist erst 3 Wochen alt. Ist es schon zu früh?",a:"Nein – im Gegenteil. Je früher strukturelle Spannungen aus der Geburt gelöst werden, desto einfacher fällt der Start ins Leben. Viele Familien kommen bereits in der zweiten Lebenswoche. Der frühestmögliche Zeitpunkt ist das Bessere."},
    {q:"Was wenn mein Kind weint während der Behandlung?",a:"Weinen ist Kommunikation. Es ist kein Zeichen, dass etwas falsch läuft – oft ist es das Gegenteil: der Körper lässt etwas los. Ich behandle immer im Dialog mit dem Kind, folge seinen Signalen und pausiere wann immer nötig."},
    {q:"Mein Kinderarzt ist skeptisch. Was soll ich ihm sagen?",a:"Empfehlen Sie, diese Frage gemeinsam zu stellen. Die Craniosacral Therapie ist keine Alternativmedizin, die der Schulmedizin widerspricht – sie ergänzt sie. Viele Kinderärzte in der Region empfehlen aktiv zu uns."},
    {q:"Wie viele Sitzungen braucht mein Kind?",a:"Das ist individuell. Für akute Beschwerden nach der Geburt (Schiefhals, Stillprobleme, Koliken) zeigen sich oft schon nach 2–4 Sitzungen deutliche Verbesserungen. Ich kommuniziere ehrlich über Erwartungen – keine Versprechen, keine unnötigen Folgesitzungen."},
  ];

  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"6rem",alignItems:"center"}}>
          <div style={{position:"relative",zIndex:2}}>
            <Tag>Spezialisiert auf Neugeborene & Säuglinge</Tag>
            <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.8rem,5vw,5.5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
              Craniosakrale<br/><em style={{color:C.clay,fontStyle:"italic"}}>Energetik</em>
            </h1>
            <Lead light>Dein Kind zeigt, was es braucht. Ich übersetze.</Lead>
            <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,marginBottom:"2.5rem",maxWidth:"480px"}}>
              Spezialisierte Craniosacral Therapie für Säuglinge, Neugeborene und Kleinkinder – sanft, fundiert, mit Herz. Entwickelt aus 27 Jahren Erfahrung in der Kinder- und Säuglingspflege.
            </p>
            <div style={{display:"flex",gap:"1rem"}}>
              <Btn dark onClick={()=>window.open("tel:+436503631969")}>Termin anfragen</Btn>
              <Btn outline dark>↓ Mehr erfahren</Btn>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <BreathingCircle size={300} dark/>
          </div>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Was ist Craniosakrale Energetik"/>
            <Heading>Sanft wie ein Atemzug. Wirksam wie Stille.</Heading>
            <p style={{fontSize:"0.92rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Die Craniosakrale Therapie arbeitet mit dem natürlichen Rhythmus des Körpers – dem craniosakralen Rhythmus (CRI), dem feinen Pulsieren der Cerebrospinalflüssigkeit. Mit einem Berührungsdruck von weniger als fünf Gramm werden Restriktionen im Bindegewebe, in den Meningen und in der Faszienstruktur sanft gelöst.
            </p>
            <p style={{fontSize:"0.92rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Die Humanenergetik erweitert diesen Ansatz um die feinstoffliche Ebene: Sie berücksichtigt, wie emotionale Erlebnisse – auch pränatale, geburtsbedingte oder frühkindliche Erfahrungen – im Körpergewebe gespeichert werden und das Wohlbefinden beeinflussen.
            </p>
            <p style={{fontSize:"0.92rem",lineHeight:1.9,color:"#5A5040"}}>
              Für Säuglinge und Neugeborene ist dieser Ansatz besonders wertvoll: Ihr Nervensystem ist noch plastisch, ihre Strukturen flexibel. Früh behandelte Spannungen hinterlassen seltener bleibende Muster.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Wie funktioniert eine Sitzung"/>
            <Heading>Was erwartet dich bei uns</Heading>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem",marginTop:"1rem"}}>
              {[
                {step:"01",title:"Erstgespräch",desc:"Wir hören zuerst zu. Was beschäftigt dich, was zeigt dein Kind, was ist während der Schwangerschaft und Geburt passiert? Kein Formular, kein Zeitdruck."},
                {step:"02",title:"Behutsame Befundung",desc:"Marion ertastet den craniosakralen Rhythmus Ihres Kindes. Das Baby bleibt in Ihrer Nähe – auf dem Wickeltisch, in Ihren Armen, wie es sich wohl fühlt."},
                {step:"03",title:"Behandlung",desc:"Haarfeiner Druck, vollständige Aufmerksamkeit. Das Kind führt. Marion folgt. 45–60 Minuten, die sich wie Stille anfühlen."},
                {step:"04",title:"Nachgespräch",desc:"Was wurde gespürt, was soll die Familie zu Hause beobachten? Ehrliche Einschätzung, klare Empfehlung zu Folgesitzungen."},
              ].map(s=>(
                <div key={s.step} style={{display:"flex",gap:"1.5rem",padding:"1.2rem 0",borderBottom:`1px solid ${C.stone}`}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.clay,flexShrink:0,paddingTop:"0.2rem"}}>{s.step}</span>
                  <div>
                    <div style={{fontSize:"0.72rem",letterSpacing:"0.15em",textTransform:"uppercase",color:C.moss,fontWeight:500,marginBottom:"0.3rem"}}>{s.title}</div>
                    <p style={{fontSize:"0.82rem",color:"#5A5040",lineHeight:1.7,margin:0}}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDICATIONS */}
      <section style={{background:C.cream,padding:"6rem 4rem"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Für wen ist Craniosakrale Therapie"/>
            <Heading>Wann kommen Familien zu mir</Heading>
            <p style={{fontSize:"0.9rem",color:"#5A5040",lineHeight:1.8,maxWidth:"600px",marginBottom:"3rem"}}>
              Die häufigsten Gründe, warum Eltern aus dem Raum Mattersburg, Eisenstadt, Wiener Neustadt und Wien zu uns kommen:
            </p>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"0",border:`1px solid ${C.stone}`}}>
            {[
              {group:"Neugeborene & Säuglinge",items:["Nach Kaiserschnitt","Nach Saugglocke oder Zange","Schiefhals (Torticollis)","Asymmetrischer Kopf (Plagiocephalie)","Stillschwierigkeiten","Schlechtes Trinken","Dreimonatskoliken","Schreikindsyndrom","Schlafprobleme"]},
              {group:"Kleinkinder",items:["Entwicklungsverzögerungen","Sprachentwicklung","Koordinationsprobleme","Nach Stürzen oder Verletzungen","Zahnungsprobleme","Häufige Infekte","Verhaltensauffälligkeiten","Konzentrationsschwierigkeiten"]},
              {group:"Mütter & Erwachsene",items:["Nach der Geburt (Beckenboden, Rücken)","Erschöpfung & Burnout","Chronische Kopfschmerzen","Kiefergelenk-Beschwerden","Rückenschmerzen","Nackenverspannungen","Stress & innere Unruhe","Traumaverarbeitung"]},
            ].map((g,i)=>(
              <Reveal key={g.group} delay={i*0.15}>
                <div style={{padding:"2.5rem 2rem",borderRight:`1px solid ${C.stone}`}}>
                  <div style={{fontSize:"0.65rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1.5rem"}}>{g.group}</div>
                  <ul style={{listStyle:"none",padding:0,margin:0}}>
                    {g.items.map(it=>(
                      <li key={it} style={{fontSize:"0.85rem",color:"#5A5040",padding:"0.4rem 0",borderBottom:`1px solid ${C.stone}`,lineHeight:1.5}}>
                        <span style={{color:C.clay,marginRight:"0.5rem"}}>◉</span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEARS ADDRESSED */}
      <section style={{padding:"6rem 4rem",maxWidth:"900px",margin:"0 auto"}}>
        <Reveal>
          <Label n="04" text="Deine Fragen. Ehrliche Antworten."/>
          <Heading>Was Eltern wirklich wissen wollen.</Heading>
          <p style={{fontSize:"0.9rem",color:"#5A5040",lineHeight:1.8,marginBottom:"3rem"}}>Skepsis ist gesund. Hier sind die Fragen, die ich am häufigsten höre – beantwortet ohne Ausweichen.</p>
        </Reveal>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {worries.map((w,i)=>(
            <FaqItem key={i} q={w.q} a={w.a}/>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{background:C.moss,padding:"5rem 4rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Reveal>
            <Label n="05" text="Preise" light/>
            <Heading light>Transparente Honorare</Heading>
            <div style={{border:`1px solid rgba(224,213,196,0.2)`,marginTop:"2rem"}}>
              {[
                ["Erstbehandlung Säugling (60 min)","€ 75,–"],
                ["Folgebehandlung (45 min)","€ 60,–"],
                ["Erstbehandlung Kleinkind/Erwachsener","€ 80,–"],
                ["CST + Tuina kombiniert","€ 85,–"],
                ["TCM Ernährungsberatung (60 min)","€ 65,–"],
                ["Aromatherapie-Beratung & Behandlung","€ 55,–"],
              ].map(([l,p],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.2rem 2rem",borderBottom:"1px solid rgba(224,213,196,0.2)",background:i%2===0?"rgba(255,255,255,0.03)":"transparent"}}>
                  <span style={{fontSize:"0.88rem",color:C.stone}}>{l}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.85rem",color:C.clay}}>{p}</span>
                </div>
              ))}
            </div>
            <p style={{fontSize:"0.75rem",color:C.mossMid,marginTop:"1.5rem",lineHeight:1.7}}>Barzahlung oder Rechnung. Krankenkassen übernehmen die Kosten derzeit nicht. Auf Wunsch erhalten Sie eine detaillierte Honorarnote für private Zusatzversicherungen.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FaqItem({q,a}) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{borderBottom:`1px solid ${C.stone}`}}>
      <div onClick={()=>setOpen(!open)} style={{cursor:"pointer",padding:"1.5rem 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",color:C.moss,paddingRight:"2rem"}}>{q}</span>
        <span style={{color:C.clay,fontSize:"1.2rem",flexShrink:0}}>{open?"−":"+"}</span>
      </div>
      {open && <div style={{paddingBottom:"1.5rem",fontSize:"0.87rem",color:"#5A5040",lineHeight:1.8,paddingRight:"2rem"}}>{a}</div>}
    </div>
  );
}

function TCMPage() {
  useEffect(()=>{ document.title="TCM Ernährungsberatung für Babys & Kinder | Wurzelkind Mattersburg"; },[]);
  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Tag>Traditionelle Chinesische Medizin</Tag>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
            TCM<br/><em style={{color:C.clay}}>Ernährungsberatung</em>
          </h1>
          <Lead light>Essen ist Medizin — wenn man weiß, wie man es nutzt.</Lead>
          <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,maxWidth:"560px"}}>
            Die TCM betrachtet Ernährung nicht als Kalorien-Tabelle, sondern als Energiesystem. Jedes Lebensmittel hat eine Wirkung auf das Qi, das Blut und die Organe. Besonders für Babies im Beikost-Alter und Kleinkinder bietet die chinesische Ernährungslehre ein tiefes Orientierungssystem.
          </p>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Das Grundprinzip"/>
            <Heading>Wärme, Qi und der Bauch deines Kindes</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              In der Traditionellen Chinesischen Medizin gilt die Milz als das "Zentrum der Verdauung". Sie braucht Wärme, um Nahrung in Qi und Blut umzuwandeln. Zu viel Rohkost, zu viel Zucker oder kalte Getränke schwächen das Milz-Qi – ein häufiger Grund für Verdauungsbeschwerden, Erschöpfung und häufige Infekte bei Kindern.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Die Beratung bei Marion Sailer-Riegler kombiniert dieses jahrtausendealte Wissen mit modernem Ernährungswissen und dem konkreten Alltag österreichischer Familien. Kein Dogma. Kein Verbotskatalog. Praktische Orientierung.
            </p>
            <CriticalNote><strong>Wann ist TCM-Ernährungsberatung sinnvoll?</strong> Wenn Ihr Kind häufig krank ist, schlechten Appetit hat, unter Verdauungsproblemen leidet oder wenn Sie als Mutter nach der Geburt erschöpft sind und Ihre Reserven wieder aufbauen möchten.</CriticalNote>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Beratungsinhalte"/>
            <Heading>Was wir besprechen</Heading>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {[
                {title:"Beikost nach TCM",desc:"Wann, was und wie – orientiert an den Jahreszeiten, dem Verdauungstyp des Kindes und dem familiären Alltag."},
                {title:"Ernährung der stillenden Mutter",desc:"Was stärkt die Milchproduktion, was hilft beim Wochenbett, welche Lebensmittel unterstützen die Erholung nach der Geburt."},
                {title:"Saisonale Ernährung für Kleinkinder",desc:"Frühling, Sommer, Herbst, Winter – jede Jahreszeit fordert andere Ernährungsschwerpunkte. Praktische Rezeptideen inklusive."},
                {title:"Verdauungsprobleme & Blähungen",desc:"Qi-stärkende Lebensmittel, wärmende Gewürze, sanfte Verdauungsunterstützung ohne Medikamente."},
                {title:"Immunsystem stärken",desc:"Das TCM-Konzept von Wei-Qi (Abwehr-Qi) und wie gezielte Ernährung die kindliche Infektanfälligkeit reduzieren kann."},
              ].map((item,i)=>(
                <div key={i} style={{padding:"1.2rem 0",borderBottom:`1px solid ${C.stone}`}}>
                  <div style={{fontSize:"0.72rem",letterSpacing:"0.15em",textTransform:"uppercase",color:C.clay,marginBottom:"0.3rem"}}>{item.title}</div>
                  <p style={{fontSize:"0.82rem",color:"#5A5040",margin:0,lineHeight:1.7}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{background:C.cream,padding:"5rem 4rem"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Ergänzende Beratung"/>
            <Heading>Lebens- & Sozialberatung für Eltern</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.5rem"}}>
              Als ausgebildete Lebens- und Sozialberaterin bietet Marion Sailer-Riegler mehr als Ernährungswissen: Sie begleitet junge Familien in herausfordernden Lebensphasen. Erziehungsfragen, Paarkonflikte rund ums Kind, Übergang zur Elternschaft, postnatale Erschöpfung – Gespräche auf Augenhöhe, ohne Bewertung.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040"}}>
              Diese Elternbegleitung ergänzt die körperorientierte Arbeit. Denn ein erschöpftes Elternteil braucht genauso Unterstützung wie ein unruhiges Kind.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TuinaPage() {
  useEffect(()=>{ document.title="Tuina Massage & Schröpfen für Kinder | Wurzelkind Mattersburg"; },[]);
  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Tag>Traditionelle chinesische Körpertherapie</Tag>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
            Tuina &<br/><em style={{color:C.clay}}>Kinder-Schröpfen</em>
          </h1>
          <Lead light>Jahrtausende alte Weisheit. Angepasst für zarte Körper.</Lead>
          <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,maxWidth:"560px"}}>
            Tuina ist die klassische chinesische Massagemedizin – gezielt, energetisch wirksam und für Kinder besonders sanft adaptiert. Schröpfen (Bá Guàn) ergänzt diese Arbeit durch das Lösen tiefer Blockaden in Faszien und Meridiankanälen.
          </p>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Tuina – Die Massage der TCM"/>
            <Heading>Wenn Berühren heilt</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Tuina (sprich: "Tui-Na") bedeutet wörtlich "Drücken und Greifen". Es ist eine vollständige medizinische Massage-Tradition der Traditionellen Chinesischen Medizin, die gezielt auf Akupressurpunkte und Meridiane einwirkt, ohne Nadeln.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Für Kinder ist Tuina besonders geeignet, da es non-invasiv, vollständig schmerzfrei und spielerisch in die Behandlung integrierbar ist. Eltern werden oft eingeladen, einfache Griffe zu erlernen, die sie zu Hause täglich anwenden können.
            </p>
            <div style={{marginTop:"2rem"}}>
              <div style={{fontSize:"0.65rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1rem"}}>Tuina hilft bei</div>
              <div style={{lineHeight:2.2}}>
                {["Koliken & Bauchschmerzen","Verstopfung","Häufige Erkältungen","Schlafstörungen","Hyperaktivität","Zahnen","Entwicklungsförderung","Immunstärkung"].map(s=><SympBadge key={s}>{s}</SympBadge>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Schröpfen – Bá Guàn"/>
            <Heading>Tiefe Entlastung durch Vakuum</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Beim therapeutischen Schröpfen werden kleine Gläser oder Silikonschröpfköpfe auf die Haut gesetzt, die durch einen leichten Unterdruck Muskelschichten, Faszien und das Lymphsystem aktivieren. Anders als das "Blutschröpfen" in der Volksmedizin wird bei uns ausschließlich das sanfte Trocken-Schröpfen angewendet.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.5rem"}}>
              Bei Kindern werden speziell kleine, weiche Silikonköpfe verwendet – der Unterdruck ist deutlich geringer als bei Erwachsenen. Die Methode ist sicher, gut verträglich und hinterlässt typischerweise nur eine leichte, vorübergehende Rötung.
            </p>
            <div>
              <div style={{fontSize:"0.65rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1rem"}}>Schröpfen hilft bei</div>
              <div style={{lineHeight:2.2}}>
                {["Rückenverspannungen","Chronische Bronchitis","Erkältungsanfälligkeit","Schulter/Nacken","Muskelschmerzen","Faszienblockaden","Lymphstau"].map(s=><SympBadge key={s}>{s}</SympBadge>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{background:C.cream,padding:"5rem 4rem"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Wichtiger Hinweis"/>
            <Heading>Wann nicht behandelt wird</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.5rem"}}>
              Tuina und Schröpfen sind kontraindiziert bei akuten Entzündungen, offenen Wunden, Hauterkrankungen im Behandlungsgebiet, Fieber und bei bekannten Blutungserkrankungen. Marion Sailer-Riegler erhebt immer eine vollständige Anamnese vor der Behandlung.
            </p>
            <CriticalNote><strong>Ärztliche Diagnose zuerst.</strong> Tuina und Schröpfen ergänzen die medizinische Behandlung – sie ersetzen sie nicht. Bei unklaren Symptomen empfehlen wir ausdrücklich, zuerst einen Kinderarzt aufzusuchen.</CriticalNote>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SchmerzPage() {
  useEffect(()=>{ document.title="Schmerzbehandlung G-Well Pointer | Wurzelkind Mattersburg"; },[]);
  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Tag>Elektrisch-neurologische Schmerztherapie</Tag>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
            Schmerzbehandlung<br/><em style={{color:C.clay}}>G-Well Pointer</em>
          </h1>
          <Lead light>Chronische Schmerzen ohne Nadeln, ohne Medikamente.</Lead>
          <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,maxWidth:"560px"}}>
            Der G-Well Pointer ist ein hochpräzises elektrisch-neurologisches Therapiegerät, das auf Akupunkturpunkte und Nervenbahnen einwirkt – ohne Nadeln, ohne Schmerz, ohne Nebenwirkungen.
          </p>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Was ist der G-Well Pointer"/>
            <Heading>Elektrische Akupunktur ohne Nadeln</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Der G-Well Pointer findet automatisch relevante Akupunkturpunkte und Trigger Points und behandelt sie mit einem präzisen elektrischen Mikrostromimpuls. Das Gerät lokalisiert den Punkt durch eine Veränderung des Hautwiderstandsmesswertes – und behandelt ihn exakt dort, wo die Energie blockiert ist.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Die Behandlung fühlt sich als leichtes Kribbeln oder kurzer Impuls an – für die meisten Patienten gut verträglich. Die Kombination aus Punktsuche und -behandlung in einem Gerät macht die Methode besonders effizient.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040"}}>
              Marion Sailer-Riegler setzt den G-Well Pointer ergänzend zur Craniosacral Therapie und zu Tuina ein, um hartnäckige Schmerzpunkte und neuronale Blockaden gezielt anzugehen.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Indikationen"/>
            <Heading>Bei welchen Beschwerden hilft G-Well</Heading>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginTop:"1rem"}}>
              {[
                "Chronische Rückenschmerzen","Nackenverspannungen","Schulter-Arm-Syndrom","Tennisellbogen","Knieschmerzen","Kopfschmerzen/Migräne","Ischias-Beschwerden","Gelenkschmerzen","Trigeminusneuralgie","Wirbelblockaden","Narbenbehandlung","Funktionelle Beschwerden"
              ].map(s=>(
                <div key={s} style={{padding:"0.8rem 1rem",border:`1px solid ${C.stone}`,fontSize:"0.8rem",color:"#5A5040",background:C.cream}}>
                  <span style={{color:C.clay,marginRight:"0.5rem"}}>◉</span>{s}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{background:C.cream,padding:"5rem 4rem"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Behandlungsablauf"/>
            <Heading>Eine G-Well Sitzung im Überblick</Heading>
            {[
              {n:"01",title:"Schmerzanamnese",desc:"Wo, wann, wie stark – und was hat bislang schon geholfen oder nicht geholfen? Eine vollständige Schmerzgeschichte ist Grundlage jeder Behandlung."},
              {n:"02",title:"Punktortung",desc:"Das Gerät scannt systematisch das Behandlungsgebiet und lokalisiert erhöhte Leitfähigkeitspunkte – die Hinweise auf energetische Blockaden oder neuronale Irritationen."},
              {n:"03",title:"Elektrische Stimulation",desc:"Jeder Punkt wird für 10–30 Sekunden behandelt. Der Impuls ist kurz, präzise und in der Intensität anpassbar. Die meisten Patienten beschreiben die Behandlung als angenehm entspannend."},
              {n:"04",title:"Nachkontrolle",desc:"Vergleich der Ausgangssituation mit dem Befund nach der Behandlung. Empfehlung für Folgebehandlungen, Eigenübungen und ergänzende Maßnahmen."},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:"1.5rem",padding:"1.5rem 0",borderBottom:`1px solid ${C.stone}`}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"0.65rem",color:C.clay,flexShrink:0,paddingTop:"0.2rem"}}>{s.n}</span>
                <div>
                  <div style={{fontSize:"0.72rem",letterSpacing:"0.15em",textTransform:"uppercase",color:C.moss,fontWeight:500,marginBottom:"0.4rem"}}>{s.title}</div>
                  <p style={{fontSize:"0.85rem",color:"#5A5040",margin:0,lineHeight:1.7}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function AromaPage() {
  useEffect(()=>{ document.title="Aromatherapie für Familien & Babys | Wurzelkind Mattersburg"; },[]);
  const oils = [
    {name:"Lavendel",lat:"Lavandula angustifolia",anw:"Schlaf, Beruhigung, Wunden",kind:"✓ ab 3. Monat"},
    {name:"Kamille blau",lat:"Matricaria recutita",anw:"Entzündungen, Zahnen, Haut",kind:"✓ ab 3. Monat"},
    {name:"Mandarine",lat:"Citrus reticulata",anw:"Stimmungsaufhellung, Verdauung",kind:"✓ ab 3. Monat"},
    {name:"Frankincense",lat:"Boswellia sacra",anw:"Atemwege, Immunsystem, Tiefe",kind:"✓ ab 6. Monat"},
    {name:"Eukalyptus",lat:"Eucalyptus radiata",anw:"Erkältung, Atemwege",kind:"⚠ erst ab 3 Jahren"},
    {name:"Rose",lat:"Rosa damascena",anw:"Emotionale Balance, Mama-Pflege",kind:"✓ für Mütter"},
  ];
  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Tag>Heilsame Pflanzendüfte für die ganze Familie</Tag>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
            Aroma&shy;<em style={{color:C.clay}}>therapie</em>
          </h1>
          <Lead light>Was der Körper riecht, fühlt er.</Lead>
          <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,maxWidth:"560px"}}>
            Ätherische Öle wirken nicht nur über den Geruchssinn – sie interagieren direkt mit dem limbischen System, dem Zentrum für Emotionen und Gedächtnis, und über die Haut mit dem Organismus. In der Arbeit mit Babys und jungen Familien sind sie ein sanftes, hochwirksames Werkzeug.
          </p>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Was ist Aromatherapie"/>
            <Heading>Mehr als nur Duft</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Therapeutische Aromatherapie unterscheidet sich grundlegend von Raumbeduftung oder Wellness-Düften. Es werden hochwertige, reine ätherische Öle in therapeutischen Konzentrationen eingesetzt – verdünnt in Trägerölen, als Inhalation, in Massagen oder als Kompressen.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Für Babys und Kleinkinder ist besondere Vorsicht bei Auswahl und Verdünnung geboten. Marion Sailer-Riegler verfügt über eine fundierte Ausbildung in therapeutischer Aromatherapie und kennt die spezifischen Sicherheitsgrenzen für jede Altersgruppe.
            </p>
            <CriticalNote><strong>Nicht alle Öle sind für Babys geeignet.</strong> Eukalyptus, Pfefferminze und viele andere verbreitete Öle sind für Kinder unter 3 Jahren kontraindiziert. Bitte nie ohne Fachberatung anwenden.</CriticalNote>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Anwendungsbereiche"/>
            <Heading>Wann Aromatherapie hilft</Heading>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {[
                {t:"Schlafprobleme",d:"Sanfte Einschlaf-Routinen mit bewährten Ölen für die ganze Familie."},
                {t:"Erkältungsinfekte",d:"Atemwegsunterstützung durch Inhalation und Einreibung – kindgerecht und wirksam."},
                {t:"Emotionale Balance der Mutter",d:"Postpartale Erschöpfung, Stimmungsschwankungen, Stress – Öle als stärkendes Ritual."},
                {t:"Hautpflege & Wundbehandlung",d:"Heilende Wirkung auf Wundheilung, Narben, gereizte Babyhaut."},
                {t:"Zahnen & Verdauungsbeschwerden",d:"Sanfte Bauchmassage mit verdünnten Ölen nach TCM-Punkten."},
              ].map((s,i)=>(
                <div key={i} style={{padding:"1rem 0",borderBottom:`1px solid ${C.stone}`}}>
                  <div style={{fontSize:"0.72rem",letterSpacing:"0.15em",textTransform:"uppercase",color:C.clay,marginBottom:"0.3rem"}}>{s.t}</div>
                  <p style={{fontSize:"0.82rem",color:"#5A5040",margin:0,lineHeight:1.7}}>{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{background:C.cream,padding:"5rem 4rem"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Ausgewählte Öle & Sicherheitsinfo"/>
            <Heading>Welche Öle für welches Alter</Heading>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"0",border:`1px solid ${C.stone}`,marginTop:"2rem"}}>
            {oils.map((o,i)=>(
              <Reveal key={i} delay={i*0.08}>
                <div style={{padding:"2rem 1.5rem",borderRight:`1px solid ${C.stone}`,borderBottom:`1px solid ${C.stone}`}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",color:C.moss,marginBottom:"0.3rem"}}>{o.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.6rem",color:C.clay,marginBottom:"0.8rem",fontStyle:"italic"}}>{o.lat}</div>
                  <p style={{fontSize:"0.8rem",color:"#5A5040",margin:"0 0 0.8rem",lineHeight:1.6}}>{o.anw}</p>
                  <div style={{fontSize:"0.65rem",letterSpacing:"0.1em",color:o.kind.includes("⚠")?C.clayDeep:C.mossMid,padding:"0.3rem 0"}}>{o.kind}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function UeberMichPage() {
  useEffect(()=>{ document.title="Über Marion Sailer-Riegler – DGKP & Craniosacral Therapeutin Mattersburg"; },[]);
  return (
    <>
      <section style={{background:C.moss,padding:"9rem 4rem 6rem"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Tag>DGKP · Craniosacral Therapeutin · Humanenergetikerin</Tag>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,4.5vw,5rem)",fontWeight:300,lineHeight:1.05,color:C.cream,marginBottom:"1.5rem"}}>
            Marion<br/><em style={{color:C.clay}}>Sailer-Riegler</em>
          </h1>
          <Lead light>"In jedem Körper steckt die Kraft zur Selbstheilung."</Lead>
          <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.8,maxWidth:"560px"}}>
            Diplomierte Gesundheits- und Krankenpflegerin mit 27 Jahren Berufserfahrung. Ehemalige Leiterin der Kinderabteilung am Krankenhaus Eisenstadt. Heute in eigener Praxis in Mattersburg.
          </p>
        </div>
      </section>

      <section style={{padding:"6rem 4rem",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem"}}>
          <Reveal>
            <Label n="01" text="Mein Weg"/>
            <Heading>27 Jahre an der Seite von Kindern und Familien.</Heading>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              Marion Sailer-Riegler ist Diplomierte Gesundheits- und Krankenpflegerin (DGKP) – ausgebildet, erfahren, mit über 27 Jahren Berufspraxis in vielen klinischen Bereichen. Bevor sie ihre eigene Praxis eröffnete, leitete sie die Kinderabteilung des Krankenhauses Eisenstadt.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040",marginBottom:"1.2rem"}}>
              In dieser Zeit hat sie Tausende von Kindern begleitet, Krisen erlebt, Familien in den schwierigsten Momenten ihres Lebens gestützt. Und verstanden: Die Schulmedizin kann vieles – aber nicht alles. Es gibt Lücken, in die ein ganzheitlicher Blick gehört.
            </p>
            <p style={{fontSize:"0.9rem",lineHeight:1.9,color:"#5A5040"}}>
              Deshalb die Ausbildungen in Craniosacral Therapie, TCM, Tuina, Aromatherapie, Humanenergetik und Lebens- und Sozialberatung. Nicht als Abkehr von der Medizin – sondern als Erweiterung dessen, was möglich ist.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Label n="02" text="Ausbildung & Qualifikationen"/>
            <Heading>Fundiert. Zertifiziert. Erfahren.</Heading>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {[
                {title:"DGKP",sub:"Diplomierte Gesundheits- und Krankenpflegerin · 27 Jahre klinische Erfahrung"},
                {title:"Leiterin Kinderabteilung",sub:"Krankenhaus Eisenstadt · Langjährige Führungserfahrung in der Pädiatrie"},
                {title:"Craniosacral Therapeutin",sub:"Spezialisiert auf Neugeborene, Säuglinge & Kleinkinder nach internationalem Standard (Upledger-Methode)"},
                {title:"Humanenergetikerin",sub:"Feinstoffliche Körperarbeit, Energiefeld-Behandlung, Traumaintegration"},
                {title:"TCM & Ernährungsberatung",sub:"Traditionelle Chinesische Medizin, Beikostberatung, saisonale Ernährung nach TCM"},
                {title:"Tuina & Kinder-Tuina",sub:"Chinesische Massagemedizin für alle Altersgruppen, speziell Kinder"},
                {title:"Lebens- & Sozialberaterin",sub:"Systemische Elternbegleitung, Paarberatung im Übergang zur Elternschaft"},
                {title:"Aromatherapeutin",sub:"Therapeutische Aromatherapie für Babys, Kinder und Erwachsene"},
              ].map((q,i)=>(
                <div key={i} style={{padding:"1.2rem 0",borderBottom:`1px solid ${C.stone}`,display:"flex",gap:"1rem"}}>
                  <span style={{color:C.clay,flexShrink:0,paddingTop:"0.1rem"}}>◉</span>
                  <div>
                    <div style={{fontSize:"0.78rem",fontWeight:500,color:C.moss,letterSpacing:"0.05em",marginBottom:"0.2rem"}}>{q.title}</div>
                    <div style={{fontSize:"0.78rem",color:"#5A5040",lineHeight:1.6}}>{q.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ARCHETYPE / PHILOSOPHY */}
      <section style={{background:C.moss,padding:"6rem 4rem"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <Label n="03" text="Meine Haltung" light/>
            <Heading light>Weder Wunderheilerin noch Besserwisserin.</Heading>
            <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.9,marginBottom:"1.5rem"}}>
              Ich nehme keine Rolle ein, die ich nicht erfüllen kann. Craniosacral Therapie ist keine Medizin. Sie heilt keine Diagnosen. Sie unterstützt die Selbstheilungskräfte des Körpers – das ist etwas anderes, aber es ist nicht weniger.
            </p>
            <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.9,marginBottom:"1.5rem"}}>
              Ich spreche beide Sprachen: die der erschöpften Mutter um 3 Uhr nachts und die des skeptischen Kinderarztes, der eine Überweisung ausstellt. Ich bin keine Heilerin. Ich bin eine Übersetzerin: zwischen dem, was das Baby zeigt, und dem, was die Eltern verstehen müssen.
            </p>
            <p style={{color:C.stone,fontSize:"0.9rem",lineHeight:1.9}}>
              Und ich sage ehrlich, wenn ich nicht helfen kann. Das ist kein Zeichen von Schwäche – das ist Respekt vor Ihnen und Ihrem Kind.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{padding:"6rem 4rem",background:C.white}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <Label n="04" text="Kontakt & Anfahrt"/>
            <Heading>Praxis Wurzelkind in Mattersburg</Heading>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",marginTop:"2rem"}}>
            <Reveal>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.82rem",lineHeight:2.5,color:C.ink}}>
                <div style={{fontWeight:400}}>Marion Sailer-Riegler</div>
                <div>J.N. Berger-Str. 19</div>
                <div>7210 Mattersburg, Burgenland</div>
                <div style={{marginTop:"0.5rem"}}>+43 650 363 19 69</div>
                <div>marion@gsundheitswerkstatt.at</div>
                <div style={{marginTop:"0.5rem",fontSize:"0.72rem",color:C.clay}}>Termine nach telefonischer<br/>oder WhatsApp Anfrage</div>
              </div>
              <div style={{marginTop:"2rem",display:"flex",gap:"1rem"}}>
                <Btn onClick={()=>window.open("tel:+436503631969")}>Anrufen</Btn>
                <Btn outline onClick={()=>window.open("https://wa.me/436503631969")}>WhatsApp</Btn>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{background:C.moss,padding:"2.5rem",color:C.cream}}>
                <div style={{fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.dust,marginBottom:"1rem"}}>Öffnungszeiten</div>
                {[
                  ["Montag – Freitag","nach Vereinbarung"],
                  ["Samstag","nach Vereinbarung"],
                  ["Sonntag","geschlossen"],
                ].map(([d,z])=>(
                  <div key={d} style={{display:"flex",justifyContent:"space-between",padding:"0.7rem 0",borderBottom:"1px solid rgba(224,213,196,0.2)",fontSize:"0.82rem"}}>
                    <span style={{color:C.stone}}>{d}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",color:C.dust,fontSize:"0.75rem"}}>{z}</span>
                  </div>
                ))}
                <p style={{fontSize:"0.72rem",color:C.mossMid,marginTop:"1.5rem",lineHeight:1.7}}>Kostenloser Kundenparkplatz vor der Praxis. Die Praxis ist barrierefrei zugänglich.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ======== NAVBAR ======== */
function Navbar({current, nav}) {
  const [open, setOpen] = useState(false);
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
            <button key={n.id} onClick={()=>{nav(n.id);setOpen(false);}}
              style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.64rem",letterSpacing:"0.12em",textTransform:"uppercase",color:current===n.id?C.clay:C.moss,padding:"0.5rem 0.7rem",transition:"color .2s",borderBottom:current===n.id?`2px solid ${C.clay}`:"2px solid transparent",fontFamily:"'DM Sans',sans-serif"}}>
              {n.id==="uebermich"?"Über mich":n.id==="cranio"?"Cranio":n.id==="schmerz"?"G-Well":n.label.split(" ")[0]}
            </button>
          ))}
          <button onClick={()=>window.open("tel:+436503631969")}
            style={{background:C.clay,color:C.white,border:"none",cursor:"pointer",fontSize:"0.62rem",letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.6rem 1.2rem",marginLeft:"0.8rem",fontFamily:"'DM Sans',sans-serif"}}>
            Termin
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ======== FOOTER ======== */
function Footer({nav}) {
  return (
    <footer style={{background:C.midnight,color:C.stone,padding:"5rem 4rem 3rem"}}>
      <div style={{maxWidth:"1400px",margin:"0 auto",display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:"4rem"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",color:C.cream,marginBottom:"1rem",letterSpacing:"0.15em"}}>WURZEL<span style={{color:C.clay}}>KIND</span></div>
          <p style={{fontSize:"0.8rem",lineHeight:1.8,color:C.stone}}>Spezialisierte Craniosacral Therapie für Säuglinge und Kleinkinder. TCM · Tuina · G-Well · Aromatherapie. Mattersburg, Burgenland.</p>
          <div style={{marginTop:"1.5rem",fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",lineHeight:2,color:C.dust}}>
            <div>+43 650 363 19 69</div>
            <div>marion@gsundheitswerkstatt.at</div>
            <div>J.N. Berger-Str. 19 · 7210 Mattersburg</div>
          </div>
        </div>
        <div>
          <div style={{fontSize:"0.6rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1.5rem"}}>Leistungen</div>
          {[["cranio","Craniosakrale Energetik"],["tcm","TCM Ernährung"],["tuina","Tuina & Schröpfen"],["schmerz","G-Well Pointer"],["aroma","Aromatherapie"]].map(([id,label])=>(
            <button key={id} onClick={()=>nav(id)} style={{display:"block",background:"none",border:"none",cursor:"pointer",fontSize:"0.78rem",color:C.stone,padding:"0.3rem 0",fontFamily:"'DM Sans',sans-serif",textAlign:"left",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color=C.clay} onMouseLeave={e=>e.target.style.color=C.stone}>{label}</button>
          ))}
        </div>
        <div>
          <div style={{fontSize:"0.6rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1.5rem"}}>Für wen</div>
          {["Neugeborene & Säuglinge","Kleinkinder","Mütter nach der Geburt","Familien mit Kindern","Erwachsene mit Schmerzen"].map(s=>(
            <div key={s} style={{fontSize:"0.78rem",color:C.stone,padding:"0.3rem 0"}}>{s}</div>
          ))}
        </div>
        <div>
          <div style={{fontSize:"0.6rem",letterSpacing:"0.25em",textTransform:"uppercase",color:C.clay,marginBottom:"1.5rem"}}>Einzugsgebiet</div>
          {["Mattersburg","Eisenstadt","Wiener Neustadt","Sopron (Ungarn)","Südburgenland","Niederösterreich"].map(s=>(
            <div key={s} style={{fontSize:"0.78rem",color:C.stone,padding:"0.3rem 0"}}>{s}</div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:"1400px",margin:"3rem auto 0",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",fontSize:"0.62rem",color:"#555",letterSpacing:"0.1em",flexWrap:"wrap",gap:"1rem"}}>
        <span>© 2025 Wurzelkind · Marion Sailer-Riegler · 7210 Mattersburg</span>
        <span>Craniosacral Therapie · TCM · Tuina · Aromatherapie · Mattersburg · Burgenland · Österreich</span>
      </div>
    </footer>
  );
}

/* ======== APP ROOT ======== */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(()=>{
    // Inject fonts & global styles
    const style = document.createElement("style");
    style.textContent = GF + `
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:${C.white};color:${C.ink};font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.7;overflow-x:hidden}
      button{font-family:'DM Sans',sans-serif}
      p{font-size:0.92rem;line-height:1.8}
    `;
    document.head.appendChild(style);

    // Schema.org LocalBusiness JSON-LD
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context":"https://schema.org",
      "@type":"MedicalBusiness",
      "name":"Wurzelkind – Craniosacral Therapie Mattersburg",
      "description":"Spezialisierte Craniosacral Therapie für Säuglinge, Neugeborene und Kleinkinder. TCM Ernährungsberatung, Tuina, G-Well Pointer, Aromatherapie in Mattersburg, Burgenland.",
      "url":"https://wurzelkind.at",
      "telephone":"+436503631969",
      "email":"marion@gsundheitswerkstatt.at",
      "address":{"@type":"PostalAddress","streetAddress":"Johann Nepomuk Berger-Straße 19","addressLocality":"Mattersburg","postalCode":"7210","addressRegion":"Burgenland","addressCountry":"AT"},
      "geo":{"@type":"GeoCoordinates","latitude":47.7333,"longitude":16.3978},
      "openingHours":"Mo-Sa by appointment",
      "medicalSpecialty":"CraniosacralTherapy",
      "employee":{"@type":"Person","name":"Marion Sailer-Riegler","jobTitle":"DGKP · Craniosacral Therapeutin · Humanenergetikerin"}
    });
    document.head.appendChild(schema);

    return ()=>{ document.head.removeChild(style); document.head.removeChild(schema); };
  },[]);

  const nav = (p) => {
    setPage(p);
    setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),50);
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
    <div style={{minHeight:"100vh",fontFamily:"'DM Sans',sans-serif"}}>
      <Navbar current={page} nav={nav}/>
      <main>{pages[page]||pages.home}</main>
      <Footer nav={nav}/>
    </div>
  );
}
