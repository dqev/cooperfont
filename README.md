# Cooper Typeface Family Showcase

A digital type specimen and interactive playground for the **Cooper Typeface Family** (weights 100 to 900).

---

## ⚡ Quick Start & Usage

### 1. CDN Integration

Include the stylesheet directly inside your HTML `<head>` tag or import it in your CSS file:

**HTML Link Method:**
```html
<link rel="stylesheet" href="https://cooperfont.vercel.app/fonts.min.css">
```

**CSS Import Method:**
```css
@import url('https://cooperfont.vercel.app/fonts.min.css');
```

---

### 2. CSS Rules

Apply the custom font family in your stylesheet. It supports font-weight variables from 100 (Thin) to 900 (Black):

```css
body {
  font-family: 'Cooper', Georgia, serif;
}

/* Example: Chunky Heading (Black) and Light Copy */
h1 {
  font-weight: 900;
}
p {
  font-weight: 300;
}
```

---

### 3. Tailwind CSS Setup

Extend your Tailwind configuration file:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        cooper: ['Cooper', 'Georgia', 'serif'],
      }
    }
  }
}
```

Usage in templates:
```html
<h1 class="font-cooper font-black">Hello Möbius</h1>
```

---

### 4. Self-Hosting

1. Download the font files package zip (`cooper-lt-bt.zip`) from the showcase site.
2. Extract the WOFF2/WOFF files and place them in your web project's `/fonts` assets directory.
3. Add the corresponding `@font-face` declarations in your stylesheet mapping the source URLs.

---

## 🛠️ Local Development

To view the interactive showcase website locally:

```bash
# Serve the static directory
npx serve .
```
Access the local preview at `http://localhost:3000`.
