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
 *  id2Url: (id: string) => string
 * }} OutputProps
 */

const MultipePlatformBlogData = (() => {

    const dataKey = Symbol("data")

    /**
     * @typedef {string|Elem|Tex|Attr} ValueType
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
     * @param {OutputProps} outputProps
     * @returns {string}
     */
    const replaceTexTxt = (txt, outputProps) => {
        const result = []
        const map = { ...texReplaceMap }
        if (outputProps.formatter.tex.texEnd.indexOf("]") >= 0) {
            map["]"] = "\\]"
        }
        // 複数文字置換
        for (let key in multiWordReplaceMap) {
            txt = txt.replace(new RegExp(key, "g"), multiWordReplaceMap[key]) // TODO 見直し
        }
        // 単一文字置換
        for (let i = 0; i < txt.length; i++) {
            let replaced = map[txt[i]];
            result.push(replaced == null ? txt[i] : replaced)
        }
        return result.join("")
    }

    /**
     * 
     * @param {Elem} elem 
     * @param {OutputProps} outputProps 
     * @returns 
     */
    const buildHTML = (elem, outputProps) => {
        const data = elem[dataKey]
        const htmlElem = document.createElement(data.tagName)
        data.children.forEach(child => {
            if (typeof child == "string") {
                htmlElem.append(document.createTextNode(
                    child.replace(/、/g, ", ").replace(/。/g, ". ")) // TODO
                )
            } else if (child instanceof Tex) {
                htmlElem.append(document.createTextNode(
                    outputProps.formatter.tex.texStart
                    + replaceTexTxt(child[dataKey], outputProps)
                    + outputProps.formatter.tex.texEnd
                ))
            } else if (child instanceof Elem) {
                htmlElem.append(buildHTML(child, outputProps))
            } else if (child instanceof Attr) {
                const data = child[dataKey]
                if (data.value instanceof Link) {
                    const link = outputProps.id2Url(data.value[dataKey])
                    if (link) {
                        htmlElem.setAttribute(data.key, link)
                    } else {
                        console.warn(`cannot link to article '${data.value[dataKey]}'`)
                    }
                } else {
                    htmlElem.setAttribute(data.key, data.value)
                }
            } else if (child instanceof Style) {
                const data = child[dataKey]
                for (let key in data) {
                    htmlElem.style[toCamel(key)] = data[key]
                }
            }
        })
        return htmlElem
    }

    /**
     * 
     * @param {Elem} elem 
     * @returns 
     */
    const existsTex = (elem) => {
        const data = elem[dataKey]
        for (let i = 0; i < data.children.length; i++) {
            const child = data.children[i]
            if (child instanceof Tex) {
                return true;
            } else if (child instanceof Elem) {
                if (existsTex(child)) {
                    return true;
                }
            }
        }
        return false
    }

    const toCamel = p =>
        //_+小文字を大文字にする(例:_a を A)
        p.replace(/-./g, s => s.charAt(1).toUpperCase())

    class Tex {
        constructor(values) {
            this[dataKey] = values.map(value => {
                if (value == null) {
                    return ""
                } else if (value instanceof Tex) {
                    return value[dataKey]
                } else if (typeof value == "string") {
                    return value
                } else {
                    return "" + value
                }
            }).join("")
        }
        toString() {
            return this[dataKey]
        }
    }

    class Attr {
        constructor(key, value) {
            this[dataKey] = { key, value }
        }
    }

    class Style {
        constructor(key, value) {
            if (key instanceof Object) {
                this[dataKey] = key
            } else if (typeof key == "string") {
                this[dataKey] = {}
                this[dataKey][key] = value
            }
        }
    }

    class Link {
        /**
         * @param {string} id 
         */
        constructor(id) {
            this[dataKey] = id
        }
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
        // 特殊処理
        result.table = (...values) => new Elem("table", values.map(value => {
            if (Array.isArray(value)) {
                return new Elem("tr", value.map(td => new Elem("td", Array.isArray(td) ? td : [td])))
            } else {
                return value
            }
        }))

        return result
    })()

    /**
     * @typedef {{
     *   alignment: string
     *   parenthesis: "[]"|"||"|"()"
     * }} MatrixOptions
     */

    /**
     * @typedef {((...values: (string|Tex)) => Tex) & 
     * {
     *   canonicalSymbols: {
     *      a: Tex, z: Tex, A: Tex, Z: Tex
     *      Ｎ: Tex, Ｑ: Tex, Ｒ: Tex, Ｚ: tex,
     *   },
     *   d: (...values: string) => Tex,
     *   align: (...values: string|Tex) => Tex,
     *   cases: (...values: string|Tex) => Tex,
     *   matrix: (matrix: ((string|Tex)[][]), options: MatrixOptions) => Tex,
     *   hvector: (vector: ((string|Tex)[]), options: MatrixOptions) => Tex,
     *   vvector: (vector: ((string|Tex)[]), options: MatrixOptions) => Tex,
     * }
     * } TexFunc
     */

    /**
     * @typedef {(...values: any) => Elem} ElemFunc
     */

    const multiWordReplaceMap = {
        "：…": "\\ddots ",
        "…：": "\\ddots ",
        "<=": "\\le ",
        ">=": "\\ge ",
    }

    const greekLetters = {
        "α": "\\alpha ",
        "β": "\\beta ",
        "γ": "\\gamma ",
        "δ": "\\delta ",
        "ε": "\\epsilon ",
        "ζ": "\\zeta ",
        "η": "\\eta ",
        "θ": "\\theta ",
        "ι": "\\iota ",
        "κ": "\\kappa ",
        "λ": "\\lambda ",
        "μ": "\\mu ",
        "ν": "\\nu ",
        "ξ": "\\xi ",
        "π": "\\pi ",
        "ρ": "\\rho ",
        "σ": "\\sigma ",
        "τ": "\\tau ",
        "υ": "\\upsilon ",
        "χ": "\\chi ",
        "ω": "\\omega ",
        "φ": "\\varphi ",
        "Ψ": "\\psi ",
        "ψ": "\\psi ",
        "Ω": "\\Omega ",
    }

    const texReplaceMap = {
        "≦": "\\le ",
        "≧": "\\ge ",
        "｛": "\\left\\{ ",
        "｝": "\\right\\} ",
        "（": "\\left( ",
        "）": "\\right) ",
        "∈": " \\in ",
        "∋": " \\ni ",
        "⊂": "\\subset ",
        "⊃": "\\supset ",
        "＼": "\\setminus ",
        "×": "\\times ",
        "≠": "\\neq ",
        "～" : "\\sim",
        "≡": "\\equiv ",
        "⇔": "\\Leftrightarrow ",
        "⇒": "\\Rightarrow ",
        "⇐": "\\Leftarrow ",
        "↪": "\\hookrightarrow ",
        "<": "\\lt ",
        ">": "\\gt ",
        "…": "\\cdots ",
        "：": "\\vdots",
        "Σ": "\\sum",
        "Π": "\\prod",
        "｜": "\\mid ",
        "　": "\\,",
        "Ｎ": "\\mathbb{N}",
        "Ｑ": "\\mathbb{Q}",
        "Ｒ": "\\mathbb{R}",
        "Ｚ": "\\mathbb{Z}",
        ...greekLetters
    }

    /**
     * @type {TexFunc}
     */
    const texFunc = (() => {
        /** @type {TexFunc} */
        const tex = (...values) => new Tex(values)
        // \displaystyle を手軽に使えるように
        tex.d = (...values) => new Tex(["\\displaystyle "].concat(values))
        // 行列操作
        tex.matrix = (matrix, options) => {
            options = { parenthesis: "()", ...options }
            // TeX形式への行列変換例
            // [["a", "b", "c"], ["d", "e", "f"], ["h", "i", "j"]] 
            // または
            // ["a  b  c", "d  e  f", "h  i  j"] （空白スペース2以上）
            //   ↓　↓　↓
            // \( \left( \begin{array}{ccc} a & b & c \\ d & e & f \\ g & h & i \end{array} \right) \)
            //   ↓　↓　↓
            // \( \left( \begin{array}{ccc} a & b & c \\ d & e & f \\ g & h & i \end{array} \right) \)
            const alignment = options.alignment || "c".repeat(matrix[0].length)
            const matrixStr = matrix.map(row =>
                typeof row == "string" ? row.trim().replace(/ {2,}/g, " & ")
                    : row.join(" & ")
            ).join(" \\\\ ")
            return tex(`\\left${options.parenthesis[0]} \\begin{array}{${alignment}} ${matrixStr} \\end{array} \\right${options.parenthesis[1]}`)
        }
        tex.br = tex(" \\\\ ")
        tex.align = (...values) => new Tex([
            "\\begin{align}",
            ...values,
            "\\end{align}"
        ])
        // vvector
        tex.hvector = (values, options = {}) => {
            return tex.matrix([values], options)
        }
        // hvector
        tex.vvector = (values, options = {}) => {
            return tex.matrix(values.map(v => [v], options))
        }
        tex.cases = (...values) => new Tex(
            ["\\begin{cases}\n", values.join(" \\\\ "), "\\end{cases}"]
            // K & (i = 0) \\\\
            // K(a_1, …, a_i) & (i = 1,…,n)
            // \\end{cases}
        )
        // 標準シンボル（a, b,c, ..., A, B, C, ...）
        const symbols = tex.canonicalSymbols = {
            ...greekLetters
        }
        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            symbols[c] = tex(c)
            symbols[c.toUpperCase()] = tex(c.toUpperCase())
        })
        Object.keys(texReplaceMap).forEach(k => symbols[k] = tex(texReplaceMap[k]))
        return tex
    })()

    /**
     * @typedef {{
     *   rootElem: Elem,
     *   articleId: string,
     *   title: string,
     * }} Doc
     */

    /**
     * @type {Doc}
     */
    let latestDoc
    /** @type {Error} */
    let latestError

    return {
        /**
         * 
         * @param {(
         *   doc: {
         *    title: (title: string) => void,
         *    articleId: (id: string) => void,
         *    article: (id: string, ...values:any) => Elem
         *    body: ((...values: any) => void)
         *    tex: TexFunc,
         *    attr: (key: string, value: string) => Attr,
         *    style: (key: string, value: string) => Style
         *    el: {table: ElemFunc, tr: ElemFunc, p: ElemFunc},
         *    articleLink: (id: string) => Link
         *   }
         * ) => void} callback 
         */
        register(callback) {
            /**
             * @type {Doc}
             */
            const doc = {}
            try {
                callback({
                    articleId(id) { doc.articleId = id },
                    title(title) { doc.title = title },
                    body(...values) {
                        if (doc.rootElem != null) {
                            throw new Error("can only be called once")
                        }
                        doc.rootElem = new Elem("div", values)
                    },
                    tex: texFunc,
                    el: Elems,
                    attr: (key, value = "") => new Attr(key, value),
                    style: (key, value) => new Style(key, value),
                    articleLink: id => new Link(id),
                    article: (id, ...values) =>
                        new Elem("a", [
                            new Attr("href", new Link(id)),
                            new Attr("target", "_blank"),
                            ...values
                        ])
                })
                latestDoc = doc
                latestError = null
            } catch (e) {
                latestError = e
            }
        },
        get latestError() {
            return latestError
        },
        /**
         * @param {OutputProps} options 
         */
        build(options) {
            return {
                title: latestDoc.title,
                existsTex: existsTex(latestDoc.rootElem),
                body: buildHTML(latestDoc.rootElem, options),
            }
        }
    }
})()
