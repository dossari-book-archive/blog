/**
 * @typedef {{
 *  tex: {
 *   texStart: string
 *   texEnd: string
 *  }
 * }} Tools4BlogFormatter
 */

/**
 * @typedef {{
 *  formatter: Tools4BlogFormatter
 * }} OutputOptions
 */

const Tools4Blog = (() => {

    // /**
    //  * 
    //  * @param {MultipeInlineContainer} container 
    //  */
    // function push(value, container, list) {
    //     this._children.push(container)
    //     if (typeof value == "string") {
    //         container.txt(container)
    //     } else {
    //         value(container)
    //     }
    // }

    /**
     * @type {(...values:(string|Tex)) => Tex & {
     *   N: Tex
     *   Q: Tex
     *   R: Tex
     * }}
     */
    const tex = (() => {
        let tex
        return () => {
            if (tex) { return tex }
            tex = (...values) => new Tex(...values)
                ;
            ["N", "Q", "R"].forEach(v => tex[v] = new Tex(`\\mathbb{${v}}`))
            return tex
        }
    })()
    class Doc {
        /** @type {OutputOptions} */
        _opt
        /**
         * @type {(P|Table|Header)[]}
         */
        _children = []
        _title
        constructor(option) {
            this._opt = option
        }
        br = new Br
        tex = tex()
        title(txt) {
            this._title = txt
            return this
        }
        /**
         * 
         * @param {(ul: Ul) => void} callback 
         */
        ul(callback) {
            const ul = new Ul
            this._children._push(ul)
            callback(ul)
            return this
        }
        largeHeader(value) {
            return this._push(value, new Header(1))
        }
        middleHeader(value) {
            return this._push(value, new Header(2))
        }
        smallHeader(value) {
            return this._push(value, new Header(3))
        }
        /**
         * 
         * @param  {string|(p: any) => void} value 
         * @param  {MultipeInlineContainer} container 
         * @returns 
         */
        _push(value, container) {
            this._children.push(container)
            if (typeof value == "string") {
                container.txt(value)
            } else if (value instanceof Tex) {
                this._children.push(value)
            } else {
                value(container)
            }
            return this
        }
        /**
         * 
         * @param  {string|(p: P) => void} value 
         * @returns 
         */
        p(value) {
            return this._push(value, new P)
        }
        /**
         * 
         * @param {(table: Table) => void} callback 
         * @returns 
         */
        table(callback) {
            const table = new Table(this)
            this._children.push(table)
            callback(table)
            return this
        }
        read(txt) {
            return this
        }
        /**
         * @param {OutputOptions} options 
         */
        buildTree(options) {
            return toElem("div", this._children, options)
        }
        a(...values) {
            const a = new A
            a._add(values)
            return a
        }
    }
    /**
     * @typedef {Txt|Tex|MultipeInlineContainer} Inline
     */

    // ======================================================================

    /**
     * 
     * @param {string} tagName 
     * @param {(Inline)[]} children 
     * @param {OutputOptions} options 
     * @returns 
     */
    function toElem(tagName, children, options) {
        /** @type {HTMLElement} */
        const elem = document.createElement(tagName)
        children.forEach(child => {
            elem.appendChild(child._toElem(options))
        })
        return elem
    }

    class MultipeInlineContainer {
        /**
         * @type {Inline[]}
         */
        _children = []
        _tagName
        // span(value, style) {
        //     return this._push(value, new Span)
        // }
        // lineThrough(value) {
        //     return this._push(value, new LineThrough)
        // }
        txt(txt) {
            this._children.push(new Txt(txt))
            return this
        }
        br() {
            this._children.push(new Br)
        }
        tex(txt) {
            this._children.push(new Tex(txt))
            return this
        }
        b(txt) {
            this._children.push(new B(txt))
            return this
        }
        _add(values) {
            values.forEach(value => {
                // target._push()
                if (typeof value == "string") {
                    this._children.push(new Txt(value))
                } else if (value instanceof Tex
                    || value instanceof MultipeInlineContainer
                    || value instanceof Br) {
                    this._children.push(value)
                } else {
                    this._children.push(new Txt("" + value))
                }
            })
            return this
        }
        // /**
        //  * 
        //  * @param  {string|(p: any) => void} value 
        //  * @param  {MultipeInlineContainer} container 
        //  * @returns 
        //  */
        // _push(value, container) { // TODO 削除
        //     this._children.push(container)
        //     if (typeof value == "string") {
        //         container.txt(value)
        //     } else if (value instanceof Tex) {
        //         this._children.push(value)
        //     } else if (value instanceof MultipeInlineContainer) {
        //         this._children.push(value)
        //     } else if (typeof value == "function") {
        //         value(container)
        //     }
        //     return this
        // }
        /**
         * @param {OutputOptions} options 
         */
        _toElem(options) {
            return toElem(this._tagName, this._children, options)
        }
    }
    class Br {
        _toElem() { return document.createElement("br") }
    }
    class Txt {
        _txt
        constructor(txt) {
            this._txt = txt
        }
        _toElem() { return document.createTextNode(this._txt) }
    }
    class Tex {
        _txt
        constructor(...values) {
            this._txt = values.map(value => {
                if (value instanceof Tex) {
                    return value._txt
                } else if (typeof value == "string") {
                    return value
                }
            }).join("")
        }
        toString() {
            return this._txt
        }
        _toElem(/** @type {OutputOptions} */options) {
            return document.createTextNode(
                options.formatter.tex.texStart
                + replaceTexTxt(this._txt, options)
                + options.formatter.tex.texEnd
            )
        }
    }
    class P extends MultipeInlineContainer {
        _tagName = "p"
    }
    class Header extends MultipeInlineContainer {
        level
        constructor(level) {
            super()
            this.level = level
            this._tagName = "h" + (level + 3) // TODO カスタマイズ可能
        }
    }
    class A extends MultipeInlineContainer {
        _href
        _tagName = "a"
        href(href) {
            this._href = href
            return this
        }
        _toElem(/** @type {OutputOptions} */options) {
            const elem = super._toElem(options)
            elem.target = "_blank"
            elem.href = this._href
            return elem
        }
    }
    class LineThrough extends MultipeInlineContainer {
        _tagName = "span"
    }
    class B extends MultipeInlineContainer {
        _tagName = "strong"
    }
    class Span extends MultipeInlineContainer {
        _tagName = "span"
    }
    class Td extends MultipeInlineContainer {
        _tagName = "td"
    }
    class Table {
        /** @type {Tr[]} */
        _children = []
        /**
         * 
         * @param {(tr: Tr) => void} callback 
         */
        tr(callback) {
            const tr = new Tr
            this._children.push(tr)
            callback(tr)
            return this
        }
        _toElem(/** @type {OutputOptions} */options) {
            return toElem("table", this._children, options)
        }
    }

    class Tr {
        /** @type {Td[]} */
        _children = []
        /**
         * 
         * @param {string|(td: Td) => void} value 
         * @returns 
         */
        td(...values) {
            const td = new Td
            this._children.push(td)
            td._add(values)
            // values.forEach(value => {
            //     if (typeof value == "string") {
            //         td.txt(value)
            //     } else if (value instanceof Tex) {
            //         td.tex(value)
            //     } else if (value instanceof Br) {
            //         td.br()
            //     } else if (typeof value == "function") {
            //         value(td)
            //     } else {
            //         td.txt("" + value)
            //     }
            // });
            return this
        }
        _toElem(/** @type {OutputOptions} */options) {
            return toElem("tr", this._children, options)
        }
    }

    class Ul {
    }

    //=====================================================================
    /**
     * 
     * @param {MultipeInlineContainer} target 
     * @param  {(string|Inline)[]} values 
     */
    function append(target, values) {
    }

    function escapeHtml(string) {
        if (typeof string !== 'string') {
            return string;
        }
        return string.replace(/[&'`"<>]/g, function (match) {
            return {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;',
            }[match]
        });
    }

    const texReplaceMap = {
        "≦": "\\le ",
        "≧": "\\ge ",
        "｛": "\\{",
        "｝": "\\}",
        "∈": " \\in ",
        "∋": " \\ni ",
        "φ": "\\varphi ",
        "≡": "\\equiv ",
        "<": "\\lt ",
        ">": "\\gt ",
    }

    /**
     * @param {string} txt 
     * @param {OutputOptions} options
     * @returns {string}
     */
    function replaceTexTxt(txt, options) {
        const result = []
        const map = { ...texReplaceMap }
        if (options.formatter.tex.texEnd.indexOf("]") >= 0) {
            map["]"] = "\\]"
        }
        for (let i = 0; i < txt.length; i++) {
            let replaced = map[txt[i]];
            result.push(replaced == null ? txt[i] : replaced)
        }
        return result.join("")
        // // TODO とりあえずの実装。整形
        // let replaced = txt
        // texReplaceMaps.forEach(map => {
        //     for (var before in map) {
        //         replaced = txt.replace(new RegExp(before, "g"))
        //     }
        // })
        // let text = txt.replace(/φ/g, "\\varphi")
        //     .replace(/｛/g, "\\{")
        //     .replace(/｝/g, "\\}")
        //     .replace(/<=/g, "\\le")
        //     .replace(/</g, "\\lt")
        //     .replace(/>=/g, "\\ge")
        //     .replace(/∈/g, " \\in ")
        // if (options.formatter.tex.texEnd.indexOf("]") >= 0) {
        //     replaced = replaced.replace(/\]/g, "\\]")
        // }
        // return replaced
    }

    // /**
    //  * @type {OutputOptions}
    //  */
    // let options
    /**
     * @type {() => Doc}
     */
    let executor

    return {
        // /**
        //  * @param {OutputOptions} v 
        //  */
        // setOption(v) {
        //     options = v
        // },
        Tex: {
            tex(...values) {
                return new Tex(...values)
            },
            N: new Tex("\\mathbb{N}"),
            Q: new Tex("\\mathbb{Q}"),
            R: new Tex("\\mathbb{R}"),
        },
        /**
         * @param {(doc: Doc) => void} callback
         * @param {{
         *   formatter: Tools4BlogFormatter
         * }} option
         */
        prepare(callback, option) {
            const doc = new Doc
            executor = () => {
                callback(doc);
                return doc
            }
        },
        exec() {
            return executor()
        }
    }
})()


// callback({

// })
