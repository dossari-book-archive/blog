MultipePlatformBlogData.register(doc => {
    const { tex, style, util } = doc
        , { K, L } = tex.canonicalSymbols
        , { p, br, div, table, ul, ol, li, h4, h5 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , Ls = tex("L_s")
        , Li = tex("L_i")

    doc.title("分離閉包、純非分離閉包と分離次数、非分離次数")
    doc.tags("可換体論", "ガロア理論")
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
        , p(ol(
            li(tex("L/L_s"), "は純非分離的")
            , li(tex("L/K"), "の分離次数"
                , tex("="), "異なる埋め込み", tex("L ↪ Ω"), "の個数"
            )
            , li(tex("[M:K]_s = [M:L]_s[L:M]_s"))
            , li(tex("[M:K]_i = [M:L]_i[L:M]_i"))
            , li(tex("[L_i:K] "), "は", tex("[L:K]_i"), "を割り切る。")
            , li(tex("L/K"), "が正規拡大の場合、", tex("L/L_i"), "は分離的で", 
                p(textCenter, tex("[L_i:K] = [L:K]_i"))
                , p(textCenter, tex("L = L_sL_i."))
            )
        ))
        , h4("証明")
        , h5("1.")
        , p(ul(
            li(tex("p = 0"), "なら、", tex("L_s = L"), "なので良い。"
                , util.small("（標数0の体は完全体。", doc.article("math-20210430-01", "こちら"), "を参照）")
            )
            , li(tex("p > 0"), "なら、", "任意の", tex("a∈L"), "は、適当な"
                , tex("p"), "べき乗すると分離的な元になる"
                , util.small("（非分離元のべき乗は分離元になる。", doc.article("math-20210501-01", "こちら"), "を参照）")
                , "ので、", Ls, "上分純非分離的である"
                , util.small("（", doc.article("math-20210429-01", "こちら"), "を参照）。")
            )
        ))
        , h5("2.")
        , p("異なる埋め込み", tex("L ↪ Ω"), "の個数は、以下の積である。"
            , "（", doc.article("math-20210424-01", "こちら"), "を参照）")
        , ul(
            li(tex("L/L_s"), "の異なる埋め込み", tex("L ↪ Ω"), "の個数")
            , li(tex("L_s/K"), "の異なる埋め込み", tex("L_s ↪ Ω"), "の個数")
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
        , h5("5.")
        , p(doc.article("math-20210504-01", "分離拡大と純非分離拡大の合成"), "から明らか。")
        , h5("6.")
        , p(tex("L≠L_i"), "で", tex("L/L_i"), "が非分離的だとすると、", Li, "上純非分離的な", L, "の元が存在する。（"
            , doc.article("math-20210505-02", "こちら"), "を参照）")
        , p("5.により、その元は", K, "上純非分離的となり、", Li, "が純非分離閉包であることに矛盾する。")
        , p("よって", tex("L/L_i"), "は分離的。")
        , br()
        , p("したがって、", tex("L/L_sL_i"), "は分離的かつ純非分離的。つまり", tex("L = L_sL_i."))
        , p("（証明終）")
    )
})
