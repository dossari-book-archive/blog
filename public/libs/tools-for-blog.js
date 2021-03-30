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

const MultipePlatformBlogData = (() => {

    const dataKey = Symbol("data")

    /**
     * @typedef {string|Elem|Tex} ValueType
     */

    class Elem {
        /**
         * 
         * @param {string} tagName 
         * @param {(ValueType)[]} children 
         */
        constructor(tagName, children) {
            this[dataKey] = { tagName, children }
        }
    }
    /**
     * @param {string} txt 
     * @param {OutputOptions} options
     * @returns {string}
     */
    const replaceTexTxt = (txt, options) => {
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
    }

    const buildHTML = (/** @type {Elem} */elem, /**  @type {OutputOptions} */ options) => {
        const data = elem[dataKey]
        const htmlElem = document.createElement(data.tagName)
        data.children.forEach(child => {
            if (typeof child == "string") {
                htmlElem.append(document.createTextNode(child))
            } else if (child instanceof Tex) {
                htmlElem.append(document.createTextNode(
                    options.formatter.tex.texStart
                    + replaceTexTxt(child[dataKey], options)
                    + options.formatter.tex.texEnd
                ))
            } else if (child instanceof Elem) {
                htmlElem.append(buildHTML(child, options))
            }
        })
        return htmlElem
    }

    class Tex {
        constructor(values) {
            this[dataKey] = values.map(value => {
                if (value instanceof Tex) {
                    return value[dataKey]
                } else if (typeof value == "string") {
                    return value
                }
            }).join("")
        }
        toString() {
            return this[dataKey]
        }
    }

    class Style {

    }

    const enabledTagNames = ("section nav article aside h1 h2 h3 h4 h5 h6 header footer address"
        + " p hr pre blockquote ol ul li dl dt dd figure figcaption div main"
        + " a em strong small s cite q dfn abbr time code var samp kdb sub sup i b mark ruby rt rp bdo span br wbr"
        + " ins del img table caption colgroup col tbody thead tfoot tr td th fieldset legend label"
    ).split(" ").map(name => name.trim()).filter(name => name != "")

    /**
     * @type {{
     *  
     * }}
     */
    const Elems = (() => {
        const result = {}
        enabledTagNames.forEach(tagName => {
            result[tagName] = (...values) => new Elem(tagName, values)
        })
        return result
    })()


    /**
     * @typedef {((...values: any) => Tex) & {
     *  canonicalSymbols: {
     *   a: Tex, z: Tex, A: Tex, Z: Tex
     *   Ｎ: Tex, Ｑ: Tex, Ｒ: Tex, Ｚ: tex,
     * }} TexFunc
     */

    /**
     * @typedef {(...values: any) => Elem} ElemFunc
     */

    const texReplaceMap = {
        "≦": "\\le ",
        "≧": "\\ge ",
        "｛": "\\{",
        "｝": "\\}",
        "∈": " \\in ",
        "∋": " \\ni ",
        "⊂": "\\subset ",
        "⊃": "\\supset ",
        "φ": "\\varphi ",
        "≡": "\\equiv ",
        "<": "\\lt ",
        ">": "\\gt ",
        "…": "\\cdots",
        "　": "\\,",
        "Ｎ": "\\mathbb{N}",
        "Ｑ": "\\mathbb{Q}",
        "Ｒ": "\\mathbb{R}",
        "Ｚ": "\\mathbb{Z}",
    }

    /**
     * @type {TexFunc}
     */
    const texFunc = (() => {
        const tex = (...values) => new Tex(values)
        const symbols = tex.canonicalSymbols = {}
        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            symbols[c] = tex(c)
            symbols[c.toUpperCase()] = tex(c.toUpperCase())
        })
        Object.keys(texReplaceMap).forEach(k => symbols[k] = tex(texReplaceMap[k]))
        console.log(tex.canonicalSymbols)
        return tex
    })()

    /**
     * @type {Elem}
     */
    let latestRootElem

    return {
        /**
         * 
         * @param {(
         *   doc: ((...values: any) => void) & {
         *    tex: TexFunc,
         *    style: () => Style,
         *    el: {table: ElemFunc, tr: ElemFunc, p: ElemFunc},
         *   }
         * ) => void} callback 
         */
        register(callback) {
            let rootElem;
            const doc = (...values) => {
                if (rootElem != null) {
                    throw new Error("can only be called once")
                }
                rootElem = new Elem("div", values)
            }
            doc.tex = texFunc
            doc.el = Elems
            doc.style = () => new Style
            callback(doc)
            latestRootElem = rootElem
        },
        /**
         * @param {OutputOptions} options 
         */
        build(options) {
            return buildHTML(latestRootElem, options)
        }
    }
})()
