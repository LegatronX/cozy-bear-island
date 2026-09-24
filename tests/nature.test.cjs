"use strict";
/* Tests sans dépendance : le script du jeu tourne dans un DOM et un Canvas simulés. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const source = html.match(/<script>([\s\S]*)<\/script>/)[1];

function makeElement(){
  const el = {
    textContent:"", innerHTML:"", hidden:false, open:false, style:{}, dataset:{},
    classList:{ _s:new Set(), add(c){ this._s.add(c); }, remove(c){ this._s.delete(c); },
      toggle(c, on){ (on ?? !this._s.has(c)) ? this._s.add(c) : this._s.delete(c); }, contains(c){ return this._s.has(c); } },
    listeners:{},
    setAttribute(){}, addEventListener(type, fn){ (this.listeners[type] ??= []).push(fn); }, focus(){}, closest(){ return null; },
    getContext(){ return new Proxy({}, { get:(t, k) => k in t ? t[k] : () => ({ addColorStop(){} }), set:(t, k, v) => (t[k] = v, true) }); },
    showModal(){ this.open = true; }, close(){ this.open = false; }
  };
  return el;
}

function boot(storage = {}, random = Math.random){
  const elements = {};
  let frame = null;
  const document = {
    hidden:false, activeElement:null,
    getElementById:id => elements[id] ??= makeElement(),
    querySelectorAll:() => [], addEventListener(){},
    createElement:() => makeElement(), body:makeElement()
  };
  const localStorage = {
    getItem:k => Object.hasOwn(storage, k) ? storage[k] : null,
    setItem:(k, v) => { storage[k] = String(v); }
  };
  const context = {
    document, localStorage, navigator:{}, console, performance:{ now:() => 0 },
    requestAnimationFrame:fn => { frame = fn; }, setTimeout:() => 0, clearTimeout(){},
    addEventListener(){}, innerWidth:800, innerHeight:600, devicePixelRatio:1,
    Math:Object.assign(Object.create(Math), { random })
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(source, context);
  const run = code => vm.runInContext(code, context);
  /* Avance la simulation de `seconds` secondes en pas de 50 ms. */
  let now = 0;
  const tick = seconds => { for (let i = 0; i < seconds * 20; i++){ now += 50; frame(now); } };
  /* Simule un clic sur un bouton d'action d'un panneau. */
  const click = action => elements.sheetBody.listeners.click.forEach(fn => fn({ target:{ closest:() => ({ dataset:{ nature:action }, disabled:false }) } }));
  return { run, tick, click, elements, storage };
}
function started(storage, random){
  const g = boot(storage, random);
  g.run("closeSheet()");
  return g;
}

test("le jeu démarre sur l'accueil et met la simulation en pause", () => {
  const g = boot();
  assert.equal(g.run("sheet.open"), true);
  const before = g.run("minutes");
  g.tick(2);
  assert.equal(g.run("minutes"), before);
  g.run("closeSheet()");
  g.tick(2);
  assert.ok(g.run("minutes") > before);
});

test("le tournesol ne pousse qu'au soleil et avec une terre humide", () => {
  const g = started();
  g.run("weather='sunny';targetWeather='sunny';nature.planted=true;nature.sunny=false;nature.moisture=55");
  g.run("updateGarden(10)");
  assert.equal(g.run("nature.growth"), 0);
  g.run("nature.sunny=true;nature.moisture=0;updateGarden(10)");
  assert.equal(g.run("nature.growth"), 0);
  g.run("nature.moisture=55;updateGarden(10)");
  assert.equal(g.run("nature.growth"), 10);
});

test("la pluie humidifie la terre", () => {
  const g = started();
  g.run("nature.planted=true;nature.sunny=true;nature.moisture=0;weather='rain';updateGarden(1)");
  assert.ok(g.run("nature.moisture") > 0);
});

test("chaque variété de pomme n'est découverte qu'une fois", () => {
  const g = started();
  g.run("discoverApple('gala');closeSheet();discoverApple('gala');closeSheet()");
  assert.deepEqual(g.run("JSON.stringify(nature.seen)"), '["gala"]');
});

