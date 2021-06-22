MultipePlatformBlogData.register(doc => {
    const { tex, style, attr, el, util } = doc
        , { frac, sin, cos } = doc.tex
        , { n, m, y, z, Y, Z, θ, α } = tex.canonicalSymbols
        , { div, table, p, ul, ol, li, br, h4, h5, strong, iframe } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , _p = tex("p")
        , drawingToolUrl = "https://dossari-book-archive.github.io/blog/libs/drawings/demo/drawings-demo.html"

    doc.title("アプリケーション開発の仕事")
    doc.body(
        style("width", "720px")
        , p("「一般人がイメージするプログラミング」と「実際のプログラミング」")
        , div(
            contentCenter
            , util.youtube("HluANRwPyNo")
        )
        , p("一言で言うと", strong("面倒なお仕事"), "です。")
        , h4("アプリケーション開発の本質", style("border-bottom", "1px solid #ccc"))
        , p("アプリケーション開発とは、簡単ですが、", strong("人間の仕事を機械に行わせるための命令を作成する仕事"), "です。")
        , p("例えば、"
            , el.a(
                attr("href", drawingToolUrl)
                , attr("target", "_blank")
                , "こちら")
            , "は一見どこにでもあるようなお絵描きツールです。"
        )
        , iframe(style({
            "border": "none", "width": "100%", "height": "600px"
        }), attr("src", drawingToolUrl))
        , p("機能の一部を挙げると")
        , ul(
            li("テキストボックスをドラッグ＆ドロップで移動できる")
            , li("テキストボックスを移動すると曲線が追従する")
            , li("曲線をダブルクリックすると編集できる")
            , li("曲線は、複数の点を結ぶ折れ線により近似される。")
            , li("曲線の開始終了位置はテキストボックスの枠線上のみ移動できる")
            , li("曲線の向きは矢印で表現する")
            , li("Enterキーを押すと編集終了する")
        )
        , p("というようなものになります。")
        , p("しかし、この説明では機械が解釈してその通りに実行することは到底できません。もう少し詳しい説明を要します。")
        , ul(
            li("ドラッグ＆ドロップ")
        )
        , p("さらに例外的なことを")
        , ul(
            li("ああ")
        )
    )
})
