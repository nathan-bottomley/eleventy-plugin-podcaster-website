const blocks = document.querySelectorAll("pre:has(code)")
const copyButtonLabel = "Copy Code"

if (navigator.clipboard) {
  for (const block of blocks) {
    let blockLanguage = [...block.classList].find(c => c.startsWith("language-"))
    if (blockLanguage === 'language-no-copy') continue

    // only add button if browser supports Clipboard API
    const header = document.createElement("div")
    header.classList.add("block-header")
    block.parentElement.insertBefore(header, block)

    const label = document.createElement("span")
    if (blockLanguage) {
      label.innerText = blockLanguage.replace("language-", "")
    }
    header.appendChild(label)

    const button = document.createElement("button")
    block.setAttribute("tabindex", 0)
    button.innerText = copyButtonLabel
    header.appendChild(button)

    button.addEventListener("click", async () => {
      await copyCode(block, button)
    })
  }

  async function copyCode(block, button) {
    let code = block.querySelector("code")
    let text = code.innerText

    await navigator.clipboard.writeText(text)

    // visual feedback that task is completed
    button.innerText = "Code Copied"

    setTimeout(() => {
      button.innerText = copyButtonLabel
    }, 1000)
  }
}