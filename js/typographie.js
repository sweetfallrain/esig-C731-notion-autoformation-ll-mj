/* ===================================================================
   Typographie française : espaces insécables avant « : ; ? ! » et à
   l'intérieur des guillemets « », pour qu'un signe ne se retrouve jamais
   seul en début de ligne. Appliqué au texte affiché, après les simulations
   (ce fichier est chargé en dernier). Les sources HTML restent inchangées.
   =================================================================== */
(function () {
  'use strict';

  const NBSP = ' ';
  const SKIP = { SCRIPT: 1, STYLE: 1, PRE: 1, CODE: 1, KBD: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1 };

  function fix(text) {
    return text
      .replace(/« /g, '«' + NBSP)
      .replace(/ »/g, NBSP + '»')
      .replace(/ ([:;?!])(?=\s|$|[»)])/g, NBSP + '$1');
  }

  function walk(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        let el = node.parentNode;
        while (el && el !== root) {
          if (SKIP[el.nodeName]) { return NodeFilter.FILTER_REJECT; }
          el = el.parentNode;
        }
        return /[«»:;?!]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    const nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }
    nodes.forEach(function (node) {
      const fixed = fix(node.nodeValue);
      if (fixed !== node.nodeValue) { node.nodeValue = fixed; }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    walk(document.body);
  });
})();