test("Pépé n'achète que l'objet choisi", () => {
  const g = started();
  g.run("state.inv.fruit=3;state.inv.wood=4;state.coins=0;openShop()");
  g.click("sell-fruit");
  assert.equal(g.run("state.inv.fruit"), 2);
  assert.equal(g.run("state.inv.wood"), 4);
  assert.equal(g.run("state.coins"), 9);
});

test("les demandes des voisins se livrent et renforcent l'amitié", () => {
  const g = started();
  g.run("requests.Milo={item:'fish',qty:2,done:false};state.inv.fish=1;state.coins=0");
  const milo = "villagers.find(v=>v.name==='Milo')";
  assert.equal(g.run(`deliverRequest(${milo})`), false);
  g.run("state.inv.fish=3");
  assert.equal(g.run(`deliverRequest(${milo})`), true);
  assert.equal(g.run("state.inv.fish"), 1);
  assert.equal(g.run("state.coins"), 26);
  assert.equal(g.run("state.friend.Milo"), 1);
  g.run("state.inv.fish=5");
  assert.equal(g.run(`deliverRequest(${milo})`), false, "une demande ne se livre qu'une fois");
});

test("le bois n'est pas demandé avant la construction du coin de lecture", () => {
  const g = started();
  for (let i = 0; i < 40; i++){
    g.run("nature.built=false;newRequests()");
    assert.notEqual(g.run("requests.Milo.item"), "wood");
  }
});

test("une nouvelle journée renouvelle les demandes", () => {
  const g = started();
  g.run("requests.Lili.done=true;minutes=359.9");
  g.tick(0.1);
  assert.equal(g.run("state.day"), 2);
  assert.equal(g.run("requests.Lili.done"), false);
});

test("la pêche réussit dans la zone verte et échoue en dehors", () => {
  const g = started();
  const spot = "fishSpots[0]";
  g.run("state.energy=100;state.fish=0;state.inv.fish=0");
  g.run(`startFishing(${spot});fishing.pos=(fishing.zone[0]+fishing.zone[1])/2;reel()`);
  assert.equal(g.run("state.inv.fish"), 1);
  assert.equal(g.run(`${spot}.used`), true);
  g.run("startFishing(fishSpots[1]);fishing.pos=0;fishing.zone=[0.5,0.7];reel()");
  assert.equal(g.run("state.inv.fish"), 1);
  assert.equal(g.run("fishSpots[1].used"), false, "le coin reste disponible après un échec");
  assert.equal(g.run("fishing"), null);
});

test("Pépé vend les améliorations une seule fois", () => {
  const g = started();
  g.run("state.coins=200;openShop()");
  g.click("buy-rod");
  g.click("buy-rod");
  assert.equal(g.run("state.upgrades.rod"), true);
  assert.equal(g.run("state.coins"), 140);
});

test("la canne souple élargit la zone de pêche", () => {
  const g = started();
  g.run("weather='sunny'");
  const base = g.run("fishZoneWidth()");
  g.run("state.upgrades.rod=true");
  assert.ok(g.run("fishZoneWidth()") > base);
});

test("sans énergie, les activités attendent un repas ou une sieste", () => {
  const g = started();
  g.run("state.energy=2;near={obj:trees[0],label:'',type:'tree'};interact()");
  assert.equal(g.run("trees[0].used"), false);
  g.run("state.energy=50;near={obj:trees[0],label:'',type:'tree'};interact();closeSheet()");
  assert.equal(g.run("trees[0].used"), true);
});

test("le panier d'osier ajoute une pomme par récolte", () => {
  const g = started();
  g.run("weather='sunny';state.inv.fruit=0;state.upgrades.basket=true;near={obj:trees[1],label:'',type:'tree'};interact();closeSheet()");
  assert.equal(g.run("state.inv.fruit"), 4);
});

test("les troncs, les voisins et la cabane bloquent le passage", () => {
  const g = started();
  assert.equal(g.run("blocked(trees[0].x,trees[0].y)"), true);
  assert.equal(g.run("blocked(villagers[0].x,villagers[0].y)"), true);
  assert.equal(g.run("blocked(house.x,house.y-10)"), true);
  assert.equal(g.run("blocked(-150,120)"), false);
});

