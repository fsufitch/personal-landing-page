# h1 Heading 8-)

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Embedded HTML

<b>Some bold text in HTML.</b>

<i>

This markdown source is between `<i>` tags.

</i>

## Horizontal Rules

---

---

---

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,, -- ---

"Smartypants, double quotes" and 'single quotes'

## Emphasis

**This is bold text**

**This is bold text**

_This is italic text_

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using additional greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

Look it's a block quote that generates an alert component:

> !alert foo bar baz quux omg
>
> wow a second paragraph

## Lists

Unordered

-   Create a list by starting a line with `+`, `-`, or `*`
-   Sub-lists are made by indenting 2 spaces:
    -   Marker character change forces new list start:
        -   Ac tristique libero volutpat at
        *   Facilisis in pretium nisl aliquet
        -   Nulla volutpat aliquam velit
-   Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Syntax highlighting

```javascript
var foo = function (bar) {
    return bar++;
};

console.error(foo(5));
```

When inline code starts right at the end of the line, the actual code block should not leave a "sliver" at the end
before wrapping. This is hard to test, so here are some different length lines that end with an inline code block.
Narrow the window horizontally until the wrap happens.

All work and no play makes jack a dull boy. `hello world`

All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. `hello world`

All work and no play makes jack a dull boy. All work and no play makes jack a dull boy. All work and no play makes jack
a dull boy. `hello world`

And now a line with super duper long inline code:
`hello world hello world hello world hello world hello world hello world`

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ 'title text!')

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg 'The Stormtroopocat')

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'

## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

-   19^th^
-   H~2~O

### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++

### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

: Definition 1 with lazy continuation.

Term 2 with _inline markup_

: Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1 ~ Definition 1

Term 2 ~ Definition 2a ~ Definition 2b

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

\*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning _here be dragons_ :::

::: alert this is a default alert

:::

::: alert info this is an info alert

it has some code in it!!

```python
import hello
hello.world("python")

for foo in bar:
    wow what's this
```

:::

::: alert success this is a success alert :::

::: alert warning this is a warning alert :::

::: alert error this is an error alert :::

::: imagecard left https://placekitten.com/600/600 This image is floated left. :::

All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack
a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play
makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work
and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull
boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes
Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no
play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All
work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a
dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play
makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy.

::: imagecard center https://placekitten.com/1000/500 This image sits in the center. :::

::: imagecard right https://placekitten.com/400/600 This image is floated right. :::

The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped
over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick
brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the
lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog.

All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack
a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play
makes Jack a dull boy. All work and no play makes Jack a dull boy. All work and no play makes Jack a dull boy. All work
and no play makes Jack a dull boy.

## Attachments

::: imagecard center another-cat.jpg [Download this image](another-cat.jpg) :::
