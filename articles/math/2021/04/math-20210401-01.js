MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
    const { A, n, } = tex.canonicalSymbols
    const { p, div, table, br, h4, ul, li } = doc.el
    const det = (...values) => tex.matrix(values, { parenthesis: "||" })
    const textCenter = style("text-align", "center")
    const textRight = style("text-align", "right")
    const contentCenter = style({ display: "flex", "justify-content": "center" })
    const red = v => `\\color{red}{${v}}`
    const textWeak = style("color", "#999")
    const note = (...values) => p(textWeak, style({ margin: "0 1.2em", padding: "10px", "background-color": "#fcfcfc" }), ...values)

    doc.articleId("math-20210401-01")
    doc.title("特殊な列の行列式")
    doc.body(
        style("width", "720px"),
        h4("記号の定義"),
        div(contentCenter,
            table(
                [[A, textRight], "可換環"],
                [[n, textRight], ["自然数", tex(">= 2")]],
                [[tex("a_i"), textRight], [A, "の元", tex("(i = 1,…,n)")]],
                [[tex("b_i"), textRight], [A, "の元", tex("(i = 1,…,n)")]],
                [[tex("(c_{i,j})"), textRight], [
                    tex("(i,j)"), "成分を", tex("c_{i,j}"), "とする", A, "上の", tex("n×n"), "行列",
                ]],
            ),
        ),
        h4("命題"),
        p(tex("(c_{i,j})"), "を以下のように定める。"),
        div(contentCenter,
            ul(
                li(tex("c_{i, i+1} = -1　　(i = 1, … n-1)")),
                li(tex("c_{i, i} = a_i　　(i = 1, … n-1)")),
                li(tex("c_{n, i} = b_i　　(i = 1, … n-1)")),
                li(tex("c_{n, n} = a_n + b_n")),
                li("上記以外は", tex("0")),
            )
        ),
        p("つまり次のような行列になる："),
        p(textCenter, tex.matrix([
            "a_1  -1   0    …  0           0",
            "0    a2  -1    …  0           0",
            "：   ：   …：  …   ：          ：",
            "0    0    …   …   -1          0",
            "0    0    …   …  a_{n-1}      -1",
            "b_1  b_2  …   …  b_{n-1}   a_n + b_n",
        ])),
        p("この行列の行列式は次のようになる。"),
        div(contentCenter,
            div(
                p(tex.d("b_1 + b_2a_1 + b_3a_1a_2 + … + b_na_1…a_{n-1} + a_1a_2…a_n")),
                p(tex.d(
                    "= b_1",
                    " + Σ_{j=2}^{n} （Π_{i=1}^{j-1}a_i）b_j",
                    " + Π_{i=1}^n a_i")
                ),
            ),
        ),
        h4("証明"),
        p("帰納法により証明する。", tex("n=2"), "の場合、計算により直ちにわかる。"),
        p(tex("n >= 3"), "のとき、求める行列式"),
        div(contentCenter,
            div(
                p(tex("= -", det(
                    "a_1               -1          0     …    0                 0",
                    "0                  a2         -1    …    0                 0",
                    "：                 ：         …：    …   ：                 ：",
                    "0                  0          …     …   -1                  0",
                    `${red("b_1")}  ${red("b_2")}  …     …  ${red("b_{n-1}")}   ${red("b_n + a_n")}`,
                    "0                  0          …     …  a_{n-1}             -1",
                ))),
                note("↑", tex("n-1"), "行目と", n, "行目を入れ替え"),
                p(tex("= -", det(
                    "a_1  -1    0    …   0                                         0",
                    "0    a2   -1    …   0                                         0",
                    "：   ：    …：   …   ：                                       ：",
                    "0    0     …    …   -1                                        0",
                    `b_1  b_2   …    …   ${red("a_{n- 1}(a_n + b_n) + b_{n-1}")}   b_n + a_n`,
                    `0    0     …    …   ${red(0)}                                 -1`,
                ))),
                note("↑", n, "列目", tex("×a_{n-1}"), "を", tex("n-1"), "列目に足し合わせる"),
                p(
                    tex("= ", det(
                        "a_1  -1    0    …   0",
                        "0    a2   -1    …   0",
                        "：   ：    …：   …   ：",
                        "0    0     …    …   -1 ",
                        "b_1  b_2   …    …   a_{n-1}(a_n + b_n) + b_{n-1}",
                    )), "　",
                ),
                note("↑",
                    tex("(n, 1), … (n, n-1)"), "成分が0で、",
                    tex("(n,n)"), "成分が", tex("-1"), "なので, ", br(),
                    "↑のような", tex("n-1×n-1"), "行列の行列式に変換できる"
                )
            )
        ),
        p("帰納法の仮定において、", tex("a_{n-1}"), "を", tex("a_{n-1}(a_n + b_n)"), "に置き換えることが可能で"),
        div(contentCenter,
            div(
                p("求める行列式"),
                p(tex.d(
                    "= b_1",
                    " + Σ_{j=2}^{n-1} （Π_{i=1}^{j-1}a_i）b_j",
                    " + (a_n + b_n)Π_{i=1}^{n-1} a_i")
                ),
                p(tex.d(
                    "= b_1",
                    " + Σ_{j=2}^{n} （Π_{i=1}^{j-1}a_i）b_j",
                    " + Π_{i=1}^n a_i")
                )

            )
        ),
        h4("関連"),


        // p(tex("b_1, b_2∈B"), "が", A, "上整であれば、", tex("b_1 + b_2, 　b_1b_2"), "も", A, "上整である"),
        // h4("証明"),
        // p(b1_b2, "が", A, "$A$上整だから、", A_alg, "は", A, "加群として有限生成であり、",
        //     tex("b_1+b_2, b_1b_2∈", A_alg), "だから、",
        //     doc.el.a(href(doc.articleLink("math-20210328-01")), "こちら"), "の系から",
        //     tex("b_1+b_2, b_1b_2"), "も", A, "上整であることがわかる。"
        // ),
        // p("（証明終）")
    )
})
