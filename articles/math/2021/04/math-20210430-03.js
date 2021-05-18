MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, f, g, K, L } = tex.canonicalSymbols
        , { p, div, table, h4, br } = doc.el
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("最小多項式と既約多項式")
    doc.tags("可換体論")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"],
                [[tex("a"), textRight], [L, "の元"]],
                [[tex("f, g"), textRight], [K, "上の多項式（次数", tex(">= 1"), "）"]],
            ),
        )
        , h4("命題")
        , p("「", f, "が", a, "の", K, "上最小多項式」",
            tex("⇔"), "「", tex("f(a) = 0"), "かつ", f, "が", K, "上既約」")
        , h4("証明")
        , p(tex("⇒)"), tex("f = f_1f_2"), "と分解すると、"
            , tex("f_1(a) = 0"), "または", tex("f_2(a) = 0"), "。")
        , p(f, "の最小性から", tex("f_1, f_2"), "のいずれかは次数が", f, "と一致する。")
        , br()
        , p(tex("⇐)"), tex("g(a) = 0"), "とすると、", f, "と", g, "は"
            , "互いに素でないから共通の約元を持つが、", f, "が既約であることから"
            , f, "の次数", tex("<="), g, "の次数。")
        , p("（証明終）")
    )
})
