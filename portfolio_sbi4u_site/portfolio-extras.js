(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const page = location.pathname.split('/').pop() || 'index.html';
  const unitInfo = {
    'biochimie.html': {title:'La cellule en exploration',intro:'Choisis un concept pour découvrir comment les molécules contribuent au fonctionnement cellulaire.',items:[['Membrane cellulaire','La membrane forme une barrière sélective. Sa bicouche de phospholipides et ses protéines contribuent aux échanges entre la cellule et son environnement.'],['Enzymes','Les enzymes sont des catalyseurs biologiques : elles accélèrent certaines réactions en abaissant l’énergie d’activation.'],['Protéines','Les protéines sont formées d’acides aminés et leur structure influence leurs fonctions.'],['Glucides','Les glucides peuvent fournir de l’énergie et participer à certaines structures biologiques.'],['Lipides','Les lipides comprennent notamment les phospholipides des membranes et les molécules de réserve énergétique.'],['Acides nucléiques','L’ADN et l’ARN sont des acides nucléiques constitués de nucléotides.']]},
    'metabolisme.html': {title:'Le laboratoire de l’énergie',intro:'Modifie les paramètres et observe un modèle pédagogique simplifié de la production d’ATP.',items:[['Photosynthèse','La photosynthèse convertit l’énergie lumineuse en énergie chimique stockée dans des molécules organiques.'],['Respiration cellulaire','La respiration cellulaire transfère l’énergie des molécules organiques vers l’ATP.'],['ATP','L’ATP est une molécule qui permet de transférer de l’énergie utilisable dans la cellule.'],['Glycolyse','La glycolyse dégrade le glucose en pyruvate et produit une petite quantité d’ATP.'],['Cycle de Krebs','Le cycle de Krebs contribue à produire des transporteurs d’électrons lors de la respiration aérobie.'],['Chaîne de transport','La chaîne de transport d’électrons contribue à établir un gradient utilisé pour produire de l’ATP.']]},
    'genetique.html': {title:'Le code de la vie',intro:'Explore les étapes qui permettent à l’information génétique d’être utilisée par la cellule.',items:[['ADN','L’ADN contient l’information génétique sous forme d’une séquence de nucléotides.'],['Réplication','La réplication produit une copie de l’ADN avant la division cellulaire.'],['Transcription','La transcription utilise un brin d’ADN comme modèle pour produire un ARN.'],['ARN messager','L’ARN messager transporte une copie de l’information vers les ribosomes.'],['Traduction','La traduction permet aux ribosomes d’assembler des acides aminés selon les codons de l’ARNm.'],['Mutation','Une mutation est un changement dans la séquence de nucléotides; ses effets dépendent de son emplacement et de son type.']]},
    'homeostasie.html': {title:'Le laboratoire de l’équilibre',intro:'Ajuste une variable et observe comment un système de rétroaction peut contribuer au maintien de l’équilibre interne.',items:[['Homéostasie','L’homéostasie correspond au maintien de conditions internes relativement stables malgré les changements.'],['Récepteur','Un récepteur détecte une variation d’une variable physiologique.'],['Centre de régulation','Le centre de régulation compare l’information reçue à une valeur de référence et coordonne une réponse.'],['Effecteur','Un effecteur réalise une réponse qui contribue à corriger la variation.'],['Rétroaction négative','La rétroaction négative réduit l’écart par rapport à la valeur de référence.'],['Rétroaction positive','La rétroaction positive amplifie une variation jusqu’à ce qu’un événement termine le processus.']]},
    'populations.html': {title:'L’écosystème en mouvement',intro:'Change les conditions d’un modèle de population. Il s’agit d’une simulation conceptuelle, pas d’une prédiction écologique réelle.',items:[['Taille de population','La taille d’une population dépend notamment des naissances, des décès, de l’immigration et de l’émigration.'],['Capacité de charge','La capacité de charge représente la taille de population qu’un environnement peut soutenir durablement dans certaines conditions.'],['Ressources','La disponibilité des ressources peut limiter la croissance d’une population.'],['Compétition','La compétition survient lorsque des organismes utilisent une ressource limitée.'],['Prédation','La prédation est une interaction où un organisme capture et consomme un autre organisme.'],['Biodiversité','La biodiversité comprend la diversité des gènes, des espèces et des écosystèmes.']]}
  };
  const glossary = {
    'ATP':'Molécule qui transfère de l’énergie utilisable dans de nombreux processus cellulaires.',
    'Enzyme':'Catalyseur biologique qui accélère une réaction sans être consommé par celle-ci.',
    'Osmose':'Déplacement net de l’eau à travers une membrane sélectivement perméable.',
    'Diffusion':'Déplacement net de particules d’une région de concentration élevée vers une région de concentration plus faible.',
    'ADN':'Acide nucléique qui porte l’information génétique.',
    'ARN':'Acide nucléique impliqué dans l’expression de l’information génétique.',
    'Homéostasie':'Maintien de conditions internes relativement stables.',
    'Mutation':'Modification de la séquence de nucléotides du matériel génétique.',
    'Capacité de charge':'Taille de population qu’un environnement peut soutenir dans certaines conditions.',
    'Photosynthèse':'Processus par lequel certains organismes convertissent l’énergie lumineuse en énergie chimique.'
  };
  const styleLink = document.createElement('link'); styleLink.rel='stylesheet'; styleLink.href='portfolio-extras.css'; document.head.appendChild(styleLink);
  // Keep the visitor's theme choice when they move between portfolio pages.
  let darkTheme = false;
  try { darkTheme = localStorage.getItem('sbi4u-theme') === 'dark'; } catch (error) { /* Storage may be unavailable in private browsing. */ }
  document.body.classList.toggle('extra-dark', darkTheme);
  const progress=document.createElement('div');progress.id='readingProgress';document.body.appendChild(progress);
  const toolbar=document.createElement('div');toolbar.className='extra-toolbar';toolbar.innerHTML='<button class="extra-tool" id="themeToggle" aria-label="Changer le thème" title="Mode laboratoire">☾</button><button class="extra-tool" id="glossaryToggle" aria-label="Ouvrir le glossaire" title="Glossaire">✧</button><button class="extra-tool" id="topToggle" aria-label="Retour en haut" title="Retour en haut">↑</button>';document.body.appendChild(toolbar);
  const modal=document.createElement('div');modal.className='extra-modal';modal.id='glossaryModal';modal.innerHTML='<div class="extra-modal-card" role="dialog" aria-modal="true" aria-labelledby="glossaryTitle"><button class="extra-modal-close" id="glossaryClose" aria-label="Fermer">×</button><span class="extra-kicker">Petit dictionnaire</span><h2 id="glossaryTitle">Glossaire biologique</h2><p>Choisis un terme pour afficher sa définition.</p><div class="extra-glossary" id="glossaryTerms"></div><div class="extra-output" id="glossaryDefinition" aria-live="polite">Sélectionne un terme ci-dessus.</div></div>';document.body.appendChild(modal);
  Object.keys(glossary).forEach(term=>{const b=document.createElement('button');b.type='button';b.textContent=term;b.addEventListener('click',()=>{$('#glossaryDefinition').innerHTML='<strong>'+term+'</strong><br>'+glossary[term]});$('#glossaryTerms').appendChild(b)});
  const syncThemeButton=()=>{const on=document.body.classList.contains('extra-dark');$('#themeToggle').textContent=on?'☀':'☾';$('#themeToggle').title=on?'Mode clair':'Mode sombre';$('#themeToggle').setAttribute('aria-pressed',String(on))};
  syncThemeButton();
  $('#themeToggle').addEventListener('click',()=>{const on=document.body.classList.toggle('extra-dark');try{localStorage.setItem('sbi4u-theme',on?'dark':'light')}catch(error){/* Theme still works for this page. */}syncThemeButton()});
  $('#glossaryToggle').addEventListener('click',()=>modal.classList.add('open'));$('#glossaryClose').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});$('#topToggle').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+'%'};window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.content-card,.extra-panel,.section-heading,.reflection-row,.unit-card,.extra-card').forEach(el=>{el.classList.add('extra-reveal');observer.observe(el)});
  // Add a direct route to the cumulative challenge in existing navigation.
  document.querySelectorAll('.nav-links').forEach(nav=>{if(!nav.querySelector('[href="laboratoire-final.html"]')){const a=document.createElement('a');a.href='laboratoire-final.html';a.textContent='✦ Laboratoire final';nav.appendChild(a)}});
  if(unitInfo[page]){
    const info=unitInfo[page];const panel=document.createElement('section');panel.className='extra-panel';panel.id='exploration-interactive';
    panel.innerHTML='<span class="extra-kicker">Expérience interactive</span><h2>'+info.title+'</h2><p>'+info.intro+'</p><div class="extra-grid" id="conceptExplorer"></div><div class="extra-output" id="conceptOutput" aria-live="polite">Clique sur un concept pour faire apparaître son explication.</div><div id="simulatorArea"></div><p style="margin:18px 0 0"><a class="extra-cta" href="laboratoire-final.html">Passer au défi cumulatif ↗</a></p>';
    const main=document.querySelector('main');const footer=document.querySelector('footer');if(footer)main.insertBefore(panel,footer);else main.appendChild(panel);
    info.items.forEach(([term,desc])=>{const b=document.createElement('button');b.className='extra-chip';b.type='button';b.textContent=term;b.addEventListener('click',()=>{$('#conceptOutput').innerHTML='<strong>'+term+'</strong><br>'+desc;document.querySelectorAll('.extra-chip').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true')});$('#conceptExplorer').appendChild(b)});
    const sim=$('#simulatorArea');
    if(page==='biochimie.html')sim.innerHTML='<h3>Mini-modèle : activité enzymatique</h3><p>Fais varier la température. Le modèle illustre simplement qu’une enzyme peut perdre de l’activité lorsque les conditions s’éloignent de son optimum. Les valeurs sont illustratives.</p><div class="extra-sim-controls"><label>Température : <output id="tempValue">37 °C</output><input id="tempSlider" type="range" min="0" max="80" value="37"></label><div class="extra-stat"><strong id="enzymeValue">100 %</strong>activité relative illustrée</div></div>';
    if(page==='metabolisme.html')sim.innerHTML='<h3>Mini-modèle : disponibilité de lumière</h3><p>Modifie l’intensité lumineuse et observe la variation illustrative du taux relatif de photosynthèse. Ce modèle ne représente pas une mesure expérimentale.</p><div class="extra-sim-controls"><label>Intensité lumineuse : <output id="lightValue">50 %</output><input id="lightSlider" type="range" min="0" max="100" value="50"></label><div class="extra-stat"><strong id="photoValue">50 %</strong>taux relatif illustré</div></div>';
    if(page==='genetique.html')sim.innerHTML='<h3>Défi : associer les bases</h3><p>Choisis la base complémentaire à l’ADN pour vérifier une règle fondamentale de l’appariement.</p><div class="extra-glossary"><button type="button" data-base="A">A</button><button type="button" data-base="T">T</button><button type="button" data-base="C">C</button><button type="button" data-base="G">G</button></div><div class="extra-output" id="baseOutput">Choisis une base pour commencer.</div>';
    if(page==='homeostasie.html')sim.innerHTML='<h3>Mini-modèle : régulation de la température</h3><p>Déplace la température corporelle dans ce modèle conceptuel. Il illustre comment les réponses de thermorégulation changent lorsque la température s’éloigne de la valeur de référence de 37 °C.</p><div class="extra-sim-controls"><label>Température corporelle : <output id="bodyTempValue">37,0 °C</output><input id="bodyTempSlider" type="range" min="34" max="40" step="0.1" value="37"></label><div class="extra-stat"><strong id="bodyResponse">Équilibre</strong><span id="bodyResponseText">La température est près de la valeur de référence.</span></div></div>';
    if(page==='populations.html')sim.innerHTML='<h3>Mini-modèle : croissance d’une population</h3><p>Fais varier le taux de croissance. La valeur calculée est une illustration mathématique simplifiée sur 10 périodes, sans tenir compte de toutes les interactions écologiques.</p><div class="extra-sim-controls"><label>Taux de croissance par période : <output id="growthValue">10 %</output><input id="growthSlider" type="range" min="-20" max="30" value="10"></label><div class="extra-stat"><strong id="populationValue">259</strong>individus illustratifs après 10 périodes, à partir de 100</div></div>';
    const bind=(id,fn)=>{const el=$('#'+id);if(el)el.addEventListener('input',fn)};
    bind('tempSlider',e=>{const t=+e.target.value;$('#tempValue').textContent=t+' °C';const activity=Math.max(0,Math.round(100-Math.pow((t-37)/1.9,2)*2.8));$('#enzymeValue').textContent=activity+' %'});
    bind('lightSlider',e=>{$('#lightValue').textContent=e.target.value+' %';$('#photoValue').textContent=e.target.value+' %'});
    document.querySelectorAll('[data-base]').forEach(b=>b.addEventListener('click',()=>{const pair={A:'T',T:'A',C:'G',G:'C'};$('#baseOutput').innerHTML='La base complémentaire de <strong>'+b.dataset.base+'</strong> est <strong>'+pair[b.dataset.base]+'</strong> dans l’ADN.'}));
    bind('bodyTempSlider',e=>{const t=+e.target.value;$('#bodyTempValue').textContent=t.toFixed(1)+' °C';let title='Équilibre',desc='La température est près de la valeur de référence.';if(t<36.5){title='Réponse au froid';desc='Des mécanismes comme les frissons et la vasoconstriction contribuent à conserver ou produire de la chaleur.'}else if(t>37.5){title='Réponse à la chaleur';desc='La transpiration et la vasodilatation contribuent à augmenter la perte de chaleur.'}$('#bodyResponse').textContent=title;$('#bodyResponseText').textContent=desc});
    bind('growthSlider',e=>{const r=+e.target.value/100;$('#growthValue').textContent=e.target.value+' %';$('#populationValue').textContent=Math.max(0,Math.round(100*Math.pow(1+r,10))).toLocaleString('fr-CA')});
  }
  if(page==='index.html'){
    const main=document.querySelector('main');if(main&&!document.querySelector('#finalChallengePromo')){const promo=document.createElement('section');promo.id='finalChallengePromo';promo.className='extra-panel';promo.innerHTML='<span class="extra-kicker">Pour terminer l’exposition</span><h2>Le laboratoire final</h2><p>Tu as exploré les cinq unités? Mets tes connaissances à l’épreuve avec un défi cumulatif interactif, des explications et un résultat final.</p><a class="extra-cta" href="laboratoire-final.html">Entrer dans le laboratoire final ↗</a>';main.appendChild(promo)}
  }

  // Custom cursor: desktop only, with a normal cursor retained on touch devices.
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.body.classList.add('extra-cursor-on');
    const cursor=document.createElement('div');cursor.id='biologyCursor';cursor.setAttribute('aria-hidden','true');document.body.appendChild(cursor);
    document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('cursor-visible')},{passive:true});
    document.addEventListener('mouseleave',()=>cursor.classList.remove('cursor-visible'));
    document.querySelectorAll('a,button,input,[role="button"]').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('cursor-hover'))});
  }

  // Tiny floating science annotations in the hero area.
  const hero=document.querySelector('.page-hero');
  if(hero){
    hero.style.position='relative';
    const labels=document.createElement('div');labels.className='extra-floating-labels';labels.setAttribute('aria-hidden','true');
    const labelSets={
      'biochimie.html':['CELLULE · MOLÉCULES','MICRO → MACRO','STRUCTURE & FONCTION'],
      'metabolisme.html':['ÉNERGIE EN ACTION','ATP · NADH · FADH₂','TRANSFORMATIONS'],
      'genetique.html':['ADN · ARN','CODE GÉNÉTIQUE','HÉRÉDITÉ'],
      'homeostasie.html':['ÉQUILIBRE INTERNE','RÉTROACTION','RÉGULATION'],
      'populations.html':['ÉCOSYSTÈMES','INTERACTIONS','BIODIVERSITÉ']
    };
    const labelsForPage=labelsSetsSafe(labelSets[page]||['SCIENCE · CURIOSITÉ','EXPLORER LE VIVANT','SBI4U']);
    labelsForPage.forEach((txt,i)=>{const el=document.createElement('span');el.className='extra-float-label';el.textContent='✦ '+txt;el.style.top=(17+i*27)+'%';el.style.right=(3+(i%2)*4)+'%';labels.appendChild(el)});
    hero.appendChild(labels);
  }
  function labelsSetsSafe(arr){return arr}

  // Optional gentle chime: sound is OFF until the visitor chooses to enable it.
  let soundOn=false,audioContext=null;
  const soundButton=document.createElement('button');soundButton.className='extra-tool';soundButton.id='soundToggle';soundButton.type='button';soundButton.textContent='♫';soundButton.title='Activer les petits sons';soundButton.setAttribute('aria-label','Activer les petits sons');soundButton.setAttribute('aria-pressed','false');toolbar.insertBefore(soundButton,$('#topToggle'));
  function chime(){if(!soundOn)return;try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==='suspended')audioContext.resume();const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(660,audioContext.currentTime);osc.frequency.exponentialRampToValueAtTime(880,audioContext.currentTime+.12);gain.gain.setValueAtTime(.0001,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.045,audioContext.currentTime+.015);gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.2);osc.connect(gain);gain.connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.21)}catch(err){/* Audio is optional; the site still works without it. */}}
  soundButton.addEventListener('click',()=>{soundOn=!soundOn;soundButton.setAttribute('aria-pressed',String(soundOn));soundButton.textContent=soundOn?'♫':'♬';soundButton.title=soundOn?'Désactiver les petits sons':'Activer les petits sons';soundButton.setAttribute('aria-label',soundButton.title);if(soundOn)chime()});
  document.addEventListener('click',e=>{if(e.target.closest('a,button,.extra-chip'))chime()});

  // Surprise biology fact button. Facts are short, accurate prompts for further exploration.
  const facts=[
    ['Le savais-tu?','Les membranes cellulaires sont dynamiques : leurs phospholipides et plusieurs protéines peuvent se déplacer latéralement.'],
    ['Le savais-tu?','L’ATP est recyclé continuellement : les cellules le produisent et l’utilisent plutôt que d’en stocker de grandes quantités pour longtemps.'],
    ['Le savais-tu?','La séquence des nucléotides de l’ADN contribue à déterminer la séquence des acides aminés d’une protéine.'],
    ['Le savais-tu?','La rétroaction négative est un mécanisme courant de régulation de l’homéostasie.'],
    ['Le savais-tu?','La capacité de charge d’un milieu peut changer lorsque les ressources ou les conditions environnementales changent.'],
    ['Le savais-tu?','Les mitochondries possèdent leur propre ADN, distinct de l’ADN contenu dans le noyau.'],
    ['Le savais-tu?','Les enzymes accélèrent les réactions en abaissant l’énergie d’activation, mais elles ne changent pas le bilan énergétique global de la réaction.']
  ];
  const factButton=document.createElement('button');factButton.className='extra-tool';factButton.id='factToggle';factButton.type='button';factButton.textContent='✧';factButton.title='Une surprise biologique';factButton.setAttribute('aria-label','Afficher une surprise biologique');toolbar.insertBefore(factButton,$('#glossaryToggle'));
  const factToast=document.createElement('div');factToast.className='extra-fact-toast';factToast.setAttribute('role','status');factToast.setAttribute('aria-live','polite');document.body.appendChild(factToast);
  let lastFact=-1,factTimer;
  factButton.addEventListener('click',()=>{let i=Math.floor(Math.random()*facts.length);if(facts.length>1&&i===lastFact)i=(i+1)%facts.length;lastFact=i;factToast.innerHTML='<strong>'+facts[i][0]+'</strong>'+facts[i][1];factToast.classList.add('show');clearTimeout(factTimer);factTimer=setTimeout(()=>factToast.classList.remove('show'),6500);chime()});

  // Reading tracker complements the slim top progress line.
  const tracker=document.createElement('div');tracker.className='extra-reading-badge';tracker.innerHTML='<span class="dot"></span><span id="readingPercent">0 % exploré</span>';document.body.appendChild(tracker);
  const updateTracker=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const pct=max>0?Math.min(100,Math.round(window.scrollY/max*100)):100;const out=document.getElementById('readingPercent');if(out)out.textContent=pct+' % exploré'};
  window.addEventListener('scroll',updateTracker,{passive:true});window.addEventListener('resize',updateTracker);updateTracker();
})();
