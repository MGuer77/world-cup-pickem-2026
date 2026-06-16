import type { Team } from "@/types";

export const TEAMS: Record<string, Team> = {
  // Group A
  mex: { id: "mex", name: "Mexico",       short: "MEX", emoji: "🇲🇽", color: "#006847" },
  rsa: { id: "rsa", name: "South Africa", short: "RSA", emoji: "🇿🇦", color: "#007A4D" },
  kor: { id: "kor", name: "South Korea",  short: "KOR", emoji: "🇰🇷", color: "#CD2E3A" },
  cze: { id: "cze", name: "Czechia",      short: "CZE", emoji: "🇨🇿", color: "#D7141A" },
  // Group B
  can: { id: "can", name: "Canada",         short: "CAN", emoji: "🇨🇦", color: "#FF0000" },
  sui: { id: "sui", name: "Switzerland",    short: "SUI", emoji: "🇨🇭", color: "#FF0000" },
  qat: { id: "qat", name: "Qatar",          short: "QAT", emoji: "🇶🇦", color: "#8D1B3D" },
  bih: { id: "bih", name: "Bosnia & Herz.", short: "BIH", emoji: "🇧🇦", color: "#002395" },
  // Group C
  bra: { id: "bra", name: "Brazil",   short: "BRA", emoji: "🇧🇷", color: "#009C3B" },
  mor: { id: "mor", name: "Morocco",  short: "MAR", emoji: "🇲🇦", color: "#C1272D" },
  hai: { id: "hai", name: "Haiti",    short: "HAI", emoji: "🇭🇹", color: "#00209F" },
  sco: { id: "sco", name: "Scotland", short: "SCO", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", color: "#003399" },
  // Group D
  usa: { id: "usa", name: "United States", short: "USA", emoji: "🇺🇸", color: "#B22234" },
  par: { id: "par", name: "Paraguay",      short: "PAR", emoji: "🇵🇾", color: "#D52B1E" },
  aus: { id: "aus", name: "Australia",     short: "AUS", emoji: "🇦🇺", color: "#00843D" },
  tur: { id: "tur", name: "Türkiye",       short: "TUR", emoji: "🇹🇷", color: "#E30A17" },
  // Group E
  ger: { id: "ger", name: "Germany",     short: "GER", emoji: "🇩🇪", color: "#FFCE00" },
  cur: { id: "cur", name: "Curaçao",     short: "CUW", emoji: "🇨🇼", color: "#003DA5" },
  civ: { id: "civ", name: "Ivory Coast", short: "CIV", emoji: "🇨🇮", color: "#F77F00" },
  ecu: { id: "ecu", name: "Ecuador",     short: "ECU", emoji: "🇪🇨", color: "#FFD100" },
  // Group F
  ned: { id: "ned", name: "Netherlands", short: "NED", emoji: "🇳🇱", color: "#FF4500" },
  jpn: { id: "jpn", name: "Japan",       short: "JPN", emoji: "🇯🇵", color: "#BC002D" },
  tun: { id: "tun", name: "Tunisia",     short: "TUN", emoji: "🇹🇳", color: "#E70013" },
  swe: { id: "swe", name: "Sweden",      short: "SWE", emoji: "🇸🇪", color: "#006AA7" },
  // Group G
  bel: { id: "bel", name: "Belgium",     short: "BEL", emoji: "🇧🇪", color: "#EF3340" },
  egy: { id: "egy", name: "Egypt",       short: "EGY", emoji: "🇪🇬", color: "#CE1126" },
  irn: { id: "irn", name: "Iran",        short: "IRN", emoji: "🇮🇷", color: "#239F40" },
  nzl: { id: "nzl", name: "New Zealand", short: "NZL", emoji: "🇳🇿", color: "#00247D" },
  // Group H
  esp: { id: "esp", name: "Spain",        short: "ESP", emoji: "🇪🇸", color: "#AA151B" },
  cpv: { id: "cpv", name: "Cape Verde",   short: "CPV", emoji: "🇨🇻", color: "#003893" },
  ksa: { id: "ksa", name: "Saudi Arabia", short: "KSA", emoji: "🇸🇦", color: "#006C35" },
  uru: { id: "uru", name: "Uruguay",      short: "URU", emoji: "🇺🇾", color: "#5EB6E4" },
  // Group I
  fra: { id: "fra", name: "France",  short: "FRA", emoji: "🇫🇷", color: "#002395" },
  sen: { id: "sen", name: "Senegal", short: "SEN", emoji: "🇸🇳", color: "#00853F" },
  nor: { id: "nor", name: "Norway",  short: "NOR", emoji: "🇳🇴", color: "#EF2B2D" },
  irq: { id: "irq", name: "Iraq",    short: "IRQ", emoji: "🇮🇶", color: "#007A3D" },
  // Group J
  arg: { id: "arg", name: "Argentina", short: "ARG", emoji: "🇦🇷", color: "#74ACDF" },
  alg: { id: "alg", name: "Algeria",   short: "ALG", emoji: "🇩🇿", color: "#006233" },
  aut: { id: "aut", name: "Austria",   short: "AUT", emoji: "🇦🇹", color: "#ED2939" },
  jor: { id: "jor", name: "Jordan",    short: "JOR", emoji: "🇯🇴", color: "#007A3D" },
  // Group K
  por: { id: "por", name: "Portugal", short: "POR", emoji: "🇵🇹", color: "#006600" },
  uzb: { id: "uzb", name: "Uzbekistan", short: "UZB", emoji: "🇺🇿", color: "#1EB53A" },
  col: { id: "col", name: "Colombia", short: "COL", emoji: "🇨🇴", color: "#FCD116" },
  cod: { id: "cod", name: "DR Congo",  short: "COD", emoji: "🇨🇩", color: "#007FFF" },
  // Group L
  eng: { id: "eng", name: "England", short: "ENG", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#CF081F" },
  cro: { id: "cro", name: "Croatia", short: "CRO", emoji: "🇭🇷", color: "#FF0000" },
  gha: { id: "gha", name: "Ghana",   short: "GHA", emoji: "🇬🇭", color: "#006B3F" },
  pan: { id: "pan", name: "Panama",  short: "PAN", emoji: "🇵🇦", color: "#DA121A" },
};
