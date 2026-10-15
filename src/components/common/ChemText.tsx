import React from 'react';

/**
 * Robust utility to convert raw chemical formulas / LaTeX math syntax / code braces
 * into clean Unicode, subscripted chemical formulas, and readable mathematical text.
 * Examples:
 *   {$M_r$} -> Mᵣ
 *   {$NH_3$} -> NH₃
 *   {$HCl$} -> HCl
 *   $NH_4Cl$ -> NH₄Cl
 *   $M_r = 17$ -> Mᵣ = 17
 *   $A_r = 35.5$ -> Aᵣ = 35.5
 *   $CO_2$ -> CO₂
 *   $O_2$ -> O₂
 *   $CaCO_3(s) \rightarrow CaO(s) + CO_2(g)$ -> CaCO₃(s) → CaO(s) + CO₂(g)
 *   $CuSO_4 \cdot 5H_2O$ -> CuSO₄·5H₂O
 *   $Al^{3+}$ -> Al³⁺
 *   $SO_4^{2-}$ -> SO₄²⁻
 *   $\pm 0.10\text{ cm}^3$ -> ±0.10 cm³
 *   $\text{dm}^3$ -> dm³
 *   \( ... \) -> clean math
 */

const SUBSCRIPTS: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ',
  'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ'
};

const SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ'
};

export function formatChemText(rawText: string | undefined | null): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Strip wrapped code braces around math/formulas:
  // e.g. {$M_r$}, {$NH_3$}, {$HCl$}, {M_r}, {NH_3}, {HCl}
  text = text.replace(/\{\$([^}]+)\$\}/g, '$1');
  text = text.replace(/\{([A-Za-z0-9_+\-^$=.\s]+)\}/g, (match, inner) => {
    // Only strip braces if it looks like a formula or variable rather than code blocks
    if (inner.includes('M_r') || inner.includes('A_r') || inner.includes('NH_') || inner.includes('HCl') || inner.includes('CO_') || inner.includes('O_') || inner.includes('H_')) {
      return inner;
    }
    return match;
  });

  // 2. Normalize LaTeX inline markers \( ... \) and \[ ... \]
  text = text.replace(/\\\((.*?)\\\)/g, '$1');
  text = text.replace(/\\\[(.*?)\\\]/g, '$1');

  // 3. Common LaTeX arrows, operators and greek letters
  text = text.replace(/\\rightarrow/g, '→');
  text = text.replace(/\\longrightarrow/g, '→');
  text = text.replace(/\\rightleftharpoons/g, '⇌');
  text = text.replace(/\\leftharpoons/g, '⇌');
  text = text.replace(/\\cdot/g, '·');
  text = text.replace(/\\times/g, '×');
  text = text.replace(/\\Delta/g, 'Δ');
  text = text.replace(/\\ge/g, '≥');
  text = text.replace(/\\le/g, '≤');
  text = text.replace(/\\pm/g, '±');
  text = text.replace(/\\degree/g, '°');
  text = text.replace(/\\circ/g, '°');

  // 4. Handle LaTeX text / mathrm wrappers: \text{ g}, \text{dm}^3, \mathrm{cm}^3
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');
  text = text.replace(/\\mathrm\{([^}]+)\}/g, '$1');
  text = text.replace(/\\mathbf\{([^}]+)\}/g, '$1');

  // 5. Handle standard LaTeX fractions \frac{a}{b} -> a/b
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');

  // 6. Common scientific constants & variables: M_r -> Mᵣ, A_r -> Aᵣ, K_w -> K_w
  text = text.replace(/M_r/g, 'Mᵣ');
  text = text.replace(/A_r/g, 'Aᵣ');
  text = text.replace(/M_\{r\}/g, 'Mᵣ');
  text = text.replace(/A_\{r\}/g, 'Aᵣ');

  // 7. Convert explicit LaTeX subscripts e.g. _{2} or _2
  text = text.replace(/_\{([a-zA-Z0-9+-]+)\}/g, (_, chars) => {
    return chars.split('').map((c: string) => SUBSCRIPTS[c] || c).join('');
  });
  text = text.replace(/_([a-zA-Z0-9])/g, (_, char) => {
    return SUBSCRIPTS[char] || char;
  });

  // 8. Convert explicit LaTeX superscripts e.g. ^{2+} or ^+ or ^{3-} or ^3
  text = text.replace(/\^\{([a-zA-Z0-9+-]+)\}/g, (_, chars) => {
    return chars.split('').map((c: string) => SUPERSCRIPTS[c] || c).join('');
  });
  text = text.replace(/\^([a-zA-Z0-9+-])/g, (_, char) => {
    return SUPERSCRIPTS[char] || char;
  });

  // 9. Auto-format common chemical formulas that don't have underscore e.g. NH3 -> NH₃, CO2 -> CO₂, H2O -> H₂O, CaCO3 -> CaCO₃
  // Matches element symbols followed by numbers: (e.g. NH3, HCl, CO2, H2SO4, Fe2O3, PbBr2)
  // Be careful not to alter numbers inside words or years like 2026
  text = text.replace(/\b([A-Z][a-z]?)([0-9]+)\b/g, (_, elem, num) => {
    const sub = num.split('').map((c: string) => SUBSCRIPTS[c] || c).join('');
    return `${elem}${sub}`;
  });

  // 10. Clean remaining dollar signs used for inline math
  text = text.replace(/\$([^\$]+)\$/g, '$1');
  text = text.replace(/\$/g, '');

  // 11. Clean rogue curly braces left over from bad LaTeX templates like {Mᵣ} or {NH₃}
  text = text.replace(/\{([A-Za-z0-9ᵣᵤₐ⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉\s=+\-·/]+)\}/g, '$1');

  return text;
}

interface ChemTextProps {
  children?: string | undefined | null;
  text?: string | undefined | null;
  className?: string;
}

export const ChemText: React.FC<ChemTextProps> = ({ children, text, className = '' }) => {
  const content = text !== undefined ? text : children;
  if (!content) return null;
  const formatted = formatChemText(content);
  return <span className={className}>{formatted}</span>;
};
