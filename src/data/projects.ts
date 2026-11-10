import heroExterior from "@/assets/hero-exterior.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import philosophyNature from "@/assets/philosophy-nature.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import workArchitecture from "@/assets/work-architecture.jpg";
import workInteriors from "@/assets/work-interiors.jpg";
import workKitchen from "@/assets/work-kitchen.jpg";
import workWardrobe from "@/assets/work-wardrobe.jpg";
import workLiving from "@/assets/work-living.jpg";
import workRender from "@/assets/work-render.jpg";
import kwVideo from "@/assets/kw1.mp4";
import kwPattern from "@/assets/kw7.png";
import kwKitchen from "@/assets/kw3.png";
import kwDetail from "@/assets/kw2.png";
import kwStone from "@/assets/kw4.png";
import kwTap from "@/assets/kw5.png";
import kwSink from "@/assets/kw6.png";
import ktVideo from "@/assets/kt4.mp4";
import ktKitchen from "@/assets/kt3.png";
import ktDetail from "@/assets/kt2.png";
import ktTap from "@/assets/kt1.png";
import ktStone from "@/assets/kt5.png";
import bedVideoOne from "@/assets/bed1.mp4";
import bedVideoTwo from "@/assets/bed2.mp4";
import heroVideo from "@/assets/mod1.mp4";
import tdwRoom from "@/assets/tdw1.jpg";
import tdwDetail from "@/assets/tdw2.jpg";
import tdwShelves from "@/assets/tdw3.png";
import tdwCabinet from "@/assets/tdw4.jpg";
import wtWardrobe from "@/assets/wt1.png";
import wtDetail from "@/assets/wt2.png";
import wtGlass from "@/assets/wt3.png";
import wtShelves from "@/assets/wt4.png";
import wtCabinetry from "@/assets/wt5.png";
import wtWood from "@/assets/wt6.png";
import lvVideo from "@/assets/lv1.mp4";
import lvStand from "@/assets/lv3.png";
import lvRoom from "@/assets/lv4.png";
import lvPattern from "@/assets/lv5.png";
import lvDetail from "@/assets/lv2.png";
import lvShelves from "@/assets/lv6.png";

/* Legacy placeholder imagery for projects without supplied media. */

export const images = {
  heroExterior,
  heroInterior,
  philosophyNature,
  aboutStudio,
  workArchitecture,
  workInteriors,
  workKitchen,
  workWardrobe,
  workLiving,
  workRender,
  heroVideo,
  kwKitchen,
  kwPattern,
  ktPattern: ktDetail,
  lvPattern,
  wtWardrobe,
};

export type CategoryId =
  "architecture" | "interiors" | "kitchens" | "wardrobes" | "living" | "joinery" | "visualisation";

export interface Category {
  id: CategoryId;
  label: string;
  comingSoon?: boolean;
}

export const CATEGORIES: Category[] = [
  { id: "architecture", label: "Architecture", comingSoon: true },
  { id: "interiors", label: "Interiors" },
  { id: "kitchens", label: "Kitchens" },
  { id: "wardrobes", label: "Wardrobes" },
  { id: "living", label: "Living Spaces" },
  { id: "joinery", label: "Bespoke Joinery" },
  { id: "visualisation", label: "3D Visualisation" },
];

export interface GalleryImage {
  src: string;
  caption: string;
  type?: "video";
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  location: string;
  year: string;
  status: string;
  tagline: string;
  intro: string;
  body: string[];
  cover: string;
  coverVideo?: string;
  coverVideoCaption?: string;
  gallery: GalleryImage[];
}

