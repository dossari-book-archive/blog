MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, K, L, M, n, Ω, φ, ψ } = tex.canonicalSymbols
        , { p, div, table, br, h4, ul, li } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , prod = tex.d("Π_{i=1}^n r_i")

    doc.articleId("math-20210424-01")
    doc.title("代数拡大における埋め込みの個数")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"]
                , [[tex("a_1, …, a_n"), textRight], [n, "個の元", tex("∈L")]]
                , [[tex("K_i"), textRight], [
                    tex("=", tex.cases(
                        "K & (i = 0) "
                        , "K(a_1, …, a_i) & (i = 1,…,n)"
                    ))
                ]]
                , [[Ω, textRight], [K, "を含み、任意の", L, "の元", a, "に対して"
                    , tex("a"), "の", K, "上共役な元をすべて含む体"]]
                , [[tex("r_i"), textRight], [
                    tex("a_i"), "の", tex("K_{i-1}"), "上の最小多項式における異なる根の個数"
                    , br(), tex("(i = 1, …, n)")
                ]]
            ),
        )
        , h4("命題")
        , p(
            tex("K_n"), "から", Ω, "への",
            K, "上の埋め込みは丁度", prod, "個存在する。"
        )
        , p("（したがって、埋め込みの個数", tex("<= [L : K]"), "）")
        , h4("証明")
        , p("埋め込みが", prod, "個以上存在すること：")
        , ul(
            li(
                tex("K_1"), "から", Ω, "への"
                , K, "上の埋め込みは", tex("r_1"), "個存在する。"
            )
            , li(
                tex.d("r_1"), "個の各埋め込み"
                , tex("φ: K_1 ↪ Ω"), "それぞれで、"
                , φ, "を拡張子した埋め込み", tex("K_2 ↪ Ω")
                , "が", tex("r_2"), "個存在して、合計", tex("r_1r_2"), "個存在する"
            )
            , li(
                "同様に続けていけば、"
                , tex("j >= 1"), "に対して、"
                , tex.d("Π_{i=1}^j r_i"), "個の各埋め込み"
                , tex("φ: K_j ↪ Ω"), "それぞれで、"
                , φ, "を拡張子した埋め込み", tex("K_{j + 1} ↪ Ω")
                , "が", tex("r_{j+1}"), "個存在することがわかる。"
            )
        )
        , br()
        , p("埋め込みが丁度", prod, "個存在すること（任意の埋め込みが上記のいずれかに一致すること）：")
        , ul(
            li("任意の埋め込み", tex("K_n ↪ Ω"), "に対して"
                , tex("K_1"), "への制限は上記", tex("r_1"), "個の埋め込みのいずれかに一致する。"
            )
            , li(
                "よって", tex("K_2"), "への制限は上記", tex("r_1r_2")
                , "個の埋め込みのいずれかに一致する。"
            )
            , li(
                "同様に続けていけば"
                , ψ, "は上記", prod, "個の埋め込みのいずれかに一致することがわかる。"
            )
        )
        , p("（証明終）")
        , h4("系1")
        , p(tex("L/K"), "を有限次拡大とすると")
        , p(
            tex("L/K"), "が分離拡大"
            , tex("⇔ L"), "の", Ω, "への埋め込みの個数", tex(" = [L : K]")
        )
        , h4("証明")
        , p(tex("L = K(a_1, …, a_n)"), "とする。")
        , p(tex("⇒)"), tex("a_i"), "が", tex("K_{i-1}"), "上分離的な元だから、")
        , p(textCenter, tex("r_i = [K_i : K_{i-1}]"))
        , p("よって")
        , p(textCenter, "埋め込みの総数", tex(`= ${prod} = Π_{i=1}^n [K_i : K_{i - 1}] = [L : K]`))
        , br()
        , p(tex("⇐) L"), "が非分離的な元", tex("b∈L"), "を含むとする。このとき")
        , p(textCenter, "埋め込み", tex("K(b) ↪ Ω"), "の個数", tex("< [K(b) : K]"))
        , p("よって本命題から")
        , p(textCenter, "埋め込みの総数", tex(`< [K : K(b)][K(b) : L] = [L : K]`))
        , p("（証明終）")
        , h4("系2")
        , p(tex("a_1,…,a_n"), "が分離的であれば、", tex("K(a_1,…,a_n)/K"), "は分離拡大となる。")
        , p("（したがって", L, "の分離的な元全体の集合は", L, "の部分体を成す）")
        , h4("系3")
        , p(tex("L/K"), "を分離拡大、"
            , tex("M"), "を", tex("L/K"), "の中間体とすると、"
            , "埋め込み", tex("σ,σ':L ↪ Ω"), "は", M, "への制限で"
            , )
        , p(textCenter, tex("σ～σ' ⇔ σ|_M = σ'|_M"))
        , p("という同値関係によって", tex("[L:M]")
            , "個の元を含む", tex("[M:K]"), "個の同値類に分けられる。")
        , h4("リンク")
        , ul(
            li(doc.el.a(doc.attr("href", doc.articleLink("math-20210418-03")), "有限次分離拡大は単純拡大"))
        )
    )
})
