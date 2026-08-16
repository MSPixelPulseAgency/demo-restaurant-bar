import fs from 'node:fs/promises'
import path from 'node:path'

const OUT = path.resolve('public/menus')
await fs.mkdir(OUT, { recursive: true })

const COLORS = {
  ink: [0.09, 0.067, 0.055],
  espresso: [0.14, 0.086, 0.059],
  cream: [0.984, 0.957, 0.918],
  paper: [1, 0.982, 0.957],
  gold: [0.776, 0.608, 0.333],
  gold2: [0.886, 0.765, 0.510],
  wine: [0.353, 0.141, 0.165],
  coral: [0.851, 0.431, 0.259],
  muted: [0.463, 0.416, 0.384],
  white: [1, 1, 1],
}

const PHOTO_URLS = {
  food: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=72&fm=jpg',
  food2: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=72&fm=jpg',
  bar: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1400&q=72&fm=jpg',
  event: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=72&fm=jpg',
  catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=72&fm=jpg',
}

async function fetchJpeg(url) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'AureliaMenuBuilder/1.0' } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = Buffer.from(await response.arrayBuffer())
    const size = jpegSize(data)
    return { data, ...size }
  } catch (error) {
    console.warn(`[menu-pdf] image unavailable: ${url} (${error.message})`)
    return null
  }
}

function jpegSize(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i += 1; continue }
    const marker = buf[i + 1]
    i += 2
    if (marker === 0xd8 || marker === 0xd9) continue
    if (i + 1 >= buf.length) break
    const len = buf.readUInt16BE(i)
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
      return { height: buf.readUInt16BE(i + 3), width: buf.readUInt16BE(i + 5) }
    }
    i += len
  }
  return { width: 1200, height: 800 }
}

function esc(text='') {
  return String(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/[\r\n]+/g, ' ')
}

