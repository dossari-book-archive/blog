MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { K, n, Ω, φ, ψ } = tex.canonicalSymbols
        , { p, div, table, br, h4, ul, li } = doc.el
        , textRight = style("text-align", "right")
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
                , [[tex("K_i"), textRight], [tex("= K(a_1, …, a_i)")]]
                , [[Ω, textRight], [tex("a_1, …, a_n"), "の共役をすべて含む体"]]
                , [[tex("r_i"), textRight], [
                    tex("a_{i+1}"), "の", tex("K_i"), "上の最小多項式における異なる根の個数"
                    , br(), tex("(i = 1, …, n - 1)")
                ]]
            ),
        )
        , h4("命題")
        , p(
            tex("K_n"), "から", Ω, "への",
            K, "上の埋め込みは丁度", prod, "個存在する。"
        )
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
    )
})
