MultipePlatformBlogData.register(doc => {
    const { tex, style, drawing } = doc
        , { K, L, β } = tex.canonicalSymbols
        , { p, div, table, br, h4, ul, li } = doc.el
        , textRight = style("text-align", "right")
        , textCenter = style("text-align", "center")
        , contentCenter = style({ display: "flex", "justify-content": "center" })
        , K1 = tex("K_1"), K2 = tex("K_2"), K1K2 = tex(K1, K2)
        , Ls = tex("L_s"), Li = tex("L_i"), LiLs = tex("L_iL_s")
        // 図解表示用
        , num2Px = x => typeof x == "number" ? x + "px" : x
        , txt = (param, ...values) => div(
            style({
                position: "absolute", top: num2Px(param.top)
                , left: num2Px(param.left)
            }),
            ...values
        )
        , lineStyle = style("border-top", "1px solid #999")
        , lineStyleStrong1 = style("border-top", "2px solid green")
        , lineStyleStrong2 = style("border-top", "2px solid goldenrod")
        , smallFont = style("font-size", ".5em")

    doc.title("分離拡大と純非分離拡大の合成")
    doc.tags("可換体論", "ガロア理論")
    doc.body(
        style("width", "720px")
        , h4("前提")
        , div(contentCenter,
            table(
                [[tex("L/K"), textRight], "可換体の有限次代数拡大"],
                [[tex("K_1, K_2"), textRight], [tex("L/K"), "の中間体"]],
                [[Ls, textRight], [tex("L/K"), "の分離閉包"]],
                [[Li, textRight], [tex("L/K"), "の純非分離閉包"]],
                [[LiLs, textRight], [tex("L_i, L_s"), "を含む最小の部分体"]],
            ),
        )
        , h4("定理")
        , p(tex("K_1/K"), "を純非分離的拡大、", tex("K_2/K"), "を分離拡大とする。")
        , p(tex("K_1K_2/K_1"), "は純非分離的拡大で、")
        , p(ul(
            li(tex("[K_1K_2:K_1] = [K_2:K1∩K2]"))
            , li(tex("[K_1K_2:K_2] = [K_1:K1∩K2]"))
        ))
        , p("図解すると")
        , div(
            contentCenter
            , div(
                style({ position: "relative", width: "300px", height: "250px" })
                , div(
                    txt({ top: 100, left: 0 }, K1)
                    , txt({ top: 100, left: 200 }, K2)
                    , txt({ top: 160, left: 70 }, tex("K1 ∩ K2"))
                    , txt({ top: 50, left: 90, }, K1K2)
                    , txt({ top: 0, left: 100, }, L)
                    , txt({ top: 60, left: 150, }, "純非分離的拡大", smallFont, style({ color: "green", fontWeight: "bold" }))
                    , txt({ top: 180, left: 0, }, "純非分離的拡大", smallFont)
                    , txt({ top: 180, left: 160, }, "分離拡大", smallFont)
                    , txt({ top: 210, left: 100, }, K)
                    , /* K1 - K1K2 */drawing.line({ startX: 30, endX: 90, startY: 105, endY: 75 }, lineStyleStrong2)
                    , /* K1 - K1∩K2 */drawing.line({ startX: 30, endX: 90, startY: 115, endY: 155 }, lineStyleStrong1)
                    , /* K2 - K1K2 */drawing.line({ startX: 125, endX: 190, startY: 75, endY: 105 }, lineStyleStrong1)
                    , /* K1∩K2 - K2 */drawing.line({ startX: 125, endX: 190, startY: 155, endY: 115 }, lineStyleStrong2)
                    , /* L - K1K2 */drawing.line({ startX: 108, endX: 108, startY: 20, endY: 45 }, lineStyle)
                    , /* K - K1∩K2 */drawing.line({ startX: 108, endX: 108, startY: 180, endY: 205 }, lineStyle)
                    , /* K - K1 */drawing.line({ startX: 20, endX: 90, startY: 130, endY: 205 }, lineStyle)
                    , /* K - K2 */drawing.line({ startX: 200, endX: 125, startY: 130, endY: 205 }, lineStyle)
                )
            )
        )
        , br()
        , p("特に、", tex("K_1 = L_i, 　K_2 = L_s"), "とすると", tex("K = K_1∩K_2"), "で")
        , div(
            contentCenter
            , div(
                style({ position: "relative", width: "300px", height: "200px" })
                , div(
                    txt({ top: 100, left: 0 }, Li)
                    , txt({ top: 100, left: 200 }, Ls)
                    , txt({ top: 160, left: 60 }, tex("K = L_i∩L_s"))
                    , txt({ top: 90, left: 130 }, tex("[L_i:K]"), smallFont)
                    , txt({ top: 0, left: 100 }, L)
                    , txt({ top: 50, left: 90, }, LiLs)
                    , txt({ top: 0, left: 100, }, L)
                    , txt({ top: 30, left: 150, }, tex("[L:K]_i"), smallFont)
                    , /** Li - LsLi */drawing.line({ startX: 25, endX: 90, startY: 105, endY: 75 }, lineStyleStrong2)
                    , /** K - Li */drawing.line({ startX: 25, endX: 90, startY: 115, endY: 155 }, lineStyleStrong1)
                    , /** Ls - LsLi */drawing.line({ startX: 125, endX: 190, startY: 75, endY: 105 }, lineStyleStrong1)
                    , /** K - Ls */drawing.line({ startX: 125, endX: 190, startY: 155, endY: 115 }, lineStyleStrong2)
                    , /** Ls - L */drawing.line({ startX: 190, endX: 120, startY: 100, endY: 20 }, lineStyle)
                    , /** LsLi - L */drawing.line({ startX: 108, endX: 108, startY: 20, endY: 45 }, lineStyle)
                )
            )
        )
        , h4("証明")
        , ul(
            li(tex("K_1/K_1∩K_2"), "は純非分離的拡大")
            , li(tex("K_2/K_1∩K_2"), "は分離拡大")
        )
        , p("なので、", tex("K = K_1∩K_2"), "としても結論は変わらない。")
        , p(tex("K_1/K"), "の中間体で")
        , p(textCenter, tex("K = M_0 ⊂ M_1⊂M_2⊂…⊂M_n = K_1"))
        , p(textCenter, tex("[M_i:M_{i-1}] = p"))
        , p("を満たすものが存在する。（", doc.article("math-20210429-01", "こちら"), "を参照）")
        , br()
        , p("また、", tex("K_2/K"), "は単純拡大なので"
            , doc.util.small("（", doc.article("math-20210418-01", "こちら"), "を参照）")
            , "、", tex("K_2 = K(α)"), "と置くと")
        , p(textCenter, tex("K_2 = K(α) = M_0(α) ⊂ M_1(α)⊂M_2(α)⊂…⊂M_n(α) = K_1K_2"))
        , p("という", tex("K_1K_2/K_2"), "の部分体の列ができる。")
        , br()
        , p("これらにより、", tex("[K_1:K] = p"), "の場合の証明に帰着できる：")
        , p(doc.util.small("（純非分離拡大は推移律が成り立つ。", doc.article("math-20210429-01", "こちら"), "を参照）"))
        , div(
            contentCenter
            , div(
                style({ position: "relative", width: "300px", height: "250px" })
                , div(
                    txt({ top: 100, left: 0 }, tex("M_1"))
                    , txt({ top: 50, left: 85, }, tex("M_1(α)"))
                    , txt({ top: 60, left: -50 }, tex("M_2"))
                    , txt({ top: 20, left: 30 }, tex("M_2(α)"))
                    , txt({ top: 100, left: 200 }, tex("K_2 = (K_1∩K_2)(α)"))
                    , txt({ top: 160, left: 100 }, K)
                    , txt({ top: 60, left: 150, }, "純非分離的拡大", smallFont, style({ color: "green", fontWeight: "bold" }))
                    , txt({ top: 150, left: 140, }, "分離的拡大", smallFont)
                    , txt({ top: 150, left: 0, }, "純非分離的拡大", smallFont)
                    , txt({ top: 90, left: -80, }, "純非分離的拡大", smallFont)
                    , txt({ top: 90, left: 60, }, "分離的拡大", smallFont)
                    , /* M0 - M1(α) */drawing.line({ startX: 30, endX: 90, startY: 105, endY: 75 }, lineStyle)
                    , /* M2 - M1 */drawing.line({ startX: -20, endX: 10, startY: 75, endY: 95 }, lineStyleStrong1)
                    , /* M2(α) - M1(α) */drawing.line({ startX: 50, endX: 80, startY: 45, endY: 60 }, lineStyleStrong1)
                    , /* M1 - K1∩K2 */drawing.line({ startX: 30, endX: 90, startY: 115, endY: 155 }, lineStyleStrong1)
                    , /* M1(α) - K2 */drawing.line({ startX: 125, endX: 190, startY: 75, endY: 105 }, lineStyleStrong1)
                    , /* K2 - K1∩K2 */drawing.line({ startX: 125, endX: 190, startY: 155, endY: 115 }, lineStyle)
                )
            )
        )
        , p("この場合", tex("K_1/K"), "は単純拡大なので、", tex("K_1 = K(β)"), "と置くと、"
            , β, "は", K2, "上も純非分離的なので"
            , tex("[K_1K_2 = K_2(β):K_2]"), "は", tex("1"), "または", tex("p"), "となる。")
        , p(tex("[K_2(β):K_2] = 1"), "とすると、", tex("β∈K_2"), "で"
            , β, "は分離的かつ純非分離的な元となるので"
            , tex("β∈K"), "となり、", tex("[K_1 = K(β) : K] = p"), "に反する。")
        , p("よって", tex("[K_1K_2:K_2] = p"), "。")
        , p("（証明終）")
    )
})
