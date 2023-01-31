import { loadThemeFromStorage, getVuetifyThemeKey } from '@app/styles/themes';

const generateCSSVariables = (node: Record<string, unknown>) => {
    const cssVars: [string, string][] = [];
    for (const [key, value] of Object.entries(node).filter(([, v]) => v)) {
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'bigint':
            case 'string':
                cssVars.push([key, `${value}`]);
                break;
            case 'object':
                cssVars.push(
                    ...generateCSSVariables(<Record<string, unknown>>value).map(
                        ([subkey, subvalue]) => <[string, string]>[`${key}-${subkey}`, subvalue],
                    ),
                );
                break;
            default:
                console.warn(`Invalid value for CSS theme property ${key}:`, value);
        }
    }
    return cssVars;
};

(() => {
    const themeKey = getVuetifyThemeKey(loadThemeFromStorage());
    const theme = __DEFAULT_THEMES__[themeKey];

    if (!theme) {
        console.error(`Could not set any themem in the pre-Vue state; tried '${themeKey}'`);
    }

    console.debug(`Using theme '${themeKey}' for pre-Vue rendering`, theme);

    const cssVars = generateCSSVariables(theme).map(([k, v]) => [`--prevue-${k}`, v]);

    console.debug('Pre-vue CSS variables:', cssVars);

    const styleElement = document.createElement('style');
    styleElement.innerHTML = [':root {', ...cssVars.map(([k, v]) => `    ${k}: ${v};`), '}'].join('\n');
    document.querySelector('head')?.appendChild(styleElement);
})();
