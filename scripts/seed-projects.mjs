/**
 * One-off importer for the three projects that used to be hardcoded in
 * lib/translations.ts. Uploads the screenshots in /public as Sanity assets and
 * creates one `project` document per case study.
 *
 *   SANITY_WRITE_TOKEN=sk... npm run seed:projects
 *
 * Get a token at sanity.io/manage → API → Tokens (Editor permission).
 * Safe to re-run: projects that already exist are skipped. Pass --force to
 * replace them (this re-uploads the images).
 *
 * The copy below is a grounded first draft, written from the screenshots.
 * `metrics` and `testimonial` are deliberately left empty — those are factual
 * claims about real clients and should come from you, not from a draft.
 */
import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN.\n');
  console.error('  1. Go to https://sanity.io/manage → project 7xwwm6ye → API → Tokens');
  console.error('  2. Add a token with "Editor" permission');
  console.error('  3. SANITY_WRITE_TOKEN=sk... npm run seed:projects');
  process.exit(1);
}

const force = process.argv.includes('--force');

const client = createClient({
  projectId: '7xwwm6ye',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

/* -------------------------------------------------------------------------- */
/*  Content helpers                                                           */
/* -------------------------------------------------------------------------- */

let keyCounter = 0;
const key = () => `k${(keyCounter += 1).toString(36)}`;

/** Turn plain paragraphs into Portable Text blocks. */
const blocks = (...paragraphs) =>
  paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }));

const str = (en, fr, es) => ({ _type: 'localeString', en, fr, es });
const text = (en, fr, es) => ({ _type: 'localeText', en, fr, es });
const rich = (en, fr, es) => ({ _type: 'localeBlock', en, fr, es });
const chips = (...triples) =>
  triples.map(([en, fr, es]) => ({ ...str(en, fr, es), _key: key() }));

