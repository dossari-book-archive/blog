var Dialogs = (() => {
    /**
     * @typedef {{
     *   src: string
     *   show: () => void
     *   hide: () => void
     * }} Dialog
     */
    /** @type {Dialog[]} */
    const dialogStack = []
    /** @type {Dialog[]} */
    const dialogPool = []

    function hasParent() {
        return location.protocol != "file:" && window.parent != window && window.parent.Dialogs
    }

    function showDialog(src) {
        if (hasParent()) {
            window.parent.Dialogs.showDialog(src)
            return
        }
        /** @type {Dialog} */
        let dialog
        if (dialogPool.length == 0) {
            dialog = createDialog()
            dialogStack.push(dialog)
        } else {
            dialog = dialogPool.pop()
        }
        dialog.src = src
        dialog.show()
        dialogStack.push(dialog)
    }

    function popDialog() {
        if (hasParent()) {
            window.parent.Dialogs.popDialog()
            return
        }
        if (dialogStack.length == 0) {
            return
        }
        const dialog = dialogStack.pop()
        dialog.hide()
        dialogPool.push(dialog)
    }

    function createDialog() {
        const dummy = document.createElement("div")
        dummy.innerHTML = `<div style="width:100%; height:100%; background-color: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; position:absolute; top:0; left:0; visibility:hidden; opacity:0; transition: opacity .2s; cursor:pointer;">
                <iframe style="width: 90%; height: 90%; border: none; background-color: white; border-radius: 10px;"></iframe>
            </div>`
        const root = dummy.children[0]
        root.addEventListener("mousedown", (e) => {
            if (e.target == root) {
                Dialogs.popDialog()
            }
        })
        const iframe = root.children[0]
        const hideDialogTransitionEndCallback = () => {
            root.style.visibility = "hidden"
            root.removeEventListener("transitionend", hideDialogTransitionEndCallback)
        }
        /** @type {Dialog} */
        const dialog = {
            get src() { return iframe.getAttribute("src") },
            set src(value) { iframe.setAttribute("src", value) },
            show() {
                root.style.visibility = "visible"
                root.style.opacity = 1
                root.removeEventListener("transitionend", hideDialogTransitionEndCallback)
            },
            hide() {
                root.style.opacity = 0
                root.addEventListener("transitionend", hideDialogTransitionEndCallback)
                iframe.setAttribute("src", "")
            },
        }
        document.body.append(root)
        return dialog
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            Dialogs.popDialog()
        }
    })

    function addEventListenerOnArticleLinkClick() {
        document.querySelectorAll("[data-article-id]").forEach(articleElem => {
            articleElem.addEventListener("click", (e) => {
                // ctrlキー押下時は別タブで開かせる。ctrlキー押下でない場合はダイアログで開く
                if (e.ctrlKey) { return } // 別タブで開かせる
                e.preventDefault()
                Dialogs.showDialog(articleElem.href)
            })
        })
    }

    return {
        showDialog, popDialog, addEventListenerOnArticleLinkClick
    }
})()