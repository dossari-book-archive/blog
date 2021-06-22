MultipePlatformBlogData.register(doc => {
    const { tex, style, attr, el, util } = doc
        , small = util.small
        , { frac, sin, cos } = doc.tex
        , { n, m, y, z, Y, Z, θ, α } = tex.canonicalSymbols
        , { img, div, table, p, ul, ol, li, br, h4, h5, h6, strong, iframe } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , _p = tex("p")
        , link = (url, ...values) => linkText(url, url, ...values)
        , linkText = (url, ...values) => el.a(attr("href", url), attr("target", "_blank"), ...values)

    doc.title("日本の雇用問題")
    doc.body(
        style("width", "720px")
        , h4("なぜSESがはびこる？")
        , p("SESは業界にとってデメリットも多く、業界の闇となっているのは確かです。")
        , p("普通に社員として雇えば良いのでは、と思うかもしれませんが、"
            + "ご存知の通り日本の人材流動性は低く")
        , p("正社員")
        , p(strong("雇用調整"))
        , h4("なぜ非正規社員ではなくSES？")
        , p("「雇用調整」と言うと非正規社員を思い浮かべますが、")
        , p("次のような理由であると考えます。")
        , ul(
            li("非正規雇用よりも契約が簡単")
            , li("人材調達しやすい。特に数か月程度の短期"
                , br(), "（SESの場合、）")
            , li("税制面で有利"
                , br(), "参考：", linkText(
                    "https://www.all-senmonka.jp/moneyizm/4089/",
                    "【外注費・給与】個人事業主への発注で税務調査のリスクが増大する？")
            )
        )
        , h4("転職市場")
        , p("社員としての転職も活発"
            , small("（職は変わらないので「転職」というより「転社」ですが）"))
        , ul(
            li("専門性が高い")
            , li("汎用性が高い（特に昔と比べて。）")
        )
        , p("ただ、ネガティブな理由")
        ////////////////////////////////////
        , h4("個人的に思うこと")
        , h6("日本型雇用は限界")
        , h6("会社に依存しない自立心を")
        , p("")
        , h6("会社には事業に専念させてあげた方が良いのでは")
        , p("")
        , h6("会社には事業に専念させてあげた方が良いのでは")
    )
})
