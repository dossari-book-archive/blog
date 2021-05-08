MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, r, n, K, L, M } = tex.canonicalSymbols
        , { p, div, table, ul, ol, li, h4, h5, br } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.title("純非分離拡大")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の代数拡大"],
                [[tex("p"), textRight], [K, "の標数", tex("> 0")]],
                [[tex("a"), textRight], [L, "の元"]],
                [[tex("r"), textRight], ["正の整数"]],
                [[tex("n"), textRight], [tex("= [K(a) : K]")]],
            ),
        )
        , h4("定義")
        , p(a, "が自身以外に共役元を持たないとき、", a, "は", K, "上純非分離的であるという。")
        , p(L, "の任意の元が純非分離的であるとき", tex("L/K"), "が純非分離的 or 純非分離拡大であるという")
        , h4("命題")
        , ol(
            li(p("ある", r, "に対して", tex("a^{p^r}∈K"), "なら、"
                , n, "は", tex("1"), "または", tex("p"), "冪（", tex("<= p^r"), "）。"))
            , li(p(a, "が", K, "上が純非分離的"
                , tex("⇔"), "ある", r, "に対して", tex("a^{p^r}∈K")))
            , li(p("純非分離的な元の集合は, ", tex("L/K"), "の中間体を成す。"))
            , li(p(tex("L/K"), "が有限次拡大であるとき", br(), tex("L/K"), "が純非分離的"
                , tex("⇔"), L, "は", K, "上純非分離的な元で生成される。"))
            , li(
                p(
                    tex("L/K"), "が有限次純非分離拡大ならば、拡大体の列"
                )
                , p(textCenter, tex("K = K_0 ⊂ K_1 ⊂ … ⊂ K_i ⊂ … ⊂ K_r = L"))
                , p(textCenter, tex("[K_{i+1} : K_i] = p"))
                , p("が存在する。よって、拡大次数", tex("[L : K]"), "は", tex("p"), "冪になる。")
            )
        )
        , h4("証明")
        , h5("1.")
        , p("体の列")
        , p(textCenter, tex("K ⊂ K(a^{p^{r-1}}) ⊂ K(a^{p^{r-2}}) ⊂ … ⊂ K(a)"))
        , p("を考えれば、", tex("r = 1"), "の場合に帰着する。")
        , p(
            a, "の", K, "上の最小多項式は"
            , tex("x^p - a^p = (x-p)^p"), "の約元なので、", tex("(x-a)^n"), "である。"
        )
        , p(tex("n-1"), "次の項の係数が", tex("-na∈K"), "なので、もし"
            , tex("n < p"), "なら、", tex("a∈K"), "となり、", tex("n = 1"), "となる")
        , br()
        , h5("2.")
        , p(tex("⇐"), "は明らかなので", tex("⇒"), "を示す。")
        , p(a, "が純非分離的な元であれば、最小多項式は"
            , tex("(x-a)^n"), "になる。")
        , p(tex("n-1"), "次の項の係数が", tex("-na∈K"), "なので")
        , ul(
            li(p(tex("p /｜n"), "なら、1.の証明と同様にして", tex("a∈K")))
            , li(p(tex("p｜n"), "なら、", tex("n = p^r s,　p /｜s"), "と置く。"
                , br(), tex("(x-a)^n = (x^{p^r} - a^{p^r})^s")
                , "なので、1.の証明と同様にして", tex("a^{p^r}∈K")
            ))
        )
        , p()
        , br()
        , h5("3.")
        , p("2. より、純非分離的な元は四則演算に関して閉じていることがわかる。")
        , h5("4.")
        , p("3. より明らか。")
        , h5("5.")
        , p(M, "を", tex("L/K"), "の任意の中間体とすれば、"
            , tex("L/M"), "も純非分離的になるので、"
            , K, "に元を添加させて作った中間体の列を、1.の証明にあるような体の列に細分化してやれば良い。"
        )
        , p("（証明終）")
    )
})
