MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
    const { K, L, } = tex.canonicalSymbols
    const { p, div, table, br, h4 } = doc.el
    const textRight = style("text-align", "right")
    const contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.articleId("math-20210418-02")
    doc.title("非分離拡大と単純拡大")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[tex("L_s"), textRight], [L, "における", K, "の分離閉包"]],
                [[tex("a"), textRight], [
                    tex("L_s = K(a)"), "となる元", tex("∈L_s"),
                    br(), "（TODO:有限次分離拡大が単純拡大であることの証明記事リンク）"
                ]],
            ),
        )
        , h4("定理")
        , p(tex("L/K"), "が単純拡大", tex("⇔ L/L_s"), "が単純拡大")
        , h4("証明")
        , p(tex("⇒"), "は明らか。", tex("⇐"), "を示す。")
        , p(tex("L_s/K"), "が単純拡大なので（TODO: 証明記事リンク）", tex("L_s = K(a)　(a∈L_s)"), "と置く。")
        , p(tex("L = L_s = K(a)"), "の場合は良いので、", tex("L ≠ L_s"), "とする。")
        , p(K, "は無限体である。", br(), "（TODO: 有限体が完全体であることの証明記事リンク）")
        , p(tex("L = L_s(b)"), "と置くと、", tex("L = K(a, b)"), "で、"
            , doc.el.a(
                doc.attr("href", doc.articleLink("math-20210418-01"))
                , "こちらの定理"
            )
            , "より、ある", tex("c∈K"), "が存在して"
            , tex("K(a, b) = K(cb + a)")
        )
        , p("となり、", tex("L/K"), "が単純拡大であることがわかる。")
        , p("（証明終）")
    )
})
