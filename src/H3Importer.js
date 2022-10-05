import { getDatabase, ref, set } from "firebase/database";
import { h3SoundBites } from "./H3";

function writeSoundBiteData(bite, id) {
  const db = getDatabase();
  set(ref(db, 'bites/' + id), {
    name: bite.name,
    src: bite.src,
    speaker: bite.speaker,
    imgSrc: bite.imgSrc,
  });
}

function importH3SoundBites() {
  h3SoundBites().forEach((bite, i) => {
    var result = writeSoundBiteData(bite, i);
    console.log(`Imported ${bite.name}. Result: ${result}`);
  })
}

export { importH3SoundBites }
