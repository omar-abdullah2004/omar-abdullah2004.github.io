"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";

const cafeDesigns = [
  { file: "1.webp", title: "Brand atmosphere", alt: "Y Café orange logo on a warmly lit brown feature wall" },
  { file: "2.webp", title: "A splash of color", alt: "Layered pink and green Y Café drink with a colorful splash" },
  { file: "3.webp", title: "Made to crave", alt: "Hands holding two halves of a filled Y Café sandwich" },
  { file: "4.webp", title: "Fresh perspective", alt: "Green iced Y Café drink with lime on a stone pedestal against an orange background" },
  { file: "5.webp", title: "A moment to share", alt: "Two people sharing pink Y Café ice cream over the hood of a green car" },
  { file: "8.webp", title: "Summer on ice", alt: "Colorful Y Café drinks nestled in ice in an orange cooler" },
  { file: "7.webp", title: "The golden hour", alt: "A spoonful of berry dessert at an outdoor table at sunset" },
  { file: "6.webp", title: "Bright refreshment", alt: "Pink Y Café iced drink with lemon slices and mint on a sunlit table" },
  { file: "9.webp", title: "One more spoonful", alt: "Hands holding a chocolate dessert and spoon against an orange background" },
  { file: "overview.webp", title: "July calendar overview", alt: "The complete nine-design Y Café July content calendar arranged in a three-by-three grid" },
];

const greatDesigns = [
  { file: "1.webp", title: "Everyday comfort", alt: "GREAT wall-mounted air conditioner in a bright living room with Arabic messaging about affordable summer comfort" },
  { file: "2.webp", title: "Quiet nights", alt: "GREAT air conditioner above a sleeping person with Arabic messaging about quiet nighttime cooling" },
  { file: "3.webp", title: "Beat the heat", alt: "GREAT air conditioner contrasting warm outdoor sunlight with blue indoor cooling and Arabic summer messaging" },
  { file: "4.webp", title: "A room for every moment", alt: "Black GREAT air conditioner above bedroom, living room, and office scenes with Arabic copy" },
  { file: "5.webp", title: "Cool and quiet", alt: "White GREAT portable air conditioner with blue airflow graphics and Arabic messaging about fast, quiet cooling" },
  { file: "6.webp", title: "Comfort at work", alt: "Black GREAT air conditioner in a conference room with Arabic messaging about workplace cooling" },
  { file: "7.webp", title: "Cooling that moves", alt: "GREAT portable air conditioner connecting bedroom and office scenes with blue airflow graphics and Arabic text" },
  { file: "8.webp", title: "Summer without the worry", alt: "GREAT air conditioner with a summer heat comparison and electricity savings graphics in Arabic" },
  { file: "9.webp", title: "Comfort in every corner", alt: "GREAT air conditioner in a living room with bedroom and reading corner insets and Arabic messaging" },
  { file: "10.webp", title: "Ready to refresh", alt: "GREAT glass-door minibar filled with bottled drinks in a warm hotel interior with Arabic copy" },
  { file: "11.webp", title: "Made for business", alt: "GREAT minibar in a meeting room with Arabic messaging for hotels, offices, and conference spaces" },
  { file: "12.webp", title: "A warm welcome", alt: "GREAT minibar filled with drinks in a hospitality setting with Arabic messaging about welcoming guests" },
  { file: "overview.webp", title: "August calendar overview", alt: "Complete twelve-design GREAT August social content calendar in a three-column grid" },
];

