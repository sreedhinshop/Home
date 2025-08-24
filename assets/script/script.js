document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const canvas = document.getElementById('canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const svgOutput = document.getElementById('svgOutput');
  const layerPreview = document.getElementById('layerPreview');
  const downloadBtn = document.getElementById('downloadBtn');
  const openBtn = document.getElementById('openBtn');
  const errorMsg = document.getElementById('errorMsg');
  const resultDiv = document.getElementById('result');

  let currentSVG = '';

  // ---- Debugging ----
  if (!canvas || !ctx) console.error('Canvas or context not found');
  if (!fileInput || !convertBtn || !resetBtn || !svgOutput || !layerPreview || !downloadBtn || !openBtn || !errorMsg || !resultDiv) {
    console.error('One or more form elements missing');
  }

  // ---- Helpers ----
  function toHex(n) {
    n = Math.max(0, Math.min(255, n|0));
    return (n < 16 ? '0' : '') + n.toString(16);
  }

  function rgbStringToHex(rgb) {
    if (!rgb) return '#000000';
    if (rgb[0] === '#') return rgb;
    let s = rgb.trim().toLowerCase();
    if (s.startsWith('rgb(') && s.endsWith(')')) {
      s = s.slice(4, -1);
      const parts = s.split(',');
      if (parts.length === 3) {
        const r = parseInt(parts[0]);
        const g = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          return '#' + toHex(r) + toHex(g) + toHex(b);
        }
      }
    }
    return '#000000';
  }

  function groupSvgByFill(svgStr) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgStr, 'image/svg+xml');
      const svg = doc.documentElement;

      if (!svg.getAttribute('xmlns:inkscape')) {
        svg.setAttribute('xmlns:inkscape', 'http://www.inkscape.org/namespaces/inkscape');
      }
      const ns = svg.getAttribute('xmlns') || 'http://www.w3.org/2000/svg';

      const selectors = 'path, polygon, polyline, rect, circle, ellipse';
      const candidates = Array.prototype.slice.call(doc.querySelectorAll(selectors));
      const groups = new Map();
      const order = [];

      for (let i = 0; i < candidates.length; i++) {
        const el = candidates[i];
        const fill = (el.getAttribute('fill') || 'none').trim().toLowerCase();
        if (!groups.has(fill)) {
          const g = doc.createElementNS(ns, 'g');
          const idx = groups.size + 1;
          g.setAttribute('id', 'layer_' + idx);
          g.setAttribute('inkscape:groupmode', 'layer');
          const labelColor = (fill === 'none') ? 'no-fill' : fill;
          g.setAttribute('inkscape:label', 'Layer ' + idx + ' ' + labelColor);
          groups.set(fill, g);
          order.push(fill);
        }
      }

      const defs = svg.querySelector('defs');
      const insertAfter = defs ? defs.nextSibling : svg.firstChild;
      for (let j = 0; j < order.length; j++) {
        const key = order[j];
        const g = groups.get(key);
        if (insertAfter) svg.insertBefore(g, insertAfter);
        else svg.appendChild(g);
      }

      for (let k = 0; k < candidates.length; k++) {
        const el = candidates[k];
        const fill = (el.getAttribute('fill') || 'none').trim().toLowerCase();
        const g = groups.get(fill);
        if (g) g.appendChild(el);
      }

      const fills = order.map(f => (f === 'none') ? 'none' : rgbStringToHex(f));
      return { svg: new XMLSerializer().serializeToString(svg), fills: fills };
    } catch (err) {
      console.error('Error in groupSvgByFill:', err);
      throw err;
    }
  }

  function setError(msg) {
    if (errorMsg) {
      errorMsg.textContent = msg || '';
      errorMsg.classList.toggle('hidden', !msg);
    } else {
      console.error('Error message element not found');
    }
  }

  function resetForm() {
    if (!fileInput || !canvas || !ctx || !svgOutput || !layerPreview || !downloadBtn || !openBtn || !resultDiv) {
      console.error('Form elements missing for reset');
      return;
    }
    fileInput.value = '';
    canvas.width = 0;
    canvas.height = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    svgOutput.innerHTML = 'No SVG yet';
    layerPreview.innerHTML = '';
    currentSVG = '';
    downloadBtn.disabled = true;
    openBtn.disabled = true;
    resultDiv.classList.add('hidden');
    document.getElementById('colors').value = '8';
    document.getElementById('strokewidth').value = '1';
    document.getElementById('scale').value = '1';
    setError('');
    console.log('Form reset');
  }

  // ---- Image Loading ----
  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) {
        console.log('No file selected');
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        const img = new Image();
        img.onload = function () {
          if (!canvas || !ctx) {
            console.error('Canvas or context missing');
            setError('Canvas not available');
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          currentSVG = '';
          layerPreview.innerHTML = '';
          downloadBtn.disabled = true;
          openBtn.disabled = true;
          resultDiv.classList.add('hidden');
          setError('');
          console.log('Image loaded successfully');
        };
        img.onerror = function () {
          setError('Error loading image. Please use a valid PNG or JPEG.');
          console.error('Image load error');
        };
        img.src = ev.target.result;
      };
      reader.onerror = function () {
        setError('Error reading file. Please try another file.');
        console.error('File read error');
      };
      reader.readAsDataURL(file);
    });
  } else {
    console.error('File input not found');
  }

  // ---- Convert ----
  if (convertBtn) {
    convertBtn.addEventListener('click', function () {
      if (!canvas || !canvas.width || !canvas.height) {
        setError('No image loaded. Please upload an image first.');
        console.error('No image loaded for conversion');
        return;
      }

      if (!window.ImageTracer) {
        setError('ImageTracer.js failed to load. Please refresh the page or check your internet connection.');
        console.error('ImageTracer.js not loaded');
        return;
      }

      const colors = parseInt(document.getElementById('colors').value, 10) || 8;
      const strokewidth = parseFloat(document.getElementById('strokewidth').value) || 1;
      const scale = parseFloat(document.getElementById('scale').value) || 1;

      const options = {
        numberofcolors: colors,
        scale: scale,
        strokewidth: strokewidth,
        ltres: 1,
        qtres: 1,
        pathomit: 8,
        colorsampling: 1
      };

      try {
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const traced = ImageTracer.imagedataToTracedata(imgData, options);
        const baseSvg = ImageTracer.getsvgstring(traced, options);
        const grouped = groupSvgByFill(baseSvg);
        currentSVG = grouped.svg;
        svgOutput.innerHTML = currentSVG;
        resultDiv.classList.remove('hidden');

        layerPreview.innerHTML = '';
        for (let i = 0; i < grouped.fills.length; i++) {
          const fill = grouped.fills[i];
          const div = document.createElement('div');
          const swatchStyle = (fill === 'none') ? 'background:repeating-linear-gradient(45deg,#ccc,#ccc 6px,#fff 6px,#fff 12px);' : 'background:' + fill + ';';
          div.innerHTML = '<span class="color-swatch" style="' + swatchStyle + '"></span> Layer ' + (i + 1) + ' <code>' + fill + '</code>';
          layerPreview.appendChild(div);
        }

        downloadBtn.disabled = false;
        openBtn.disabled = false;
        setError('');
        console.log('Conversion successful');
      } catch (err) {
        console.error('Conversion error:', err);
        setError('Conversion error: ' + err.message + ' (Check console for details)');
      }
    });
  } else {
    console.error('Convert button not found');
  }

  // ---- Download ----
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      if (!currentSVG) {
        setError('No SVG to download.');
        console.error('No SVG for download');
        return;
      }
      const blob = new Blob([currentSVG], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'layered_trace.svg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      console.log('SVG downloaded');
    });
  } else {
    console.error('Download button not found');
  }

  // ---- Open in New Tab ----
  if (openBtn) {
    openBtn.addEventListener('click', function () {
      if (!currentSVG) {
        setError('No SVG to open.');
        console.error('No SVG to open');
        return;
      }
      const w = window.open();
      w.document.write(currentSVG);
      w.document.close();
      console.log('SVG opened in new tab');
    });
  } else {
    console.error('Open button not found');
  }

  // ---- Reset ----
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  } else {
    console.error('Reset button not found');
  }
});
