const icfCodes = [
  // Functies (1-14)
  { id: 'b1261', name: 'Inschikkelijkheid', slug: 'inschikkelijkheid', icf_category_id: 1 },
  { id: 'b1262', name: 'Nauwgezetheid ', slug: 'nauwgezetheid', icf_category_id: 1 },
  { id: 'b1263', name: 'Psychische stabiliteit', slug: 'psychische-stabiliteit', icf_category_id: 1 },
  { id: 'b1266', name: 'Vertrouwen', slug: 'vertrouwen', icf_category_id: 1 },
  { id: 'b1267', name: 'Betrouwbaarheid', slug: 'betrouwbaarheid', icf_category_id: 1 },
  { id: 'b1301', name: 'Motivatie', slug: 'motivatie', icf_category_id: 1 },
  { id: 'b1303', name: 'Hunkering', slug: 'hunkering', icf_category_id: 1 },
  { id: 'b1304', name: 'Driftbeheersing', slug: 'driftbeheersing', icf_category_id: 1 },
  { id: 'b1400', name: 'Vasthouden van aandacht', slug: 'vasthouden-van-aandacht', icf_category_id: 1 },
  { id: 'b1642', name: 'Tijdmanagement', slug: 'tijdmanagement', icf_category_id: 1 },
  { id: 'b1643', name: 'Cognitieve flexibiliteit', slug: 'cognitieve-ﬂexibiliteit', icf_category_id: 1 },
  { id: 'b1644', name: 'Inzicht', slug: 'inzicht', icf_category_id: 1 },
  { id: 'b280', name: 'Pijngewaarwording', slug: 'pijngewaarwording', icf_category_id: 1 },
  { id: 'b4550', name: 'Algemeen fysiek uithoudingsvermogen', slug: 'algemeen-fysiek-uithoudingsvermogen', icf_category_id: 1 },
  // Activiteiten en participatie (15-27)
  { id: 'd155', name: 'Ontwikkelen van vaardigheden', slug: 'ontwikkelen-van-vaardigheden', icf_category_id: 2 },
  { id: 'd179', name: 'Toepassen van kennis', slug: 'toepassen-van-kennis', icf_category_id: 2 },
  { id: 'd172', name: 'Rekenen', slug: 'rekenen', icf_category_id: 2 },
  { id: 'd175', name: 'Oplossen van problemen', slug: 'oplossen-van-problemen', icf_category_id: 2 },
  { id: 'd177', name: 'Besluiten nemen', slug: 'besluiten-nemen', icf_category_id: 2 },
  { id: 'd240', name: 'Omgaan met stress', slug: 'omgaan-met-stress', icf_category_id: 2 },
  { id: 'd499', name: 'Mobiliteit', slug: 'mobiliteit', icf_category_id: 2 },
  { id: 'd520', name: 'Verzorgen van lichaamsdelen', slug: 'verzorgen-van-lichaamsdelen', icf_category_id: 2 },
  { id: 'd570', name: 'Zorgdragen voor eigen gezondheid', slug: 'zorgdragen-voor-eigen-gezondheid', icf_category_id: 2 },
  { id: 'd610', name: 'Verwerven van woonruimte', slug: 'verwerven-van-woonruimte', icf_category_id: 2 },
  { id: 'd7200', name: 'Aangaan van relaties', slug: 'aangaan-van-relaties', icf_category_id: 2 },
  { id: 'd870', name: 'Economische zelfstandigheid', slug: 'economische-zelfstandigheid', icf_category_id: 2 },
  { id: 'd9205', name: 'Sociale activiteiten', slug: 'sociale-activiteiten', icf_category_id: 2 },
  // Omgevingsfactoren en externe factoren (28-34)
  { id: 'e310', name: 'Ondersteuning en relatie met naaste familie', slug: 'ondersteuning-en-relatie-met-naaste-familie', icf_category_id: 3 },
  { id: 'e320', name: 'Ondersteuning en relatie met vrienden', slug: 'ondersteuning-en-relatie-met-vrienden', icf_category_id: 3 },
  { id: 'e325', name: 'Ondersteuning en relatie met collega\'s', slug: 'ondersteuning-en-relatie-met-collegas', icf_category_id: 3 },
  { id: 'e330', name: 'Ondersteuning en relatie met meerderen', slug: 'ondersteuning-en-relatie-met-meerderen', icf_category_id: 3 },
  { id: 'e360', name: 'Ondersteuning en relatie met andere dienstverleners', slug: 'ondersteuning-en-relatie-met-andere-dienstverleners', icf_category_id: 3 },
  { id: 'e460', name: 'Maatschappelijke attitudes', slug: 'maatschappelijke-attitudes', icf_category_id: 3 },
  { id: 'e199', name: 'Producten en technologie', slug: 'producten-en-technologie', icf_category_id: 3 },
  // Persoonlijke factoren (35-40)
  { id: 'x1', name: 'Werkervaring', slug: 'werkervaring', icf_category_id: 4 },
  { id: 'x2', name: 'Opleiding', slug: 'opleiding', icf_category_id: 4 },
  { id: 'x3', name: 'Gezinslast', slug: 'gezinslast', icf_category_id: 4 },
  { id: 'x4', name: 'Copingstijl', slug: 'copingstijl', icf_category_id: 4 },
  { id: 'x5', name: 'Kennis van de Nederlandse taal', slug: 'kennis-van-de-nederlandse-taal', icf_category_id: 4 },
  { id: 'x6', name: 'Medische factoren', slug: 'medische-factoren', icf_category_id: 4 },
  // Andere werkvaardigheden (41-43)
  { id: 'x7', name: 'Fijne motoriek', slug: 'fijne-motoriek', icf_category_id: 5 },
  { id: 'x8', name: 'Grove motoriek ', slug: 'grove-motoriek', icf_category_id: 5 },
  { id: 'x9', name: 'Werktempo', slug: 'werktempo', icf_category_id: 5 },
];

export default icfCodes

/*

  { id: '', name: '', slug: '', icf_category_id: null },

*/

