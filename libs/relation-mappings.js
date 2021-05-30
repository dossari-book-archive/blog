document.addEventListener("DOMContentLoaded", () => {
    const copy = (map) => { return { ...map } }
        , svg = document.getElementById("relationMappings")
        , drawings = Drawings.create({
            svg: svg, dragginArea: document.getElementById("articlesDrawings")
        })

    draw()

    Dialogs.addEventListenerOnArticleLinkClick()

    function draw() {
        for (let articleId in relationMappingsData) {
            const articleElem = getArticleRootElem(document.querySelector(`[data-article-id="${articleId}"]`))
            // 特に意味はないがエレメントは動かせるようにしておく（ライブラリ宣伝）
            drawings.addDraggableElem(articleElem)
            /** @type {SerializedArticle} */
            const article = relationMappingsData[articleId]
            for (let linkArticleId in article.references) {
                const linkData = article.references[linkArticleId]
                    , startPos = linkData.startPos
                    , endPos = linkData.endPos
                    , refElem = getArticleRootElem(document.querySelector(`[data-article-id="${linkArticleId}"]`))
                let curve
                curve = drawings.createBezier2DCurve(linkData.middlePoints.map(p => copy({ x: p.left, y: p.top })))
                curve.firstPointStickyTo(articleElem, startPos.mode, startPos.percentile)
                curve.lastPointStickyTo(refElem, endPos.mode, endPos.percentile)
                curve.endPointFormType = "triangularArrow"
            }
        }
    }

    /**
     * @param {HTMLElement} elem 
     */
    function getArticleRootElem(elem) {
        while (elem.parentElement) {
            if (elem.classList.contains("article-drawing")) {
                return elem
            }
            elem = elem.parentElement
        }
    }
})