const nafeesahDesigns = [
  { file: "1.webp", title: "A sweet welcome", alt: "Assorted pastries on a white plate beside Arabic coffee, framed by golden curtains and a burgundy backdrop" },
  { file: "2.webp", title: "A box to share", alt: "Open burgundy Nafeesah gift box with assorted chocolate-coated sweets against gold fabric" },
  { file: "3.webp", title: "The Eid table", alt: "Nafeesah pastry packaging and sweets displayed on gold serving stands with a coffee pot" },
  { file: "4.webp", title: "Made for gathering", alt: "A silver tray of filled pastries with Nafeesah packaging and Arabic coffee against gold curtains" },
  { file: "5.webp", title: "Tradition, served", alt: "Nafeesah pastry boxes and an ornate tray of Eid sweets beside a gold coffee pot" },
  { file: "6.webp", title: "Flavors of celebration", alt: "Filled pastries and open Nafeesah packaging with coffee cups in a gold and burgundy setting" },
  { file: "7.webp", title: "A festive selection", alt: "A box and plate of powdered pastries on a table draped in gold fabric with Arabic coffee" },
  { file: "8.webp", title: "The gift of sweetness", alt: "Ribbon-wrapped sweets on a gold pedestal with a Nafeesah-branded ribbon and Arabic coffee" },
  { file: "9.webp", title: "Golden moments", alt: "An open Nafeesah pastry box, assorted sweets, and a gold coffee pot beneath golden curtains" },
  { file: "10.webp", title: "An invitation to share", alt: "A plate piled with small pastries beside Arabic coffee cups and an ornate coffee pot" },
  { file: "11.webp", title: "A taste of tradition", alt: "A gold-rimmed plate of flaky pastries with pistachio garnish beside Arabic coffee" },
  { file: "12.webp", title: "Wrapped for Eid", alt: "Burgundy Nafeesah gift packaging and an open box of assorted sweets in a gold and burgundy setting" },
  { file: "13.webp", title: "Celebration in every detail", alt: "Nafeesah gift boxes, a plate of assorted sweets, and coffee cups in an Eid table arrangement" },
];

const ramadanDesigns = [
  {
    "file": "1.webp",
    "title": "Golden refreshment",
    "alt": "Nafeesah layered dessert cup with a golden fruit topping beside a lit lantern and gold crescent"
  },
  {
    "file": "2.webp",
    "title": "A crescent of sweetness",
    "alt": "Crescent-shaped layered dessert on beige linen beside a brass Ramadan lantern"
  },
  {
    "file": "3.webp",
    "title": "Pistachio moments",
    "alt": "Rectangular shredded-pastry dessert topped with pistachios beside a white lantern and gold crescent"
  },
  {
    "file": "4.webp",
    "title": "Made for sharing",
    "alt": "Golden folded pastries arranged on a rectangular plate with pistachios, lantern light, and crescent ornaments"
  },
  {
    "file": "5.webp",
    "title": "Two sweet stories",
    "alt": "Two shredded-pastry nests with crumble and chocolate fillings on a white plate beside a gold lantern"
  },
  {
    "file": "6.webp",
    "title": "A golden centerpiece",
    "alt": "Round shredded-pastry dessert with crushed pistachios on a white plate beside a glowing lantern"
  },
  {
    "file": "7.webp",
    "title": "A festive finish",
    "alt": "Nafeesah dessert cup topped with cream, pistachios, and a red cherry beside a white lantern"
  },
  {
    "file": "8.webp",
    "title": "Layers of indulgence",
    "alt": "Layered chocolate dessert topped with cookie pieces and chocolate beside a gold lantern and crescent"
  },
  {
    "file": "9.webp",
    "title": "After-iftar sweetness",
    "alt": "Crescent-shaped layered dessert on a patterned white plate with a gold crescent and lantern"
  },
  {
    "file": "10.webp",
    "title": "Gather around",
    "alt": "Cream-filled folded pastries edged with pistachios arranged around syrup on a white plate"
  }
];

