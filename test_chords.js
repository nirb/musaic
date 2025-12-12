
function getNotesForChord(chordName) {
    const rootMap = {
        'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
    };

    const match = chordName.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return [];

    const rootStr = match[1];
    const quality = match[2];

    let rootIndex = rootMap[rootStr];
    if (rootIndex === undefined) return [];

    let intervals = [0, 4, 7]; // Default Major

    if (quality === 'm') intervals = [0, 3, 7];
    else if (quality === '7') intervals = [0, 4, 7, 10];
    else if (quality === 'm7') intervals = [0, 3, 7, 10];
    else if (quality === 'maj7') intervals = [0, 4, 7, 11];
    else if (quality === 'dim') intervals = [0, 3, 6];

    const result = [];

    // Add Bass Note (Root at Octave 3)
    const bassOctave = 3;
    const bassNoteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][rootIndex % 12];
    result.push(bassNoteName + bassOctave);

    // Add Treble Notes (Octave 4)
    const baseOctave = 4;

    intervals.forEach(interval => {
        let noteIndex = rootIndex + interval;
        let octave = baseOctave + Math.floor(noteIndex / 12);
        let noteNameIndex = noteIndex % 12;
        let noteName = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][noteNameIndex];
        result.push(noteName + octave);
    });

    return result;
}

console.log("C:", getNotesForChord("C"));
console.log("Em:", getNotesForChord("Em"));
console.log("G:", getNotesForChord("G"));
