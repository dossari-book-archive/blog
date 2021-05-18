MultipePlatformBlogData.register(doc => {
    const { tex, style, attr } = doc
    const { K, L, } = tex.canonicalSymbols
    const { p, div, table, br, h4 } = doc.el
    const textRight = style("text-align", "right")
    const contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("有限次分離拡大は単純拡大")
    doc.tags("可換体論")
    doc.body(
        style("width", "720px")
        , h4("記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
            ),
        )
        , h4("定理")
        , p(tex("L/K"), "が分離拡大なら、", tex("L/K"), "は単純拡大")
        , h4("証明")
        , p(K, "が有限体の場合は明らかなので（TODO 証明記事作成）、", K, "を無限体とする。")
        , br()
        , p(tex("L = K(a_1,…a_n)"), "と置く。")
        , p(
            doc.el.a(
                doc.attr("href", doc.articleLink("math-20210418-01"))
                , "こちらの定理"
            )
            , "より、ある", tex("b∈K(a_1, a_2)"), "が存在して"
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
        , p("（証明終）")
    )
})