/* -------------------------------------------------------------------------- */
/*  The projects                                                              */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    _id: 'project-bs-move',
    title: 'BS Move',
    slug: 'bs-move',
    clientName: 'BS Move',
    service: 'web',
    year: 2025,
    orderRank: 10,
    featured: true,
    siteLink: 'https://bsmove.com/',
    cover: 'client-projects/web-dev/bs-move/pic1.png',
    gallery: [
      { image: 'client-projects/web-dev/bs-move/pic3.png', wide: false,
        caption: ['The furniture-lift configurator returns live availability and pricing.',
                  'Le configurateur monte-meuble renvoie disponibilité et prix en direct.',
                  'El configurador de montamuebles devuelve disponibilidad y precio en vivo.'] },
      { image: 'client-projects/web-dev/bs-move/pic2.png', wide: false,
        caption: ['Service pages carry the same quote entry point as the homepage.',
                  'Les pages service reprennent le même point d’entrée devis que l’accueil.',
                  'Las páginas de servicio repiten el mismo punto de entrada de presupuesto.'] },
      { image: 'client-projects/web-dev/bs-move/pic4.png', wide: true, caption: null },
      { video: 'client-projects/web-dev/bs-move/siteVisitr.webm', wide: true,
        poster: 'client-projects/web-dev/bs-move/pic1.png',
        caption: ['A walkthrough of the quote flow, end to end.',
                  'Parcours complet du tunnel de devis.',
                  'Recorrido completo del flujo de presupuesto.'] },
    ],
    tagline: str(
      'A moving company website where the quote is the homepage.',
      'Un site de déménagement où le devis est la page d’accueil.',
      'Una web de mudanzas donde el presupuesto es la página de inicio.'
    ),
    summary: text(
      'BS Move is a French moving company working across 24 agencies. We rebuilt their site around a single idea: a visitor should be able to price their move before they ever pick up the phone.',
      'BS Move est une entreprise de déménagement française présente dans 24 agences. Nous avons reconstruit leur site autour d’une seule idée : le visiteur doit pouvoir chiffrer son déménagement avant même de décrocher son téléphone.',
      'BS Move es una empresa de mudanzas francesa con 24 agencias. Reconstruimos su web en torno a una sola idea: el visitante debe poder calcular el precio de su mudanza antes de coger el teléfono.'
    ),
    sector: str('Moving & logistics', 'Déménagement & logistique', 'Mudanzas y logística'),
    duration: str('8 weeks', '8 semaines', '8 semanas'),
    deliverables: chips(
      ['UI design', 'Design UI', 'Diseño UI'],
      ['Frontend', 'Frontend', 'Frontend'],
      ['Quote calculator', 'Calculateur de devis', 'Calculadora de presupuestos'],
      ['Transactional email', 'E-mails transactionnels', 'Emails transaccionales'],
      ['Blog', 'Blog', 'Blog'],
      ['SEO', 'SEO', 'SEO']
    ),
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Nodemailer'],
    challenge: rich(
      blocks(
        'Moving quotes are traditionally a phone call and a wait. BS Move was fielding the same questions on every call — where from, where to, which floor, how much volume, is there a courtyard — and turning the answers into an estimate by hand.',
        'All of that happened after the visitor had already left the site. Anyone unwilling to call simply never became a lead, and the agency had no way of knowing how many of those there were.'
      ),
      blocks(
        'Un devis de déménagement, c’est traditionnellement un appel puis une attente. BS Move reposait les mêmes questions à chaque appel — départ, arrivée, étage, volume, cour ou passage — puis transformait les réponses en estimation à la main.',
        'Tout cela se passait après que le visiteur avait quitté le site. Ceux qui ne voulaient pas appeler ne devenaient jamais des prospects, et l’agence n’avait aucun moyen de savoir combien ils étaient.'
      ),
      blocks(
        'Un presupuesto de mudanza es, tradicionalmente, una llamada y una espera. BS Move repetía las mismas preguntas en cada llamada — origen, destino, planta, volumen, si hay patio — y convertía las respuestas en una estimación a mano.',
        'Todo eso ocurría después de que el visitante ya se había ido de la web. Quien no quería llamar nunca llegaba a ser un contacto, y la agencia no tenía forma de saber cuántos eran.'
      )
    ),
    approach: rich(
      blocks(
        'The quote calculator became the centre of the homepage rather than a page buried in the navigation. Departure and arrival addresses autocomplete against French postal data, and the form asks only what actually moves the price: floor count, handling time, crew size, and whether there is a passage or a courtyard.',
        'Two secondary configurators follow the same pattern for furniture-lift and truck rental, each returning live availability and an instant price instead of a promise to get back to you.',
        'Every submitted quote fires a branded transactional email to the customer and a structured internal notification to the agency, so no detail is ever retyped.'
      ),
      blocks(
        'Le calculateur de devis est devenu le centre de la page d’accueil, et non une page enfouie dans la navigation. Les adresses de départ et d’arrivée s’autocomplètent sur les données postales françaises, et le formulaire ne demande que ce qui fait vraiment varier le prix : nombre d’étages, durée de manutention, nombre de déménageurs, et présence d’un passage ou d’une cour.',
        'Deux configurateurs secondaires reprennent le même principe pour la location de monte-meuble et de camion, chacun renvoyant la disponibilité réelle et un prix immédiat plutôt qu’une promesse de rappel.',
        'Chaque devis envoyé déclenche un e-mail transactionnel aux couleurs de la marque pour le client, et une notification interne structurée pour l’agence : plus rien n’est ressaisi.'
      ),
      blocks(
        'La calculadora de presupuestos pasó a ser el centro de la página de inicio, en lugar de una página escondida en el menú. Las direcciones de origen y destino se autocompletan con datos postales franceses, y el formulario solo pregunta lo que de verdad cambia el precio: número de plantas, duración de la manipulación, número de operarios y si hay pasaje o patio.',
        'Dos configuradores secundarios siguen el mismo patrón para el alquiler de montamuebles y de camión, y cada uno devuelve disponibilidad real y precio inmediato en vez de una promesa de llamada.',
        'Cada presupuesto enviado dispara un email transaccional con la marca para el cliente y una notificación interna estructurada para la agencia, así no se reescribe ningún dato.'
      )
    ),
    outcome: rich(
      blocks(
        'Enquiries now arrive complete and already priced. The team opens a request that has an address, a volume, a date and a crew size attached, rather than a name and a phone number.',
        'The site also carries the whole top of the funnel — dedicated service pages for furniture-lift and truck rental, and a blog that gives the agency something to rank on beyond its own brand name.'
      ),
      blocks(
        'Les demandes arrivent désormais complètes et déjà chiffrées. L’équipe ouvre une demande accompagnée d’une adresse, d’un volume, d’une date et d’un nombre de déménageurs, plutôt qu’un nom et un numéro.',
        'Le site porte aussi tout le haut du tunnel : des pages dédiées à la location de monte-meuble et de camion, et un blog qui donne à l’agence de quoi se positionner au-delà de son seul nom de marque.'
      ),
      blocks(
        'Las solicitudes llegan completas y ya presupuestadas. El equipo abre una petición que trae dirección, volumen, fecha y número de operarios, en lugar de un nombre y un teléfono.',
        'La web sostiene además toda la parte alta del embudo: páginas dedicadas al alquiler de montamuebles y de camión, y un blog que le da a la agencia con qué posicionarse más allá de su propia marca.'
      )
    ),
  },

  {
    _id: 'project-cargoflow',
    title: 'CargoFlow',
    slug: 'cargoflow',
    clientName: 'BS Move',
    service: 'saas',
    year: 2026,
    orderRank: 20,
    featured: true,
    siteLink: null,
    cover: 'saas-projects/cargoflow/front.png',
    gallery: [
      { image: 'saas-projects/cargoflow/02.png', wide: true,
        caption: ['Every move is a dossier moving through one pipeline.',
                  'Chaque déménagement est un dossier qui avance dans un seul pipeline.',
                  'Cada mudanza es un expediente que avanza por un único flujo.'] },
    ],
    tagline: str(
      'The operations platform a moving company runs its day on.',
      'La plateforme sur laquelle une entreprise de déménagement pilote sa journée.',
      'La plataforma con la que una empresa de mudanzas gestiona su día.'
    ),
    summary: text(
      'CargoFlow turns a moving company’s whole pipeline — quotes, jobs, crews, vehicles and storage — into a single dashboard. It grew out of the operational work we saw behind BS Move.',
      'CargoFlow réunit tout le pipeline d’une entreprise de déménagement — devis, dossiers, équipes, véhicules et garde-meuble — dans un seul tableau de bord. Il est né du travail opérationnel observé derrière BS Move.',
      'CargoFlow reúne todo el flujo de una empresa de mudanzas — presupuestos, expedientes, equipos, vehículos y guardamuebles — en un solo panel. Nació del trabajo operativo que vimos detrás de BS Move.'
    ),
    sector: str('Moving & logistics', 'Déménagement & logistique', 'Mudanzas y logística'),
    duration: str('Ongoing', 'En cours', 'En curso'),
    deliverables: chips(
      ['Product design', 'Design produit', 'Diseño de producto'],
      ['Frontend', 'Frontend', 'Frontend'],
      ['Backend', 'Backend', 'Backend'],
      ['Dashboard', 'Tableau de bord', 'Panel de control'],
      ['Scheduling', 'Planification', 'Planificación'],
      ['Multi-tenant', 'Multi-tenant', 'Multi-tenant']
    ),
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    challenge: rich(
      blocks(
        'A moving company’s day is a scheduling problem wearing a spreadsheet. Quotes sit in an inbox, jobs in a calendar, crew availability in someone’s head, and revenue in an accounting tool that only catches up at the end of the month.',
        'The real cost is not the admin time. It is the job that goes out understaffed because nobody noticed that three dossiers on the same morning had no crew assigned.'
      ),
      blocks(
        'La journée d’une entreprise de déménagement est un problème de planification déguisé en tableur. Les devis dorment dans une boîte mail, les chantiers dans un agenda, la disponibilité des équipes dans la tête de quelqu’un, et le chiffre d’affaires dans un outil comptable qui ne se met à jour qu’en fin de mois.',
        'Le vrai coût n’est pas le temps administratif. C’est le chantier qui part en sous-effectif parce que personne n’a vu que trois dossiers du même matin n’avaient pas d’équipe affectée.'
      ),
      blocks(
        'El día de una empresa de mudanzas es un problema de planificación disfrazado de hoja de cálculo. Los presupuestos viven en un buzón, los trabajos en un calendario, la disponibilidad del equipo en la cabeza de alguien, y la facturación en una herramienta contable que solo se pone al día a fin de mes.',
        'El coste real no es el tiempo administrativo. Es el trabajo que sale con poco personal porque nadie vio que tres expedientes de la misma mañana no tenían equipo asignado.'
      )
    ),
    approach: rich(
      blocks(
        'Every move is a dossier with a reference, a route, a volume, a date, a crew and an amount, and it travels through one pipeline: pending, confirmed, staffed, in progress, completed, cancelled. Filtering by stage is how the week gets planned.',
        'The dashboard answers the four questions an operator actually asks each morning — what is booked today, what is still unstaffed, which quotes are waiting on a client, and who is available. Anything that needs attention surfaces itself rather than waiting to be searched for.',
        'Around that core sit the adjacent services these companies sell: vehicle rental, a materials shop, and storage. Revenue is computed from the same dossiers, so the monthly figure is live rather than reconciled after the fact.'
      ),
      blocks(
        'Chaque déménagement est un dossier avec une référence, un trajet, un volume, une date, une équipe et un montant, et il avance dans un pipeline unique : en attente, confirmé, staffé, en cours, terminé, annulé. C’est en filtrant par étape que la semaine se planifie.',
        'Le tableau de bord répond aux quatre questions qu’un exploitant se pose vraiment chaque matin : qu’est-ce qui part aujourd’hui, qu’est-ce qui n’a pas encore d’équipe, quels devis attendent une réponse client, et qui est disponible. Ce qui demande une action remonte de lui-même au lieu d’être cherché.',
        'Autour de ce noyau viennent les services annexes que ces entreprises vendent : location de véhicules, boutique de fournitures et garde-meuble. Le chiffre d’affaires est calculé à partir des mêmes dossiers, donc le montant du mois est vivant plutôt que reconstitué après coup.'
      ),
      blocks(
        'Cada mudanza es un expediente con referencia, trayecto, volumen, fecha, equipo e importe, y avanza por un único flujo: pendiente, confirmado, con equipo, en curso, finalizado, cancelado. Filtrar por etapa es la forma de planificar la semana.',
        'El panel responde a las cuatro preguntas que un responsable se hace de verdad cada mañana: qué sale hoy, qué sigue sin equipo, qué presupuestos esperan respuesta del cliente y quién está disponible. Lo que requiere atención aparece solo, en lugar de haber que buscarlo.',
        'Alrededor de ese núcleo están los servicios que estas empresas también venden: alquiler de vehículos, tienda de materiales y guardamuebles. La facturación se calcula desde los mismos expedientes, así que la cifra del mes está viva y no se reconstruye después.'
      )
    ),
    outcome: rich(
      blocks(
        'Operators plan the week from one screen instead of four tools. Unstaffed jobs and stale quotes are visible before they turn into problems, and the revenue figure is current rather than a month behind.',
        'CargoFlow is built multi-tenant, so it is deployed per moving company rather than rebuilt for each one.'
      ),
      blocks(
        'Les exploitants planifient la semaine depuis un seul écran au lieu de quatre outils. Les dossiers sans équipe et les devis dormants sont visibles avant de devenir des problèmes, et le chiffre d’affaires est à jour plutôt qu’en retard d’un mois.',
        'CargoFlow est conçu en multi-tenant : il se déploie pour chaque entreprise de déménagement au lieu d’être reconstruit à chaque fois.'
      ),
      blocks(
        'Los responsables planifican la semana desde una sola pantalla en lugar de cuatro herramientas. Los trabajos sin equipo y los presupuestos parados se ven antes de convertirse en problemas, y la cifra de facturación está al día en vez de ir un mes por detrás.',
        'CargoFlow es multi-tenant, así que se despliega para cada empresa de mudanzas en lugar de reconstruirse cada vez.'
      )
    ),
  },

  {
    _id: 'project-emsg-mansour',
    title: 'EMSG Mansour',
    slug: 'emsg-mansour',
    clientName: 'EMSG Mansour',
    service: 'web',
    year: 2025,
    orderRank: 30,
    featured: false,
    siteLink: null,
    cover: 'client-projects/web-dev/emsg/pic1.png',
    gallery: [
      { image: 'client-projects/web-dev/emsg/pic2.png', wide: false, caption: null },
      { image: 'client-projects/web-dev/emsg/pic3.png', wide: false, caption: null },
      { image: 'client-projects/web-dev/emsg/pic4.png', wide: true, caption: null },
    ],
    tagline: str(
      'A parts catalogue and B2B portal for Algeria’s largest German auto-parts importer.',
      'Un catalogue de pièces et un espace B2B pour le premier importateur algérien de pièces allemandes.',
      'Un catálogo de piezas y un portal B2B para el mayor importador argelino de recambios alemanes.'
    ),
    summary: text(
      'EMSG Mansour has imported and distributed German automotive parts in Algeria since 1989. We built the public catalogue and the B2B space their professional customers order through.',
      'EMSG Mansour importe et distribue des pièces automobiles allemandes en Algérie depuis 1989. Nous avons construit le catalogue public et l’espace B2B par lequel commandent leurs clients professionnels.',
      'EMSG Mansour importa y distribuye recambios de automoción alemanes en Argelia desde 1989. Construimos el catálogo público y el espacio B2B por el que piden sus clientes profesionales.'
    ),
    sector: str('Automotive parts', 'Pièces automobiles', 'Recambios de automoción'),
    duration: str('10 weeks', '10 semaines', '10 semanas'),
    deliverables: chips(
      ['UI design', 'Design UI', 'Diseño UI'],
      ['Frontend', 'Frontend', 'Frontend'],
      ['Parts catalogue', 'Catalogue de pièces', 'Catálogo de piezas'],
      ['B2B portal', 'Espace B2B', 'Portal B2B'],
      ['Store locator', 'Localisateur de magasins', 'Localizador de tiendas'],
      ['SEO', 'SEO', 'SEO']
    ),
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    challenge: rich(
      blocks(
        'A parts business lives or dies on whether a mechanic can find the exact reference for a specific car. EMSG Mansour’s customers — garages, resellers and private owners — were phoning branches to ask whether a part existed and which store had it.',
        'The company also runs two very different relationships at once: walk-in retail across its stores, and standing accounts with professional buyers. One public website had to serve both without confusing either.'
      ),
      blocks(
        'Un commerce de pièces détachées vit ou meurt selon qu’un mécanicien trouve ou non la référence exacte pour un véhicule précis. Les clients d’EMSG Mansour — garages, revendeurs et particuliers — appelaient les agences pour savoir si une pièce existait et quel magasin l’avait.',
        'L’entreprise gère aussi deux relations très différentes en parallèle : la vente au comptoir dans ses magasins, et des comptes ouverts avec des acheteurs professionnels. Un seul site public devait servir les deux sans embrouiller ni l’un ni l’autre.'
      ),
      blocks(
        'Un negocio de recambios vive o muere según si un mecánico encuentra la referencia exacta para un coche concreto. Los clientes de EMSG Mansour — talleres, distribuidores y particulares — llamaban a las sucursales para saber si una pieza existía y qué tienda la tenía.',
        'La empresa mantiene además dos relaciones muy distintas a la vez: venta de mostrador en sus tiendas y cuentas abiertas con compradores profesionales. Una sola web pública tenía que servir a ambos sin confundir a ninguno.'
      )
    ),
    approach: rich(
      blocks(
        'The catalogue is searchable the way the trade actually works: by part code, by category, by brand and by model year, in any combination. Results resolve to a single part with its compatibility, so there is no ambiguity about fitment.',
        'Professional customers get a separate authenticated B2B space, reachable from every page but walled off from the public catalogue, where their pricing and order history live.',
        'Around that sit the pieces a company trading since 1989 needs in order to look its age in a good way: a store locator, a partners page for the German marques it represents, and a news section.'
      ),
      blocks(
        'Le catalogue se cherche comme le métier fonctionne réellement : par code pièce, par catégorie, par marque et par année, dans n’importe quelle combinaison. Les résultats mènent à une pièce unique et à sa compatibilité, sans ambiguïté sur le montage.',
        'Les clients professionnels disposent d’un espace B2B authentifié séparé, accessible depuis chaque page mais cloisonné du catalogue public, où vivent leurs tarifs et leur historique de commandes.',
        'Autour viennent les éléments dont une maison qui commerce depuis 1989 a besoin pour afficher son ancienneté à son avantage : un localisateur de magasins, une page partenaires pour les marques allemandes représentées, et une rubrique actualités.'
      ),
      blocks(
        'El catálogo se busca como funciona el oficio de verdad: por código de pieza, por categoría, por marca y por año, en cualquier combinación. Los resultados llevan a una pieza única con su compatibilidad, sin ambigüedad sobre el montaje.',
        'Los clientes profesionales tienen un espacio B2B autenticado aparte, accesible desde cualquier página pero separado del catálogo público, donde están sus precios y su historial de pedidos.',
        'Alrededor están las piezas que una casa que comercia desde 1989 necesita para lucir su antigüedad a favor: un localizador de tiendas, una página de socios para las marcas alemanas que representa y una sección de actualidad.'
      )
    ),
    outcome: rich(
      blocks(
        'The phone is no longer the search index. Customers arrive at a branch already knowing the part exists, and professional buyers place orders without a call.',
        'The site trades in French, matching how the business actually operates, and is structured so each part category can rank on its own rather than relying on the brand name.'
      ),
      blocks(
        'Le téléphone n’est plus le moteur de recherche. Les clients arrivent en magasin en sachant déjà que la pièce existe, et les acheteurs professionnels passent commande sans appeler.',
        'Le site est en français, à l’image de la manière dont l’entreprise travaille réellement, et il est structuré pour que chaque catégorie de pièces se positionne d’elle-même plutôt que de dépendre du nom de la marque.'
      ),
      blocks(
        'El teléfono ya no es el buscador. Los clientes llegan a la tienda sabiendo que la pieza existe, y los compradores profesionales hacen pedidos sin llamar.',
        'La web está en francés, como opera realmente el negocio, y está estructurada para que cada categoría de piezas posicione por sí misma en vez de depender del nombre de la marca.'
      )
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Upload + create                                                           */
/* -------------------------------------------------------------------------- */

async function upload(kind, relPath) {
  const buffer = await readFile(path.join(PUBLIC_DIR, relPath));
  const asset = await client.assets.upload(kind, buffer, {
    filename: path.basename(relPath),
  });
  return asset._id;
}

const imageRef = (assetId) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
});

