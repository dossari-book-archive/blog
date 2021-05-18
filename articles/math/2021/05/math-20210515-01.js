MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { A, B, C, D, n, m, x, Z } = tex.canonicalSymbols
        , { p, div, ul,li, table, br, h4, h5 } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , link = doc.article("math-20210517-01", "こちら")
        , Qp = tex("Ｑ^+")
        , Q2p = tex("(Ｑ^+)^2")

    doc.tags("楕円曲線と保型形式")
    doc.title("合同数と楕円曲線")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[n, textRight], "平方因子を持たない正整数"],
                [[tex("X,Y,Z,x"), textRight], "正の有理数"],
                [[tex("Ｑ^+"), textRight], "正の有理数の集合"],
                [[tex(Q2p), textRight], "有理数で平方数の集合"],
            ),
        )
        , h4("命題")
        , p("次の集合の間に1対1対応が存在する：", ul(
            li(tex("A =｛(X,Y,Z)｜0<X<Y<Z, X^2 + Y^2 = Z^2, XY/2 = n｝"))
            , li(tex(`B =｛x∈${Q2p}｜x±n∈${Q2p}｝`))
            , li(tex(`C =｛x∈${Q2p}｜x^2 - n^2∈${Q2p}で、xの分子が奇数、分母が偶数｝`))
            , li(tex(`D =｛(x,y)∈${Q2p}×${Qp}｜y^2 = x^3 - n^2x、xの分子が奇数、分母が偶数｝`))
            ,
        ))
        , p("なお、これにより与えられた", tex("n, Z"), "に対して、"
            , Z, "を斜辺とする面積", n, "の直角三角形は（", tex("X,Y"), "を入れ替えを除けば）高々1つしか存在しないことがわかる。"
        )
        , h4("証明")
        , h5(A, "と", B, "の対応：")
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
        , br()
        , h5(B, "と", C, "の対応：")
        , p("集合として", tex("B = C"), "であることを示せば良い。")
        , p(A, "と", B, "の対応により、", B, "に含まれる"
            , x, "は平方数で、分子が奇数、分母が偶数であることがわかる（", link, "を参照）。")
        , p("よって、", tex("B ⊂ C"), "である。")
        , p("逆に、", C, "の元", x, "に対して、", tex("x = x'/m"), "と既約分数表示すると")
        , p(textCenter, tex.d("x^2 - n^2 = (x+n)(x-n) = ", tex.frac("(x'+mn)(x'-mn)", "m^2")), "…⑤")
        , p("右辺は既約分数であり、さらに", ul(
            li(tex("x'"), "と", n, "が互いに素なので、", tex("x',mn"), "は互いに素")
            , li(tex("x'"), "が奇数、", m, "が偶数なので、", tex("x',mn"), "の偶奇は異なる")
        ))
        , p("よって、", tex("x'±mn"), "は互いに素（"
            , doc.article("math-20210510-01", "こちら"), "を参照）になるので、⑤式より"
            , tex("x'±mn"), "は平方数となる。")
        , p(m, "も平方数なので、", m, "で割った数", tex("x'/m±n = x±n"), "も平方数となる。")
        , p("したがって", tex("x∈B"), "となり、", tex("B = C"), "が示せた。")
        , br()
        , h5(C, "と", D, "の対応：")
        , p(C, "の元", x, "に対して、平方数", tex("u^2 = x^2 - n^2"), "と置き、両辺を"
            , x, "倍して", tex("y = u√{x} > 0"), "と置けば"
            , tex("y^2 = x^3 - n^2x"), "の式が得られ、", tex("(x,y)∈D"), "となる。")
        , p("逆に、", tex("(x,y)∈D"), "が与えられたとき、上記の式変形を逆に辿ることで"
            , tex("x∈C"), "であることがわかる。")
        , p("これにより、", C, "と", D, "が一対一対応することは明らか。")
        , br()
        , h5("最後の部分")
        , p("1.により、", tex("n,Z"), "が与えられれば、", tex("X,Y"), "は次の値の組み合わせになる。")
        , p(ul(
            li(tex("√{(Z/2)^2 + n} - √{(Z/2)^2 - n}"))
            , li(tex("√{(Z/2)^2 + n} + √{(Z/2)^2 - n}"))
        ))
        , p("よって、", tex("n,Z"), "によって", tex("X,Y"), "が決まる。")
        , p("（証明終）")
        , h4("参考")
        , p("楕円曲線と保型形式 N.コブリッツ (著) 上田 勝 (翻訳) p5 命題1.1、p9 命題1.2")
    )
})
