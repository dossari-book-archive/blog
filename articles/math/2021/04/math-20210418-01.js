MultipePlatformBlogData.register(doc => {
    const { tex, style, attr } = doc
    const { c, g, K, L, } = tex.canonicalSymbols
    const { p, div, table, br, h4, h5, ol, ul, li } = doc.el
    const textRight = style("text-align", "right")
    const contentCenter = style({ display: "flex", "justify-content": "center" })

    const a1 = tex("a_1")
        , a2 = tex("a_2")
        , f1 = tex("f_1")
        , f2 = tex("f_2")

    doc.title("分離拡大と単純拡大")
    doc.tags("可換体論", "ガロア理論")
    doc.body(
        style("width", "720px"),
        h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[tex("L_s"), textRight], [L, "における", K, "の分離閉包"]],
            )
        )
        , h4("定理")
        , p(ol(
            li(K, "が無限体で", tex("a_1,a_2∈L,"), a2, "を", K, "上分離的な元とすると、ある", tex("c∈K"),
                "が存在して", tex("K(a_1, a_2) = K(ca_1 + a_2)"), "が成り立つ。")
            , li(tex("L/K"), "が分離拡大なら、", tex("L/K"), "は単純拡大")
            , li(tex("L/K"), "が単純拡大", tex("⇔ L/L_s"), "が単純拡大")
        ))
        , h4("証明")
        , h5("1.")
        , p("記号を以下のように定義する。")
        , p(ul(
            li(tex("f_1:"), "", a1, "の", K, "上最小多項式")
            , li(tex("f_2:"), " ", a2, "の", K, "上最小多項式")
            , li(tex("a_{1i},　(i = 1,…,r_1):"), f1, "の根。", tex("a_{11} = a_1"), "とする。")
            , li(tex("a_{2i},　(i = 1,…,r_2):"), f2, "の根。", tex("a_{21} = a_2"), "とする。")
        ))
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

        , h5("2.")
        , p(K, "が有限体の場合は明らかなので（TODO 証明記事作成）、", K, "を無限体とする。")
        , p(tex("L = K(a_1,…a_n)"), "と置く。")
        , p(
            "1.より、ある", tex("b∈K(a_1, a_2)"), "が存在して"
            , tex("K(a_1, a_2) = K(b)")
        )
        , p(
            "分離的な元の全体は体を成すから（"
            , doc.el.a(
                attr("href", doc.articleLink("math-20210424-01"))
                , "こちら"
            )
            , "を参照）、"
            , tex("L/K"), "の生成元の個数による帰納法で証明が完了する。"
        )
        , h5("3.")
        , p(tex("⇒"), "は明らか。", tex("⇐"), "を示す。")
        , p("2.より、", tex("L_s/K"), "が単純拡大なので", tex("L_s = K(a)　(a∈L_s)"), "と置く。")
        , p(tex("L = L_s = K(a)"), "の場合は良いので、", tex("L ≠ L_s"), "とする。")
        , p(K, "は無限体である（"
            , doc.article("math-20210430-01", "有限体は完全体"), "なので"
            , tex("L = L_s"), "となってしまう）。")
        , p(tex("L = L_s(b)"), "と置くと、", tex("L = K(a, b)"), "で、1.より、ある"
            , tex("c∈K"), "が存在して", tex("K(a, b) = K(cb + a)")
        )
        , p("となり、", tex("L/K"), "が単純拡大であることがわかる。")
        , p("（証明終）")
    )
})