export const projects: Project[] = [
  {
    slug: "karoo-house",
    title: "Karoo House",
    category: "architecture",
    location: "Cape Winelands, Western Cape",
    year: "2025",
    status: "Completed",
    tagline: "A low horizon pavilion carved into the Karoo landscape.",
    intro:
      "Set on an exposed ridge in the Cape Winelands, Karoo House responds to its landscape with a single horizontal gesture — a deep roof plane that shelters stone and rammed-earth volumes beneath it.",
    body: [
      "The brief called for a family home that could hold both gathering and solitude. The plan is organised around a sheltered courtyard, allowing every room to open to the landscape while remaining protected from the prevailing south-easter.",
      "Locally quarried stone, clay plaster and reclaimed timber root the house in its surroundings. Deep reveals and carved screens temper the harsh African sun, casting the interior in a moving pattern of light and shadow through the day.",
    ],
    cover: workArchitecture,
    gallery: [
      { src: workArchitecture, caption: "South elevation at dusk" },
      { src: heroExterior, caption: "Courtyard reflection pool" },
      { src: philosophyNature, caption: "Screen detail, late afternoon" },
      { src: heroInterior, caption: "Living hall" },
    ],
  },
  {
    slug: "waterfall-estate-residence",
    title: "Waterfall Estate Residence",
    category: "interiors",
    location: "Waterfall, Johannesburg",
    year: "2024",
    status: "Completed",
    tagline: "Layered calm for a family home in the city.",
    intro:
      "A complete interior redesign for a double-volume family residence — layering limewash, linen, oak and stone into a home that feels composed, quiet and deeply lived-in.",
    body: [
      "The interiors favour a restrained natural palette: warm-white plaster walls, pale oak floors and upholstery in undyed linen, punctuated by handcrafted African ceramics and woven lighting.",
      "Each room is tuned for the way the family actually lives — a formal dining room that doubles as a study table, a media lounge tucked beneath the mezzanine, and a private dressing suite off the main bedroom.",
    ],
    cover: workInteriors,
    gallery: [
      { src: workInteriors, caption: "Dining room" },
      { src: heroInterior, caption: "Living space" },
      { src: workLiving, caption: "Garden lounge" },
      { src: workWardrobe, caption: "Dressing suite" },
    ],
  },
  {
    slug: "constantia-kitchen",
    title: "Vatsonga Fluted Kitchen",
    category: "kitchens",
    location: "Constantia, Cape Town",
    year: "2024",
    status: "Completed",
    tagline: "Fluted oak and Vatsonga pattern, carved into a contemporary kitchen.",
    intro:
      "A bespoke kitchen pairing fluted oak doors with an engraved Vatsonga pattern, balanced by dark stone and warm integrated lighting.",
    body: [
      "The engraved motif is carried across the cabinetry and feature panels, bringing a distinctive cultural pattern into a clean-lined kitchen.",
      "Fluted oak, dark marble and carefully placed lighting give the doors and their carved detail depth from every angle.",
    ],
    cover: kwKitchen,
    coverVideo: kwVideo,
    coverVideoCaption: "Kitchen film — fluted doors and carved pattern",
    gallery: [
      { src: kwKitchen, caption: "Fluted oak kitchen with engraved Vatsonga panels" },
      { src: kwDetail, caption: "Close study of the engraved oak pattern" },
      { src: kwPattern, caption: "Vatsonga motif within the fluted oak" },
      { src: kwStone, caption: "Dark marble backsplash and counter" },
      { src: kwTap, caption: "Stone, brass and oak detail" },
      { src: kwSink, caption: "Sink and marble worktop" },
    ],
  },
  {
    slug: "dark-marble-kitchen",
    title: "Vatsonga Marble Kitchen",
    category: "kitchens",
    location: "Johannesburg, South Africa",
    year: "2025",
    status: "Completed",
    tagline: "Dark marble, warm light and an engraved Vatsonga feature.",
    intro:
      "A dramatic kitchen centred on dark marble and a sculptural engraved Vatsonga pattern across the upper cabinetry.",
    body: [
      "The dark stone backsplash and counters create a continuous backdrop for the oak cabinetry, while the engraved feature brings a strong vertical rhythm to the room.",
      "Open display shelves and integrated lighting frame the carved panel and reveal its texture against the marble.",
    ],
    cover: ktKitchen,
    coverVideo: ktVideo,
    coverVideoCaption: "Kitchen film — marble and engraved cabinetry",
    gallery: [
      { src: ktKitchen, caption: "Kitchen with dark marble and engraved oak feature" },
      { src: ktDetail, caption: "Engraved Vatsonga pattern on the upper cabinet" },
      { src: ktTap, caption: "Dark stone counter and sink detail" },
      { src: ktStone, caption: "Marble backsplash and cooking zone" },
    ],
  },
  {
    slug: "oak-display-wardrobe",
    title: "Oak Display Wardrobe",
    category: "wardrobes",
    location: "Bryanston, Johannesburg",
    year: "2025",
    status: "In progress",
    tagline: "Open oak display shelves, shaped with an imprinted pattern.",
    intro:
      "A bespoke wardrobe design that sets open display shelving against clean, full-height doors, with an imprinted oak pattern worked into the shelves.",
    body: [
      "The open bays make the oak grain and carved pattern part of the room, while the surrounding doors keep the overall composition calm and uncluttered.",
      "Integrated shelf lighting draws attention to the imprinted timber and the objects displayed within the wardrobe.",
    ],
    cover: tdwShelves,
    gallery: [
      { src: tdwShelves, caption: "Open shelves with imprinted oak pattern" },
      { src: tdwRoom, caption: "Wardrobe wall in the bedroom" },
      { src: tdwDetail, caption: "Close-up of the oak shelf detail" },
      { src: tdwCabinet, caption: "Full-height wardrobe cabinetry" },
    ],
  },
  {
    slug: "glass-and-oak-wardrobe",
    title: "Glass & Oak Wardrobe",
    category: "wardrobes",
    location: "Johannesburg, South Africa",
    year: "2025",
    status: "Completed",
    tagline: "Glass-fronted storage, framed by a distinctive natural-oak inlay.",
    intro:
      "A considered wardrobe composition combining illuminated glass doors, closed storage and a continuous band of natural oak.",
    body: [
      "Natural wood is placed as a strong horizontal feature across the wardrobe, bringing warmth and grain into the calm, full-height cabinetry.",
      "Glass-fronted hanging storage and lit open shelves add depth while keeping the wardrobe practical and composed.",
    ],
    cover: wtWardrobe,
    gallery: [
      { src: wtWardrobe, caption: "Glass doors and natural oak wardrobe" },
      { src: wtGlass, caption: "Illuminated glass-fronted hanging storage" },
      { src: wtDetail, caption: "Natural oak inlay across the cabinet fronts" },
      { src: wtShelves, caption: "Lit open display shelves" },
      { src: wtCabinetry, caption: "Oak band meeting the wardrobe doors" },
      { src: wtWood, caption: "Close view of the natural wood placement" },
    ],
  },
  {
    slug: "vatsonga-tv-media-wall",
    title: "Vatsonga TV Media Wall",
    category: "living",
    location: "Johannesburg, South Africa",
    year: "2025",
    status: "Completed",
    tagline: "A custom TV wall of fluted oak, Vatsonga pattern and dark marble.",
    intro:
      "A bespoke TV stand and media wall pairing a fluted Vatsonga-patterned oak backdrop with a dark marble splashback and illuminated display shelves.",
    body: [
      "The custom fluted backdrop carries the engraved Vatsonga motif behind the screen, with dark marble continuing across the backboard.",
      "Open display shelves bring objects and lighting into the composition, while the low TV unit keeps the long wall grounded.",
    ],
    cover: lvRoom,
    coverVideo: lvVideo,
    coverVideoCaption: "Media wall film — Vatsonga pattern and marble",
    gallery: [
      { src: lvRoom, caption: "TV media wall with custom fluted oak backdrop" },
      { src: lvStand, caption: "Full view of the TV unit and display shelves" },
      { src: lvPattern, caption: "Engraved Vatsonga pattern in fluted oak" },
      { src: lvDetail, caption: "Dark marble backsplash and styled detail" },
      { src: lvShelves, caption: "Illuminated open display shelves" },
    ],
  },
  {
    slug: "bedroom-visualisation",
    title: "Bedroom Visualisation",
    category: "visualisation",
    location: "Studio visualisation",
    year: "2026",
    status: "Concept",
    tagline: "A bedroom brought to life through cinematic 3D studies.",
    intro:
      "A cinematic bedroom visualisation led by the Bed 1 hero film, with one additional animated study exploring the room from another viewpoint.",
    body: [
      "The Bed 1 sequence introduces the bedroom concept, supported by a second video that lets the space be explored from another viewpoint.",
      "Together, the films communicate the lighting, materials and spatial character of the proposed interior before it is built.",
    ],
    cover: workRender,
    coverVideo: bedVideoOne,
    coverVideoCaption: "Bed 1 bedroom visualisation film",
    gallery: [{ src: bedVideoTwo, caption: "Bedroom visualisation — view two", type: "video" }],
  },
];

