MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, c, r, n, K, L, } = tex.canonicalSymbols
        , { p, div, table, br, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.articleId("math-20210429-01")
    doc.title("純非分離的拡大と拡大次数")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"],
                [[tex("p"), textRight], [K, "の標数", tex("> 0")]],
                [[tex("a"), textRight], [L, "の元"]],
                [[tex("r"), textRight], ["正の整数"]],
                [[tex("n"), textRight], [tex("= [K(a) : K]")]],
            ),
        )
        , h4("命題")
        , p("ある", r, "に対して", tex("a^{p^r}∈K"), "なら、"
            , n, "は", tex("1"), "または", tex("p"), "冪（", tex("<= p^r"), "）。")
        //, p(tex("a^p∈K"), "なら、", tex("n = 1"), "または", tex("p"), "。")
        , h4("証明")
        , p("体の列")
        , p(textCenter, tex("K ⊂ K(a^{p^{r-1}}) ⊂ K(a^{p^{r-2}}) ⊂ … ⊂ K(a)"))
        , p("を考えれば、", tex("r = 1"), "の場合に帰着する。")
        , p(
            a, "の", K, "上の最小多項式は"
            , tex("x^p - a^p = (x-p)^p"), "の約元なので、", tex("(x-a)^n"), "である。"
        )
        , p(tex("n-1"), "次の項の係数が", tex("-na∈K"), "なので、もし"
            , tex("n < p"), "なら、", tex("a∈K"), "となり、", tex("n = 1"), "となる")
        , p("（証明終）")
        , h4("系1")
        , p(
            tex("L/K"), "が有限次純非分離的拡大ならば、"
            , n, "は", tex("1"), "または", tex("p"), "冪。"
        )
        , h4("系2")
        , p(
            tex("L/K"), "が有限次純非分離的拡大ならば、拡大体の列"
        )
        , p(textCenter, tex("K = K_0 ⊂ K_1 ⊂ … ⊂ K_i ⊂ … ⊂ K_r = L"))
        , p(textCenter, tex("[K_{i+1} : K_i] = p"))
        , p("が存在する。")
    )
})
