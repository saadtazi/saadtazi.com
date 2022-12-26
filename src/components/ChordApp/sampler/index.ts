import sounds from '../sounds/accoustic-guitar.json';
import * as Tone from 'tone';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

export const loadSampler = async (): Promise<Tone.Sampler> =>
  new Promise(async (resolve, reject) => {
    let position = 0;

    const urls = sounds.reduce(
      (acc: Record<string, string>, sound: string, index: number) => {
        const noteStr = notes[index % notes.length];
        if (noteStr === 'C') {
          position += 1;
        }
        const note = `${noteStr}${position}`;
        acc[note] = sound;
        return acc;
      },
      {}
    );

    const sampler = new Tone.Sampler({
      urls,
      onerror: () => reject(new Error('LoadSampler Error')),
      onload: () => {
        resolve(sampler);
      },
    }).toDestination();
  });
