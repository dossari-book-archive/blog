Tools4Blog.prepare(doc => {
    const tex = doc.tex
    const A = tex("A")
    const I = tex("I")
    const M = tex("M")
    const N = doc.tex.N
    const br = doc.br
    const linkUrl = "https://huge-book-storage-math.hatenablog.com/entry/2021/03/28/101123"

    doc.title("行列式の技巧")
        .largeHeader("記号の定義")
        .table(table => table
            .tr(tr => tr.td(A).td("可換環"))
            .tr(tr => tr.td(I).td(A, "のイデアル"))
            .tr(tr => tr.td(tex("φ")).td(M, "の自己準同型"))
            .tr(tr => tr.td(tex("E")).td(
                M, "の自己準同型環の部分環", tex(`A[φ]=｛aφ^n|a∈A,n∈${N}｝`),
                br, "（", doc.a("こちら").href(linkUrl), "の記事参照）")
            )
        )
})