test("la construction paie une seule fois", () => {
  const g = started();
  g.run("nature.grown=true;nature.seen=['gala','golden','granny'];state.inv.wood=10;state.coins=100;player.x=readingCorner.x;player.y=readingCorner.y");
  g.click("build");
  g.click("build");
  assert.equal(g.run("nature.built"), true);
  assert.equal(g.run("state.inv.wood"), 5);
  assert.equal(g.run("state.coins"), 80);
});

test("la sauvegarde conserve amitiés, demandes et améliorations", () => {
  const g = started();
  g.run("state.friend.Lili=3;state.upgrades.rod=true;requests.Lili={item:'flowers',qty:3,done:true};saveGame()");
  const h = started({ ...g.storage });
  assert.equal(h.run("state.friend.Lili"), 3);
  assert.equal(h.run("state.upgrades.rod"), true);
  assert.equal(h.run("state.upgrades.basket"), false);
  assert.equal(h.run("requests.Lili.qty"), 3);
  assert.equal(h.run("requests.Lili.done"), true);
});

test("les valeurs de sauvegarde invalides sont ignorées", () => {
  const bad = JSON.stringify({ version:4, state:{ coins:-5, energy:500, friend:{ Lili:99, Milo:"x" }, upgrades:{ rod:"oui" } },
    requests:{ Lili:{ item:"diamant", qty:3 }, Milo:{ item:"fish", qty:1e9 } }, player:{ x:9999, y:0 } });
  const g = started({ cozyBearIsland_v3:bad });
  assert.equal(g.run("state.coins"), 0);
  assert.equal(g.run("state.energy"), 100);
  assert.equal(g.run("state.friend.Lili"), 5);
  assert.equal(g.run("state.friend.Milo"), 0);
  assert.equal(g.run("state.upgrades.rod"), false);
  assert.ok(g.run("Object.hasOwn(ITEM_ICONS, requests.Lili.item)"));
  assert.ok(g.run("requests.Milo.qty") <= 9);
  assert.equal(g.run("player.x"), -150);
});

test("une sauvegarde v2 est reprise", () => {
  const v2 = JSON.stringify({ state:{ coins:42, inv:{ fruit:2, fish:1, wood:3, flowers:0 } }, minutes:600 });
  const g = boot({ cozyBearIsland_v2:v2 });
  assert.equal(g.run("state.coins"), 42);
  assert.equal(g.run("state.inv.wood"), 3);
});

test("la marche fonctionne même sans énergie", () => {
  const g = started();
  g.run("state.energy=0;player.x=-150;player.y=120;keys.ArrowRight=true");
  g.tick(0.5);
  assert.ok(g.run("player.x") > -150);
});

test("marcher range la canne pendant la pêche", () => {
  const g = started();
  g.run("startFishing(fishSpots[0]);keys.ArrowLeft=true");
  g.tick(0.1);
  assert.equal(g.run("fishing"), null);
});

test("l'île est bien plus grande et garde ses zones interdites", () => {
  const g = started();
  assert.equal(g.run("walkable(900,0)"), true, "la côte est");
  assert.equal(g.run("walkable(-900,0)"), true, "la forêt de l'ouest");
  assert.equal(g.run("walkable(LAKE.x,LAKE.y)"), false, "on ne marche pas sur le lac");
  assert.equal(g.run("walkable(LAKE.x+100,-730)"), false, "les falaises bloquent le passage");
  assert.equal(g.run("walkable(PIER.x,PIER.y1-10)"), true, "le ponton avance sur la mer");
  assert.equal(g.run("walkable(PIER.x+80,PIER.y1-10)"), false);
  assert.equal(g.run("BRIDGES.every(b => walkable(riverAt(b), b))"), true, "chaque pont traverse la rivière");
  assert.equal(g.run("walkable(riverAt(200),200)"), false);
});

test("le décor ne bloque ni le village ni la cabane", () => {
  const g = started();
  assert.equal(g.run("decoTrees.length > 100"), true);
  assert.equal(g.run("decoTrees.some(t => Math.hypot(t.x-house.x, t.y-house.y) < 150)"), false);
  assert.equal(g.run("decoTrees.some(t => Math.hypot(t.x-230, t.y-110) < 150)"), false);
  assert.equal(g.run("[RACE_SIGN, LAKE_BENCH, ...RACE_POINTS.map(([x,y])=>({x,y}))].every(p => walkable(p.x,p.y) && !blocked(p.x,p.y))"), true);
});

