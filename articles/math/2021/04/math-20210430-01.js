MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, K, } = tex.canonicalSymbols
        , { p, div, table, br, h4, strong } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("完全体")
    doc.tags("可換体論", "ガロア理論")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[K, textRight], "可換体"],
                [[tex("p"), textRight], [K, "の標数（", tex("0"), "または素数）"]],
                [[tex("K[x]"), textRight], [K, "上の多項式環"]],
            ),
        )
        , h4("定義")
        , p(K, "の任意の代数拡大体が", K, "上分離的であるとき、", K, "を", strong("完全体"), "と言う。")
        , h4("定理")
        , p(K, "が完全体"
            , br(), tex("⇔"), tex("K"), "上の任意の既約多項式が重根を持たない"
            , br(), tex("⇔"), tex("p = 0")
            , "、または", tex("p > 0"), "で", tex("K^p = K")
            , "（", K, "が任意の元の", tex("p"), "乗根を含む）"
        )
        , p("よって、標数0の体、有限体は完全体である。")
        , h4("証明")
        , p("最初の同値性は、", doc.article("math-20210430-03", "こちらの命題"), "から明らか。")
        , p(tex("⇒)"), tex("p > 0"), "かつ", tex("K^p ≠ K"), "とすると、"
            , "ある", tex("a∈K"), "に対して", a, "の", tex("p"), "乗根が"
            , K, "に存在しない。")
        , p(a, "の", tex("p"), "乗根を含む拡大体で考えると、"
            , tex("x^p - a"), "は重根を持つため、分離的な拡大体でない。")
        , p("よって", K, "は完全体でない。")
        , br()
        , p(tex("⇐)"), tex("p=0"), "の場合、"
            , doc.article("math-20210430-02", "こちらの定理")
            , "より、", K, "上の任意の既約多項式は重根を持たない。"
        )
        , p(tex("p > 0"), "で", tex("K^p = K"), "の場合、"
            , "重根を持つ既約多項式は"
            , doc.article("math-20210430-02", "同定理"), "より"
            , tex("K[x^p]"), "の元だが、")
        , p(textCenter, tex("K[x^p] = K^p[x^p] = (K[x])^p"))
        , p("よって、重根を持つ既約多項式は存在しない。")
        , br()
        , p(K, "が有限体なら、", tex("K^p = K"), "が成り立つので", K, "は完全体。")
        , p("（証明終）")
    )
})
