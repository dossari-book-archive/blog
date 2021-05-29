var Dialogs = (() => {
    /** 
 * @type {{
     *   src: string
     *   show: () => void
     *   hide: () => void
     * }}
     */
    let dialog
    function showDialog(src) {
        if (!dialog) {
            createDialog()
        }
        dialog.src = src
        dialog.show()
    }

    function createDialog() {
        const dummy = document.createElement("div")
        dummy.innerHTML = `<div style="width:100%; height:100%; background-color: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; position:absolute; top:0; left:0; visibility:hidden; opacity:0; transition: opacity .2s">
                <iframe style="width: 90%; height: 90%; border: none; background-color: white;"></iframe>
            </div>`
        const root = dummy.children[0]
        root.addEventListener("mousedown", (e) => {
            if (e.target == root) {
                dialog.hide()
            }
        })
        const iframe = root.children[0]
        const hideDialogTransitionEndCallback = () => {
            root.style.visibility = "hidden"
            root.removeEventListener("transitionend", hideDialogTransitionEndCallback)
        }
        dialog = {
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
        document.addEventListener("keydown", (e) => {
            if (e.key == "Escape") { dialog.hide() }
        })
    }

    return {
        showDialog
    }
})()