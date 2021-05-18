MultipePlatformBlogData.register(doc => {
    const { tex, style } = doc
        , { n, m, y, z, Y, Z } = tex.canonicalSymbols
        , { p, ul, ol, li, br, h4, h5, strong } = doc.el
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , _p = tex("p")
        , link = doc.article("math-20210510-01", "こちら")

    doc.tags("楕円曲線と保型形式")
    doc.title("合同数")
    doc.body(
        style("width", "720px")
        , h4("定義")
        , p("正整数", n, "が", strong("合同数"), "であるとは、", n, "を面積とする直角三角形で、3辺が有理数であるものが存在する。")
        , p("つまり、以下の", tex("X,Y,Z"), "に関する方程式が有理数解を持つことである。")
        , p(ul(
            li(tex("X^2 + Y^2 = Z^2"))
            , li(tex("XY/2 = n"))
        ))
        , h4("命題")
        , p(ol(
            li(n, "が合同数", tex("⇔"), "任意の正整数", m, "に対して", tex("m^2n"), "が合同数。"
                , p(style("border", "1px solid #ccc"), contentCenter,
                    p(
                        "以下、", n, "を平方因子を持たない合同数として、三辺を", tex("X,Y,Z"), "（", Z, "が斜辺）とする。"
                        , br(), "また、", tex("X=x/m_1,Y=y/m_2,Z=z/m_3"), "と既約分数表示する"
                    ))
            )
            , li(tex("x,y,z"), "は互いに素")
            , li(z, "は奇数で、", tex("x, y"), "の偶奇は異なる")
            , li(tex("m_1｜y, m_2｜x"), "（したがって", tex("m_1, m_2"), "は互いに素）")
            , li(tex("m_3 = m_1m_2"))
            , li(tex("m_3X, m_3Y, m_3Z")
                , "が原始的なピタゴラス数となる。", br(), "（原始的なピタゴラス数に関しては", link, "を参照）")
        ))
        , h4("証明")
        , h5("1.")
        , p("三角形の辺を", m, "倍、", tex("1/m"), "倍することで面積", tex("m^2"), "倍、"
            , tex("1/m^2"), "倍の直角三角形が得られることから明らか。")
        , br()
        , h5("2.")
        , p()
        , p("まず", tex("x, y"), "が互いに素であることを示す。"
            , br(), tex("x,y"), "が素数", _p, "を共通因子にを持つと仮定すると、")
        , p(textCenter, tex("n = XY/2 = xy/2m_1m_2"), "…①")
        , p("で、", tex("m_1m_2"), "は", _p, "と互いに素なので、")
        , p(ul(
            li(tex("p ≠ 2"), "の場合①の分子は、", tex("p^2"), "を約数に持ち、"
                , n, "が平方因子を持たないことに矛盾")
            , li(tex("p = 2"), "の場合、", n, "が平方因子を持たないので、①より", tex("4/｜x,y"), "である。"
                , br(), "このとき"
                , p(textCenter, tex.d(
                    "Z^2 = X^2 + Y^2 = \\frac{(m_2^2x^2 + m_1^2y^2)}{m_1^2m_2^2}"
                    , " = \\frac{4(m_2^2(x/2)^2 + m_1^2(y/2)^2)}{m_1^2m_2^2}"))
                , p(textCenter, tex.d(
                    "（\\frac{Zm_1m_2}{2}）^2 = m_2^2(x/2)^2 + m_1^2(y/2)^2"), "…②")
                , "となるが、②の右辺の各項は奇数であるため、", tex(tex.typeFaces.rm("mod"), "　4")
                , "で考えるとあり得ないことがわかる。"
            )
        ))
        , p("よって、", tex("x,y"), "は互いに素である。")
        , p("次に、", tex("x, z"), "が互いに素であることを示す。（", tex("y,z"), "の場合も同様）")
        , p(tex("x,z"), "が素数", _p, "を共通因子にを持つと仮定すると、")
        , p(ul(
            li(tex("Y^2 = Z^2 - X^2 = ((m^2_1z^2 - m^2_3x^2)/m^2_1m^2_3)"), "…③")
            , li("③の分母は", _p, "を約数に持たない")
            , li("③の分子は", _p, "を約数に持つ")
            , li("よって", Y, "の分子", y, "も", _p, "を約数に持つ")
        ))
        , p("これは", tex("x,y"), "が互いに素であることに矛盾する。よって", tex("x,z"), "は互いに素である。")
        , br()
        , h5("3.")
        , p("①より", tex("2｜xy"), "だから、", tex("xy"), "の偶奇は異なる。"
            , "よって2.より", z, "は奇数。")
        , br()
        , h5("4.")
        , p(tex("n = xy/2m_1m_2"), "で、", tex("x/m_1, y/m_2"), "が既約分数であることからわかる。")
        , br()
        , h5("5, 6.")
        , p(tex("X^2 + Y^2 = Z^2"), "の両辺に", tex("m_1^2m_2^2"), "を掛けると、")
        , p(textCenter, tex.d("m_2^2x^2 + m_1^2y^2 = （", tex.frac("m_1m_2z", "m_3"), "）^2"))
        , p("よって", tex("m_1m_2z/m_3"), "も整数で、", tex("m_3｜m_1m_2"), "。")
        , p("4.より", tex("m_2x, m_1y"), "は互いに素であるから、"
            , tex("(m_2x, m_1y, m_1m_2z/m_3)"), "は原始的なピタゴラス数である。（", link, "を参照）")
        , p(tex("m_3≠m_1m_2"), "とすると、この原始性に矛盾してしまうため、", tex("m_3 = m_1m_2"), "である。")
        , p("（証明終）")
    )
})
