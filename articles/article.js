window.addEventListener("DOMContentLoaded", () => {

    const article = document.getElementById("article")
    const loadingMessage = document.getElementById("loadingMessage")

    const params = new URLSearchParams(document.location.search.substring(1));
    const kind = params.get("kind");
    const articleName = params.get("article");
    if (kind != "math" || articleName == null) {
        return notFound()
    }
    const match = articleName.match(/^([0-9]{8})-([0-9]{2})/)
    if (!match) {
        return notFound()
    }
    const year = match[1].substring(0, 4)
    const month = match[1].substring(4, 6)
    const num = match[2]
    const script = document.createElement("script")
    script.src = `${kind}/${year}/${month}/${articleName}.js`
    script.onerror = () => {
        notFound()
    }
    script.onload = () => {
        // 成功したのでmathjax呼び出し
        article.append(MultipePlatformBlogData.build({
            formatter: {
                tex: {
                    texStart: " \\( ",
                    texEnd: "\\) "
                }
            }
        }))
        if (!window.MathJax) {
            window.MathJax = {
                skipStartupTypeset: true
            }
            const script = document.createElement("script")
            script.src = `https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.js`
            script.onload = () => {
                loadingMessage.style.display = "none"
                MathJax.typesetPromise([article])
                    .then(() => {
                        article.classList.remove("fade-in-hidden")
                        article.classList.add("fade-in-show")
                    })
            }
            document.head.append(script)
        }
    }
    document.head.append(script)

    function notFound() {
        document.getElementById("loadingMessage").style.display = "none"
        document.getElementById("notFoundMessage").style.display = ""
    }
})
