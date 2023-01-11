Promise.all([import('fs'), import('path')]).then(([fs, path]) => {
    const hljsIndex = require.resolve('highlight.js');
    const hljsLanguagesPath = path.join(path.parse(hljsIndex).dir, 'languages');

    const languages = fs
        .readdirSync(hljsLanguagesPath)
        .filter((file) => file.match(/^[a-zA-Z0-9-_]+\.js$/))
        .map((filename) => filename.slice(0, filename.length - 3));

    languages.forEach((lang) =>
        fs.writeFileSync(
            path.join(__dirname, 'gen', `${lang}.ts`),
            `import mod from 'highlight.js/lib/languages/${lang}'; export default mod;`,
        ),
    );
});
