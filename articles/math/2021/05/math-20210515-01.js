MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { a, f, g, n, x, K, M, X, Y, Z } = tex.canonicalSymbols
        , { p, div, ul, ol, li, table, br, h4 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })

    doc.tags("楕円曲線と保型形式")
    doc.title("合同数の同値な条件")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[n, textRight], "平方因子を持たない正整数"],
                [[tex("X,Y,Z,x"), textRight], "正の有理数"],
            ),
        )
        , h4("命題")
        , p(
            ol(
                li("次の2つの集合の間に1対1対応が存在する：", ul(
                    li(tex("A =｛(X,Y,Z)｜0<X<Y<Z, X^2 + Y^2 = Z^2, XY/2 = n｝"))
                    , li(tex("B =｛x∈Q｜x+n, x-nが平方数｝"))
                ))
                //, li("合同数", n, "およびそれを成す直角三角形")
            )
        )
        , h4("証明")
        , p(tex("f: A→B,　g:B→A"), "を以下のように定める。")
        , p(
            ul(
                li(tex("f(X,Y,Z) = x = (Z/2)^2"), ul(
                    li(x, "は平方数")
                    , li(tex("x + n = ((X+Y)/2)^2"), "も平方数…①")
                    , li(tex("x - n = ((X-Y)/2)^2"), "も平方数…②")
                ))
                , li(tex("g(x) = (X, Y, Z)"), br()
                    , tex("X = √{x + n} - √{x - n}"), "…③"
                    , br(), tex("Y = √{x + n} + √{x - n}"), "…④"
                    , br(), tex("Z = 2√{x}"), ul(
                        li(tex("X^2 + Y^2 = 4x = Z^2"))
                        , li(tex("XY = 2n"))
                        , li(tex("X<Y"))
                    ))
            ))
        , p("あとは", tex("f,g"), "が互いに逆写像になることを示せば良い。")
        , p(ul(
            li(tex("g(f(X,Y,Z)) = (X,Y,Z)"), "の証明："
                , br(), tex("f(X,Y,Z) = x"), "とすると、①②③④より", ul(
                    li(tex("√{x + n} - √{x - n} = (X+Y)/2 - (Y-X)/2 = X"))
                    , li(tex("√{x + n} + √{x - n} = (X+Y)/2 + (Y-X)/2 = Y"))
                    , li(tex("2√{x} = Z"))
                )
            )
            , li(tex("f(g(x)) = f(2√{x}) = x"))
        ))
        , p("（証明終）")
        , h4("参考")
        , p("楕円曲線と保型形式 N.コブリッツ (著) 上田 勝 (翻訳) p5 命題1.1")
    )
})