test("le sprint va plus vite que la marche", () => {
  const g = started();
  g.run("player.x=-100;player.y=250;keys.ArrowDown=true");
  g.tick(0.5);
  const walk = g.run("player.y") - 250;
  g.run("player.x=-100;player.y=250;player.vx=0;player.vy=0;keys.ShiftLeft=true");
  g.tick(0.5);
  assert.ok(g.run("player.y") - 250 > walk*1.3);
});

test("la course des lanternes se termine avec récompense et record", () => {
  const g = started();
  g.run("state.coins=0;state.energy=50;startRace()");
  assert.equal(g.run("race.i"), 0);
  g.run("for (const [x,y] of RACE_POINTS){ player.x=x; player.y=y; updateRace(0.5); }");
  assert.equal(g.run("race"), null);
  assert.ok(g.run("state.coins") > 25);
  assert.ok(g.run("state.bestRace") > 0);
});

test("la course échoue quand le temps est écoulé", () => {
  const g = started();
  g.run("state.energy=50;startRace();player.x=-900;player.y=0;updateRace(RACE_LIMIT+1)");
  assert.equal(g.run("race"), null);
  assert.equal(g.run("state.bestRace"), 0);
});

test("photographier une créature remplit l'album une fois par espèce", () => {
  const g = started();
  g.run("state.coins=0;const c=critters.find(c=>c.sp==='crabe');photograph(c)");
  assert.equal(g.run("state.album.crabe"), 1);
  assert.equal(g.run("state.coins"), 20);
  g.run("photograph(critters.filter(c=>c.sp==='crabe')[1])");
  assert.equal(g.run("state.coins"), 24);
  assert.equal(g.run("critters.find(c=>c.sp==='crabe').shy > 0"), true);
});

test("les papillons se cachent sous la pluie et les lucioles sortent la nuit", () => {
  const g = started();
  const b = "critters.find(c=>c.sp==='machaon')", f = "critters.find(c=>c.sp==='luciole')";
  g.run("minutes=12*60;weather='sunny'");
  assert.equal(g.run(`critterActive(${b})`), true);
  assert.equal(g.run(`critterActive(${f})`), false);
  g.run("weather='rain'");
  assert.equal(g.run(`critterActive(${b})`), false);
  g.run("minutes=23*60");
  assert.equal(g.run(`critterActive(${f})`), true);
});

test("les coquillages se ramassent, se vendent et reviennent à l'aube", () => {
  const g = started();
  g.run("state.energy=50;near={obj:shells[0],label:'',type:'shell'};interact()");
  assert.equal(g.run("state.inv.shells"), 1);
  assert.equal(g.run("shells[0].picked"), true);
  g.run("state.coins=0;openShop()");
  g.click("sell-shells");
  assert.equal(g.run("state.coins"), 12);
  g.run("closeSheet();minutes=359.9");
  g.tick(0.1);
  assert.equal(g.run("shells[0].picked"), false);
});

test("la contemplation accélère le temps et se quitte d'une touche", () => {
  const g = started();
  g.run("minutes=600;setContemplation(true)");
  g.tick(1);
  assert.ok(g.run("minutes") - 600 > 25);
  assert.ok(g.run("ZOOM < BASE_ZOOM"));
  g.run("setContemplation(false)");
  assert.equal(g.run("contemplating"), false);
});

test("un vœu sur une étoile filante n'est exaucé qu'une fois", () => {
  const g = started();
  g.run("shootingStar={x:100,y:50,vx:-400,vy:150,life:1.5,wished:false};state.coins=0;state.inv.fruit=0;state.energy=10;makeWish();makeWish()");
  assert.equal(g.run("state.wishes"), 1);
});

test("album, record et coquillages sont sauvegardés", () => {
  const g = started();
  g.run("state.album={grenouille:2};state.bestRace=31.5;state.inv.shells=4;shells[2].picked=true;saveGame()");
  const h = started({ ...g.storage });
  assert.equal(h.run("state.album.grenouille"), 2);
  assert.equal(h.run("state.bestRace"), 31.5);
  assert.equal(h.run("state.inv.shells"), 4);
  assert.equal(h.run("shells[2].picked"), true);
});
