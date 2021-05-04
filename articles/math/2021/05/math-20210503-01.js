MultipePlatformBlogData.register(doc => {
    const { tex, style, drawing } = doc
        , { K, L, } = tex.canonicalSymbols
        , { p, div, table, h4 } = doc.el
        , textRight = style("text-align", "right")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , Ls = tex("L_s")
        , Li = tex("L_i")
        , LsLi = tex("L_sL_i")

    doc.title("分離閉包と純非分離閉包の合成")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[Ls, textRight], [tex("L/K"), "の分離閉包"]],
                [[Li, textRight], [tex("L/K"), "の純非分離閉包"]],
                [[LsLi, textRight], [tex("L_i, L_s"), "を含む最小の部分体"]],
            ),
        )
        , h4("定理")
        , p(tex("[L_i:K] "), "は", tex("[L:K]_i"), "を割り切る。")
        , p(tex("L/K"), "が正規拡大の場合、", tex("[L_i:K] = [L:K]_i"), "が成り立つ。")
        , ...(() => {
            const num2Px = x => typeof x == "number" ? x + "px" : x
            const txt = (param, ...values) => div(
                style({
                    position: "absolute", top: num2Px(param.top)
                    , left: num2Px(param.left)
                }),
                ...values
            )
            const lineStyle = style("border-top", "1px solid #999")
            const smallFont = style("font-size", ".5em")
            const common = (offsetY = 0) => [
                txt({ top: offsetY + 100, left: 0 }, Ls)
                , txt({ top: offsetY + 100, left: 200 }, Li)
                , txt({ top: offsetY + 150, left: 100 }, K)
                , txt({ top: offsetY + 90, left: 50 }, tex("[L_i:K]"), smallFont)
                , drawing.line({ startX: 25, endX: 90, startY: offsetY + 105, endY: offsetY + 75 }, lineStyle)
                , drawing.line({ startX: 25, endX: 90, startY: offsetY + 115, endY: offsetY + 155 }, lineStyle)
                , drawing.line({ startX: 125, endX: 190, startY: offsetY + 75, endY: offsetY + 105 }, lineStyle)
                , drawing.line({ startX: 125, endX: 190, startY: offsetY + 155, endY: offsetY + 115 }, lineStyle)
            ]
            return [
                p("図解すると、一般の場合：")
                , div(
                    contentCenter
                    , div(
                        style({ position: "relative", width: "300px", height: "200px" })
                        , div(
                            ...common()
                            , txt({ top: 0, left: 100 }, L)
                            , txt({ top: 50, left: 90, }, LsLi)
                            , txt({ top: 0, left: 100, }, L)
                            , txt({ top: 30, left: 30, }, tex("[L:K]_i"), smallFont)
                            , drawing.line({ startX: 20, endX: 90, startY: 100, endY: 20 }, lineStyle)
                            , drawing.line({ startX: 108, endX: 108, startY: 20, endY: 45 }, lineStyle)
                        )
                    )
                )
                , p(tex("L/K"), "が正規拡大の場合：")
                , div(
                    contentCenter
                    , div(
                        style({ position: "relative", width: "300px", height: "150px" })
                        , div(
                            ...common(-50)
                            , txt({ top: 0, left: 70, }, tex("L = L_sL_i"))
                            , txt({ top: 20, left: 30, }, tex("[L:K]_i"), smallFont)
                        )
                    )
                )
            ]
        })()
        , h4("証明")
        , p("一般の場合は", doc.article("math-20210504-01", "こちら"), "から明らか。"
            , "（", tex("K = L_s ∩ L_i"), "）"
        )
        , p(tex("L/K"), "が正規拡大の場合は、", tex("L = L_sL_i"), "を示せば良い。")
        , p("この場合、", tex("L/L_i"), "が分離的なので（TODO 証明記事）、", tex("L/L_sL_i"), "は分離的かつ純非分離的。")
        , p("よって", tex("L = L_sL_i."))
        , p("（証明終）")
    )
})
