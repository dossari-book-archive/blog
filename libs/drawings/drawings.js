var Drawings = (() => {
    const privateData = Symbol("private")

    const polylineClassName = "bezier-2d-polyline"
        , curveClassName = "bezier-2d-curve"
        , curveForEventClassName = "bezier-2d-curve-support"
        , polylineForEventClassName = "bezier-2d-polyline-support"
        , pointClassName = "bezier-2d-point"
        , activePointClassName = "bezier-2d-point-active"
        , editingClassName = "assoc-chart-editing"
        , pointEditingClassName = "assoc-chart-point-editing"
        , endPointFormClassName = "assoc-chart-curve-endpoint"
        , show = (...elems) => elems.forEach(e => e.style.display = "")
        , hide = (...elems) => elems.forEach(e => e.style.display = "none")
        , copy = (map) => { return { ...map } }

    const createDrawings = (() => {

        class Point {
            /**
             * @param {PointProps} data 
             */
            constructor(data, curve) {
                /**
                 * @type {{
                 *   p: PointProps, curve: Bezier2DCurve
                 *   stickyData?: {mode: StickyMode, percentile: number}
                 * }}
                 */
                this[privateData] = { p: data, curve }
                updateStickyData(this)
            }
            get x() { return this[privateData].p.pos.x }
            get y() { return this[privateData].p.pos.y }
            get stickyTo() { return this[privateData].p.stickyTo }
            get stickyData() {
                return { ...this[privateData].stickyData }
            }
        }

        function createPoint(/** @type {PointProps} */p, curve) {
            const wrapper = new Point(p, curve)
            p.wrapper = wrapper
            return p
        }
        /**
         * @param {Point} point 
         */
        function updateStickyData(point, mode = null, percentile = null) {
            const d = point[privateData]
                , p = d.p
            if (p.stickyTo == null) {
                d.stickyData = null
                return
            }
            const rect = getElemRect(p.stickyTo, d.curve.drawings.svg)
                , percentileX = (p.pos.x - rect.left) / (rect.right - rect.left)
                , percentileY = (p.pos.y - rect.top) / (rect.bottom - rect.top)
            if (mode == null || percentile == null) {
                if (p.pos.x == rect.left) mode = "left", percentile = percentileY
                else if (p.pos.y == rect.top) mode = "top", percentile = percentileX
                else if (p.pos.y == rect.bottom) mode = "bottom", percentile = percentileX
                else mode = "right", percentile = percentileY
                d.stickyData = { mode, percentile: Math.round(percentile * 10000) / 100 }
            } else {
                d.stickyData = { mode, percentile }
            }
        }

        /**
         * @typedef {{x: number, y:number}} XY
         * @typedef {""|"triangularArrow"} EndPointForm
         * @typedef {"top"|"bottom"|"left"|"right"} StickyMode
         */
        class Bezier2DCurve {
            constructor(/** @type {Drawings} */drawings) {
                const strokeWidthOfCurveForEvent = 20 // TODO
                    , mainCurve = createSvgChild("path", {
                        class: curveClassName
                    })
                    , curveForEvent = createSvgChild("path", {
                        fill: "none", stroke: "rgba(0,0,0,0)", //transparentだとイベント対象にならない場合がある
                        "stroke-width": strokeWidthOfCurveForEvent,
                        "class": curveForEventClassName,
                    })
                    , polyline = createSvgChild("polyline", {
                        class: polylineClassName
                    })
                    , polylineForEvent = createSvgChild("polyline", {
                        fill: "none", stroke: "rgba(0,0,0,0)",
                        "stroke-width": strokeWidthOfCurveForEvent,
                        "class": polylineForEventClassName,
                    })
                    , endPointForm = createSvgChild("polyline", {
                        "class": endPointFormClassName
                    })
                curveForEvent[privateData] = mainCurve[privateData] =
                    polyline[privateData] = polylineForEvent[privateData] = { obj: this }
                hide(polyline, polylineForEvent)
                drawings.svg.append(curveForEvent, mainCurve, polylineForEvent, polyline, endPointForm)

                // ダブルクリック編集
                curveForEvent.addEventListener("dblclick", () => this.startEdit())
                mainCurve.addEventListener("dblclick", () => this.startEdit())

                /**
                 * @typedef {{ pos: XY, elem: SVGElement,
                 *  stickyTo?: Element, stickyMode?: StickyMode, wrapper: Point }} PointProps
                 */

                /**
                 * @type {{
                 *   drawings: Drawings
                 *   mainCurve: SVGPathElement
                 *   curveForEvent: SVGPathElement
                 *   polyline: SVGPolylineElement
                 *   polylineForEvent: SVGPolylineElement
                 *   endPointForm: SVGPolylineElement
                 *   points: PointProps[]
                 *   circleRadius: number
                 *   strokeWidthOfCurveForEvent: number
                 *   editing: boolean
                 *   editData: {
                 *     init: () => void
                 *     eventDetachers: (() => void)[]
                 *     dragging: boolean
                 *     activePoint: { point: XY, elem: SVGElement }
                 *     activeSegment: {startPointIdx: number}
                 *   }
                 *   endPointFormType: "none"|"triangularArrow"
                 *   endPointTriangularSize: number
                 * }}
                 */
                const d = {
                    points: [], drawings, mainCurve, polyline, polylineForEvent, endPointForm,
                    strokeWidthOfCurveForEvent,
                    curveForEvent, editing: false,
                    editData: {
                        init() {
                            this.dragging = false
                            this.eventDetachers = []
                            this.activePoint = null
                            this.activeSegment = null
                        },
                    },
                    //get lastPoint() { return this.points[this.points.length - 1] },
                    endPointFormType: "none",
                    endPointTriangularSize: 10, // TODO
                }
                d.editData.init()
                this[privateData] = d
            }
            get drawings() { return this[privateData].drawings }
            get isEditing() { return this[privateData].editing }
            set isEditing(value) {
                const d = this[privateData]
                value = d.editing = !!value
                const func = value ? show : hide
                func(d.polyline, d.polylineForEvent)
                d.points.forEach(p => func(p.elem))
            }
            get pointsNum() { return this[privateData].points.length }
            /**
             * @param {EndPointForm} value
             */
            set endPointFormType(value) {
                const d = this[privateData]
                d.endPointFormType = value
                this.refreshEndPoint()
            }
            addPoint(x, y) {
                this.addPoints([{ x, y }])
            }
            getPoints(...args) {
                return this[privateData].points.slice(...args).map(p => p.wrapper)
            }
            addPoints(/** @type {XY[]} */ points) {
                const d = this[privateData]
                    , drawings = d.drawings
                    , svg = d.drawings.svg
                points.forEach(point => {
                    const { x, y } = point
                    const circle = createSvgChild("circle", {
                        cx: x, cy: y, r: drawings.circleRadius,
                        "class": pointClassName
                    })
                    circle[privateData] = { obj: this }
                    if (!d.editing) { hide(circle) }
                    svg.append(circle)
                    d.points.push(createPoint({ pos: { x, y }, elem: circle }, this))
                })
                if (d.points.length > 1) {
                    this.refresh()
                }
            }
            insertPoint(idx, x, y) {
                const d = this[privateData]
                    , drawings = d.drawings
                    , svg = d.drawings.svg
                const circle = createSvgChild("circle", {
                    cx: x, cy: y, r: drawings.circleRadius,
                    "class": pointClassName
                })
                circle[privateData] = { obj: this }
                if (!d.editing) { hide(circle) }
                svg.append(circle)
                const newPoint = createPoint({ pos: { x, y }, elem: circle }, this)
                d.points.splice(idx, 0, newPoint)
                this.refresh()
            }
            removePoint(idx) {
                const d = this[privateData]
                    , target = d.points[idx]
                if (!target) { return }
                d.points.splice(idx, 1)
                target.elem.remove()
                this.refresh()
                return
            }
            refresh() {
                const d = this[privateData]
                    , props = getPolylineAndCurveProps(d.points.map(p => p.pos))
                    , firstPoint = this.firstPoint
                    , lastPoint = this.lastPoint
                    ;
                [d.points[0], d.points[d.points.length - 1]].forEach(point => {
                    if (point.stickyTo) {
                        const sd = point.wrapper.stickyData
                        const { x, y } = calcPointOnRectEdge(
                            point.stickyTo,
                            sd.mode,
                            sd.percentile,
                            d.drawings.svg)
                        const p = point.pos
                        p.x = x
                        p.y = y
                        setXY(point.elem, { x, y })
                    }
                })
                d.polyline.setAttribute("points", props.polylinePoints)
                d.polylineForEvent.setAttribute("points", props.polylinePoints)
                d.mainCurve.setAttribute("d", props.curve)
                d.curveForEvent.setAttribute("d", props.curve)
                this.refreshEndPoint()
            }
            refreshEndPoint() {
                const d = this[privateData]
                if (d.endPointFormType == "none") { return }
                const lastPoint = d.points[d.points.length - 1].pos
                    , prevPoint = d.points[d.points.length - 2].pos
                    , scalar = d.endPointTriangularSize / calcDistance(prevPoint, lastPoint)
                    , vector = { x: scalar * (prevPoint.x - lastPoint.x), y: scalar * (prevPoint.y - lastPoint.y) }
                    , rotate = (deg) => {
                        const rad = deg * Math.PI / 180
                        return {
                            x: Math.cos(rad) * vector.x - Math.sin(rad) * vector.y,
                            y: Math.sin(rad) * vector.x + Math.cos(rad) * vector.y,
                        }
                    }
                    , rotated1 = rotate(30)
                    , rotated2 = rotate(-30)
                if (d.endPointFormType == "triangularArrow") {
                    const points = [
                        lastPoint.x + "," + lastPoint.y,
                        (lastPoint.x + rotated1.x) + "," + (lastPoint.y + rotated1.y),
                        (lastPoint.x + rotated2.x) + "," + (lastPoint.y + rotated2.y),
                    ]
                    d.endPointForm.setAttribute("points", points.join(" "))
                }
            }
            clearPoints() {
                const d = this[privateData]
                d.points.forEach(p => p.elem.remove())
                d.points = []
                d.polyline.setAttribute("points", "")
                d.polylineForEvent.setAttribute("points", "")
                d.mainCurve.setAttribute("d", "")
                d.curveForEvent.setAttribute("d", "")
            }
            startEdit() {
                if (this.isEditing) {
                    return
                }
                this.isEditing = true
                const d = this[privateData]
                    , svg = d.drawings.svg
                d.drawings.svg.classList.add(editingClassName)
                d.points.forEach(p => p.elem.classList.add(pointEditingClassName))
                d.editData.eventDetachers.push(
                    // キー操作
                    addEventListener(document, "keydown", e => {
                        if (e.key == "Enter") {
                            this.endEdit()
                        } else if (e.key == "Esc" || e.key == "Escape") {
                            if (d.editData.activePoint) {
                                this.inactivatePointer()
                            } else {
                                this.endEdit()
                            }
                        } else if (e.key == "Delete") {
                            if (d.editData.activePoint && d.points.length > 2) {
                                this.removePoint(d.points.indexOf(d.editData.activePoint))
                                d.editData.activePoint = null
                            }
                        }
                    }),
                    // 空部分マウスダウン時
                    addEventListener(svg, "mousedown", e => {
                        if (e.target == svg) { this.endEdit() }
                    }),
                    // マウスダウンした点のactiva化
                    addEventListener(document, "mousedown", (/** @type {MouseEvent} */e) => {
                        const mouseDownedPoint = d.points.find(p => e.target == p.elem)
                        if (mouseDownedPoint) {
                            mouseDownedPoint.elem.classList.add(activePointClassName)
                            d.points.forEach(p => mouseDownedPoint != p && p.elem.classList.remove(activePointClassName))
                            d.editData.activePoint = mouseDownedPoint
                        } else {
                            d.points.forEach(p => p.elem.classList.remove(activePointClassName))
                        }
                    }),
                    // 点追加用のマウス移動
                    addEventListener(d.drawings.dragginArea, "mousemove", e => {
                        const mousePos = getMousePos(svg, e)
                        // 点と直線の距離を計算して最も近い点を探す
                        let closestPointStartIdx
                            , minDistance = Number.MAX_VALUE
                        d.points.forEach((p, i) => {
                            if (i == d.points.length - 1) { return }
                            const start = d.points[i].pos
                                , end = d.points[i + 1].pos
                                // 線分 a1x + b1y + c1 = 0
                                , a1 = end.y - start.y
                                , b1 = start.x - end.x
                                , c1 = start.x * (start.y - end.y) + start.y * (end.x - start.x)
                                // 法線 a2x + b2y + c2 = 0
                                , a2 = start.x - end.x
                                , b2 = end.y - start.y
                                , c2 = (end.x - start.x) * mousePos.x + (start.y - end.y) * mousePos.y
                                // 法線と線分の交点を求める
                                , crossX = ((b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1))
                                , crossY = ((a2 * c1 - a1 * c2) / (a1 * b2 - a2 * b1))

                            if (Math.min(start.x, end.x) <= crossX
                                && crossX <= Math.max(start.x, end.x)
                                && Math.min(start.y, end.y) <= crossY
                                && crossY <= Math.max(start.y, end.y)) {
                                // 法線が線分と交わる場合のみ、距離を計算
                                const distance = Math.abs(a1 * mousePos.x + b1 * mousePos.y + c1) /
                                    Math.sqrt(a1 ** 2 + b1 ** 2)
                                if (distance < minDistance) {
                                    closestPointStartIdx = i
                                    minDistance = distance
                                }
                            }
                        })
                        if (minDistance < d.strokeWidthOfCurveForEvent / 2) {
                            d.editData.activeSegment = { startPointIdx: closestPointStartIdx }
                            // 線分の端点と近すぎる場合は表示しない
                            const distances = d.points.map(p => calcDistance(p.pos, mousePos))
                            if (Math.min(...distances) > d.drawings.circleRadius + 10 /* TODO */) {
                                d.drawings.showPointer(getMousePos(svg, e))
                            } else {
                                d.drawings.hidePointer()
                            }
                        } else {
                            d.editData.activeSegment = null
                            d.drawings.hidePointer()
                        }
                    }),
                    // 点のドラッグ移動開始、点追加用のマウスダウン
                    addEventListener(d.drawings.dragginArea, "mousedown", (/** @type {MouseEvent} */e) => {
                        // とりあえず左クリックのみ
                        if (e.button != 0) { return }
                        // ドラッグ＆ドロップ処理
                        const startDragAndDrop = (/** @type {PointProps} */p) => {
                            // 点のドラッグ＆ドロップ移動
                            let moved = false
                            // テキストの選択無効化
                            const selectStartDetacher = addEventListener(document, "selectstart", e =>
                                e.preventDefault())
                            // マウス移動による点の移動
                            const mousemoveDetacher = addEventListener(svg, "mousemove", e => {
                                moved = true
                                const newPoint = p.stickyTo ?
                                    calcStickyElemEdgePos(getMousePos(svg, e), p, svg) :
                                    getMousePos(svg, e)
                                p.pos.x = newPoint.x
                                p.pos.y = newPoint.y
                                setXY(p.elem, newPoint)
                                updateStickyData(p.wrapper)
                                this.refresh()
                            })
                            // d.drawings.svg.addEventListener
                            const mouseupDetacher = addEventListener(document, "mouseup", () => {
                                if (moved) {
                                    this.inactivatePointer()
                                }
                                d.editData.dragging = false
                                mouseupDetacher()
                                mousemoveDetacher()
                                selectStartDetacher()
                            })
                            // ドラッグ中に編集終了されることも考慮して、編集終了時にすべて解除するようにしておく
                            d.editData.eventDetachers.push(
                                mousemoveDetacher, mouseupDetacher, selectStartDetacher)
                        }
                        // 折れ線の各端点上がmousedownされたかどうか
                        const p = d.points.find(p => p.elem == e.target)
                        if (p) {
                            // 既存の点がmousedownされた場合は、その点の移動開始
                            startDragAndDrop(p)
                        } else {
                            // mousedownの位置が折れ線上にあるかどうか
                            const d = this[privateData]
                            if (d.editData.activeSegment && d.drawings.isPointerShown) {
                                // 折れ線上にある場合は点の作成＆ドラッグ移動開始
                                const mousePos = getMousePos(svg, e)
                                const newIndex = d.editData.activeSegment.startPointIdx + 1
                                this.insertPoint(newIndex, mousePos.x, mousePos.y)
                                const newPoint = d.points[newIndex]
                                startDragAndDrop(newPoint)
                            }
                        }
                    })
                )
            }
            inactivatePointer() {
                const d = this[privateData]
                if (d.editData.activePoint) {
                    d.editData.activePoint.elem.classList.remove(activePointClassName)
                    d.editData.activePoint = null
                }
            }
            endEdit() {
                this.isEditing = false
                const d = this[privateData]
                d.points.forEach(p => p.elem.classList.add(pointEditingClassName))
                d.editData.eventDetachers.forEach(f => f())
                d.editData.init()
                d.drawings.svg.classList.remove(editingClassName)
                d.drawings.hidePointer()
            }
            // get firstPoint() { return new Point(this[privateData].points[0], this) }
            get firstPoint() { return this[privateData].points[0].wrapper }
            get lastPoint() {
                const points = this[privateData].points;
                return points[points.length - 1].wrapper
            }
            /**
             * @param {Element} elem 
             * @param {"top"|"bottom"|"left"|"right"} mode
             * @param {number} percentile
             */
            firstPointStickyTo(elem, mode, percentile) {
                const d = this[privateData]
                    , { x, y } = calcPointOnRectEdge(elem, mode, percentile, d.drawings.svg)
                this.insertPoint(0, x, y)
                d.points[0].stickyTo = elem
                updateStickyData(this.firstPoint, mode, percentile)
            }
            /**
             * @param {Element} elem 
             * @param {StickyMode} mode
             * @param {number} percentile
             */
            lastPointStickyTo(elem, mode, percentile) {
                const d = this[privateData]
                    , { x, y } = calcPointOnRectEdge(elem, mode, percentile, d.drawings.svg)
                this.addPoint(x, y)
                d.points[d.points.length - 1].stickyTo = elem
                updateStickyData(this.lastPoint, mode, percentile)
            }
        }

        function getElemRect(elem, svg) {
            const elemRect = elem.getBoundingClientRect()
                , svgRect = svg.getBoundingClientRect()
            return {
                top: elemRect.top - svgRect.top,
                left: elemRect.left - svgRect.left,
                bottom: elemRect.bottom - svgRect.top,
                right: elemRect.right - svgRect.left,
            }
        }

        /**
         * 
         * @param {{x: number, y:number}} mousePos 
         * @param {PointProps} p 
         * @param {Element} svg 
         */
        function calcStickyElemEdgePos(mousePos, p, svg) {
            const rectPos = getElemRect(p.stickyTo, svg)
            // 矩形内に収める
            let x = Math.min(Math.max(mousePos.x, rectPos.left), rectPos.right)
            let y = Math.min(Math.max(mousePos.y, rectPos.top), rectPos.bottom)
            // 枠線に寄せる
            const isNearlyEq = (a, b) => Math.abs(a - b) < 1
                , isCurrentTop = isNearlyEq(p.pos.y, rectPos.top)
                , isCurrentBottom = isNearlyEq(p.pos.y, rectPos.bottom)
                , isCurrentLeft = isNearlyEq(p.pos.x, rectPos.left)
                , isCurrentRight = isNearlyEq(p.pos.x, rectPos.right)
            if (isCurrentLeft) {
                if (!isCurrentTop && !isCurrentBottom) {
                    x = rectPos.left
                }
            } else if (isCurrentRight) {
                if (!isCurrentTop && !isCurrentBottom) {
                    x = rectPos.right
                }
            }
            if (isCurrentTop) {
                if (!isCurrentLeft && !isCurrentRight) {
                    y = rectPos.top
                }
            } else if (isCurrentBottom) {
                if (!isCurrentLeft && !isCurrentRight) {
                    y = rectPos.bottom
                }
            }
            return { x, y }
        }

        /**
         * @param {HTMLElement} elem 
         * @param {StickyMode} mode
         * @param {number} percentile
         */
        function calcPointOnRectEdge(elem, mode, percentile, svg) {
            const rect = elem.getBoundingClientRect()
                , relativeLeft = (() => {
                    switch (mode) {
                        case "top":
                        case "bottom":
                            return elem.offsetWidth * (percentile / 100)
                        case "left":
                            return 0
                        case "right":
                            return elem.offsetWidth
                    }
                })()
                , relativeTop = (() => {
                    switch (mode) {
                        case "top":
                            return 0
                        case "bottom":
                            return elem.offsetHeight
                        case "left":
                        case "right":
                            return elem.offsetHeight * (percentile / 100)
                    }
                })()
                , svgRect = svg.getBoundingClientRect()
                , x = rect.left - svgRect.left + relativeLeft
                , y = rect.top - svgRect.top + relativeTop
            return { x, y }
        }

        /**
         * 
         * @param {XY} p1 
         * @param {XY} p2 
         */
        function calcDistance(p1, p2) {
            return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        }

        class Drawings {

            constructor(param) {
                /**
                 * @type {{
                 *   svg: SVGElement,
                 *   dragginArea: HTMLElement
                 *   polylineClassName: string
                 *   curveClassName: string
                 *   pointClassName: string
                 *   editData: {
                 *     eventDetachers: (()=>void)[]
                 *     bezier2DCurve: Bezier2DCurve
                 *     init: () => void
                 *   }
                 *   circleRadius: number
                 *   bezier2DCurves: Bezier2DCurve[]
                 *   pointer: SVGCircleElement
                 * }}
                 */
                const data = {
                    ...param,
                    /**
                     * @type {{
                     *   bezier2DCurve: Bezier2DCurve
                     *   eventDetachers: (() => void)[]
                     * }}
                     */
                    editData: {
                        eventDetachers: [],
                    },
                    bezier2DCurves: [],
                    circleRadius: 5 // TODO
                }
                this[privateData] = data
                const pointer = data.pointer = createSvgChild("circle", {
                    r: data.circleRadius,
                    "class": pointClassName, style: "display:none;"
                })
                param.svg.prepend(pointer)
            }
            get svg() {
                return this[privateData].svg
            }
            get dragginArea() {
                return this[privateData].dragginArea
            }
            get circleRadius() { return this[privateData].circleRadius }
            showPointer(/** @type {XY} */point) {
                const p = this[privateData].pointer
                show(p)
                if (point) { setXY(p, point) }
            }
            get isPointerShown() { return this[privateData].pointer.style.display != "none" }
            hidePointer() {
                hide(this[privateData].pointer)
            }
            /** 
             * @typedef {{
             *   targetType: "none"|"curve"|"polylinePoint"
             *   curve?: Bezier2DCurve
             *   event: MouseEvent
             *   x: number
             *   y: number
             * }} ContextMenuEventArg
             */
            /**
             * @param {(data: ContextMenuEventArg) => void} callback 
             */
            onContextMenu(callback) {
                //const d = this[privateData]
                return addEventListener(this.svg, "contextmenu", /** @type {MouseEvent} */e => {
                    e.preventDefault()
                    const point = getMousePos(this.svg, e)
                        , d = e.target[privateData]
                    /** @type {ContextMenuEventArg} */
                    const data = { event: e, x: point.x, y: point.y }
                    if (d) {
                        if (d.obj instanceof Bezier2DCurve) {
                            data.curve = d.obj
                            data.targetType = "curve"
                        }
                    } else {
                        data.targetType = "none"
                    }
                    callback(data)
                })
            }
            /**
             * @param {XY[]} points 
             */
            createBezier2DCurve(points) {
                const d = this[privateData]
                const b = new Bezier2DCurve(this)
                b.addPoints(points)
                d.bezier2DCurves.push(b)
                return b
            }
            /**
             * 
             * @param {{
             *  draggingTargetParentElem?: HTMLElement
             * }} option 
             */
            startCreateCurve(option) {
                const d = this[privateData]
                    , svg = d.svg
                option = {
                    draggingTargetParentElem: svg,
                    ...option
                }
                d.editData.bezier2DCurve = new Bezier2DCurve(this)
                d.editData.bezier2DCurve.isEditing = true
                d.editData.eventDetachers.push(
                    addEventListener(d.dragginArea, "mousemove", e => {
                        setXY(d.pointer, getMousePos(svg, e))
                        show(d.pointer)
                        // 最前に移動
                        // d.svg.append(d.pointer)
                    }),
                    addEventListener(d.dragginArea, "mousedown", (/** @type {MouseEvent} */ e) => {
                        if (e.button != 0) { return }
                        if (e.target == d.pointer) {
                            createPoint(e, this)
                        }
                    })
                )
                d.editData.eventDetachers.push(
                    addEventListener(document, "keydown", (/** @type {KeyboardEvent} */e) => {
                        if (e.key == "Enter") {
                            if (d.editData.bezier2DCurve.pointsNum > 1) {
                                d.bezier2DCurves.push(d.editData.bezier2DCurve)
                            }
                            d.editData.bezier2DCurve.isEditing = false
                            d.editData.bezier2DCurve = new Bezier2DCurve(this)
                            d.editData.bezier2DCurve.isEditing = true
                            // this.startCreateCurve()
                        } else if (e.key == "Esc" || e.key == "Escape") {
                            if (d.editData.bezier2DCurve.pointsNum <= 1) {
                                this.endEdit()
                            } else {
                                d.editData.bezier2DCurve.clearPoints()
                            }
                        }
                    })
                )
                const createPoint = (/** @type {MouseEvent} */ e) => {
                    const point = getMousePos(d.svg, e)
                    d.editData.bezier2DCurve.addPoint(point.x, point.y)
                }
            }
            endEdit() {
                const d = this[privateData]
                d.editData.eventDetachers.forEach(e => e())
                if (d.editData.bezier2DCurve.pointsNum > 1) {
                    d.bezier2DCurves.push(d.editData.bezier2DCurve)
                }
                d.editData.bezier2DCurve.isEditing = false
                d.editData.bezier2DCurve = null
                d.editData.eventDetachers.forEach(f => f())
                d.editData.eventDetachers = []
                hide(d.pointer)
            }
            addDraggableElem(/** @type {HTMLElement} */elem) {
                const d = this[privateData]
                addEventListener(elem, "mousedown", (/** @type {MouseEvent} */e) => {
                    const mouseStart = getMousePos(d.dragginArea, e)
                        , elemStartPos = getElemRect(elem, d.dragginArea)
                    const detachers = [
                        // ドラッグによるテキスト選択防止
                        addEventListener(document, "selectstart", e => e.preventDefault()),
                        // ドラッグ中
                        addEventListener(d.dragginArea, "mousemove", (/** @type {MouseEvent} */e) => {
                            const mousePos = getMousePos(d.dragginArea, e)
                                , movedX = mousePos.x - mouseStart.x
                                , movedY = mousePos.y - mouseStart.y
                            elem.style.left = Math.min((elemStartPos.left + movedX)) + "px"
                            elem.style.top = (elemStartPos.top + movedY) + "px"
                            d.bezier2DCurves.forEach(curve => {
                                if (curve.firstPoint.stickyTo == elem || curve.lastPoint.stickyTo == elem) {
                                    curve.refresh()
                                }
                            })
                        }),
                        // ドラッグ終了
                        addEventListener(document, "mouseup", (/** @type {MouseEvent} */e) => {
                            detachers.forEach(f => f())
                        })
                    ]
                })
                return {
                    get left() { return getElemRect(elem, d.dragginArea).left },
                    get top() { return getElemRect(elem, d.dragginArea).top }
                }
            }
        }
        return (param) => new Drawings(param)
    })()


    function getMousePos(svg, /** @type {MouseEvent} */ e) {
        const svgRect = svg.getBoundingClientRect()
        return { x: Math.round(e.clientX - svgRect.left), y: Math.round(e.clientY - svgRect.top) }
    }

    /**
     * 
     * @param {SVGCircleElement} circle 
     * @param {Point} point 
     */
    function setXY(circle, point) {
        circle.setAttribute("cx", point.x)
        circle.setAttribute("cy", point.y)
    }

    function addEventListener(/** @type {HTMLElement} */elem, eventName, callback) {
        elem.addEventListener(eventName, callback)
        return () => {
            elem.removeEventListener(eventName, callback)
        }
    }

    /**
     * @returns {SVGElement}
     */
    function createSvgChild(tagName, attributes = {}) {
        const elem = document.createElementNS('http://www.w3.org/2000/svg', tagName)
        for (key in attributes) {
            elem.setAttribute(key, attributes[key])
        }
        return elem
    }

    function getPolylineAndCurveProps(/** @type {{x:number, y:number}[]}} */points) {
        if (points.length <= 1) {
            return {
                polylinePoints: [],
                curve: ""
            }
        }
        const ps = points
        /** @type {{s: number[], e: number[]}[]} */
        const lines = []
        for (let i = 0; i < ps.length - 1; i++) {
            lines.push({ s: ps[i], e: ps[i + 1] })
        }
        // 折れ線
        const polylinePoints = points.map(p => p.x + " " + p.y).join(" ") // 区切り文字は,でも半角スペースでも良いみたい。一応わかりやすいようにxyの区切りと点の区切りで使い分け
        // ベジェ曲線
        const paths = ["M"]
        if (lines.length == 1) {
            const line = lines[0]
            paths.push(line.s.x, line.s.y, line.e.x, line.e.y)
        } else {
            for (let i = 0; i < lines.length; i++) {
                const line1 = lines[i]
                // 通過点
                if (i == 0) {
                    // 始点の場合
                    paths.push(
                        line1.s.x,
                        line1.s.y,
                        // line1.s[0] + (line1.e[0] - line1.s[0]) * 0.9,
                        // line1.s[1] + (line1.e[1] - line1.s[1]) * 0.9
                    )
                } else {
                    // // 始点でない場合
                    // paths.push((line1.s[0] + line1.s[1]) / 2, (line1.e[0] + line1.e[1]) / 2)
                    if (i == lines.length - 1) {
                        // 終点の場合は末端の点
                        paths.push(line1.e.x, line1.e.y)
                    } else {
                        // 末端でない場合は中点
                        paths.push(
                            // line1.s[0] + (line1.e[0] - line1.s[0]) * 0.1,
                            // line1.s[1] + (line1.e[1] - line1.s[1]) * 0.1,
                            // "L",
                            // line1.s[0] + (line1.e[0] - line1.s[0]) * 0.9,
                            // line1.s[1] + (line1.e[1] - line1.s[1]) * 0.9,

                            (line1.s.x + line1.e.x) / 2,
                            (line1.s.y + line1.e.y) / 2
                        )
                    }
                }
                // 制御点
                if (i < lines.length - 1) {
                    // 終点以外の場合に線分の終端
                    paths.push("Q", line1.e.x, line1.e.y)
                }
            }
        }
        return {
            polylinePoints,
            curve: paths.join(" ")
        }
    }

    /**
     * @param {{
     *   svg: HTMLElement
     *   polylineClassName?: string
     *   bezierCurveClassName?: string
     *   pointClassName?: string
     *   polygonalLines: {
     *     points: Point[]
     *     top: number
     *     left: number
     *   }[],
     *   dragginArea: HTMLElement
     * }} param
     * @param {*} options 
     */
    function create(param) {
        if (!param.svg || !param.svg.append) {
            throw new Error("argument 'container' must be HTMLElement.")
        }
        const drawings = createDrawings({
            svg: param.svg, dragginArea: param.dragginArea
        })
        return drawings
    }

    return {
        create,
    }
})()