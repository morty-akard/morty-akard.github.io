// Runs in the browser. Narrow reading blocks and portrait figures deliberately
// share the content column's centre rather than its left edge.
export function auditSectionAlignment() {
  const issues = [];
  for (const section of document.querySelectorAll('section.cs-section')) {
    const style = getComputedStyle(section);
    const rect = section.getBoundingClientRect();
    const left = rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
    const right = rect.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight);
    const center = (left + right) / 2;
    const maxWidth = Math.min(right - left, parseFloat(style.getPropertyValue('--content-max')) || 1200);
    for (const child of section.children) {
      if (child.classList.contains('cs-media--bleed') || getComputedStyle(child).display === 'none') continue;
      const box = child.getBoundingClientRect();
      if (!box.width && !box.height) continue;
      if (Math.abs(box.left + box.width / 2 - center) > 1 || box.width > maxWidth + 1) {
        issues.push({ className: child.className, left: Math.round(box.left), width: Math.round(box.width), expectedCenter: Math.round(center) });
      }
    }
  }
  return issues;
}