const izhimanDesigns = [
  {
    "file": "1.webp",
    "title": "Coffee with a view",
    "alt": "Red Izhiman coffee packaging and a small cup on a stone ledge with Jerusalem architecture in the background"
  },
  {
    "file": "2.webp",
    "title": "Little moments of joy",
    "alt": "Two children holding Izhiman chocolate bars in a sunlit stone courtyard"
  },
  {
    "file": "3.webp",
    "title": "A daily ritual",
    "alt": "Hands stirring a glass of red tea beside Izhiman tea packaging on a light tabletop"
  },
  {
    "file": "4.webp",
    "title": "Pour a little calm",
    "alt": "Tea being poured from a glass teapot beside Izhiman tea packaging in a leafy garden setting"
  },
  {
    "file": "5.webp",
    "title": "A familiar welcome",
    "alt": "A hand holding a Turkish coffee cup beside Izhiman coffee packaging and coffee beans on a gold tray"
  },
  {
    "file": "6.webp",
    "title": "Better in good company",
    "alt": "Four women gathering in a living room with Izhiman Turkish coffee packaging and cups on a serving tray"
  },
  {
    "file": "7.webp",
    "title": "Your morning, reimagined",
    "alt": "A black capsule coffee machine beside Izhiman capsule packaging with an espresso cup on the counter"
  },
  {
    "file": "8.webp",
    "title": "A little indulgence",
    "alt": "Chocolate-coated nuts falling into a glass bowl with cut pieces revealing their centers"
  },
  {
    "file": "9.webp",
    "title": "A gift worth sharing",
    "alt": "An open red chocolate gift box displayed on a marble coffee table beside Arabic coffee in a bright living room"
  },
  {
    "file": "10.webp",
    "title": "Choose your sweet moment",
    "alt": "Dark and milk chocolate bars with Izhiman-branded packaging and hands breaking a piece of chocolate"
  },
  {
    "file": "overview.webp",
    "title": "July calendar overview",
    "alt": "Original Izhiman July content layout showing ten campaign visuals with open spaces in the grid"
  }
];

const shantaDesigns = [
  { file: "1.webp", title: "Effortless style", alt: "Model in a white dress reclining on a green sofa with a floral handbag and cream sneakers" },
  { file: "2.webp", title: "A playful perspective", alt: "Seated model holding a white floral handbag in front of her face on a green sofa" },
  { file: "3.webp", title: "Everyday elegance", alt: "Model sitting cross-legged in front of a green sofa with a floral handbag and cream sneakers" },
  { file: "4.webp", title: "Comfort in detail", alt: "Close-up of cream platform sneakers with a floral handbag on a green sofa in the background" },
  { file: "5.webp", title: "The finishing touch", alt: "Portrait of a model in a white dress holding a white floral handbag against a warm neutral background" },
  { file: "6.webp", title: "Floral details", alt: "Close-up of a white handbag with embroidered daisies held beside a model’s face" },
  { file: "7.webp", title: "Ready to go", alt: "Hands tying the laces of a cream platform sneaker beside a green sofa" },
  { file: "8.webp", title: "A moment in the sun", alt: "Model sitting on a sunlit green sofa with a white floral handbag and cream sneakers" },
];

const zyaDesigns = [
  ...Array.from({ length: 15 }, (_, index) => ({ file: `lifestyle-${index + 1}.webp`, title: `On the green — ${String(index + 1).padStart(2, "0")}`, alt: `ZYA Jewelry July lifestyle campaign design ${index + 1}, featuring jewelry in a sunlit golf setting` })),
  ...Array.from({ length: 15 }, (_, index) => ({ file: `studio-${index + 1}.webp`, title: `Studio collection — ${String(index + 1).padStart(2, "0")}`, alt: `ZYA Jewelry July product campaign design ${index + 1}, featuring diamond jewelry against a dark studio backdrop` })),
  { file: "overview.webp", title: "July calendar overview", alt: "Complete ZYA Jewelry July calendar with fifteen golf lifestyle visuals and fifteen dark studio product visuals" },
];