function rgb([r,g,b]) { return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}` }

function wrap(text, max=48) {
  const words = String(text).split(/\s+/)
  const lines = []; let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > max && line) { lines.push(line); line = word } else line = next
  }
  if (line) lines.push(line)
  return lines
}

class PDFBuilder {
  constructor() {
    this.objects = [null]
    this.pages = []
    this.images = new Map()
    this.fontIds = {}
  }
  addObject(body) { this.objects.push(body); return this.objects.length - 1 }
  addFont(name, base) { const id = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /${base} >>`); this.fontIds[name] = id; return id }
  addImage(name, img) {
    if (!img) return null
    const head = Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.data.length} >>\nstream\n`, 'binary')
    const tail = Buffer.from('\nendstream', 'binary')
    const id = this.addObject(Buffer.concat([head, img.data, tail]))
    this.images.set(name, id); return id
  }
  addPage(commands, imageNames=[]) {
    const content = Buffer.from(commands.join('\n'), 'binary')
    const contentId = this.addObject(Buffer.concat([Buffer.from(`<< /Length ${content.length} >>\nstream\n`, 'binary'), content, Buffer.from('\nendstream', 'binary')]))
    const fontRes = Object.entries(this.fontIds).map(([n,id]) => `/${n} ${id} 0 R`).join(' ')
    const imgRes = imageNames.filter(n => this.images.has(n)).map(n => `/${n} ${this.images.get(n)} 0 R`).join(' ')
    const pageId = this.addObject(`<< /Type /Page /Parent PAGES_REF /MediaBox [0 0 595 842] /Resources << /Font << ${fontRes} >> /XObject << ${imgRes} >> >> /Contents ${contentId} 0 R >>`)
    this.pages.push(pageId)
  }
  async write(file) {
    const pagesId = this.addObject(`<< /Type /Pages /Kids [${this.pages.map(id => `${id} 0 R`).join(' ')}] /Count ${this.pages.length} >>`)
    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`)
    this.objects = this.objects.map((obj, idx) => idx && typeof obj === 'string' ? obj.replaceAll('PAGES_REF', `${pagesId} 0 R`) : obj)
    const chunks = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary')]
    const offsets = [0]; let offset = chunks[0].length
    for (let i=1; i<this.objects.length; i++) {
      offsets[i] = offset
      const body = Buffer.isBuffer(this.objects[i]) ? this.objects[i] : Buffer.from(this.objects[i], 'binary')
      const part = Buffer.concat([Buffer.from(`${i} 0 obj\n`, 'binary'), body, Buffer.from('\nendobj\n', 'binary')])
      chunks.push(part); offset += part.length
    }
    const xref = [`xref\n0 ${this.objects.length}\n`, '0000000000 65535 f \n']
    for (let i=1; i<this.objects.length; i++) xref.push(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`)
    const xrefBuf = Buffer.from(xref.join(''), 'binary')
    const trailer = Buffer.from(`trailer\n<< /Size ${this.objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${offset}\n%%EOF\n`, 'binary')
    chunks.push(xrefBuf, trailer)
    await fs.writeFile(file, Buffer.concat(chunks))
  }
}

function fill(cmds, color) { cmds.push(`${rgb(color)} rg`) }
function stroke(cmds, color) { cmds.push(`${rgb(color)} RG`) }
function rect(cmds,x,y,w,h,fillColor) { fill(cmds,fillColor); cmds.push(`${x} ${y} ${w} ${h} re f`) }
function line(cmds,x1,y1,x2,y2,color,width=1) { stroke(cmds,color); cmds.push(`${width} w ${x1} ${y1} m ${x2} ${y2} l S`) }
function text(cmds, str, x,y,size,font='F1',color=COLORS.ink) { fill(cmds,color); cmds.push(`BT /${font} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`) }
function paragraph(cmds,str,x,y,size,font,color,maxChars=68,leading=size*1.55) { let yy=y; for(const ln of wrap(str,maxChars)){ text(cmds,ln,x,yy,size,font,color); yy-=leading } return yy }
function utensil(cmds,x,y,s=1,color=COLORS.gold){ stroke(cmds,color); cmds.push(`1 w ${x} ${y} m ${x} ${y+58*s} l S`); [-5,-1.7,1.7,5].forEach(o=>cmds.push(`${x+o*s} ${y+58*s} m ${x+o*s} ${y+75*s} l S`)); cmds.push(`${x-6*s} ${y+58*s} m ${x+6*s} ${y+58*s} l S`); cmds.push(`${x+32*s} ${y} m ${x+32*s} ${y+54*s} l S`); cmds.push(`${x+25*s} ${y+54*s} 14 ${20*s} re S`); cmds.push(`${x+62*s} ${y} m ${x+62*s} ${y+75*s} l S`) }
function brand(cmds, light=false){ const c=light?COLORS.white:COLORS.ink; stroke(cmds,c); cmds.push('1.2 w 29 777 26 26 re S'); text(cmds,'A',38.5,785,13,'F4',c); text(cmds,'AURELIA',63,790,15,'F4',c); text(cmds,'KITCHEN - BAR - GATHERINGS',63,780,5.5,'F1',light?COLORS.gold2:COLORS.gold) }
function imageBox(cmds,name,img,x,y,w,h){ if(!img)return; const ir=img.width/img.height, br=w/h; let dw,dh,dx,dy; if(ir>br){ dh=h; dw=h*ir; dx=x-(dw-w)/2; dy=y } else { dw=w; dh=w/ir; dx=x; dy=y-(dh-h)/2 } cmds.push(`q ${x} ${y} ${w} ${h} re W n ${dw} 0 0 ${dh} ${dx} ${dy} cm /${name} Do Q`) }

function addBasicFonts(pdf){ pdf.addFont('F1','Helvetica'); pdf.addFont('F2','Helvetica-Bold'); pdf.addFont('F3','Times-Roman'); pdf.addFont('F4','Times-Bold') }

function addMenuList(cmds, sections, startY, dark=false) {
  const xCols=[55,320]; let col=0, y=[startY,startY]
  for(const [section,items] of sections){ if(y[col] < 170 && col===0) col=1; const x=xCols[col]; text(cmds,section.toUpperCase(),x,y[col],8,'F2',dark?COLORS.gold2:COLORS.wine); y[col]-=18
    for(const [name,desc,price] of items){ text(cmds,name,x,y[col],10.5,'F4',dark?COLORS.white:COLORS.ink); if(price) text(cmds,price,x+210,y[col],8.5,'F2',dark?COLORS.gold2:COLORS.wine); y[col]-=13; y[col]=paragraph(cmds,desc,x,y[col],7.2,'F1',dark?[.75,.70,.66]:COLORS.muted,42,10.5)-7 }
    y[col]-=8
  }
}

async function makeDining(imgs){ const pdf=new PDFBuilder(); addBasicFonts(pdf); Object.entries(imgs).forEach(([n,i])=>pdf.addImage(n,i))
  let c=[]; rect(c,0,0,595,842,COLORS.espresso); if(imgs.food2) imageBox(c,'food2',imgs.food2,0,0,595,842); rect(c,0,452,470,244,COLORS.espresso); rect(c,0,0,390,112,COLORS.espresso); brand(c,true); text(c,'DINING + BAR',55,635,9,'F2',COLORS.gold2); text(c,'The Aurelia Menu',55,575,39,'F4',COLORS.white); paragraph(c,'Season-led plates - expressive cocktails - a table worth lingering over',55,545,11,'F1',[.9,.86,.8],54,16); line(c,55,514,170,514,COLORS.gold2,1.2); text(c,'Dinner becomes the evening.',55,83,14,'F4',COLORS.white); paragraph(c,'A polished demo menu for the Aurelia restaurant concept.',55,65,8,'F1',[.85,.8,.74],62,12); pdf.addPage(c,['food2'])
  c=[]; rect(c,0,0,595,842,COLORS.paper); brand(c); text(c,'FROM THE KITCHEN',55,735,8,'F2',COLORS.coral); text(c,'Seasonal Dining',55,690,27,'F4',COLORS.ink); paragraph(c,'Bright starters, handmade pasta, generous mains and composed desserts.',55,666,9.5,'F1',COLORS.muted,72,14); line(c,55,640,135,640,COLORS.gold,1.1); ['food','food2','bar','event'].forEach((n,i)=>imageBox(c,n,imgs[n],55+i*122,565,108,58)); addMenuList(c,[['Starters',[['Charred Burrata','Heirloom tomato, basil oil, grilled sourdough','$17'],['Crispy Calamari','Lemon, chilli, herb aioli','$18'],['Roasted Beet Tartare','Goat cheese, pistachio, orange','$16'],['Truffle Arancini','Wild mushroom, pecorino, roasted garlic aioli','$17']]],['Pasta',[['Lobster Ravioli','Brown butter, lemon, chive','$31'],['Truffle Tagliolini','Wild mushroom, parmesan, black truffle','$29'],['Prawn Linguine','Tomato, chilli, garlic, herbs','$30']]],['Mains',[['Herb Roasted Chicken','Potato puree, seasonal greens, jus','$32'],['Black Cod','Miso glaze, sesame greens, citrus','$39'],['Filet Mignon','Peppercorn jus, pommes puree','$48'],['Ribeye','Charred onion, rosemary jus, fries','$56']]],['Desserts',[['Dark Chocolate Torte','Sea salt, espresso cream','$13'],['Vanilla Panna Cotta','Berries, citrus, almond','$12'],['Tiramisu','Mascarpone, espresso, cocoa','$13']]]],535,false); utensil(c,485,34,.75); pdf.addPage(c,['food','food2','bar','event'])
  c=[]; rect(c,0,0,595,842,COLORS.espresso); if(imgs.bar) imageBox(c,'bar',imgs.bar,0,660,595,182); brand(c,true); text(c,'AFTER DARK',55,620,8,'F2',COLORS.gold2); text(c,'Cocktails + Cellar',55,578,28,'F4',COLORS.white); paragraph(c,'Signature pours, polished classics and bottles selected for long evenings.',55,555,9,'F1',[.8,.74,.69],72,14); addMenuList(c,[['Signature Cocktails',[['Golden Hour','Bourbon, apricot, lemon, bitters','$16'],['Velvet Night','Gin, blackberry, rosemary, tonic','$15'],['French 75','Gin, lemon, sparkling wine, sugar','$17'],['Paper Plane','Bourbon, amaro, aperitivo, lemon','$18'],['Mezcal Negroni','Mezcal, sweet vermouth, bitter orange','$18'],['Lychee Martini','Vodka, lychee, citrus, dry vermouth','$17']]],['Zero Proof',[['Garden Tonic','Cucumber, basil, lime, premium tonic','$12'],['Blood Orange Fizz','Blood orange, rosemary, lemon, soda','$12'],['No-Groni','Botanical aperitif, bitter orange, zero-proof vermouth','$13']]],['Wine by the Glass',[['Champagne Reserve','Citrus, brioche, chalky finish','$22'],['Sancerre','Lemon, white flowers, flint','$19'],['Chablis','Green apple, citrus, minerality','$20'],['Barolo','Rose, cherry, tobacco','$24']]],['After Dinner',[['Irish Coffee','Irish whiskey, coffee, brown sugar, cream','$14'],['Espresso Martini Flight','Classic, mocha and salted caramel','$22'],['Cognac XO','Dried fruit, spice, long oak finish','$28']]]],520,true); pdf.addPage(c,['bar'])
  c=[]; rect(c,0,0,595,842,COLORS.paper); brand(c); text(c,'GOOD TO KNOW',55,710,8,'F2',COLORS.coral); text(c,'A menu designed to evolve.',55,665,25,'F4',COLORS.ink); let y=paragraph(c,"Seasonal availability may change. Final dishes, pricing, dietary labels, vintages and availability can be replaced with the restaurant's confirmed menu before launch.",55,635,9.5,'F1',COLORS.muted,80,15); y-=8; paragraph(c,'Ask about vegetarian adaptations, allergies, reserve bottles and off-menu classics.',55,y,9.5,'F1',COLORS.muted,80,15); if(imgs.food) imageBox(c,'food',imgs.food,55,110,485,330); utensil(c,470,35,.8); pdf.addPage(c,['food']); await pdf.write(path.join(OUT,'aurelia-dining-menu.pdf')) }

async function makeEvents(imgs){ const pdf=new PDFBuilder(); addBasicFonts(pdf); Object.entries(imgs).forEach(([n,i])=>pdf.addImage(n,i)); let c=[]; rect(c,0,0,595,842,COLORS.espresso); if(imgs.event) imageBox(c,'event',imgs.event,0,0,595,842); rect(c,0,452,500,244,COLORS.espresso); brand(c,true); text(c,'PRIVATE EVENTS',55,635,9,'F2',COLORS.gold2); text(c,'Gather beautifully.',55,575,38,'F4',COLORS.white); paragraph(c,'Private dining - celebrations - corporate evenings - cocktail receptions',55,545,10.5,'F1',[.9,.86,.8],70,15); pdf.addPage(c,['event'])
  c=[]; rect(c,0,0,595,842,COLORS.paper); brand(c); text(c,'WAYS TO GATHER',55,730,8,'F2',COLORS.coral); text(c,'Event Experiences',55,685,27,'F4',COLORS.ink); paragraph(c,'Flexible formats for milestone dinners, social celebrations and polished business occasions.',55,660,9.5,'F1',COLORS.muted,75,14); imageBox(c,'event',imgs.event,55,515,230,105); imageBox(c,'bar',imgs.bar,310,515,230,105); const cards=[['01','Private Dinner','SEATED EXPERIENCE','Ideal for birthdays, anniversaries and intimate celebrations.'],['02','Cocktail Reception','STANDING / LOUNGE FLOW','Cocktails, canapes and conversation with flexible timing.'],['03','Corporate Evening','CLIENT + TEAM OCCASIONS','A polished setting for dinners, presentations and relationship-building.']]; let y=445; for(const [n,t,k,d] of cards){ rect(c,55,y,485,82,[.985,.955,.91]); text(c,n,70,y+54,8,'F2',COLORS.coral); text(c,t,105,y+52,15,'F4',COLORS.ink); text(c,k,105,y+33,7.5,'F2',COLORS.gold); paragraph(c,d,105,y+17,7.3,'F1',COLORS.muted,65,10); y-=100 } pdf.addPage(c,['event','bar'])
  c=[]; rect(c,0,0,595,842,COLORS.espresso); brand(c,true); text(c,'PLANNING NOTES',55,730,8,'F2',COLORS.gold2); text(c,'What can be tailored',55,685,28,'F4',COLORS.white); const bullets=['Guest capacity and seated / standing configurations','Custom three-course, family-style or canape menus','Wine, cocktail and non-alcoholic beverage packages','AV, microphone, presentation and music requirements','Accessibility, parking, decor and vendor access notes','Dedicated inquiry contact and event timeline']; y=610; bullets.forEach((b,i)=>{rect(c,55,y,485,52,[.19,.13,.10]); text(c,String(i+1).padStart(2,'0'),72,y+21,10,'F4',COLORS.gold2); text(c,b,110,y+20,8.7,'F1',COLORS.white); y-=67}); if(imgs.bar) imageBox(c,'bar',imgs.bar,55,40,485,115); pdf.addPage(c,['bar']); await pdf.write(path.join(OUT,'aurelia-private-events-menu.pdf')) }

async function makeCatering(imgs){ const pdf=new PDFBuilder(); addBasicFonts(pdf); Object.entries(imgs).forEach(([n,i])=>pdf.addImage(n,i)); let c=[]; rect(c,0,0,595,842,COLORS.espresso); if(imgs.catering) imageBox(c,'catering',imgs.catering,0,0,595,842); rect(c,0,452,520,244,COLORS.espresso); brand(c,true); text(c,'CATERING',55,635,9,'F2',COLORS.gold2); text(c,'Aurelia beyond our doors.',55,575,36,'F4',COLORS.white); paragraph(c,'Restaurant-level food and hospitality for meetings, celebrations and hosted events.',55,545,10.5,'F1',[.9,.86,.8],72,15); pdf.addPage(c,['catering'])
  c=[]; rect(c,0,0,595,842,COLORS.paper); brand(c); text(c,'SERVICE STYLES',55,730,8,'F2',COLORS.coral); text(c,'Choose the rhythm',55,685,27,'F4',COLORS.ink); paragraph(c,'A flexible catering menu that scales from polished lunch delivery to fully hosted evening service.',55,660,9.5,'F1',COLORS.muted,75,14); ['food','catering','food2'].forEach((n,i)=>imageBox(c,n,imgs[n],55+i*165,525,150,105)); const packs=[['Working Lunch','$32 pp','Two mains, seasonal salad, side, cookies, sparkling water'],['Gathering Table','$48 pp','Three shared mains, two sides, salad, artisan bread, dessert bites'],['Cocktail Reception','$58 pp','Six passed canapes, two grazing stations, zero-proof welcome drink'],['Hosted Dinner','Custom','Chef-led plated or family-style menu with optional bar and service team']]; let y=440; packs.forEach(([n,p,d])=>{rect(c,55,y,485,70,[.985,.955,.91]); text(c,n,72,y+43,14,'F4',COLORS.ink); text(c,p,475,y+43,8.5,'F2',COLORS.wine); paragraph(c,d,72,y+22,7.5,'F1',COLORS.muted,70,10); y-=84}); pdf.addPage(c,['food','catering','food2'])
  c=[]; rect(c,0,0,595,842,COLORS.espresso); brand(c,true); text(c,'SAMPLE SELECTIONS',55,730,8,'F2',COLORS.gold2); text(c,'Built to mix + match',55,685,28,'F4',COLORS.white); paragraph(c,'A demo catering selection ready to be replaced with final chef packages and dietary options.',55,660,9,'F1',[.8,.74,.69],72,14); addMenuList(c,[['Passed + Grazing',[['Truffle Arancini','Wild mushroom, pecorino',''],['Mini Steak Crostini','Horseradish cream, herbs',''],['Citrus Prawn Skewer','Chilli, lime, coriander',''],['Whipped Feta Tartlet','Hot honey, pistachio','']]],['Mains',[['Herb Roasted Chicken','Pan jus, seasonal vegetables',''],['Braised Short Rib','Red wine glaze, potato puree',''],['Miso Black Cod','Sesame greens, citrus',''],['Wild Mushroom Pasta','Parmesan, herbs','']]],['Dessert Bites',[['Mini Tiramisu','Espresso, mascarpone',''],['Chocolate Tart','Sea salt, cocoa',''],['Citrus Panna Cotta','Berry compote','']]]],610,true); rect(c,55,52,485,70,[.19,.13,.10]); text(c,'SERVICE NOTES',72,94,8,'F2',COLORS.gold2); paragraph(c,'Vegetarian, vegan and allergy-aware options can be incorporated into final packages. Delivery, staffing, rentals and bar service are quoted separately unless included in the final scope.',72,75,7.5,'F1',[.78,.72,.68],86,11); pdf.addPage(c,[]); await pdf.write(path.join(OUT,'aurelia-catering-menu.pdf')) }

const imgs = {}
for (const [name,url] of Object.entries(PHOTO_URLS)) imgs[name] = await fetchJpeg(url)
await makeDining(imgs)
await makeEvents(imgs)
await makeCatering(imgs)
console.log('[menu-pdf] generated Aurelia dining, private events and catering PDFs')
