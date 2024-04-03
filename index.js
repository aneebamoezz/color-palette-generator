import { colorSchemeModes, defaultHexAndMode } from './color-scheme.js'
import { capitalizeFirstLetter, copyToColor, getColorScheme } from './utils.js'

const body = document.querySelector('body')
const header = document.querySelector('header')
const hexEl = document.querySelector('input[type="color"]')
const modeEl = document.createElement('select')
const getColorSchemeBtn = document.querySelector('button')
const mainEl = document.querySelector('main')
const footer = document.querySelector('footer')

// Event listener on getColorSchemeBtn to trigger the fetch
getColorSchemeBtn.addEventListener('click', () => {
    let hexCode = hexEl.value.slice(1)
    let mode  = modeEl.value

    mainEl.innerHTML = ''
    footer.textContent = ''

    getColorScheme(hexCode, mode, renderColorScheme)
})

// Render the default color scheme when the page is initially loaded
function renderDefaultColor() {
    const hexCode = defaultHexAndMode.hex
    const mode = defaultHexAndMode.mode
    getColorScheme(hexCode, mode, renderColorScheme)
  }
// Creates options for the select menu
function createModeOptions() {
    colorSchemeModes.forEach((color => {
        const option = document.createElement('option')
        option.value = color
        option.textContent = capitalizeFirstLetter(color)
        modeEl.appendChild(option)
    }))
}

// Render the chosen color scheme
function renderColorScheme(colors) {
    colors.forEach((color) => {
        const colorEl = document.createElement('div')
        colorEl.style.background = `${color.hex.value}`

        // Add event listener to copy content on click
        colorEl.addEventListener('click', () => {
        copyToColor(color.hex.value)
        })

        const hexCodeEl = document.createElement('p')
        hexCodeEl.textContent = `${color.hex.value}`
        footer.appendChild(hexCodeEl)
        mainEl.appendChild(colorEl)
    })
}

createModeOptions()
renderDefaultColor()
header.insertBefore(modeEl, getColorSchemeBtn)


