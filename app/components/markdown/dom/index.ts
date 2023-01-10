import Alert from './Alert.vue';
import BlockQuote from './BlockQuote.vue';
import Dummy from './Dummy.vue';
import Text from './Text.vue';
import List from './List.vue';
import Heading from './Heading.vue';
import ImageCard from './ImageCard.vue';
import HorizontalRule from './HorizontalRule.vue';
import Table from './Table.vue';
import { Component } from 'vue';

// See:
// * https://developer.mozilla.org/en-US/docs/Web/HTML/Element
// * https://developer.mozilla.org/en-US/docs/Web/API/Node (and subclasses)
const reNodes: { [nodeName: string]: Component | string } = {
    ['#text']: Text,

    h1: Heading,
    h2: Heading,
    h3: Heading,
    h4: Heading,
    h5: Heading,
    h6: Heading,

    a: 'a', // TODO
    p: 'p',
    b: 'b',
    i: 'i',
    em: 'em',
    small: 'small',
    big: 'big',
    strong: 'strong',
    sup: 'sup',
    sub: 'sub',
    s: 's',

    img: 'img', // TODO?

    ul: List,
    ol: List,

    div: 'div', // TODO?
    span: 'span', // TODO?

    hr: HorizontalRule,

    blockquote: BlockQuote,

    pre: 'pre',
    code: 'code',

    table: Table,
    thead: 'thead',
    tbody: 'tbody',
    tr: 'tr',
    td: 'td',
    th: 'th',

    dd: Dummy,
    dt: Dummy,

    /// Custom components
    alert: Alert,
    imagecard: ImageCard,
};

export default reNodes;

// import Unknown from './Unknown.vue';
// export { Unknown };
