window.MathJax = {
    skipStartupTypeset: true
}

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
            result.value = getHtml4Hatena()
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

    function getHtml4Hatena() {
        const elem = MultipePlatformBlogData.build({
            formatter: {
                tex: {
                    // texStart: " [tex:",
                    // texEnd: "] "
                    texStart: " \\( ",
                    texEnd: "\\) "
                }
            }
        })
        elem.id = "8f5a713e-5a75-2935-1e35-16778cbb0357"
        elem.style.transitionDuration = "0.5s"
        elem.style.visibility = "hidden"
        elem.style.opacity = 0
        return elem.outerHTML + 
        `
<script>// <![CDATA[
window.MathJax = { skipStartupTypeset: true }
// ]]>
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.1.2/es5/tex-mml-chtml.js" defer="defer"></script>
<script defer="defer">// <![CDATA[
(function() {
  var id = setInterval(function() {
    if (!window.MathJax.typesetPromise) {
      return;
    }
    clearInterval(id);
    var target = document.getElementById("${elem.id}");
    MathJax.typesetPromise([target]).then(function(){
       target.style.visibility = "visible";
       target.style.opacity = "1";
    });
  })
})()
// ]]>
</script>`
    }
})