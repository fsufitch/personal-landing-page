import { createDots } from '@app/styles/gridspinner';

const SIZE = 7;

(() => {
    const container = document.querySelector('#prevue .spinner');
    if (!container) {
        console.error('No pre-Vue spinner container!');
        return;
    }
    container.setAttribute('style', `--edge-count: ${SIZE}`);
    createDots(container, SIZE);
})();
