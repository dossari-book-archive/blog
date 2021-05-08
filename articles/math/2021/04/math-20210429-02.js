MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, K, M } = tex.canonicalSymbols
        , { p, div, table, br, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("単純拡大と中間体")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
            ),
        )
        , h4("定理")
        , p(tex("L/K"), "が単純拡大", tex(" ⇔ "), tex("L/K"), "の中間体は有限個。")
        , h4("証明の雰囲気")
        , p(tex("⇒)"), "中間体", M, "の個数", tex("<="), "最小多項式の約元の個数")
        , p(tex("⇐)"), "単純拡大でない", tex("K(a_1, a_2)"), "に対して、"
            , tex("｛K(a_1 + ca_2)｜c∈K｝"), "が無限集合")
        , h4("証明")
        , p(tex("⇒)")
            , tex("L=K(a)"), "として、"
            , M, "を", tex("L/K"), "の中間体とする。")
        , p(a, "の", M, "上の最小多項式を", tex("x^r + c_1x^{r-1} + … + c_r"), "とすると")
        , p(textCenter, tex("K(c_1,…,c_r) ⊂ M"))
        , p(textCenter, tex("[K(a) : K(c_1,…,c_r)] = r = [K(a) : M]"))
        , p("よって")
        , p(textCenter, tex("K(c_1,…,c_r) = M"))
        , p(a, "の", M, "上の最小多項式は、", a, "の", K, "上の最小多項式の約元だから、"
            , "その組み合わせは有限個しかない。")
        , br()
        , p(tex("⇐)"), tex("L/K"), "が単純拡大でないと仮定すると、", K, "は無限体。（TODO 証明記事リンク）")
        , p("また、ある", tex("a_1, a_2∈L"), "に対して、", tex("K(a_1, a_2)/K"), "が単純拡大でない。")
        , p("このとき、", tex("c, c'∈K"), "に対して")
        , p(textCenter, tex("c ≠ c' ⇒ K(a_1 + c a_2) ≠ K(a_1 + c' a_2)"))
        , p("を示せば、中間体が無限にあることがわかる。")
        , br()
        , p("もし、ある", tex("c ≠ c'"), "に対して"
            , tex("K(a_1 + c a_2) = K(a_1 + c' a_2) = M"), "とすると")
        , p(textCenter, tex("a_1 + c a_2,　　a_1 + c' a_2∈M"))
        , p("よって、その差も", M, "の元である：")
        , p(textCenter, tex("(a_1 + c a_2) - (a_1 + c' a_2) = (c - c')a_2∈M"))
        , p(tex("c ≠ c'"), "だから、", tex("a_2∈M")
            , "よって", tex("a_1∈M"), "となり、"
            , tex("M = K(a_1 + ca_2) = K(a_1, a_2)")
        )
        , p("これは", tex("K(a_1, a_2) / K"), "が単純拡大でないという仮定に反する。")
        , p("（証明終）")
    )
})
