MultipePlatformBlogData.register(doc => {
    const tex = doc.tex
    const { A, I, M, Ｎ, E, φ } = tex.canonicalSymbols
    const { a, p, table, tr, td, br, h4 } = doc.el

    doc(
        h4("記号の定義"),
        table(
            tr(td(A), td("可換環")),
            tr(td(I), td(A, "のイデアル")),
            tr(td(φ), td(M, "の自己準同型")),
            tr(td(E), td(
                φ, "で生成される", M, "の自己準同型の部分環", tex(`A[φ]=｛aφ^n|a∈A,n∈Ｎ｝`),
                br(), "（", a("こちら"), "の記事参照）"
            )),
        ),
        h4("定理"),
        p(M, "が有限生成", A, "加群で、", tex("φ(M)⊂IM"), "ならば、ある ", tex("a_i∈I^i　(1≦i<n),　a_n∈A"), "が存在して、",
            E, "の元として"),
        p(tex("φ^n + a_1φ^{n-1} + … + a_n = 0")),
        p("が成り立つ。")
    )
})