const malaysiaDesigns = [
  { file: "1.webp", title: "Lakeside sunrise", alt: "A family watching the sunrise across a lake with tiered temple roofs" },
  { file: "2.webp", title: "Forest waterfalls", alt: "A family overlooking waterfalls framed by tropical forest" },
  { file: "3.webp", title: "Mountain lake walk", alt: "A family walking hand in hand above a lake surrounded by mountains" },
  { file: "4.webp", title: "Cliffside retreat", alt: "A family on a terrace above a coastal resort pool and turquoise shoreline" },
  { file: "5.webp", title: "Between the islands", alt: "A family in a wooden boat between steep green islands" },
  { file: "6.webp", title: "Palm-lined beach", alt: "A family standing on a sandy beach with palm trees and clear blue water" },
  { file: "7.webp", title: "Coastal lookout", alt: "A family looking out over a tropical bay and its curved shoreline" },
  { file: "8.webp", title: "Poolside skyline", alt: "A family beside a rooftop pool facing the Petronas Twin Towers" },
  { file: "9.webp", title: "Island panorama", alt: "A family at a hilltop railing looking out across forested islands and blue water" },
  { file: "10.webp", title: "Kuala Lumpur overlook", alt: "A family overlooking the Kuala Lumpur skyline from a leafy viewpoint" },
];

const projects = {
  malaysia: {
    id: "malaysia-calendar",
    brand: "Malaysia",
    period: "Travel",
    collection: "Travel Content Calendar",
    kind: "SOCIAL CONTENT",
    thumbnail: "10.webp",
    hasOverview: false,
    description: "Ten AI travel visuals that follow a family through tropical coastlines, waterfalls, mountain views, and the Kuala Lumpur skyline.",
    designs: malaysiaDesigns,
  },
  zya: { id: "zya-july", brand: "ZYA Jewelry", period: "July", collection: "July Content Calendar", kind: "SOCIAL CONTENT", thumbnail: "lifestyle-1.webp", hasOverview: true, description: "Thirty visuals for ZYA Jewelry’s July content calendar, pairing sunlit golf lifestyle scenes with a dark studio collection of rings, necklaces, and bracelets.", designs: zyaDesigns },
  shanta: { id: "shanta-shoes", brand: "Shanta & Shoes", period: "Fashion", collection: "Fashion Campaign", kind: "CAMPAIGN", thumbnail: "1.webp", hasOverview: false, description: "Eight AI fashion visuals pairing a floral handbag and cream sneakers with a green sofa, soft neutral tones, and product details.", designs: shantaDesigns },
  "y-cafe": { id: "y-cafe-july", brand: "Y Café", period: "July", collection: "July Content Calendar", kind: "SOCIAL CONTENT", thumbnail: "overview.webp", hasOverview: true, description: "Nine visuals for a July social content calendar, bringing together café branding, food, drinks, and summer moments.", designs: cafeDesigns },
  great: { id: "great-august", brand: "GREAT", period: "August", collection: "August Content Calendar", kind: "SOCIAL CONTENT", thumbnail: "overview.webp", hasOverview: true, description: "Twelve visuals for an August social content calendar, featuring air conditioners and minibars through product scenes, cooling concepts, and Arabic messaging.", designs: greatDesigns },
  nafeesah: { id: "nafeesah-eid-al-fitr", brand: "Nafeesah", period: "Eid al-Fitr", collection: "Eid al-Fitr Campaign", kind: "CAMPAIGN", thumbnail: "12.webp", hasOverview: false, description: "An Eid al-Fitr visual campaign for Nafeesah, presenting sweets and gift packaging in a warm gold-and-burgundy setting with Arabic coffee and festive table arrangements.", designs: nafeesahDesigns },
  ramadan: { id: "nafeesah-ramadan", brand: "Nafeesah", period: "Ramadan", collection: "Ramadan Campaign", kind: "CAMPAIGN", thumbnail: "1.webp", hasOverview: false, description: "A Ramadan visual campaign for Nafeesah, presenting desserts in warm lantern light with gold crescents, soft linen, and a shared seasonal mood.", designs: ramadanDesigns },
  izhiman: { id: "izhiman-july", brand: "Izhiman", period: "July", collection: "July Content Calendar", kind: "SOCIAL CONTENT", thumbnail: "1.webp", hasOverview: true, description: "Ten visuals for Izhiman’s July content calendar, bringing coffee, tea, and chocolate into everyday rituals, shared moments, and warm product settings.", designs: izhimanDesigns },
};

