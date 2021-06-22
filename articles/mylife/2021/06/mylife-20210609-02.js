MultipePlatformBlogData.register(doc => {
    const { tex, style, attr, el } = doc
        , { frac, sin, cos } = doc.tex
        , { n, m, y, z, Y, Z, θ, α } = tex.canonicalSymbols
        , { img, div, table, p, ul, ol, li, br, h4, h5, strong, iframe } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , _p = tex("p")
        , link = (url, ...values) => el.a(attr("href", url), url, ...values)

    doc.title("ソフトウェア")
    doc.body(
        style("width", "720px")
        , h4("ソフトウェアとハードウェア")
        , p("ハードウエアとは、雑に言うと次のような分類になります。")
        , ul(
            li("有形なものはハードウェア", ul(
                li("PC、スマホ、タブレット等の機器本体")
                , li("CPU、ハードディスクなどのパーツ")
                , li("キーボード、マウスなどの周辺機器")
            ))
            , li("無形なものはソフトウェア", ul(
                li("Windows, Macなどのオペレーティングシステム")
                , li("Excelなどのアプリケーション")
            ))
        )
        , p("ソフトウェアとハードウェアは、次の図のような利用関係にあります。")
        , br()
        , div(
            contentCenter
            , div(
                img(attr("src", "https://stat.ameba.jp/user_images/20120406/17/sawabe-enter/1f/55/j/o0550034411899708835.jpg?caw=800"))
                , p(textCenter, link("https://ameblo.jp/sawabe-enter/entry-11215432402.html"))
            )
        )
        , br()
        , h4("アプリケーション")
        , p("アプリケーション（アプリケーション・ソフトウェア）は、"
            + "ソフトウェアのうち、人間が行う特定の目的に特化したソフトウェアです。"
        )
        , p("我々が日常で直接的に使うソフトウェアのほとんどはアプリケーションの位置付けにあります。")
        , br()
        , div(
            contentCenter
            , div(
                img(attr("src", "https://blogs.itmedia.co.jp/itsolutionjuku/assets_c/2016/01/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202016-01-20%2019.16.36-thumb-600xauto-11283.png"))
                , p(textCenter, link("https://blogs.itmedia.co.jp/itsolutionjuku/2016/01/post_193.html"))
            )
        )
        , br()
        , p("具体的には")
        , ul(
            li("Excel, WordなどのOfficeソフト")
            , li("Google Chrome、Safari、Microsoft Edgeなどのブラウザ", br(), "（インターネットを閲覧するためのソフト）")
            , li("スマホアプリ")
        )
        , p("などが該当します。")
    )
})
