MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { K, L } = tex.canonicalSymbols
        , { p, div, table, h4 } = doc.el
        , textCenter = style("text-align", "center")
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , Tx = tex("T_x")
        , Tr = tex.typeFaces.rm("Tr")
        , det = tex.typeFaces.rm("det")

    doc.title("代数拡大におけるトレース、ノルム")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
            )
        )
        , h4("定義")
        , p("元", tex("x∈L"), "に対して、", K, "上のベクトル空間", L, "の変換", Tx, "を")
        , p(textCenter, tex("T_x(α) = xα"))
        , p("と定め、トレース、ノルムをそれぞれ")
        , p(textCenter, tex(`${Tr}_{L/K}:L→K`), "　", tex(`${Tr}_{L/K}(x) = ${Tr}(T_x)`))
        , p(textCenter, tex(`N_{L/K}:L→K`), "　", tex(`N_{L/K}(x) = ${det}(T_x)`))
        , p("と定める。")
        , h4("参考")
        , p("代数的整数論　著者	Ｊ．ノイキルヒ （著）,足立 恒雄 （監修）,梅垣 敦紀 （訳） p8 定義(2.5)")
    )
})