export const availableProjects = projects.filter((project) => project.category !== "architecture");

export function getProject(slug: string) {
  return availableProjects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = availableProjects.findIndex((p) => p.slug === slug);
  return availableProjects[(i + 1) % availableProjects.length];
}

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export const services = [
  {
    id: "interior-design",
    title: "Interior Design",
    description:
      "Complete interior design and styling: spatial planning, material palettes, custom furniture specification and art curation.",
    image: workInteriors,
  },
  {
    id: "kitchens",
    title: "Kitchens",
    description:
      "Bespoke kitchens designed, fabricated and installed by our own workshop — cabinetry, stone, lighting and appliance integration resolved as one object.",
    image: kwKitchen,
  },
  {
    id: "wardrobes",
    title: "Wardrobes",
    description:
      "Dressing rooms and wardrobe systems in solid timber and veneer, with integrated lighting, hardware and storage engineered around your wardrobe.",
    image: wtWardrobe,
  },
  {
    id: "joinery",
    title: "Bespoke Joinery",
    description:
      "One-off joinery commissions — studies, libraries, bars, vanities and wall-linings — detailed to the millimetre and crafted in fumed oak, walnut and clay.",
    image: tdwShelves,
  },
  {
    id: "visualisation",
    title: "3D Visualisation",
    description:
      "Cinematic interior visualisation: stills, daylight studies and animated sequences that let clients experience a space before it is made.",
    image: workRender,
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with a conversation about how you live, what you value and what your space needs. The outcome is a clear design brief and a realistic budget frame.",
  },
  {
    number: "02",
    title: "Concept & Direction",
    description:
      "We explore layouts, material palettes and a first design direction. A considered set of options helps us find the right balance before moving forward.",
  },
  {
    number: "03",
    title: "Design Development",
    description:
      "The selected concept is resolved in detail: spatial planning, bespoke joinery, lighting, furniture and finishes, coordinated as one cohesive interior.",
  },
  {
    number: "04",
    title: "Specifications & Making",
    description:
      "We prepare detailed drawings and specifications, then coordinate trusted suppliers and our joinery workshop so every finish and fitting is ready for installation.",
  },
  {
    number: "05",
    title: "Realisation",
    description:
      "From workshop fabrication to final styling and installation, we stay close to the work until every last detail feels right.",
  },
];
