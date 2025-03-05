/*
  This script is used to extract the color scheme from the current theme and generate CSS variables for the color scheme.
  The theme file has been rewritten since, so this script is only for historical reference.
*/

// Function to convert RGB to HEX
function rgbToHex(rgb) {
  // Extract numbers from RGB format: rgb(x, y, z)
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) return rgb; // Fallback in case of an issue

  // Convert each RGB value to a two-digit HEX
  return `#${rgbValues
    .map((val) => {
      const hex = parseInt(val).toString(16);
      return hex.length === 1 ? "0" + hex : hex; // Ensure two characters
    })
    .join("")}`;
}

function getColorOfSelector(selector) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const computedStyle = window.getComputedStyle(element);
  return rgbToHex(computedStyle.color);
}

function getBGColorOfSelector(selector) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const computedStyle = window.getComputedStyle(element);
  return rgbToHex(computedStyle.backgroundColor);
}


// Function to get hex colors and generate CSS block
function generateCSSVariables(schemename) {
  let cssOutput = `/* --- Color scheme (light): ${schemename} --- */\n.theme-light.color-scheme-light-${schemename} {\n`; // Start the CSS block

  /* // AccentColor
  let selector = document.querySelector("input[type=checkbox]:checked");
  let computedStyle = window.getComputedStyle(selector);
  let color = computedStyle.color;
  let hexColor = rgbToHex(color);
  cssOutput += `  --color-accent: ${hexColor};\n`; */

  // Text colors
  cssOutput += `  --text-normal: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--text-normal'))};\n`
  cssOutput += `  --text-muted: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--text-muted'))};\n`

  // AccentColor
  cssOutput += `  --color-accent: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--color-accent'))};\n`

  // Background colors
  cssOutput += `  --background-primary: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--background-primary'))};\n`
  cssOutput += `  --background-secondary: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--background-secondary'))};\n`
  cssOutput += `  --background-secondary-alt: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--background-secondary-alt'))};\n`  // Heading colors
  cssOutput += `  --background-modifier-border: ${rgbToHex(getComputedStyle(document.querySelector("body")).getPropertyValue('--background-modifier-border'))};\n`
  

  // Heading colors
  cssOutput += `}\n.theme-light.color-scheme-light-${schemename}.colored-headers {\n`

  for (let i = 1; i <= 6; i++) {
    const header = document.querySelector(`.cm-header-${i}`);
    if (header) {
      const computedStyle = window.getComputedStyle(header);
      const color = computedStyle.color;
      const hexColor = rgbToHex(color);
      cssOutput += `  --h${i}-color: ${hexColor};\n`;
    } else {
      console.warn(`.cm-header-${i}: Not found in the document`);
    }
  }
  cssOutput += `}\n`
  console.log(cssOutput);
}