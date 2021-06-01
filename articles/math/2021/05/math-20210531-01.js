MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { f, K, L, σ } = tex.canonicalSymbols
        , { p, div, table, br, h4, ol, li, strong } = doc.el
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.tags("可換体論", "ガロア理論")
    doc.title("分解体")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"],
                [[f, textRight], [K, "上の多項式"]],
            ),
        )
        , h4("定義")
        , p(f, "の根がすべて", L, "内に存在する、すなわち"
            , f, "が", L, "において一次式の積に分解するとき、", L, "は", f, "の", strong("分解体"), "であるという。")
        , p(tex("｛M_i｝_i"), "を", tex("L/K"), "の中間体の集合としたとき、各"
            , tex("M_i"), "が", f, "の分解体なら", tex.d("∩M_i"), "も", f, "の分解体なので、"
            , "分解体の中で最小のものが存在する。これを", strong("最小分解体"), "という。（同じ分解体の中には1つしか存在しない）")
        , h4("命題")
        , p(ol(
            li(f, "の分解体は存在する。")
            , li(tex("σ:L → L'"), "を体の同型写像としたとき、", L, "が", f, "の分解体なら"
                , tex("L'"), "は", tex("f^σ"), "の分解体である。"
                , br(), "また、", L, "が", f, "の最小分解体なら"
                , tex("L'"), "は", tex("f^σ"), "の最小分解体である。"
                , br(), "（", tex("f^σ"), "は", f, "の各係数を", σ, "で写した", tex("σ(K)"), "上の多項式）")
            , li(f, "の最小分解体は同型を除いて一意的に存在する。")
        ))
        , h4("証明")
    )
})
