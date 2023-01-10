import 'crypto';

// https://stackoverflow.com/a/34842797
const hashCode = (s: string) => s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const anchor = (title: string) => {
    let output = '';
    let wordStart = 0;
    const truncTitle = title.slice(0, 100);
    let idx = 0;
    for (idx = 0; idx < truncTitle.length; idx++) {
        const code = truncTitle.charCodeAt(idx);
        if (
            (code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123) // lower alpha (a-z)
        ) {
            continue;
        }

        const newWord = truncTitle.slice(wordStart, idx);
        if (newWord) {
            output += (output ? '-' : '') + newWord;
        }
        wordStart = idx + 1;
    }

    const lastWord = truncTitle.slice(wordStart, truncTitle.length);
    if (lastWord) {
        output += (output ? '-' : '') + lastWord;
    }

    const titleHash = Math.abs(hashCode(title));
    output += (output ? '-' : '') + titleHash;

    return output.toLocaleLowerCase();
};
