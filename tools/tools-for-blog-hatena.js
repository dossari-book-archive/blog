document.addEventListener("DOMContentLoaded", () => {
    const filepath = document.getElementById("filepath")
    const result = document.getElementById("result")
    const preview = document.getElementById("preview")
    if (localStorage.Tools4BlogHatenaFilePath) {
        filepath.value = localStorage.Tools4BlogHatenaFilePath
    }

    setInterval(exec, 5000)
    exec()

    function exec() {
        if (filepath.value == "") {
            console.log("スキップ")
            return
        }
        const elem = document.createElement("script")
        elem.src = filepath.value
        localStorage.Tools4BlogHatenaFilePath = filepath.value
        elem.onload = () => {
            // try {
            // はてな用
            result.value = MultipePlatformBlogData.build({
                formatter: {
                    tex: {
                        texStart: " [tex:",
                        texEnd: "] "
                    }
                }
            }).innerHTML
            // プレビュー用
            preview.innerHTML = ""
            preview.append(MultipePlatformBlogData.build({
                formatter: {
                    tex: {
                        texStart: " \\( ",
                        texEnd: "\\) "
                    }
                }
            }))
            MathJax.typesetPromise([preview])
        }
        elem.onerror = () => {
            console.error("スクリプトの読み込みに失敗")
        }
        document.head.appendChild(elem)
    }
})