window.addEventListener("DOMContentLoaded", () => {

    const articleBody = document.getElementById("articleBody")
    const articleTitle = document.getElementById("articleTitle")
    const loadingMessage = document.getElementById("loadingMessage")
    const mathJaxUrl = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.js"

    const params = new URLSearchParams(document.location.search.substring(1));
    const targetScriptUrl = getTargetScriptUrl(params.get("article"))
    let prevHTML
    if (!targetScriptUrl) {
        return notFound()
    }
    exec()
    {
        if (location.protocol == "file:" || location.hostname == "localhost") {
            console.log("start live preview!!")
            setInterval(exec, 1000)
        }
    }

    const showContent = (() => {
        let showed = false
        return () => {
            if (showed) return
            showed = true
            document.querySelectorAll(".fade-in-hidden").forEach(elem => {
                loadingMessage.style.display = "none"
                elem.classList.remove("fade-in-hidden")
                elem.classList.add("fade-in-show")
            })
        }
    })()

    document.addEventListener("click", (e) => {
        // ctrlキー押下時は別タブで開かせる。ctrlキー押下でない場合はダイアログで開く
        if (e.ctrlKey) { return } // 別タブで開かせる
        if (!e.target.getAttribute("data-article-id")) { return }
        e.preventDefault()
        Dialogs.showDialog(e.target.href)
    })

    /////////////////////////////////////////////////////////////
    function exec() {

        const script = document.createElement("script")

        script.src = targetScriptUrl
        script.onerror = () => {
            notFound()
        }
        script.onload = () => {
            const errorInfo = document.getElementById("errorInfo")
            // 成功したのでmathjax呼び出し
            const onerror = e => {
                errorInfo.innerText = e.stack || e.message
                throw e
            }
            const e = MultipePlatformBlogData.latestError
            if (e != null) {
                return onerror(e)
            }
            let doc
            try {
                doc = MultipePlatformBlogData.build({
                    formatter: {
                        tex: {
                            texStart: " \\( ",
                            texEnd: "\\) "
                        }
                    },
                    id2Url: id => {
                        if (!getTargetScriptUrl(id)) {
                            return false
                        }
                        return "article.html?article=" + id
                    }
                })
            } catch (e) {
                return onerror(e)
            }
            errorInfo.innerText = ""
            document.title = doc.title
            articleTitle.textContent = doc.title
            if (prevHTML == doc.body.outerHTML) {
                showContent()
                return
            }
            prevHTML = doc.body.outerHTML
            articleBody.innerHTML = ""
            articleBody.append(doc.body)
            if (doc.existsTex) {
                if (!window.MathJax) {
                    window.MathJax = {
                        skipStartupTypeset: true,
                        loader: { load: ['[tex]/color', '[tex]/amscd'] },
                        tex: { packages: { '[+]': ['color', 'amscd'] } }
                    }
                    const script = document.createElement("script")
                    script.src = mathJaxUrl
                    document.head.append(script)

                    // パッケージを入れると、onloadeでもtypesetPromiseが使えない？
                    let iid = setInterval(() => {
                        if (!MathJax.typesetPromise) { return }
                        clearInterval(iid)
                        MathJax.typesetPromise([articleBody])
                            .then(showContent)
                    })
                    // script.onload = () => {
                    // }
                } else if (MathJax.typesetPromise) {
                    MathJax.typesetPromise([articleBody]).then(showContent)
                }
            } else {
                setTimeout(() => showContent())
            }
        }
        document.head.append(script)
    }

    function getTargetScriptUrl(articleId) {
        if (!articleId) {
            return false
        }
        const match = articleId.match(/^(math|it|misc|mylife)-([0-9]{8})-([0-9]{2})$/)
        if (!match) {
            return false
        }
        const kind = match[1]
        const year = match[2].substring(0, 4)
        const month = match[2].substring(4, 6)
        return `${kind}/${year}/${month}/${articleId}.js`
    }

    function notFound() {
        document.getElementById("loadingMessage").style.display = "none"
        document.getElementById("notFoundMessage").style.display = ""
    }
})
