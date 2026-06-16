// Group stage standings — computed from RESULTS + group definitions
// Source: FIFA.com standings (verified June 15, 2026)

export interface GroupTeamStanding {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Group {
  name: string;       // "Group A"
  letter: string;      // "A"
  teamIds: string[];   // ordered as drawn (not standings order)
}

export const GROUPS: Group[] = [
  { name:"Group A", letter:"A", teamIds:["mex","rsa","kor","cze"] },
  { name:"Group B", letter:"B", teamIds:["can","bih","sui","qat"] },
  { name:"Group C", letter:"C", teamIds:["bra","mor","sco","hai"] },
  { name:"Group D", letter:"D", teamIds:["usa","par","aus","tur"] },
  { name:"Group E", letter:"E", teamIds:["ger","cur","civ","ecu"] },
  { name:"Group F", letter:"F", teamIds:["ned","jpn","swe","tun"] },
  { name:"Group G", letter:"G", teamIds:["bel","egy","irn","nzl"] },
  { name:"Group H", letter:"H", teamIds:["esp","cpv","ksa","uru"] },
  { name:"Group I", letter:"I", teamIds:["fra","sen","nor","irq"] },
  { name:"Group J", letter:"J", teamIds:["arg","alg","aut","jor"] },
  { name:"Group K", letter:"K", teamIds:["por","cod","col","uzb"] },
  { name:"Group L", letter:"L", teamIds:["eng","cro","gha","pan"] },
];
