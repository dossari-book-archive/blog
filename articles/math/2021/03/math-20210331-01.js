MultipePlatformBlogData.register(doc => {
    const { tex, attr } = doc
    const { d, A, B, M, E } = tex.canonicalSymbols
    const { p, div, table, br, h4 } = doc.el
    const justifyCenter = attr("style", "display:flex; justify-content: center;")
    const b1_b2 = tex("b_1, b_2")
    const A_alg = tex("A[b_1, b_2]")
    const href = link => attr("href", link)


    doc.title("整な元は加法、乗法で閉じている")
    doc.tags("松村英之", "可換環論", "ノイキルヒ")
    doc.body(
        h4("記号の定義"),
        div(justifyCenter,
            table(
                [A, "可換環"],
                [B, [A, "を含む可換環"]],
                [b1_b2, [B, "の元"]],
                [A_alg, [b1_b2, "で生成される", B, "の部分環"]],
            ),
        ),
        h4("定理"),
        p(tex("b_1, b_2∈B"), "が", A, "上整であれば、", tex("b_1 + b_2, 　b_1b_2"), "も", A, "上整である"),
        h4("証明"),
        p(b1_b2, "が", A, "上整だから、", A_alg, "は", A, "加群として有限生成であり、",
            tex("b_1+b_2, b_1b_2∈", A_alg), "だから、",
            doc.el.a(href(doc.articleLink("math-20210328-01")), "こちら"), "の系から",
            tex("b_1+b_2, b_1b_2"), "も", A, "上整であることがわかる。"
        ),
        p("（証明終）")
    )
})
