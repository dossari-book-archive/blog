MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
    const { c, g, K, L, } = tex.canonicalSymbols
    const { p, div, table, br, h4, ul, li } = doc.el
    const textRight = style("text-align", "right")
    const contentCenter = style({ display: "flex", "justify-content": "center" })

    const a1 = tex("a_1")
        , a2 = tex("a_2")
        , f1 = tex("f_1")
        , f2 = tex("f_2")

    doc.title("分離元と単純拡大")
    doc.body(
        h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("K⊂L"), textRight], "可換体の拡大"],
                [[tex("a_1, a_2"), textRight], [K, "上代数的な", L, "の元"]],
                [[tex("f_1"), textRight], [a1, "の", K, "上最小多項式"]],
                [[tex("f_2"), textRight], [a2, "の", K, "上最小多項式"]],
                [[tex("a_{1i},　(i = 1,…,r_1)"), textRight], [f1, "の根。", tex("a_{11} = a_1"), "とする。"]],
                [[tex("a_{2i},　(i = 1,…,r_2)"), textRight], [f2, "の根。", tex("a_{21} = a_2"), "とする。"]],
            ),
        )
        , h4("定理")
        , p(K, "が無限体で", a2, "を", K, "上分離的な元とすると、ある", tex("c∈K"),
            "が存在して", tex("K(a_1, a_2) = K(ca_1 + a_2)"), "が成り立つ。")
        , h4("証明")
        , p("とりあえず", tex("c∈K^*"), "を取り、", tex("b = ca_1 + a_2"), "と置く。")
        , p(tex("g = f_2(b - cx)∈K(b)[x]"), "と置くと、", tex("g(a_1) = 0"), "であり")
        , p(contentCenter, tex.align(
            "f_1 &= Π_{i=1}^{r_1} (x - a_{1i})"
            , tex.br, "g &= Π_{i=1}^{r_2} (b - cx - a_{2i})"
            , tex.br, " &= Π_{i=1}^{r_2} (ca_1 + a_2 - cx - a_{2i})"
            , tex.br, " &= (-c)^{r_2}Π_{i=1}^{r_2} (x - a_1 - c^{-1}(a_2 - a_{2i}))"
            , tex.br, " &= (-c)^{r_2}Π_{i=1}^{r_2} (x - d_i)"
            , tex.br, "(d_i &= a_1 + c^{-1}(a_2 - a_{2i}))"
        ))
        , p("仮定より")
        , ul(
            li(K, "が無限体")
            , li(f2, "が重根を持たないことから", g, "も重根を持たない")
        )
        , p("よって", c, "を適切に選ぶことにより、")
        , ul(
            li(tex("a_1 = d_1 ≠ d_j　　(j >= 2)"))
            , li(tex("a_{1i} ≠ d_j　　(i, j >= 2)"))
        )
        , p("とすることができる。")
        , p(br(), "このとき")
        , ul(
            li(tex("f_1, g"), "の最大公約因子", tex("∈K(b)[x]"))
            , li(tex("f_1, g"), "の最大公約因子", tex("= x - a_1"))
        )
        , p("であるから、", tex("a_1∈K(b)"), "。よって", tex("a_2∈K(b)"), "となり",
            tex("K(b) = K(a_1, a_2)"), "が成り立つ")

        , p("（証明終）")
    )
})
