MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, K, L, r } = tex.canonicalSymbols
        , { p, div, table, ol, li, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("非分離正規拡大は純非分離的な元を含む")
    doc.tags("可換体論", "ガロア理論")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[tex("p"), textRight], [tex("K"), "の標数", tex(">0")]],
                [[tex("r"), textRight], ["正の整数"]],
            ),
        )
        , h4("命題")
        , p(tex("L/K"), "が非分離的な正規拡大なら、", L, "は", K, "上純非分離的な元を含む。")
        , h4("証明")
        , p(tex("a∈L＼K"), "を非分離的な元、", tex("a_1,…,a_n∈L"), "を", a, "の共役とする。")
        , p(a, "の", K, "上の最小多項式は、適当な", r, "により"
            , "次の形で表せる（", doc.article("math-20210501-01", "こちら"), "を参照）：")
        , p(textCenter, tex("Π(x-a_i)^{p^r}"))
        , p("ここで、", tex("Π(x-a_i)"), "を展開した各係数は", L, "の元で、")
        , ol(
            li(tex("p^r"), "乗すると", K, "に含まれる")
            , li(K, "に含まれないものが存在する")
        )
        , p("という性質を持つので、2. に当てはまる係数は"
            , K, "上純非分離的となる（"
            , doc.article("math-20210429-01", "こちら"), "を参照）")
        , p("（証明終）")
    )
})
