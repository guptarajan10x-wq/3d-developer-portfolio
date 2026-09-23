import {
  mobile,
  backend,
  creator,
  web,
  aftereffects,
  premiere,
  blender,
  cinema4d,
  davinci,
  photoshop,
  illustrator,
  figma,
  threejs,
  meta,
  starbucks,
  tesla,
  shopify,
  commercial_3d,
  cinematic_doc,
  music_vfx,
  social_motion,
  ai_video,
  ai_lays,
  ai_neural_horizon,
  ai_synthetica,
  ai_cybernetic,
  ai_autonomous,
} from "../assets";

export const navLinks = [
  {
    id: "showreel",
    title: "Showreel",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "ai-works",
    title: "AI Works",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "3D Motion Design & CGI",
    icon: creator,
  },
  {
    title: "Commercial Video Direction & Editing",
    icon: web,
  },
  {
    title: "VFX Compositing & Finishing",
    icon: mobile,
  },
  {
    title: "Generative AI & Neural Visuals",
    icon: backend,
  },
];

const technologies = [
  {
    name: "After Effects",
    icon: aftereffects,
  },
  {
    name: "Premiere Pro",
    icon: premiere,
  },
  {
    name: "Cinema 4D",
    icon: cinema4d,
  },
  {
    name: "Blender",
    icon: blender,
  },
  {
    name: "DaVinci Resolve",
    icon: davinci,
  },
  {
    name: "Photoshop",
    icon: photoshop,
  },
  {
    name: "Illustrator",
    icon: illustrator,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
];

const experiences = [
  {
    title: "Junior Motion Designer & Video Editor",
    company_name: "Creative Direction / Commercial Commissions",
    role_badge: "Commercial & Tech Commissions",
    points: [
      "Directing end-to-end post-production pipelines for commercial campaigns, high-retention creator brands, and venture-backed tech startups.",
      "Engineering multi-dimensional 3D motion systems, kinetic typography packages, and procedural CGI animations utilizing Cinema 4D, Blender, and After Effects.",
      "Elevating viewer retention and conversion performance by an average of 42% through precision rhythmic cutting, audio-visual matching, and psychoacoustic sound design.",
      "Establishing high-precision ACES color management and DaVinci Resolve look-development workflows across multi-platform aspect ratios (16:9, 9:16, 1:1).",
    ],
  },
  {
    title: "Junior Motion & Post-Production Specialist",
    company_name: "Creative Media & Digital Agency",
    role_badge: "Agency & Digital Productions",
    points: [
      "Spearheaded visual post-production for high-impact brand commercials, animated design systems, and international product launch campaigns.",
      "Engineered reusable motion graphic systems (MOGRTs) and custom transition architectures in Premiere Pro, reducing department turnaround cycles by 35%.",
      "Orchestrated multi-camera broadcast synchronization, vocal cleanup, immersive Foley sound mixing, and high-fidelity VFX compositing.",
      "Partnered with Creative Directors and Art Leads to translate high-level conceptual mandates into compelling, award-worthy visual narratives.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Rajan operates at the exact intersection of technical precision and artistic vision. His motion design, 3D aesthetics, and sound mixing elevated our commercial campaign into an industry benchmark.",
    name: "Marcus Vance",
    designation: "VP of Creative Direction",
    company: "Studio Horizon",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial:
      "Rajan consistently delivers broadcast-grade post-production under aggressive deadlines. His mastery of pacing and visual hooks increased our flagship campaign's audience retention by over 40%.",
    name: "Elena Rostova",
    designation: "Executive Producer",
    company: "Pulse Global Media",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    testimonial:
      "Collaborating with Rajan was transformative for our international product launch. His execution across 3D visuals, DaVinci color grading, and generative AI workflows sets a new standard for modern creative work.",
    name: "David Chen",
    designation: "Co-Founder & CMO",
    company: "Nexus Innovations",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

const projects = [
  {
    name: "Aether X1 - 3D Product Commercial",
    category: "3D Motion Graphics & Product Commercial",
    description:
      "High-energy 3D product commercial and motion graphics package featuring kinetic typography, procedural Octane materials, dynamic camera moves, and custom sound design.",
    deliverables: "3D Product Animation, Styleframe Design, Particle FX, Foley Sound Mixing",
    stack: "Cinema 4D • After Effects • Octane Render",
    tags: [
      {
        name: "aftereffects",
        color: "blue-text-gradient",
      },
      {
        name: "cinema4d",
        color: "green-text-gradient",
      },
      {
        name: "sounddesign",
        color: "pink-text-gradient",
      },
    ],
    image: commercial_3d,
    source_code_link: "#showreel",
  },
  {
    name: "The Relic - Cinematic Documentary",
    category: "Narrative Video Editing & Color Science",
    description:
      "Pacing-driven video editing and post-production for narrative video, featuring multi-cam synchronization, rhythm-based cuts, and cinematic DaVinci Resolve color grading.",
    deliverables: "Multi-Cam Sync, Narrative Assembly, LUT Creation, Dialogue Cleanup",
    stack: "Premiere Pro • DaVinci Resolve • Audition",
    tags: [
      {
        name: "premierepro",
        color: "blue-text-gradient",
      },
      {
        name: "davinciresolve",
        color: "green-text-gradient",
      },
      {
        name: "colorgrading",
        color: "pink-text-gradient",
      },
    ],
    image: cinematic_doc,
    source_code_link: "#showreel",
  },
  {
    name: "Cyberpunk Neon Riot - Music VFX",
    category: "Visual Effects Compositing & Kinetic Animation",
    description:
      "Fast-paced promotional video featuring stylized visual effects, 3D particle simulations, glitch transitions, and beat-synced kinetic title sequences.",
    deliverables: "Holographic Title Design, Chromatic Aberration FX, Beat-Sync Transitions",
    stack: "Blender • After Effects • Photoshop",
    tags: [
      {
        name: "blender",
        color: "blue-text-gradient",
      },
      {
        name: "vfx",
        color: "green-text-gradient",
      },
      {
        name: "motiondesign",
        color: "pink-text-gradient",
      },
    ],
    image: music_vfx,
    source_code_link: "#showreel",
  },
  {
    name: "Inspire The Future - Motion Campaign",
    category: "Brand Motion Identity & Social Deliverables",
    description:
      "Multi-platform commercial motion identity and social campaign featuring 3D glassmorphic elements, kinetic typography, and multi-aspect exports (16:9, 9:16, 1:1).",
    deliverables: "Social Reel Versions (9:16 & 16:9), Animated Typography, MOGRT Package",
    stack: "After Effects • Illustrator • Premiere Pro",
    tags: [
      {
        name: "motiongraphics",
        color: "blue-text-gradient",
      },
      {
        name: "aftereffects",
        color: "green-text-gradient",
      },
      {
        name: "socialcampaign",
        color: "pink-text-gradient",
      },
    ],
    image: social_motion,
    source_code_link: "#showreel",
  },
];

const aiProjects = [
  {
    name: "Lay's Flavor Burst - AI Commercial Ad",
    category: "AI Commercial Ad & Food Cinematics",
    description:
      "High-impact commercial advertisement engineered for Lay's Potato Chips utilizing generative AI video synthesis. Features hyperrealistic slow-motion chip dynamics, bursting flavor seasoning particles, appetizing golden cinematography, and rhythm-synchronized commercial audio mastering.",
    deliverables: "Generative Commercial Direction, Dynamic Fluid/Particle FX, 4K Neural Upscaling, Foley Sound & Crisp Audio Mix",
    stack: "Runway Gen-3 • Midjourney v6 • ComfyUI • After Effects • Premiere Pro",
    tags: [
      {
        name: "layschips",
        color: "blue-text-gradient",
      },
      {
        name: "genai",
        color: "green-text-gradient",
      },
      {
        name: "commercialad",
        color: "pink-text-gradient",
      },
    ],
    image: ai_lays,
    video: ai_video,
    source_code_link: "#ai-works",
  },
  {
    name: "Neural Horizon - Generative Cinema",
    category: "Generative AI Video & Neural Cinematics",
    description:
      "Pioneering generative sci-fi cinematic sequence synthesized through multi-prompt diffusion pipelines, temporal consistency tuning, camera motion vectors, and 4K neural upscaling.",
    deliverables: "AI Video Synthesis, Optical Flow Deflickering, Neural Upscaling (4K), Beat-Synced Sound Mix",
    stack: "Runway Gen-3 • Midjourney v6 • ComfyUI • Topaz Video AI • Premiere Pro",
    tags: [
      {
        name: "runwaygen3",
        color: "blue-text-gradient",
      },
      {
        name: "comfyui",
        color: "green-text-gradient",
      },
      {
        name: "neuralvideo",
        color: "pink-text-gradient",
      },
    ],
    image: ai_neural_horizon,
    source_code_link: "#ai-works",
  },
  {
    name: "Synthetica - Hyperreal Editorial Campaign",
    category: "AI Fashion & Digital Haute Couture",
    description:
      "High-concept luxury editorial campaign generated with custom LoRA fine-tuning, dynamic studio lighting simulations, and prompt-engineered aesthetic art direction.",
    deliverables: "Custom LoRA Fine-Tuning, High-Resolution Key Visuals, Dynamic Style Transfer, Editorial Retouching",
    stack: "Stable Diffusion XL • Midjourney v6 • ControlNet • Photoshop",
    tags: [
      {
        name: "stablediffusion",
        color: "blue-text-gradient",
      },
      {
        name: "aifashion",
        color: "green-text-gradient",
      },
      {
        name: "artdirection",
        color: "pink-text-gradient",
      },
    ],
    image: ai_synthetica,
    source_code_link: "#ai-works",
  },
  {
    name: "Cybernetic Waves - Audio-Reactive AI VFX",
    category: "AI Audio-Reactive Motion & VFX",
    description:
      "Hypnotic audio-reactive visualizer utilizing latent space interpolation, spectral audio analysis, and glitch motion passes synchronized to electronic musical compositions.",
    deliverables: "Audio Frequency Latent Mapping, Deforum Animation, Chromatic Color Grading, Kinetic Compositing",
    stack: "Deforum • TouchDesigner • DaVinci Resolve • After Effects",
    tags: [
      {
        name: "audioreactive",
        color: "blue-text-gradient",
      },
      {
        name: "deforum",
        color: "green-text-gradient",
      },
      {
        name: "motionvfx",
        color: "pink-text-gradient",
      },
    ],
    image: ai_cybernetic,
    source_code_link: "#ai-works",
  },
  {
    name: "Autonomous Worlds - Procedural Environment",
    category: "AI Concept Art & Environment Design",
    description:
      "Cinematic worldbuilding and speculative environment exploration produced using 2.5D camera projection mapping, depth-guided neural synthesis, and atmospheric matte painting.",
    deliverables: "Concept Art Direction, 2.5D Camera Projection, Matte Painting, Neural Texture Synthesis",
    stack: "Midjourney v6 • Blender • After Effects • Magnific AI",
    tags: [
      {
        name: "worldbuilding",
        color: "blue-text-gradient",
      },
      {
        name: "mattepainting",
        color: "green-text-gradient",
      },
      {
        name: "blender",
        color: "pink-text-gradient",
      },
    ],
    image: ai_autonomous,
    source_code_link: "#ai-works",
  },
];

export { services, technologies, experiences, testimonials, projects, aiProjects };
