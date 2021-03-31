window.addEventListener("DOMContentLoaded", () => {

    const articleBody = document.getElementById("articleBody")
    const articleTitle = document.getElementById("articleTitle")
    const loadingMessage = document.getElementById("loadingMessage")
    const mathJaxUrl = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.js"

    const params = new URLSearchParams(document.location.search.substring(1));
    const targetScriptUrl = getTargetScriptUrl(params.get("article"))
    if (!targetScriptUrl) {
        return notFound()
    }
    const script = document.createElement("script")

    script.src = targetScriptUrl
    script.onerror = () => {
        notFound()
    }
    script.onload = () => {
        // 成功したのでmathjax呼び出し
        const doc = MultipePlatformBlogData.build({
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
        document.title = doc.title
        articleTitle.textContent = doc.title
        articleBody.append(doc.body)
        if (!window.MathJax) {
            window.MathJax = {
                skipStartupTypeset: true
            }
            const script = document.createElement("script")
            script.src = mathJaxUrl
            script.onload = () => {
                loadingMessage.style.display = "none"
                MathJax.typesetPromise([articleBody])
                    .then(() => {
                        document.querySelectorAll(".fade-in-hidden").forEach(elem => {
                            elem.classList.remove("fade-in-hidden")
                            elem.classList.add("fade-in-show")
                        })
                    })
            }
            document.head.append(script)
        }
    }
    document.head.append(script)

    function getTargetScriptUrl(articleId) {
        if (!articleId) {
            return false
        }
        const match = articleId.match(/^(math)-([0-9]{8})-([0-9]{2})$/)
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
