document.addEventListener("DOMContentLoaded", () => {
    const copy = (map) => { return { ...map } }
        , svg = document.getElementById("relationMappings")
        , drawings = Drawings.create({
            svg: svg, dragginArea: document.getElementById("articlesDrawings")
        })

    draw()

    document.querySelectorAll(".article-drawing").forEach(articleElem => {
        articleElem.addEventListener("click", (e) => {
            // ctrlキー押下時は別タブで開かせる。ctrlキー押下でない場合はダイアログで開く
            if (e.ctrlKey) { return } // 別タブで開かせる
            e.preventDefault()
            Dialogs.showDialog(articleElem.parentElement.href)
        })
    })

    function draw() {
        for (let articleId in relationMappingsData) {
            /** @type {SerializedArticle} */
            const article = relationMappingsData[articleId]
            for (let linkArticleId in article.references) {
                const linkData = article.references[linkArticleId]
                    , startPos = linkData.startPos
                    , articleElem = document.querySelector(`[data-article-id="${articleId}"]`)
                    , endPos = linkData.endPos
                    , refElem = document.querySelector(`[data-article-id="${linkArticleId}"]`)
                let curve
                curve = drawings.createBezier2DCurve(linkData.middlePoints.map(p => copy({ x: p.left, y: p.top })))
                curve.firstPointStickyTo(articleElem, startPos.mode, startPos.percentile)
                curve.lastPointStickyTo(refElem, endPos.mode, endPos.percentile)
                curve.endPointFormType = "triangularArrow"
            }
        }
    }
})
