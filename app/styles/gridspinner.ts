// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateOffset = (index: number, size: number) => {
    // TODO: something more interesting here?
    return Math.random();
};

export const createDots = (container: Element, edgeCount = 3) => {
    for (let i = 0; i < Math.pow(edgeCount, 2); i++) {
        const offset = calculateOffset(i, edgeCount).toFixed(2);
        const dot = document.createElement('dot');
        dot.setAttribute('style', `--timing-offset: ${offset}`);
        container?.append(dot);
    }
};
