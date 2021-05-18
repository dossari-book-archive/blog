MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { _1, a, f, g, n, m, x, K, M, X, Y, Z } = tex.canonicalSymbols
        , { p, div, ul, ol, li, table, br, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.tags("楕円曲線と保型形式")
    doc.title("1は合同数でない")
    doc.body(
        style("width", "720px")
        , h4("定理")
        , p(_1, "は合同数でない。")
        , h4("証明")
        , p(_1, "を合同数とすると、原始的なピタゴラス数"
            , tex("(X,Y,Z)"), "および正整数", m, "が存在して", "が成り立つ。（こちらを参照 TODO）"

        )
        , p(ul(
            li(tex("X^2 + Y^2 = Z^2"))
            , li(tex("XY/2 = m^2"))
        ))
        , p(Y, "を偶数とすると、以下を満たす正整数", tex("a,b"), "が存在する（"
            , doc.article("math-20210510-01", "こちら"), "を参照）")
        , p(ul(
            li(tex("a > b > 0"))
            , li(tex("a, b"), "は互いに素")
            , li(tex("a, b"), "は同時に奇数にならない")
            , li(tex("(X, Y, Z) = (a^2 - b^2, 2ab, a^2 + b^2)"))
        ))
        , p("この場合、")
        , p(textCenter, tex("m^2 = XY/2 = (a^2 - b^2)ab"))
        , p("で、", tex("a, b, a^2 - b^2"), "は互いに素だから全て平方数となる。")
        , p(tex("a = x^2, b = y^2, a^2 - b^2 = u^2"), "と置けば、", tex("x^4 - y^4 = u^2"), "となる。")
        , p("これは、", tex("x^4 - y^4 = u^2"), "は可解でない（TODO）ことに矛盾する。")
        , p("（証明終）")
        , h4("参考")
        , p("楕円曲線と保型形式 N.コブリッツ (著) 上田 勝 (翻訳) p6 演習問題3")
    )
})