async function buildGallery(items) {
  const out = [];
  for (const item of items) {
    const caption = item.caption ? str(...item.caption) : undefined;

    if (item.video) {
      const [fileId, posterId] = await Promise.all([
        upload('file', item.video),
        item.poster ? upload('image', item.poster) : Promise.resolve(null),
      ]);
      out.push({
        _type: 'galleryVideo',
        _key: key(),
        file: { _type: 'file', asset: { _type: 'reference', _ref: fileId } },
        ...(posterId ? { poster: imageRef(posterId) } : {}),
        ...(caption ? { caption } : {}),
        wide: item.wide ?? true,
      });
      continue;
    }

    const assetId = await upload('image', item.image);
    out.push({
      ...imageRef(assetId),
      _type: 'galleryImage',
      _key: key(),
      ...(caption ? { caption } : {}),
      wide: item.wide ?? false,
    });
  }
  return out;
}

async function seed() {
  const existing = await client.fetch(
    `*[_type == "project" && _id in $ids]._id`,
    { ids: PROJECTS.map((p) => p._id) }
  );

  for (const project of PROJECTS) {
    if (existing.includes(project._id) && !force) {
      console.log(`↷ ${project.title} — already in Sanity, skipping (use --force to replace)`);
      continue;
    }

    console.log(`↑ ${project.title} — uploading media…`);
    const [coverId, gallery] = await Promise.all([
      upload('image', project.cover),
      buildGallery(project.gallery),
    ]);

    const doc = {
      _id: project._id,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      clientName: project.clientName,
      service: project.service,
      tagline: project.tagline,
      summary: project.summary,
      sector: project.sector,
      year: project.year,
      duration: project.duration,
      deliverables: project.deliverables,
      techStack: project.techStack,
      ...(project.siteLink ? { siteLink: project.siteLink } : {}),
      challenge: project.challenge,
      approach: project.approach,
      outcome: project.outcome,
      coverImage: imageRef(coverId),
      gallery,
      featured: project.featured,
      orderRank: project.orderRank,
      publishedAt: new Date().toISOString(),
      // metrics + testimonial intentionally omitted — add real ones in the studio.
    };

    await client.createOrReplace(doc);
    console.log(`✓ ${project.title} → /realisations/${project.slug}`);
  }

  console.log('\nDone. Open /studio to edit, and /realisations to see them.');
  console.log('Still to fill in by hand: Results (metrics) and Testimonial for each project.');
}

seed().catch((error) => {
  console.error('\nSeed failed:', error.message);
  process.exit(1);
});
