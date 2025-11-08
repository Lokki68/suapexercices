import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dump_scenario = {
  situation:
    "Intervention sur un chantier de construction en extérieur, à 14h30. Le temps est nuageux avec un vent léger de 15 km/h et une température de 12°C. La victime, un ouvrier de 35 ans, est tombée d'une échelle d'environ 3 mètres de hauteur et présente une douleur thoracique et à la jambe gauche. Les collègues ont appelé le 18 immédiatement et ont sécurisé la zone en attendant l'arrivée des secours.",
  bilan_initial: {
    conscience: "Alerte",
    fc: 95,
    fr: 20,
    ta: "125/80",
    spo2: "96%",
    temp: "36.5°C",
  },
  evolution: [
    {
      minute: 5,
      description:
        "La victime commence à présenter des signes d’anxiété et de douleur importante, paleur du visage.",
      fc: 105,
      spo2: "94%",
    },
    {
      minute: 10,
      description:
        "La victime devient confuse et se plaint de vertiges. Douleur thoracique persistante, respiration superficielle.",
      fc: 115,
      spo2: "91%",
    },
    {
      minute: 15,
      description:
        "La victime perd connaissance, présente une respiration irrégulière et devient cyanosée aux extrémités.",
      fc: 130,
      spo2: "86%",
    },
  ],
  objectif_pedagogique:
    "Évaluer et prendre en charge un traumatisme avec détresse vitale progressive, en appliquant les protocoles de prise en charge ABCDE et la gestion des chocs traumatiques.",
};
