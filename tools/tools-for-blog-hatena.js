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
        elem.onload = () => {
            localStorage.Tools4BlogHatenaFilePath = filepath.value
            // try {
            const doc = Tools4Blog.exec()
            result.value = doc.buildTree({
                formatter: {
                    tex: {
                        texStart: "[tex:",
                        texEnd: "]"
                    }
                }
            }).innerHTML
            preview.innerHTML = ""
            preview.append(doc.buildTree({
                formatter: {
                    tex: {
                        texStart: "\\( ",
                        texEnd: "\\)"
                    }
                }
            }))
            MathJax.typesetPromise([preview])
            // } catch (e) {
            //     console.error("エラーが発生しました。" + e.message) // コンソールに沢山出ると嫌なのでまとめられるようにしておく
            // }
        }
        elem.onerror = () => {
            console.error("スクリプトの読み込みに失敗")
        }
        document.head.appendChild(elem)
    }
})