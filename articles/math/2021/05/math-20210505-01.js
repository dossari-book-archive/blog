MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { K, L } = tex.canonicalSymbols
        , { p, div, table, ul, ol, li, h4, h5 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , Ls = tex("L_s")
        , Li = tex("L_i")

    doc.title("分離閉包、純非分離閉包と分離次数、非分離次数")
    doc.tags("可換体論")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("M/L/K"), textRight], "可換体の有限次代数拡大"],
                [[Ls, textRight], [tex("L/K"), "の分離閉包"]],
                [[Li, textRight], [tex("L/K"), "の純非分離閉包"]],
                [[tex("p"), textRight], [tex("K"), "の標数（0または素数）"]],
            ),
        )
        , h4("定理")
        , ol(
            li(p(tex("L/L_s"), "は純非分離的"))
            , li(p(
                tex("L/K"), "の分離次数"
                , tex("="), "異なる埋め込み", tex("L ↪ Ω"), "の個数"
            ))
            , li(p(tex("[M:K]_s = [M:L]_s[L:M]_s")))
            , li(p(tex("[M:K]_i = [M:L]_i[L:M]_i")))
            , li(p(tex("M/L, L/K"), "がそれぞれ純非分離的", tex("⇔ M/K"), "は純非分離的"))
            , li(p(tex("M/L, L/K"), "がそれぞれ分離的", tex("⇔ M/K"), "が分離的"))
            , li(p(tex("L/K"), "が正規拡大なら", tex("L/L_i"), "は分離的"))
        )
        , h4("証明")
        , h5("1.")
        , ul(
            li(p(tex("p = 0"), "なら、", tex("L_s = L"), "なので良い。（"
                , doc.article("math-20210430-01", "こちら")
                , "を参照）"))
            , li(p(tex("p > 0"), "なら、", "任意の", tex("a∈L"), "は、適当な"
                , tex("p"), "べき乗すると分離的な元になる"
                , "（", doc.article("math-20210501-01", "こちら"), "を参照）"
                , "ので、", Ls, "上分純非分離的である"
                , "（", doc.article("math-20210429-01", "こちら"), "を参照）。"
            ))
        )
        , h5("2.")
        , p("異なる埋め込み", tex("L ↪ Ω"), "の個数は、以下の積である。"
            , "（", doc.article("math-20210424-01", "こちら"), "を参照）")
        , ul(
            li(tex("L/Ls"), "の異なる埋め込み", tex("L ↪ Ω"), "の個数")
            , li(tex("Ls/K"), "の異なる埋め込み", tex("L_s ↪ Ω"), "の個数")
        )
        , p("1.より、1つめの値は", tex("=1"), "になる。")
        , p("また、2つ目の値は分離次数", tex("[L_s:K]"), "に等しい。"
            , "（", doc.article("math-20210424-01", "こちら"), "を参照）")
        , p("よって")
        , p(textCenter, tex("L/K"), "の分離次数"
            , tex("="), "異なる埋め込み", tex("L ↪ Ω"), "の個数"
        )
        , p("が成り立つ。")
        , h5("3.")
        , p("2.および", doc.article("math-20210424-01", "こちら"), "より明らか。")
        , h5("4.")
        , p("3.を用いれば")
        , p(textCenter, tex.align(
            "[M:K]_i &= [M:K]　/　[M:K]_s"
            , tex.br, " &= [M:L][L:K]　/　[M:K]_s"
            , tex.br, " &= [M:L]_i[M:L]_s[L:K]_i[L:K]_s　/　[M:K]_s"
            , tex.br, " &= [M:L]_i[L:K]_i"
        ))
        , h5("5. 6.")
        , p("3, 4より明らか。")
        , h5("7.")
        , p(tex("L/L_i"), "が非分離的だとすると、", Li, "上純非分離的な", L, "の元が存在する。")
        , p("5.により、その元は", K, "上純非分離的となり、", Li, "が純非分離閉包であることに矛盾する。")
        , p("よって", tex("L/L_i"), "は分離的。")
        , p("（証明終）")
    )
})