export function CreativeGallery({ project = "y-cafe" }: { project?: keyof typeof projects }) {
  const { id, brand, period, collection, kind, thumbnail, hasOverview, description, designs } = projects[project];
  const designCount = designs.length - (hasOverview ? 1 : 0);
  const countLabel = String(designCount).padStart(2, "0");
  const titleId = id + "-title";
  const captionId = id + "-caption";
  const assetPath = "/portfolio/" + id;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = designs[activeIndex ?? 0];

  useEffect(() => {
    if (activeIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [activeIndex]);

  function open(index: number) {
    setActiveIndex(index);
    dialog.current?.showModal();
  }
  function step(direction: number) {
    setActiveIndex(index => ((index ?? 0) + direction + designs.length) % designs.length);
  }

  return <section className="cafe-project" aria-labelledby={titleId}>
    <details className="cafe-project-details">
      <summary className="cafe-project-summary">
        <Image className="cafe-project-thumbnail" src={`${assetPath}/${thumbnail}`} alt="" width={108} height={135} sizes="108px" />
        <div className="cafe-summary-copy"><span className="project-eyebrow">{kind} / {countLabel} DESIGNS</span><h3 id={titleId}>{brand}</h3><p>{collection}</p></div>
        <span className="cafe-summary-action"><span className="when-collapsed">View project</span><span className="when-expanded">Close project</span><ChevronDown size={21} /></span>
      </summary>
      <div className="cafe-expanded-content">
    <div className="cafe-project-heading">
      <div><p>{description}</p></div>
      {hasOverview && <button className="calendar-overview" type="button" onClick={() => open(designCount)}>View calendar overview <ArrowUpRight size={18} /></button>}
    </div>
    <div className="cafe-project-meta"><span>{brand.toUpperCase()}</span><span>{collection.toUpperCase()}</span><span>{countLabel} DESIGNS</span></div>
    <div className="cafe-grid">{designs.slice(0, designCount).map((design, index) => <button className="cafe-tile" key={design.file} type="button" onClick={() => open(index)} aria-label={`Open design ${index + 1}: ${design.title}`}>
      <div className="cafe-image"><Image src={`${assetPath}/${design.file}`} alt={design.alt} width={1122} height={1402} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" /><span className="cafe-expand" aria-hidden="true"><ArrowUpRight size={22} /></span></div>
      <span className="cafe-caption"><span>{String(index + 1).padStart(2, "0")}</span><span>{design.title}</span><ArrowUpRight size={16} /></span>
    </button>)}</div>
      </div>
    </details>
    <dialog ref={dialog} className="gallery-dialog" aria-labelledby={captionId} onClose={() => setActiveIndex(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }}>
      <div className="gallery-dialog-content"><div className="gallery-toolbar"><span>{brand.toUpperCase()} / {period.toUpperCase()}</span><button type="button" onClick={() => dialog.current?.close()} aria-label="Close image viewer"><X size={23} /></button></div>
        <Image className="gallery-full-image" src={`${assetPath}/${selected.file}`} alt={selected.alt} width={1400} height={1750} sizes="(max-width: 800px) 95vw, 75vw" />
        <div className="gallery-controls"><button type="button" onClick={() => step(-1)} aria-label="Previous design"><ArrowLeft size={22} /></button><p id={captionId} aria-live="polite">{selected.title}<small>{(activeIndex ?? 0) + 1} / {designs.length}</small></p><button type="button" onClick={() => step(1)} aria-label="Next design"><ArrowRight size={22} /></button></div>
      </div>
    </dialog>
  </section>;
}
