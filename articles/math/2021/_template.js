MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, K, M } = tex.canonicalSymbols
        , { p, div, table, br, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.tags("可換体論")
    doc.title("完全体と")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
            ),
        )
        , h4("定理")
        , p()
        , h4("証明")
        , p()
        , p("（証明終）")
    )
})
