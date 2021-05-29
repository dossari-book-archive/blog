document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("drawings")
        , drawingArea = document.getElementById("drawingArea")
        , drawings = Drawings.create({
            svg: svg, dragginArea: drawingArea
        })
    const contextMenu = (() => {
        const elem = document.getElementById("contextMenu")
            , className = "context-menu-hidden"
        let currentTarget
        document.addEventListener("mousedown", e => {
            let target = e.target
            while (target.parentNode != null) {
                if (target == elem) {
                    return
                }
                target = target.parentNode
            }
            contextMenu.hide()
        })
        return {
            show(target) {
                elem.classList.remove(className)
                currentTarget = target
            },
            hide() {
                elem.classList.add(className)
                currentTarget = null
            },
            set x(x) { elem.style.left = x + "px" },
            set y(y) { elem.style.top = y + "px" },
            showGroup(id) {
                for (let i = 0; i < elem.children.length; i++) {
                    const item = elem.children[i]
                    item.style.display = item.id == id ? "" : "none"
                }
            },
            get currentTarget() { return currentTarget },
            set currentTarget(v) { currentTarget = v },
        }
    })()

    const curve1 = drawings.createBezier2DCurve([{ x: 20, y: 160 }, { x: 65, y: 20 }, { x: 190, y: 160 }, { x: 240, y: 80 }, { x: 300, y: 220 }])
    curve1.firstPointStickyTo(document.getElementById("textbox1"), "right", 40)
    curve1.lastPointStickyTo(document.getElementById("textbox2"), "left", 80)
    curve1.endPointFormType = "triangularArrow"
    drawings.addDraggableElem(document.getElementById("textbox1"))
    drawings.addDraggableElem(document.getElementById("textbox2"))

    drawings.createBezier2DCurve([{ x: 20, y: 400 }, { x: 65, y: 500 }])
    drawings.onContextMenu(e => {
        contextMenu.x = e.x + 10
        contextMenu.y = e.y + 10
        let target
        if (e.targetType == "none") {
            contextMenu.showGroup("targetNothing")
        } else if (e.targetType == "curve") {
            if (e.curve.isEditing) {
                return
            }
            contextMenu.showGroup("targetCurve")
            target = e.curve
        }
        contextMenu.show(target)
    })
    document.getElementById("createBezierCurveButton").addEventListener("click", () => {
        drawings.startCreateCurve()
        contextMenu.hide()
    })

    document.getElementById("editBezierCurveButton").addEventListener("click", () => {
        contextMenu.currentTarget.startEdit()
        contextMenu.hide()
    })
    document.getElementById("serializeButton").addEventListener("click", () => {
        console.log(curve1.firstPoint.stickyData)
    })
})
