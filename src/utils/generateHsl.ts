const getHashOfString = (str: String) => {
   const array = Array.from(str);
   return array.reduce((total, _char, index) => (total += str.charCodeAt(index)), 0);
};

const hRange = [0, 360];
const sRange = [50, 75];
const lRange = [25, 60];

const normalizeHash = (hash: number, min: number, max: number) => {
   return Math.floor((hash % (max - min)) + min);
};

export const generateHSL = (name: string): string => {
   const hash = getHashOfString(name);
   const h = normalizeHash(hash, hRange[0], hRange[1]);
   const s = normalizeHash(hash, sRange[0], sRange[1]);
   const l = normalizeHash(hash, lRange[0], lRange[1]);

   return `hsl(${h}, ${s}%, ${l}%)`;
};
