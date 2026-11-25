import { PracticalFile } from '../../types/practicalCoding';

/**
 * Bundles HTML, CSS, and JS/TS files into an isolated HTML document string
 * suitable for an iframe srcDoc preview.
 */
export function bundlePreviewHtml(files: PracticalFile[], theme: 'dark' | 'light' = 'dark'): string {
  const htmlFile = files.find(
    (f) => f.name.endsWith('.html') || f.language === 'html'
  );
  const cssFiles = files.filter(
    (f) => f.name.endsWith('.css') || f.language === 'css'
  );
  const jsFiles = files.filter(
    (f) =>
      f.name.endsWith('.js') ||
      f.name.endsWith('.ts') ||
      f.language === 'javascript' ||
      f.language === 'typescript'
  );

  let htmlContent = htmlFile?.content || `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>`;

  // Inject CSS
  const combinedCss = cssFiles.map((f) => f.content).join('\n\n');
  const styleTag = `
  <style>
    /* Default preview environment resets */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      ${theme === 'dark' ? 'background-color: #0b0f19; color: #f1f5f9;' : 'background-color: #ffffff; color: #0f172a;'}
    }
    ${combinedCss}
  </style>`;

  if (htmlContent.includes('</head>')) {
    htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
  } else {
    htmlContent = `${styleTag}\n${htmlContent}`;
  }

  // Inject JS with safe error traps
  const combinedJs = jsFiles.map((f) => f.content).join('\n\n');
  const scriptTag = `
  <script>
    (function() {
      // Preview error trap
      window.addEventListener('error', function(evt) {
        window.parent.postMessage({
          type: 'PREVIEW_CONSOLE_ERROR',
          message: evt.message || 'Unknown script error',
          lineno: evt.lineno
        }, '*');
      });

      try {
        ${combinedJs}
      } catch (err) {
        console.error('Practical Script Error:', err);
        window.parent.postMessage({
          type: 'PREVIEW_CONSOLE_ERROR',
          message: err && err.message ? err.message : String(err)
        }, '*');
      }
    })();
  </script>`;

  if (htmlContent.includes('</body>')) {
    htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
  } else {
    htmlContent = `${htmlContent}\n${scriptTag}`;
  }

  return htmlContent;
}
