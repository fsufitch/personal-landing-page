import Alert from './Alert.vue';
import BlockQuote from './BlockQuote.vue';
import Dummy from './Dummy.vue';
import Text from './Text.vue';
import Heading from './Heading.vue';
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

    p: 'p',
    b: 'b',
    i: 'i',
    em: 'em',
    small: 'small',
    big: 'big',
    strong: 'strong',
    sup: 'sup',
    sub: 'sub',

    div: 'div', // TODO?

    hr: HorizontalRule,

    blockquote: BlockQuote,

    pre: 'pre',
    code: 'code',

    table: Table,

    dd: Dummy,
    dt: Dummy,

    /// Custom components
    alert: Alert,
};

export default reNodes;

// import Unknown from './Unknown.vue';
// export { Unknown };
