window.MathJax = {
    skipStartupTypeset: false,
    loader: { load: ['[tex]/color', '[tex]/amscd'] },
    tex: { packages: { '[+]': ['color', 'amscd'] } }
}
{
    let iid = setInterval(() => {
        if (!MathJax.typesetPromise) { return }
        clearInterval(iid)
        const body = document.getElementById('articleBody')
        MathJax.typesetPromise([body]).then(() => {
            document.querySelectorAll(".fade-in-hidden").forEach(elem => {
                elem.classList.remove("fade-in-hidden")
                elem.classList.add("fade-in-show")
            })
        })
    })
}
setTimeout(() => MathJax.typesetPromise([]), 1000)

document.addEventListener("DOMContentLoaded", () => {
    Dialogs.addEventListenerOnArticleLinkClick()
})