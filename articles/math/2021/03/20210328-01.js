MultipePlatformBlogData.register(doc => {
    const { tex, attr } = doc
    const { d, A, I, M, E, φ } = tex.canonicalSymbols
    const { a, p, div, table, tr, td, br, h4 } = doc.el
    const textCenter = attr("style", "text-align: center;")
    const justifyCenter = attr("style", "display:flex; justify-content: center;")

    const importantPoint = p(textCenter, tex(
        tex.matrix([
            ["φ - a_{11}", "a_{12}    ", "… ", "a_{1n}   "],
            ["a_{21}    ", "φ - a_{22}", "… ", "a_{2n}   "],
            ["：        ", "：        ", "：…", "：       "],
            ["a_{n1}    ", "a_{n2}    ", "… ", "φ - a_{nn}"],
        ]),
        tex.vvector(["m_1", "m_2", "：", "m_n"]),
        "= 0",
    ))
    doc.title("行列式の技巧")
    doc.body(
        h4("記号の定義"),
        div(justifyCenter,
            table(
                tr(td(A), td("可換環")),
                tr(td(I), td(A, "のイデアル")),
                tr(td(φ), td(M, "の自己準同型")),
                tr(td(E), td(
                    φ, "で生成される", M, "の自己準同型の部分環", tex(`A[φ]=｛aφ^n|a∈A,n∈Ｎ｝`),
                    br(), "（", a("こちら"), "の記事参照）"
                )),
            ),
        ),
        h4("雰囲気"),
        importantPoint,
        h4("定理"),
        p(M, "が有限生成", A, "加群で、", tex("φ(M)⊂IM"), "ならば、ある ", tex("a_i∈I^i　(1≦i<n),　a_n∈A"), "が存在して、",
            E, "の元として"),
        p(textCenter, tex("φ^n + a_1φ^{n-1} + … + a_n = 0")),
        p("が成り立つ。"),
        h4("証明"),
        p(M, "が", A, "上有限生成だから、その生成元を", tex("m_1,…,m_n"), "とすると、各", tex("i = 1,…,n"), "に対して",
            p(textCenter,
                tex.d("φ(m_i) = Σ_{j=1}^n a_{ij}m_j")
            ),
            "を満たす", tex("a_{ij}∈I"), "が存在する。", br(), "これを行列で表現すると"
        ),
        p(textCenter, tex(
            tex.matrix([
                ["φ ", "0 ", "… ", "0 "],
                ["0 ", "φ ", "… ", "0 "],
                ["：", "：", "：…", "："],
                ["0 ", "0", "…  ", "φ"],
            ]),
            tex.vvector(["m_1", "m_2", "：", "m_n"]),
            "=",
            tex.matrix([
                ["a_{11}", "a_{12}", "… ", "a_{1n}"],
                ["a_{21}", "a_{22}", "… ", "a_{2n}"],
                ["：    ", "：    ", "：…", "：    "],
                ["a_{n1}", "a_{n2}", "… ", "a_{nn}"],
            ]),
            tex.vvector(["m_1", "m_2", "：", "m_n"]),
        )),
        p("左辺 - 右辺 により"),
        importantPoint,
        p("左辺の行列の行列式を", d, "として、左辺に余因子行列を掛けると"),
        p(textCenter, tex("d　m_i = 0　　(i = 1, …, n)")),
        p(tex("m_1,…m_n"), "は", M, "の生成元だから、", d, "は", E, "の元として0であることがわかる。"),
        p("行列式", d, "を展開すれば、"),
        p(textCenter, tex("d = φ^n + a_1φ^{n-1} + … + a_n,　　　a_i∈I^i　(1≦i<n),　a_n∈A")),
        p("であることがわかる（証明終）"),
        h4("参考"),
        p("松村英之. 復刊 可換環論: 共立出版 p9 定理2.1")
    )
})
