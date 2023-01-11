import hljs from 'highlight.js/es/core';

export const hljsWithLanguage = async (language: string) => {
    let hljsFunc: unknown;
    try {
        hljsFunc = (await import(`./gen/${language}.ts`)).default;
        hljs.registerLanguage(language, <never>hljsFunc);
    } catch (err) {
        console.error('Could not load language:', language);
        console.error(err);
    }
    return hljs;
};
