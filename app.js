/* Cooper Typography Specimen JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Theme Toggle System ---
  const themeToggle = document.getElementById('theme-toggler');
  const currentTheme = localStorage.getItem('theme') || 'dark'; // default theme is dark
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- Mobile Hamburger Menu System ---
  const menuToggle = document.getElementById('menu-toggler');
  const headerElement = document.querySelector('header');
  
  if (menuToggle && headerElement) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      headerElement.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!headerElement.contains(e.target)) {
        headerElement.classList.remove('menu-open');
      }
    });

    // Close menu when clicking on a link
    const menuLinks = headerElement.querySelectorAll('nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        headerElement.classList.remove('menu-open');
      });
    });
  }

  // --- Header Navigation Scroll Highlighting ---
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 220)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      } else if (current === 'glyphs-section' && href === 'glyphs') {
        // Match sections with minor naming differences
        link.classList.add('active');
      }
    });
  });

  // --- New Interactive Type Tester Section ---
  const testerEditBox = document.getElementById('tester-edit-box');
  const testerPreviewContainer = document.getElementById('tester-preview-container');
  const compareGrid = document.getElementById('tester-compare-grid');
  const compareToggle = document.getElementById('compare-styles-toggle');
  
  const sizeSlider = document.getElementById('slider-size');
  const sizeVal = document.getElementById('size-val');
  const lhSlider = document.getElementById('slider-lh');
  const lhVal = document.getElementById('lh-val');
  const lsSlider = document.getElementById('slider-ls');
  const lsVal = document.getElementById('ls-val');
  
  const testerStyleBtns = document.querySelectorAll('.tester-style-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const alignBtns = document.querySelectorAll('.align-btn');
  const contrastBtns = document.querySelectorAll('.contrast-btn');
  
  const compareTexts = {
    light: document.getElementById('compare-text-light'),
    lightItalic: document.getElementById('compare-text-light-italic'),
    bold: document.getElementById('compare-text-bold'),
    boldItalic: document.getElementById('compare-text-bold-italic')
  };

  // Update slider variables on preview container so both edit box and compare grid update in sync
  if (sizeSlider && sizeVal) {
    sizeSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      sizeVal.textContent = val + 'px';
      testerPreviewContainer.style.setProperty('--preview-size', val + 'px');
    });
  }

  if (lhSlider && lhVal) {
    lhSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      lhVal.textContent = val;
      testerPreviewContainer.style.setProperty('--preview-lh', val);
    });
  }

  if (lsSlider && lsVal) {
    lsSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      lsVal.textContent = val + 'em';
      testerPreviewContainer.style.setProperty('--preview-ls', val + 'em');
    });
  }

  // Update compare grid text when user types in contenteditable
  if (testerEditBox) {
    testerEditBox.addEventListener('input', () => {
      const text = testerEditBox.innerText;
      Object.values(compareTexts).forEach(target => {
        if (target) target.textContent = text;
      });
    });
  }

  // Bind Sample Text Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const text = btn.getAttribute('data-text');
      
      if (testerEditBox) {
        testerEditBox.innerText = text;
      }
      Object.values(compareTexts).forEach(target => {
        if (target) target.textContent = text;
      });
    });
  });

  // Bind style triggers (for single style preview)
  testerStyleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate compare mode if it's active
      if (compareToggle && compareToggle.classList.contains('active')) {
        compareToggle.classList.remove('active');
        compareGrid.style.display = 'none';
        testerEditBox.style.display = 'block';
      }
      
      testerStyleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const weight = btn.getAttribute('data-weight');
      const style = btn.getAttribute('data-style');
      
      if (testerEditBox) {
        testerEditBox.style.setProperty('--preview-weight', weight);
        testerEditBox.style.setProperty('--preview-style', style);
      }
    });
  });

  // Toggle Comparison Grid mode
  if (compareToggle && compareGrid && testerEditBox) {
    compareToggle.addEventListener('click', () => {
      compareToggle.classList.toggle('active');
      const isComparing = compareToggle.classList.contains('active');
      
      if (isComparing) {
        testerStyleBtns.forEach(b => b.classList.remove('active'));
        testerEditBox.style.display = 'none';
        compareGrid.style.display = 'grid';
      } else {
        // Revert to default selected style (Bold)
        const activeStyleBtn = document.querySelector('.tester-style-btn[data-weight="700"][data-style="normal"]') || testerStyleBtns[0];
        if (activeStyleBtn) {
          activeStyleBtn.classList.add('active');
          testerEditBox.style.setProperty('--preview-weight', activeStyleBtn.getAttribute('data-weight'));
          testerEditBox.style.setProperty('--preview-style', activeStyleBtn.getAttribute('data-style'));
        }
        testerEditBox.style.display = 'block';
        compareGrid.style.display = 'none';
      }
    });
  }

  // Bind Alignment buttons
  alignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alignBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const align = btn.getAttribute('data-align');
      testerPreviewContainer.style.setProperty('--preview-align', align);
    });
  });

  // Bind Local Contrast Theme overrides
  contrastBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      contrastBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const contrast = btn.getAttribute('data-contrast');
      testerPreviewContainer.setAttribute('data-contrast', contrast);
    });
  });


  // --- FAQ Accordion System ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close all other accordions
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          const otherContent = otherHeader.nextElementSibling;
          if (otherContent) {
            otherContent.style.maxHeight = null;
            otherContent.style.opacity = '0';
          }
        }
      });
      
      // Toggle current accordion
      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        if (content) {
          content.style.maxHeight = null;
          content.style.opacity = '0';
        }
      } else {
        header.setAttribute('aria-expanded', 'true');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
        }
      }
    });
  });

  // --- Glyphs Specimen Library ---
  const gridContainer = document.getElementById('glyphs-grid-container');
  const filterPills = document.querySelectorAll('.filter-pill');
  const giantPreview = document.getElementById('giant-preview');
  const metaUnicode = document.getElementById('meta-unicode');
  const metaName = document.getElementById('meta-name');
  const metaEntity = document.getElementById('meta-entity');
  const copyButton = document.getElementById('glyph-copy-button');

  // Full Glyph mapping list
  const glyphList = [
    // Uppercase
    { char: 'A', cat: 'upper', name: 'Latin Capital Letter A', unicode: 'U+0041', entity: '&#65;' },
    { char: 'Á', cat: 'upper', name: 'Latin Capital Letter A with Acute', unicode: 'U+00C1', entity: '&#193;' },
    { char: 'À', cat: 'upper', name: 'Latin Capital Letter A with Grave', unicode: 'U+00C0', entity: '&#192;' },
    { char: 'Â', cat: 'upper', name: 'Latin Capital Letter A with Circumflex', unicode: 'U+00C2', entity: '&#194;' },
    { char: 'Ã', cat: 'upper', name: 'Latin Capital Letter A with Tilde', unicode: 'U+00C3', entity: '&#195;' },
    { char: 'Ä', cat: 'upper', name: 'Latin Capital Letter A with Diaeresis', unicode: 'U+00C4', entity: '&#196;' },
    { char: 'Å', cat: 'upper', name: 'Latin Capital Letter A with Ring Above', unicode: 'U+00C5', entity: '&#197;' },
    { char: 'Ā', cat: 'upper', name: 'Latin Capital Letter A with Macron', unicode: 'U+0100', entity: '&#256;' },
    { char: 'Ă', cat: 'upper', name: 'Latin Capital Letter A with Breve', unicode: 'U+0102', entity: '&#258;' },
    { char: 'Ą', cat: 'upper', name: 'Latin Capital Letter A with Ogonek', unicode: 'U+0104', entity: '&#260;' },
    { char: 'Ǎ', cat: 'upper', name: 'Latin Capital Letter A with Caron', unicode: 'U+01CD', entity: '&#461;' },
    { char: 'Æ', cat: 'upper', name: 'Latin Capital Letter AE', unicode: 'U+00C6', entity: '&#198;' },
    { char: 'B', cat: 'upper', name: 'Latin Capital Letter B', unicode: 'U+0042', entity: '&#66;' },
    { char: 'C', cat: 'upper', name: 'Latin Capital Letter C', unicode: 'U+0043', entity: '&#67;' },
    { char: 'Ć', cat: 'upper', name: 'Latin Capital Letter C with Acute', unicode: 'U+0106', entity: '&#262;' },
    { char: 'Ĉ', cat: 'upper', name: 'Latin Capital Letter C with Circumflex', unicode: 'U+0108', entity: '&#264;' },
    { char: 'Ċ', cat: 'upper', name: 'Latin Capital Letter C with Dot Above', unicode: 'U+010A', entity: '&#266;' },
    { char: 'Č', cat: 'upper', name: 'Latin Capital Letter C with Caron', unicode: 'U+010C', entity: '&#268;' },
    { char: 'Ç', cat: 'upper', name: 'Latin Capital Letter C with Cedilla', unicode: 'U+00C7', entity: '&#199;' },
    { char: 'D', cat: 'upper', name: 'Latin Capital Letter D', unicode: 'U+0044', entity: '&#68;' },
    { char: 'Ď', cat: 'upper', name: 'Latin Capital Letter D with Caron', unicode: 'U+010E', entity: '&#270;' },
    { char: 'Đ', cat: 'upper', name: 'Latin Capital Letter D with Stroke', unicode: 'U+0110', entity: '&#272;' },
    { char: 'E', cat: 'upper', name: 'Latin Capital Letter E', unicode: 'U+0045', entity: '&#69;' },
    { char: 'È', cat: 'upper', name: 'Latin Capital Letter E with Grave', unicode: 'U+00C8', entity: '&#200;' },
    { char: 'É', cat: 'upper', name: 'Latin Capital Letter E with Acute', unicode: 'U+00C9', entity: '&#201;' },
    { char: 'Ê', cat: 'upper', name: 'Latin Capital Letter E with Circumflex', unicode: 'U+00CA', entity: '&#202;' },
    { char: 'Ë', cat: 'upper', name: 'Latin Capital Letter E with Diaeresis', unicode: 'U+00CB', entity: '&#203;' },
    { char: 'Ē', cat: 'upper', name: 'Latin Capital Letter E with Macron', unicode: 'U+0112', entity: '&#274;' },
    { char: 'Ĕ', cat: 'upper', name: 'Latin Capital Letter E with Breve', unicode: 'U+0114', entity: '&#276;' },
    { char: 'Ė', cat: 'upper', name: 'Latin Capital Letter E with Dot Above', unicode: 'U+0116', entity: '&#278;' },
    { char: 'Ę', cat: 'upper', name: 'Latin Capital Letter E with Ogonek', unicode: 'U+0118', entity: '&#280;' },
    { char: 'Ě', cat: 'upper', name: 'Latin Capital Letter E with Caron', unicode: 'U+011A', entity: '&#282;' },
    { char: 'F', cat: 'upper', name: 'Latin Capital Letter F', unicode: 'U+0046', entity: '&#70;' },
    { char: 'G', cat: 'upper', name: 'Latin Capital Letter G', unicode: 'U+0047', entity: '&#71;' },
    { char: 'Ĝ', cat: 'upper', name: 'Latin Capital Letter G with Circumflex', unicode: 'U+011C', entity: '&#284;' },
    { char: 'Ğ', cat: 'upper', name: 'Latin Capital Letter G with Breve', unicode: 'U+011E', entity: '&#286;' },
    { char: 'Ġ', cat: 'upper', name: 'Latin Capital Letter G with Dot Above', unicode: 'U+0120', entity: '&#288;' },
    { char: 'Ģ', cat: 'upper', name: 'Latin Capital Letter G with Cedilla', unicode: 'U+0122', entity: '&#290;' },
    { char: 'H', cat: 'upper', name: 'Latin Capital Letter H', unicode: 'U+0048', entity: '&#72;' },
    { char: 'Ĥ', cat: 'upper', name: 'Latin Capital Letter H with Circumflex', unicode: 'U+0124', entity: '&#292;' },
    { char: 'Ħ', cat: 'upper', name: 'Latin Capital Letter H with Stroke', unicode: 'U+0126', entity: '&#294;' },
    { char: 'I', cat: 'upper', name: 'Latin Capital Letter I', unicode: 'U+0049', entity: '&#73;' },
    { char: 'Ì', cat: 'upper', name: 'Latin Capital Letter I with Grave', unicode: 'U+00CC', entity: '&#204;' },
    { char: 'Í', cat: 'upper', name: 'Latin Capital Letter I with Acute', unicode: 'U+00CD', entity: '&#205;' },
    { char: 'Î', cat: 'upper', name: 'Latin Capital Letter I with Circumflex', unicode: 'U+00CE', entity: '&#206;' },
    { char: 'Ï', cat: 'upper', name: 'Latin Capital Letter I with Diaeresis', unicode: 'U+00CF', entity: '&#207;' },
    { char: 'Ĩ', cat: 'upper', name: 'Latin Capital Letter I with Tilde', unicode: 'U+0128', entity: '&#296;' },
    { char: 'Ī', cat: 'upper', name: 'Latin Capital Letter I with Macron', unicode: 'U+012A', entity: '&#298;' },
    { char: 'Į', cat: 'upper', name: 'Latin Capital Letter I with Ogonek', unicode: 'U+012E', entity: '&#302;' },
    { char: 'J', cat: 'upper', name: 'Latin Capital Letter J', unicode: 'U+004A', entity: '&#74;' },
    { char: 'Ĵ', cat: 'upper', name: 'Latin Capital Letter J with Circumflex', unicode: 'U+0134', entity: '&#308;' },
    { char: 'K', cat: 'upper', name: 'Latin Capital Letter K', unicode: 'U+004B', entity: '&#75;' },
    { char: 'Ķ', cat: 'upper', name: 'Latin Capital Letter K with Cedilla', unicode: 'U+0136', entity: '&#310;' },
    { char: 'L', cat: 'upper', name: 'Latin Capital Letter L', unicode: 'U+004C', entity: '&#76;' },
    { char: 'Ĺ', cat: 'upper', name: 'Latin Capital Letter L with Acute', unicode: 'U+0139', entity: '&#313;' },
    { char: 'Ļ', cat: 'upper', name: 'Latin Capital Letter L with Cedilla', unicode: 'U+013B', entity: '&#315;' },
    { char: 'Ľ', cat: 'upper', name: 'Latin Capital Letter L with Caron', unicode: 'U+013D', entity: '&#317;' },
    { char: 'Ł', cat: 'upper', name: 'Latin Capital Letter L with Stroke', unicode: 'U+0141', entity: '&#321;' },
    { char: 'M', cat: 'upper', name: 'Latin Capital Letter M', unicode: 'U+004D', entity: '&#77;' },
    { char: 'N', cat: 'upper', name: 'Latin Capital Letter N', unicode: 'U+004E', entity: '&#78;' },
    { char: 'Ń', cat: 'upper', name: 'Latin Capital Letter N with Acute', unicode: 'U+0143', entity: '&#323;' },
    { char: 'Ņ', cat: 'upper', name: 'Latin Capital Letter N with Cedilla', unicode: 'U+0145', entity: '&#325;' },
    { char: 'Ň', cat: 'upper', name: 'Latin Capital Letter N with Caron', unicode: 'U+0147', entity: '&#327; ' },
    { char: 'Ñ', cat: 'upper', name: 'Latin Capital Letter N with Tilde', unicode: 'U+00D1', entity: '&#209;' },
    { char: 'O', cat: 'upper', name: 'Latin Capital Letter O', unicode: 'U+004F', entity: '&#79;' },
    { char: 'Ò', cat: 'upper', name: 'Latin Capital Letter O with Grave', unicode: 'U+00D2', entity: '&#210;' },
    { char: 'Ó', cat: 'upper', name: 'Latin Capital Letter O with Acute', unicode: 'U+00D3', entity: '&#211;' },
    { char: 'Ô', cat: 'upper', name: 'Latin Capital Letter O with Circumflex', unicode: 'U+00D4', entity: '&#212;' },
    { char: 'Õ', cat: 'upper', name: 'Latin Capital Letter O with Tilde', unicode: 'U+00D5', entity: '&#213;' },
    { char: 'Ö', cat: 'upper', name: 'Latin Capital Letter O with Diaeresis', unicode: 'U+00D6', entity: '&#214;' },
    { char: 'Ø', cat: 'upper', name: 'Latin Capital Letter O with Stroke', unicode: 'U+00D8', entity: '&#216;' },
    { char: 'Ō', cat: 'upper', name: 'Latin Capital Letter O with Macron', unicode: 'U+014C', entity: '&#332;' },
    { char: 'Ő', cat: 'upper', name: 'Latin Capital Letter O with Double Acute', unicode: 'U+0150', entity: '&#336;' },
    { char: 'Œ', cat: 'upper', name: 'Latin Capital Letter OE', unicode: 'U+0152', entity: '&#338;' },
    { char: 'P', cat: 'upper', name: 'Latin Capital Letter P', unicode: 'U+0050', entity: '&#80;' },
    { char: 'Q', cat: 'upper', name: 'Latin Capital Letter Q', unicode: 'U+0051', entity: '&#81;' },
    { char: 'R', cat: 'upper', name: 'Latin Capital Letter R', unicode: 'U+0052', entity: '&#82;' },
    { char: 'Ŕ', cat: 'upper', name: 'Latin Capital Letter R with Acute', unicode: 'U+0154', entity: '&#340;' },
    { char: 'Ŗ', cat: 'upper', name: 'Latin Capital Letter R with Cedilla', unicode: 'U+0156', entity: '&#342;' },
    { char: 'Ř', cat: 'upper', name: 'Latin Capital Letter R with Caron', unicode: 'U+0158', entity: '&#344;' },
    { char: 'S', cat: 'upper', name: 'Latin Capital Letter S', unicode: 'U+0053', entity: '&#83;' },
    { char: 'Ś', cat: 'upper', name: 'Latin Capital Letter S with Acute', unicode: 'U+015A', entity: '&#346;' },
    { char: 'Ŝ', cat: 'upper', name: 'Latin Capital Letter S with Circumflex', unicode: 'U+015C', entity: '&#348;' },
    { char: 'Ş', cat: 'upper', name: 'Latin Capital Letter S with Cedilla', unicode: 'U+015E', entity: '&#350;' },
    { char: 'Š', cat: 'upper', name: 'Latin Capital Letter S with Caron', unicode: 'U+0160', entity: '&#352;' },
    { char: 'T', cat: 'upper', name: 'Latin Capital Letter T', unicode: 'U+0054', entity: '&#84;' },
    { char: 'Ţ', cat: 'upper', name: 'Latin Capital Letter T with Cedilla', unicode: 'U+0162', entity: '&#354;' },
    { char: 'Ť', cat: 'upper', name: 'Latin Capital Letter T with Caron', unicode: 'U+0164', entity: '&#356;' },
    { char: 'Ŧ', cat: 'upper', name: 'Latin Capital Letter T with Stroke', unicode: 'U+0166', entity: '&#358;' },
    { char: 'U', cat: 'upper', name: 'Latin Capital Letter U', unicode: 'U+0055', entity: '&#85;' },
    { char: 'Ù', cat: 'upper', name: 'Latin Capital Letter U with Grave', unicode: 'U+00D9', entity: '&#217;' },
    { char: 'Ú', cat: 'upper', name: 'Latin Capital Letter U with Acute', unicode: 'U+00DA', entity: '&#218;' },
    { char: 'Û', cat: 'upper', name: 'Latin Capital Letter U with Circumflex', unicode: 'U+00DB', entity: '&#219;' },
    { char: 'Ü', cat: 'upper', name: 'Latin Capital Letter U with Diaeresis', unicode: 'U+00DC', entity: '&#220;' },
    { char: 'Ũ', cat: 'upper', name: 'Latin Capital Letter U with Tilde', unicode: 'U+0168', entity: '&#360;' },
    { char: 'Ū', cat: 'upper', name: 'Latin Capital Letter U with Macron', unicode: 'U+016A', entity: '&#362;' },
    { char: 'Ŭ', cat: 'upper', name: 'Latin Capital Letter U with Breve', unicode: 'U+016C', entity: '&#364;' },
    { char: 'Ů', cat: 'upper', name: 'Latin Capital Letter U with Ring Above', unicode: 'U+016E', entity: '&#366;' },
    { char: 'Ű', cat: 'upper', name: 'Latin Capital Letter U with Double Acute', unicode: 'U+0170', entity: '&#368;' },
    { char: 'Ų', cat: 'upper', name: 'Latin Capital Letter U with Ogonek', unicode: 'U+0172', entity: '&#370;' },
    { char: 'V', cat: 'upper', name: 'Latin Capital Letter V', unicode: 'U+0056', entity: '&#86;' },
    { char: 'W', cat: 'upper', name: 'Latin Capital Letter W', unicode: 'U+0057', entity: '&#87;' },
    { char: 'Ŵ', cat: 'upper', name: 'Latin Capital Letter W with Circumflex', unicode: 'U+0174', entity: '&#372;' },
    { char: 'X', cat: 'upper', name: 'Latin Capital Letter X', unicode: 'U+0058', entity: '&#88;' },
    { char: 'Y', cat: 'upper', name: 'Latin Capital Letter Y', unicode: 'U+0059', entity: '&#89;' },
    { char: 'Ý', cat: 'upper', name: 'Latin Capital Letter Y with Acute', unicode: 'U+00DD', entity: '&#221;' },
    { char: 'Ŷ', cat: 'upper', name: 'Latin Capital Letter Y with Circumflex', unicode: 'U+0176', entity: '&#374;' },
    { char: 'Ÿ', cat: 'upper', name: 'Latin Capital Letter Y with Diaeresis', unicode: 'U+0178', entity: '&#376;' },
    { char: 'Z', cat: 'upper', name: 'Latin Capital Letter Z', unicode: 'U+005A', entity: '&#90;' },
    { char: 'Ź', cat: 'upper', name: 'Latin Capital Letter Z with Acute', unicode: 'U+0179', entity: '&#377;' },
    { char: 'Ż', cat: 'upper', name: 'Latin Capital Letter Z with Dot Above', unicode: 'U+017B', entity: '&#379;' },
    { char: 'Ž', cat: 'upper', name: 'Latin Capital Letter Z with Caron', unicode: 'U+017D', entity: '&#381;' },

    // Lowercase
    { char: 'a', cat: 'lower', name: 'Latin Small Letter a', unicode: 'U+0061', entity: '&#97;' },
    { char: 'á', cat: 'lower', name: 'Latin Small Letter a with Acute', unicode: 'U+00E1', entity: '&#225;' },
    { char: 'à', cat: 'lower', name: 'Latin Small Letter a with Grave', unicode: 'U+00E0', entity: '&#224;' },
    { char: 'â', cat: 'lower', name: 'Latin Small Letter a with Circumflex', unicode: 'U+00E2', entity: '&#226;' },
    { char: 'ã', cat: 'lower', name: 'Latin Small Letter a with Tilde', unicode: 'U+00E3', entity: '&#227;' },
    { char: 'ä', cat: 'lower', name: 'Latin Small Letter a with Diaeresis', unicode: 'U+00E4', entity: '&#228;' },
    { char: 'å', cat: 'lower', name: 'Latin Small Letter a with Ring Above', unicode: 'U+00E5', entity: '&#229;' },
    { char: 'ā', cat: 'lower', name: 'Latin Small Letter a with Macron', unicode: 'U+0101', entity: '&#257;' },
    { char: 'ă', cat: 'lower', name: 'Latin Small Letter a with Breve', unicode: 'U+0103', entity: '&#259;' },
    { char: 'ą', cat: 'lower', name: 'Latin Small Letter a with Ogonek', unicode: 'U+0105', entity: '&#261;' },
    { char: 'ǎ', cat: 'lower', name: 'Latin Small Letter a with Caron', unicode: 'U+01CE', entity: '&#462;' },
    { char: 'æ', cat: 'lower', name: 'Latin Small Letter ae', unicode: 'U+00E6', entity: '&#230;' },
    { char: 'b', cat: 'lower', name: 'Latin Small Letter b', unicode: 'U+0062', entity: '&#98;' },
    { char: 'c', cat: 'lower', name: 'Latin Small Letter c', unicode: 'U+0063', entity: '&#99;' },
    { char: 'ć', cat: 'lower', name: 'Latin Small Letter c with Acute', unicode: 'U+0107', entity: '&#263;' },
    { char: 'ĉ', cat: 'lower', name: 'Latin Small Letter c with Circumflex', unicode: 'U+0109', entity: '&#265;' },
    { char: 'ċ', cat: 'lower', name: 'Latin Small Letter c with Dot Above', unicode: 'U+010B', entity: '&#267;' },
    { char: 'č', cat: 'lower', name: 'Latin Small Letter c with Caron', unicode: 'U+010D', entity: '&#269;' },
    { char: 'ç', cat: 'lower', name: 'Latin Small Letter c with Cedilla', unicode: 'U+00E7', entity: '&#231;' },
    { char: 'd', cat: 'lower', name: 'Latin Small Letter d', unicode: 'U+0064', entity: '&#100;' },
    { char: 'ď', cat: 'lower', name: 'Latin Small Letter d with Caron', unicode: 'U+010F', entity: '&#271;' },
    { char: 'đ', cat: 'lower', name: 'Latin Small Letter d with Stroke', unicode: 'U+0111', entity: '&#273;' },
    { char: 'e', cat: 'lower', name: 'Latin Small Letter e', unicode: 'U+0065', entity: '&#101;' },
    { char: 'è', cat: 'lower', name: 'Latin Small Letter e with Grave', unicode: 'U+00E8', entity: '&#232;' },
    { char: 'é', cat: 'lower', name: 'Latin Small Letter e with Acute', unicode: 'U+00E9', entity: '&#233;' },
    { char: 'ê', cat: 'lower', name: 'Latin Small Letter e with Circumflex', unicode: 'U+00EA', entity: '&#234;' },
    { char: 'ë', cat: 'lower', name: 'Latin Small Letter e with Diaeresis', unicode: 'U+00EB', entity: '&#235;' },
    { char: 'ē', cat: 'lower', name: 'Latin Small Letter e with Macron', unicode: 'U+0113', entity: '&#275;' },
    { char: 'ĕ', cat: 'lower', name: 'Latin Small Letter e with Breve', unicode: 'U+0115', entity: '&#277;' },
    { char: 'ė', cat: 'lower', name: 'Latin Small Letter e with Dot Above', unicode: 'U+0117', entity: '&#279;' },
    { char: 'ę', cat: 'lower', name: 'Latin Small Letter e with Ogonek', unicode: 'U+0119', entity: '&#281;' },
    { char: 'ě', cat: 'lower', name: 'Latin Small Letter e with Caron', unicode: 'U+011B', entity: '&#283;' },
    { char: 'f', cat: 'lower', name: 'Latin Small Letter f', unicode: 'U+0066', entity: '&#102;' },
    { char: 'g', cat: 'lower', name: 'Latin Small Letter g', unicode: 'U+0067', entity: '&#103;' },
    { char: 'ĝ', cat: 'lower', name: 'Latin Small Letter g with Circumflex', unicode: 'U+011D', entity: '&#285;' },
    { char: 'ğ', cat: 'lower', name: 'Latin Small Letter g with Breve', unicode: 'U+011F', entity: '&#287;' },
    { char: 'ġ', cat: 'lower', name: 'Latin Small Letter g with Dot Above', unicode: 'U+0121', entity: '&#289;' },
    { char: 'ģ', cat: 'lower', name: 'Latin Small Letter g with Cedilla', unicode: 'U+0123', entity: '&#291;' },
    { char: 'h', cat: 'lower', name: 'Latin Small Letter h', unicode: 'U+0068', entity: '&#104;' },
    { char: 'ĥ', cat: 'lower', name: 'Latin Small Letter h with Circumflex', unicode: 'U+0125', entity: '&#293;' },
    { char: 'ħ', cat: 'lower', name: 'Latin Small Letter h with Stroke', unicode: 'U+0127', entity: '&#295;' },
    { char: 'i', cat: 'lower', name: 'Latin Small Letter i', unicode: 'U+0069', entity: '&#105;' },
    { char: 'ì', cat: 'lower', name: 'Latin Small Letter i with Grave', unicode: 'U+00EC', entity: '&#236;' },
    { char: 'í', cat: 'lower', name: 'Latin Small Letter i with Acute', unicode: 'U+00ED', entity: '&#237;' },
    { char: 'î', cat: 'lower', name: 'Latin Small Letter i with Circumflex', unicode: 'U+00EE', entity: '&#238;' },
    { char: 'ï', cat: 'lower', name: 'Latin Small Letter i with Diaeresis', unicode: 'U+00EF', entity: '&#239;' },
    { char: 'ĩ', cat: 'lower', name: 'Latin Small Letter i with Tilde', unicode: 'U+0129', entity: '&#297;' },
    { char: 'ī', cat: 'lower', name: 'Latin Small Letter i with Macron', unicode: 'U+012B', entity: '&#299;' },
    { char: 'į', cat: 'lower', name: 'Latin Small Letter i with Ogonek', unicode: 'U+0130', entity: '&#303;' },
    { char: 'ı', cat: 'lower', name: 'Latin Small Letter dotless i', unicode: 'U+0131', entity: '&#305;' },
    { char: 'j', cat: 'lower', name: 'Latin Small Letter j', unicode: 'U+006A', entity: '&#106;' },
    { char: 'ĵ', cat: 'lower', name: 'Latin Small Letter j with Circumflex', unicode: 'U+0135', entity: '&#309;' },
    { char: 'k', cat: 'lower', name: 'Latin Small Letter k', unicode: 'U+006B', entity: '&#107;' },
    { char: 'ķ', cat: 'lower', name: 'Latin Small Letter k with Cedilla', unicode: 'U+0137', entity: '&#311;' },
    { char: 'l', cat: 'lower', name: 'Latin Small Letter l', unicode: 'U+006C', entity: '&#108;' },
    { char: 'ĺ', cat: 'lower', name: 'Latin Small Letter l with Acute', unicode: 'U+013A', entity: '&#314;' },
    { char: 'ļ', cat: 'lower', name: 'Latin Small Letter l with Cedilla', unicode: 'U+013C', entity: '&#316;' },
    { char: 'ľ', cat: 'lower', name: 'Latin Small Letter l with Caron', unicode: 'U+013E', entity: '&#318;' },
    { char: 'ł', cat: 'lower', name: 'Latin Small Letter l with Stroke', unicode: 'U+0142', entity: '&#322;' },
    { char: 'm', cat: 'lower', name: 'Latin Small Letter m', unicode: 'U+006D', entity: '&#109;' },
    { char: 'n', cat: 'lower', name: 'Latin Small Letter n', unicode: 'U+006E', entity: '&#110;' },
    { char: 'ń', cat: 'lower', name: 'Latin Small Letter n with Acute', unicode: 'U+0144', entity: '&#324;' },
    { char: 'ņ', cat: 'lower', name: 'Latin Small Letter n with Cedilla', unicode: 'U+0146', entity: '&#326;' },
    { char: 'ň', cat: 'lower', name: 'Latin Small Letter n with Caron', unicode: 'U+0148', entity: '&#328;' },
    { char: 'ñ', cat: 'lower', name: 'Latin Small Letter n with Tilde', unicode: 'U+00F1', entity: '&#241;' },
    { char: 'o', cat: 'lower', name: 'Latin Small Letter o', unicode: 'U+006F', entity: '&#111;' },
    { char: 'ò', cat: 'lower', name: 'Latin Small Letter o with Grave', unicode: 'U+00F2', entity: '&#242;' },
    { char: 'ó', cat: 'lower', name: 'Latin Small Letter o with Acute', unicode: 'U+00F3', entity: '&#243;' },
    { char: 'ô', cat: 'lower', name: 'Latin Small Letter o with Circumflex', unicode: 'U+00F4', entity: '&#244;' },
    { char: 'õ', cat: 'lower', name: 'Latin Small Letter o with Tilde', unicode: 'U+00F5', entity: '&#245;' },
    { char: 'ö', cat: 'lower', name: 'Latin Small Letter o with Diaeresis', unicode: 'U+00F6', entity: '&#246;' },
    { char: 'ø', cat: 'lower', name: 'Latin Small Letter o with Stroke', unicode: 'U+00F8', entity: '&#248;' },
    { char: 'ō', cat: 'lower', name: 'Latin Small Letter o with Macron', unicode: 'U+014D', entity: '&#333;' },
    { char: 'ő', cat: 'lower', name: 'Latin Small Letter o with Double Acute', unicode: 'U+0151', entity: '&#337;' },
    { char: 'œ', cat: 'lower', name: 'Latin Small Letter oe', unicode: 'U+0153', entity: '&#339;' },
    { char: 'p', cat: 'lower', name: 'Latin Small Letter p', unicode: 'U+0070', entity: '&#112;' },
    { char: 'q', cat: 'lower', name: 'Latin Small Letter q', unicode: 'U+0071', entity: '&#113;' },
    { char: 'r', cat: 'lower', name: 'Latin Small Letter r', unicode: 'U+0072', entity: '&#114;' },
    { char: 'ŕ', cat: 'lower', name: 'Latin Small Letter r with Acute', unicode: 'U+0155', entity: '&#341;' },
    { char: 'ŗ', cat: 'lower', name: 'Latin Small Letter r with Cedilla', unicode: 'U+0157', entity: '&#343;' },
    { char: 'ř', cat: 'lower', name: 'Latin Small Letter r with Caron', unicode: 'U+0159', entity: '&#345;' },
    { char: 's', cat: 'lower', name: 'Latin Small Letter s', unicode: 'U+0073', entity: '&#115;' },
    { char: 'ś', cat: 'lower', name: 'Latin Small Letter s with Acute', unicode: 'U+015B', entity: '&#347;' },
    { char: 'ŝ', cat: 'lower', name: 'Latin Small Letter s with Circumflex', unicode: 'U+015D', entity: '&#349;' },
    { char: 'ş', cat: 'lower', name: 'Latin Small Letter s with Cedilla', unicode: 'U+015F', entity: '&#351;' },
    { char: 'š', cat: 'lower', name: 'Latin Small Letter s with Caron', unicode: 'U+0161', entity: '&#353;' },
    { char: 't', cat: 'lower', name: 'Latin Small Letter t', unicode: 'U+0074', entity: '&#116;' },
    { char: 'ţ', cat: 'lower', name: 'Latin Small Letter t with Cedilla', unicode: 'U+0163', entity: '&#355;' },
    { char: 'ť', cat: 'lower', name: 'Latin Small Letter t with Caron', unicode: 'U+0165', entity: '&#357;' },
    { char: 'ŧ', cat: 'lower', name: 'Latin Small Letter t with Stroke', unicode: 'U+0167', entity: '&#359;' },
    { char: 'u', cat: 'lower', name: 'Latin Small Letter u', unicode: 'U+0075', entity: '&#117;' },
    { char: 'ù', cat: 'lower', name: 'Latin Small Letter u with Grave', unicode: 'U+00F9', entity: '&#249;' },
    { char: 'ú', cat: 'lower', name: 'Latin Small Letter u with Acute', unicode: 'U+00FA', entity: '&#250;' },
    { char: 'û', cat: 'lower', name: 'Latin Small Letter u with Circumflex', unicode: 'U+00FB', entity: '&#251;' },
    { char: 'ü', cat: 'lower', name: 'Latin Small Letter u with Diaeresis', unicode: 'U+00FC', entity: '&#252;' },
    { char: 'ũ', cat: 'lower', name: 'Latin Small Letter u with Tilde', unicode: 'U+0169', entity: '&#361;' },
    { char: 'ū', cat: 'lower', name: 'Latin Small Letter u with Macron', unicode: 'U+016B', entity: '&#363;' },
    { char: 'ŭ', cat: 'lower', name: 'Latin Small Letter u with Breve', unicode: 'U+016C', entity: '&#365;' },
    { char: 'ů', cat: 'lower', name: 'Latin Small Letter u with Ring Above', unicode: 'U+016F', entity: '&#367;' },
    { char: 'ű', cat: 'lower', name: 'Latin Small Letter u with Double Acute', unicode: 'U+0171', entity: '&#369;' },
    { char: 'ų', cat: 'lower', name: 'Latin Small Letter u with Ogonek', unicode: 'U+0173', entity: '&#371;' },
    { char: 'v', cat: 'lower', name: 'Latin Small Letter v', unicode: 'U+0076', entity: '&#118;' },
    { char: 'w', cat: 'lower', name: 'Latin Small Letter w', unicode: 'U+0077', entity: '&#119;' },
    { char: 'ŵ', cat: 'lower', name: 'Latin Small Letter w with Circumflex', unicode: 'U+0175', entity: '&#373;' },
    { char: 'x', cat: 'lower', name: 'Latin Small Letter x', unicode: 'U+0078', entity: '&#120;' },
    { char: 'y', cat: 'lower', name: 'Latin Small Letter y', unicode: 'U+0079', entity: '&#121;' },
    { char: 'ý', cat: 'lower', name: 'Latin Small Letter y with Acute', unicode: 'U+00FD', entity: '&#253;' },
    { char: 'ŷ', cat: 'lower', name: 'Latin Small Letter y with Circumflex', unicode: 'U+0177', entity: '&#375;' },
    { char: 'ÿ', cat: 'lower', name: 'Latin Small Letter y with Diaeresis', unicode: 'U+0179', entity: '&#377;' },
    { char: 'z', cat: 'lower', name: 'Latin Small Letter z', unicode: 'U+007A', entity: '&#122;' },
    { char: 'ź', cat: 'lower', name: 'Latin Small Letter z with Acute', unicode: 'U+017A', entity: '&#378;' },
    { char: 'ż', cat: 'lower', name: 'Latin Small Letter z with Dot Above', unicode: 'U+017C', entity: '&#380;' },
    { char: 'ž', cat: 'lower', name: 'Latin Small Letter z with Caron', unicode: 'U+017E', entity: '&#382;' },

    // Numbers
    { char: '0', cat: 'number', name: 'Digit Zero', unicode: 'U+0030', entity: '&#48;' },
    { char: '1', cat: 'number', name: 'Digit One', unicode: 'U+0031', entity: '&#49;' },
    { char: '2', cat: 'number', name: 'Digit Two', unicode: 'U+0032', entity: '&#50;' },
    { char: '3', cat: 'number', name: 'Digit Three', unicode: 'U+0033', entity: '&#51;' },
    { char: '4', cat: 'number', name: 'Digit Four', unicode: 'U+0034', entity: '&#52;' },
    { char: '5', cat: 'number', name: 'Digit Five', unicode: 'U+0035', entity: '&#53;' },
    { char: '6', cat: 'number', name: 'Digit Six', unicode: 'U+0036', entity: '&#54;' },
    { char: '7', cat: 'number', name: 'Digit Seven', unicode: 'U+0037', entity: '&#55;' },
    { char: '8', cat: 'number', name: 'Digit Eight', unicode: 'U+0038', entity: '&#56;' },
    { char: '9', cat: 'number', name: 'Digit Nine', unicode: 'U+0039', entity: '&#57;' },

    // Punctuation & Symbols
    { char: '.', cat: 'symbol', name: 'Full Stop / Period', unicode: 'U+002E', entity: '&#46;' },
    { char: ',', cat: 'symbol', name: 'Comma', unicode: 'U+002C', entity: '&#44;' },
    { char: '?', cat: 'symbol', name: 'Question Mark', unicode: 'U+003F', entity: '&#63;' },
    { char: '!', cat: 'symbol', name: 'Exclamation Mark', unicode: 'U+0021', entity: '&#33;' },
    { char: ';', cat: 'symbol', name: 'Semicolon', unicode: 'U+003B', entity: '&#59;' },
    { char: ':', cat: 'symbol', name: 'Colon', unicode: 'U+003A', entity: '&#58;' },
    { char: '&', cat: 'symbol', name: 'Ampersand', unicode: 'U+0026', entity: '&#38;' },
    { char: '@', cat: 'symbol', name: 'Commercial At', unicode: 'U+0040', entity: '&#64;' },
    { char: '#', cat: 'symbol', name: 'Number Sign / Hash', unicode: 'U+0023', entity: '&#35;' },
    { char: '$', cat: 'symbol', name: 'Dollar Sign', unicode: 'U+0024', entity: '&#36;' },
    { char: '%', cat: 'symbol', name: 'Percent Sign', unicode: 'U+0025', entity: '&#37;' },
    { char: '*', cat: 'symbol', name: 'Asterisk', unicode: 'U+002A', entity: '&#42;' },
    { char: '(', cat: 'symbol', name: 'Left Parenthesis', unicode: 'U+0028', entity: '&#40;' },
    { char: ')', cat: 'symbol', name: 'Right Parenthesis', unicode: 'U+0029', entity: '&#41;' },
    { char: '"', cat: 'symbol', name: 'Quotation Mark', unicode: 'U+0022', entity: '&#34;' },
    { char: '“', cat: 'symbol', name: 'Left Double Quotation Mark', unicode: 'U+201C', entity: '&ldquo;' },
    { char: '”', cat: 'symbol', name: 'Right Double Quotation Mark', unicode: 'U+201D', entity: '&rdquo;' },
    { char: '‘', cat: 'symbol', name: 'Left Single Quotation Mark', unicode: 'U+2018', entity: '&lsquo;' },
    { char: '’', cat: 'symbol', name: 'Right Single Quotation Mark', unicode: 'U+2019', entity: '&rsquo;' },
    { char: '—', cat: 'symbol', name: 'Em Dash', unicode: 'U+2014', entity: '&mdash;' },
    { char: '–', cat: 'symbol', name: 'En Dash', unicode: 'U+2013', entity: '&ndash;' },
    { char: '©', cat: 'symbol', name: 'Copyright Sign', unicode: 'U+00A9', entity: '&copy;' },
    { char: '®', cat: 'symbol', name: 'Registered Sign', unicode: 'U+00AE', entity: '&reg;' },
    { char: '™', cat: 'symbol', name: 'Trade Mark Sign', unicode: 'U+2122', entity: '&trade;' }
  ];

  function renderGlyphsGrid(category = 'all') {
    gridContainer.innerHTML = '';
    
    const filtered = glyphList.filter(item => {
      return category === 'all' || item.cat === category;
    });

    filtered.forEach(glyph => {
      const cell = document.createElement('div');
      cell.classList.add('glyph-cell');
      cell.textContent = glyph.char;
      
      // Mark active if currently inspected
      if (giantPreview.textContent === glyph.char) {
        cell.classList.add('active');
      }

      cell.addEventListener('click', () => {
        document.querySelectorAll('.glyph-cell').forEach(c => c.classList.remove('active'));
        cell.classList.add('active');
        updateInspector(glyph);
      });

      gridContainer.appendChild(cell);
    });
  }

  function updateInspector(glyph) {
    giantPreview.textContent = glyph.char;
    metaUnicode.textContent = glyph.unicode;
    metaName.textContent = glyph.name;
    metaEntity.innerHTML = glyph.entity;
  }

  // Bind filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderGlyphsGrid(pill.getAttribute('data-filter'));
    });
  });

  // Clipboard copy
  copyButton.addEventListener('click', () => {
    const textToCopy = giantPreview.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Copied!';
      copyButton.style.background = '#4be084';
      copyButton.style.color = '#111111';
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = '#111111';
        copyButton.style.color = 'var(--green-bg)';
      }, 1500);
    });
  });

  // --- Glyph Weight/Style Selector ---
  const glyphStyleBtns = document.querySelectorAll('.glyph-style-btn');
  
  glyphStyleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      glyphStyleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const weight = btn.getAttribute('data-weight');
      const style = btn.getAttribute('data-style');
      
      giantPreview.style.fontWeight = weight;
      giantPreview.style.fontStyle = style;
    });
  });

  // Initialize Glyph Grid table
  updateInspector(glyphList[0]); // defaults to capital 'A'
  renderGlyphsGrid();
});
