MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { d, n, x, K, L } = tex.canonicalSymbols
        , { p, div, table, br, h4 } = doc.el
        , textCenter = style("text-align", "center")
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , Tx = tex("T_x")
        , Tr = tex.typeFaces.rm("Tr")

    doc.title("拡大体におけるトレース、ノルム")
    doc.body(
        style("width", "720px")
        , h4("前提、記号の定義")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[n, textRight], [tex("=[L:K]")]],
                [[tex(`${Tr}_{L/K}`)], ["トレース写像。", doc.article("math-20210502-01", "こちら"), "を参照"]],
                [[tex(`N_{L/K}`)], ["ノルム写像。", doc.article("math-20210502-01", "こちら"), "を参照"]],
                [[x, textRight], [L, "の元"]],
                [[d, textRight], [tex("=[L:K(x)]")]],
                [[tex("T_x"), textRight], [
                    K, "上ベクトル空間の変換", tex("L→L: α↦xα")
                    , br(), "（", doc.article("math-20210502-01", "こちら"), "を参照）"]],
                [[tex("p(t)"), textRight], [
                    x, "の", K, "上の最小多項式"
                    , br(), tex("= t^m + c_1t^{m-1} + … + c_m"), "と置く"]],
                [[tex("f(t)"), textRight], [Tx, "の特性多項式"]],
            )
        )
        , h4("命題")
        , p(tex("p(t), f(t)"), "に関して")
        , p(textCenter, tex("f(t) = p(t)^d"))
        , p("が成り立つ。よって")
        , p(textCenter, tex(`${Tr}_{L/K}(x) = dc_1`))
        , p(textCenter, tex(`N_{L/K}(x) = c_m^{d}`))
        , p("ちなみに、", tex("x∈K"), "なら、", tex("x = c_1 = c_m"))
        , h4("証明")
        , p(tex("x∈K"), "なら、", Tx, "は単位行列のスカラー", x, "倍と対応するから、上の関係式は明らか。")
        , p(tex("x ∉ K"), "とする。")
        , p(tex("｛α_j｝_{1<=j<=d}"), "を", tex("L/K(x)"), "の基底とすると、"
            , tex("｛x^iα_j｝_{0<=i<=m-1,1<=j<=d}"), "は", tex("L/K"), "の基底となる。"
        )
        , p("この基底に対応する", Tx, "の行列は、")
        , p(textCenter, tex.matrix([
            "0      1         0     …  0    0",
            "0      0         1     …  0    0",
            "：     ：        ：…    …  ：   ：",
            "0      0          …    …  1    0",
            "0      0          …    …  0    1",
            "-c_m  -c_{m-1}   …    …  -c_2  -c_1",
        ]))
        , p("というブロックが斜めに", d, "個並んだ（それ以外は", tex("0"), "の）行列で、"
            , tex("f(t)"), "は", doc.article("math-20210401-01", "こちら"), "の計算により"
        )
        , p(textCenter, tex("f(t) = p(t)^d"))
        , p("が得られる。")
        , p("（証明終）")
        , h4("系")
        , p(tex("L/K"), "が非分離拡大なら")
        , p(textCenter, tex(`${Tr}_{L/K} = 0`))
        , h4("証明")
        , p(x, "が非分離的な場合、", tex("p(t)∈K[t^p]"), "だから（"
            , doc.article("math-20210430-02", "こちら"), "を参照）"
            , tex("c_1 = 0"), "となる。")
        , p(x, "が分離的な場合、", tex("L/K(x)"), "は非分離的であり（TODO 証明記事）、"
            , tex("p｜[L:K(x)]"), "だから（TODO 証明記事）、本命題より"
            , tex(`${Tr}_{L/K}(x) = [L:K(x)]c_1 = 0`), "となる。")
        , p("（証明終）")
        , h4("参考")
        , p(doc.el.a(
            doc.attr("href", "https://ja.wikipedia.org/wiki/トレース_(体論)")
            , doc.attr("target", "_blank")
            , "wikipedia:トレース_(体論)"
        ))
        , p("代数的整数論　著者	Ｊ．ノイキルヒ （著）,足立 恒雄 （監修）,梅垣 敦紀 （訳） p8 定義(2.5)")
    )
})
