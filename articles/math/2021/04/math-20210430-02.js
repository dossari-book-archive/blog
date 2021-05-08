MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { f, K, L } = tex.canonicalSymbols
        , { p, div, table, h4, br, ul, li } = doc.el
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("重根と形式的微分")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("K"), textRight], "可換体"],
                [[tex("f"), textRight], [K, "上の多項式（次数", tex(">= 1"), "）"]],
                [[tex("f'"), textRight], [K, "上の形式的な微分"]],
                [[tex("p"), textRight], [K, "の標数（0または素数）"]],
                [[tex("L"), textRight], [K, "を含む", f, "の分解体"]],
            ),
        )
        , h4("定理")
        , p(tex("1)"), f, "が重根を持つ",
            tex("⇔"), tex("f,f'"), "が共通根を持つ")
        , p(tex("2)"), tex("p > 0,f' = 0"), "（つまり", tex("f∈K[x^p]"), "）"
            , tex("⇒"), f, "が重根を持つ　")
        , p(tex("3)"), f, "を既約多項式とすると、", tex("2)"), "の逆も成り立つ")
        , h4("証明")
        , p(tex("1)"), L, "において", tex("f = Π(x - a_i)^{r_i}"), "と分解したと仮定する。")
        , ul(
            li(f, "が重根を持てば、ある", tex("i"), "に対して", tex("r_i >= 2")
                , "となり、", tex("f,f'"), "が共通根", tex("a_i"), "を持つことがわかる。")
            , li(f, "が重根を持たなければ、すべての", tex("i"), "で", tex("r_i = 1")
                , "となり、", tex("f'(a_i) ≠ 0"), "。よって共通根を持たない。")
        )
        , p(tex("2)"), f, "の係数の", tex("p"), "乗根を全て含む拡大体で考えれば、"
            , f, "はその体において", tex("p"), "べき乗に分解されるため、重根を持つ。")
        , p(tex("3)"), tex("a∈L"), "を", f, "の任意の根とすると、"
            , doc.article("math-20210430-03", f, "が最小多項式となる"), "。"
            , "重根を持てば、", tex("1)"), "より", tex("f' = 0"), "でなくてはならない。"
            , tex("p = 0"), "だと", tex("f'≠ 0"), "なので", tex("p > 0"), "。"
        )
        , p("（証明終）")
    )
})
