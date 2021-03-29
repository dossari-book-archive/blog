document.addEventListener("DOMContentLoaded", () => {
    const filepath = document.getElementById("filepath")
    const result = document.getElementById("result")
    if (localStorage.Tools4BlogHatenaFilePath) {
        filepath.value = localStorage.Tools4BlogHatenaFilePath
    }

    Tools4Blog.setOption({
        formatter: {
            tex: {
                texStart: "[tex:",
                texEnd: "]"
            }
        }
    })


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
            result.value = Tools4Blog.exec().buildTree().innerHTML
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