// Real beverage photography for the menu.
// LoremFlickr serves real Creative Commons Flickr photos by tags; locks keep each item stable.

const explicitTags = {
  'Golden Hour': 'bourbon,cocktail',
  'Velvet Night': 'gin,cocktail',
  'Aurelia Spritz': 'spritz,cocktail',
  'Midnight Garden': 'vodka,cocktail',
  'Smoked Old Fashioned': 'oldfashioned,cocktail',
  'Rosemary Paloma': 'paloma,cocktail',
  'Espresso Martini': 'espressomartini,cocktail',
  'Pear & Sage Sour': 'ginsour,cocktail',
  'Black Cherry Manhattan': 'manhattan,cocktail',
  'French 75': 'french75,cocktail',
  'Passionfruit Martini': 'passionfruit,cocktail',
  'Blood Orange Negroni': 'negroni,cocktail',
  'Maple Boulevardier': 'boulevardier,cocktail',
  'Lavender Collins': 'tomcollins,cocktail',
  'Spiced Pineapple Daiquiri': 'daiquiri,cocktail',
  'Paper Plane': 'paperplane,cocktail',
  'Mezcal Negroni': 'negroni,mezcal',
  'Lychee Martini': 'martini,cocktail',
  'Garden Tonic': 'mocktail,cucumber',
  'Blood Orange Fizz': 'mocktail,orange',
  'Pear & Ginger Cooler': 'mocktail,ginger',
  'No-Groni': 'mocktail,aperitif',
  'Pineapple Mint Highball': 'mocktail,pineapple',
  'Blackberry Sage Smash': 'mocktail,blackberry',
  'Citrus Spritz': 'mocktail,citrus',
  'Espresso Tonic': 'espresso,tonic',
  'Ruby Citrus': 'mocktail,citrus',
  'Pear Fizz': 'mocktail,pear',
  'Ginger Blossom': 'mocktail,ginger',
  'Pineapple Chili Cooler': 'mocktail,pineapple',
  'Blackberry Mint Smash': 'mocktail,blackberry',
  'House Lemonade': 'lemonade,drink',
  'Sparkling Brut': 'champagne,glass',
  'Prosecco Rosé': 'prosecco,wine',
  'Sauvignon Blanc': 'whitewine,glass',
  Chardonnay: 'whitewine,glass',
  'Pinot Grigio': 'whitewine,glass',
  Riesling: 'whitewine,glass',
  'Pinot Noir': 'redwine,glass',
  'Cabernet Sauvignon': 'redwine,glass',
  Malbec: 'redwine,glass',
  Tempranillo: 'redwine,glass',
  Syrah: 'redwine,glass',
  Rosé: 'rosewine,glass',
  'Champagne Reserve': 'champagne,glass',
  Sancerre: 'whitewine,glass',
  Chablis: 'whitewine,glass',
  Barolo: 'redwine,glass',
  'House Lager': 'lager,beer',
  'Aurelia House Lager': 'lager,beer',
  'Italian Pilsner': 'pilsner,beer',
  'Hazy IPA': 'ipa,beer',
  'West Coast IPA': 'ipa,beer',
  'Amber Ale': 'amberale,beer',
  'Dry Stout': 'stout,beer',
  'Belgian Witbier': 'witbier,beer',
  'Wheat Beer': 'wheatbeer,beer',
  Cider: 'cider,glass',
  'Pear Cider': 'pearcider,drink',
  'Apple Cider': 'applecider,drink',
  'Bourbon Flight': 'bourbon,whiskey',
  'Single Malt Flight': 'scotch,whisky',
  'Japanese Whisky': 'japanesewhisky,glass',
  'Aged Rum': 'rum,glass',
  'Dark Rum': 'rum,glass',
  'Reposado Tequila': 'tequila,glass',
  'Añejo Tequila': 'tequila,glass',
  Mezcal: 'mezcal,glass',
  'Small-Batch Gin': 'gin,glass',
  'Premium Gin': 'gin,glass',
  'Cognac XO': 'cognac,glass',
  'Cognac VSOP': 'cognac,glass',
  Espresso: 'espresso,coffee',
  Cappuccino: 'cappuccino,coffee',
  Affogato: 'affogato,coffee',
  'Irish Coffee': 'irishcoffee,drink',
  'Amaro Flight': 'amaro,glass',
  'Single Malt Pour': 'scotch,whisky',
  Cognac: 'cognac,glass',
  Port: 'portwine,glass',
  'Dessert Wine': 'dessertwine,glass',
  'Espresso Martini Flight': 'espressomartini,cocktail',
}

function stableLock(value) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash % 90000) + 1000
}

function inferredTags(name) {
  const value = name.toLowerCase()
  if (value.includes('martini')) return 'martini,cocktail'
  if (value.includes('negroni')) return 'negroni,cocktail'
  if (value.includes('spritz')) return 'spritz,cocktail'
  if (value.includes('whisky') || value.includes('whiskey') || value.includes('bourbon') || value.includes('malt')) return 'whisky,glass'
  if (value.includes('tequila')) return 'tequila,glass'
  if (value.includes('rum')) return 'rum,glass'
  if (value.includes('gin')) return 'gin,glass'
  if (value.includes('cognac')) return 'cognac,glass'
  if (value.includes('wine') || value.includes('champagne') || value.includes('prosecco')) return 'wine,glass'
  if (value.includes('beer') || value.includes('lager') || value.includes('ale') || value.includes('ipa') || value.includes('stout') || value.includes('pilsner')) return 'beer,glass'
  if (value.includes('cider')) return 'cider,glass'
  if (value.includes('coffee') || value.includes('espresso') || value.includes('cappuccino')) return 'coffee,drink'
  return 'cocktail,drink'
}

export function realDrinkPhoto(name) {
  const tags = explicitTags[name] || inferredTags(name)
  return `https://loremflickr.com/960/720/${tags}/all?lock=${stableLock(name)}`
}

export function enhanceDrinkPhotos(root = document) {
  const cards = root.querySelectorAll('.menu-drinks-active .menu-photo-card img')
  cards.forEach((image) => {
    const name = String(image.getAttribute('alt') || '').trim()
    if (!name || image.dataset.realDrinkPhoto === name) return
    image.dataset.realDrinkPhoto = name
    image.src = realDrinkPhoto(name)
    image.referrerPolicy = 'no-referrer'
  })
}
