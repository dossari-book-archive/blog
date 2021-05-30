MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, f, g, r, K, } = tex.canonicalSymbols
        , { p, div, table, br, h4, ul, li } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("非分離元のべき乗は分離元になる")
    doc.tags("可換体論", "ガロア理論")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"],
                [[tex("p"), textRight], [K, "の標数 > 0"]],
            ),
        )
        , h4("定理")
        , p(K, "上非分離的な元は、適当な", tex("p"), "べき乗により分離的な元となる。")
        , h4("証明")
        , p(
            "非分離的な元", a, "の最小多項式を"
            , tex("f = f(x) = Σ_{i} c_ix^i, c_i ≠ 0, p｜i"), "とする。"
            , br(), "（このような形で書ける理由は"
            , doc.article("math-20210430-02", "こちら"), "を参照）")
        , p("全ての", tex("i"), "を割り切る最小の", tex("p"), "べき指数", tex(">=1")
            , "を", r, "として、"
            , tex("g = g(x) = Σ_i c_ix^{i/p^r}"), "と置くと"
        )
        , ul(
            li(tex("f(x) = g(x^{p^r})"))
            , li(f, "が既約なので", g, "も既約")
            , li(tex("g' ≠ 0"), "なので", tex("g"), "は重根を持たない（"
                , doc.article("math-20210430-02", "こちら"), "を参照）")
            , li(tex("g(a^{p^r}) = 0"))
        )
        , p("よって", tex("a^{p^r}"), "は分離的な元となる。")
        , p("（証明終）")
        , h4("系")
        , p(tex("a∈L"), "の共役は、", a, "重根の数はすべて等しく、"
            , tex("1"), "または", tex("p"), "べきとなる。つまり、分解体の上で")
        , p(textCenter, a, "の", K, "上の最小多項式"
            , tex("= Π(x-a_i)^{p^r}")
        )
        , p(textCenter, "ただし", tex("i≠j ⇒ a_i≠a_j"))
        , p("の形で表せる。")
        , h4("証明")
        , p("上の証明で、", tex("c_i"), "の", tex("p^r"), "べき乗根を含む体で考えると、")
        , p(tex("f = （Σ c_i^{1/p^r} x^{i/p^r}）^{p^r}")
            , "で、カッコ内"
            , tex("Σ c_i^{1/p^r} x^{i/p^r}"), "は重根を持たないので、上のような形で表せる。")
        , p("（証明終）")
    )
})
