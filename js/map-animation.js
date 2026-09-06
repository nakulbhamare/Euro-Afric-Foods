/**
 * EURO AFRIC FOODS - INTERACTIVE TRADE ROUTE MAP
 * Visualizes the Africa -> Europe Trade Corridor with animated vector arcs and milestone states
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTradeRouteMap();
    initMilestoneInteractions();
  });

  function initTradeRouteMap() {
    const svg = document.getElementById('tradeRouteSvg');
    if (!svg) return;

    // Interactive node tooltips or pulsing highlights
    const nodes = svg.querySelectorAll('.route-node');
    const routePath = svg.getElementById('mainTradeArc');

    if (routePath) {
      // Calculate path length for smooth stroke animation
      const length = routePath.getTotalLength ? routePath.getTotalLength() : 600;
      routePath.style.strokeDasharray = `${length} ${length}`;
      routePath.style.strokeDashoffset = `${length}`;
      
      // Animate on view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            routePath.style.transition = 'stroke-dashoffset 3.2s cubic-bezier(0.22, 1, 0.36, 1)';
            routePath.style.strokeDashoffset = '0';
          }
        });
      }, { threshold: 0.3 });

      observer.observe(svg);
    }

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        const step = node.getAttribute('data-step');
        highlightMilestone(step);
      });
    });
  }

  function initMilestoneInteractions() {
    const milestoneCards = document.querySelectorAll('.milestone-card');
    milestoneCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const step = card.getAttribute('data-step');
        milestoneCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        highlightMapNode(step);
      });

      card.addEventListener('click', () => {
        const step = card.getAttribute('data-step');
        milestoneCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        highlightMapNode(step);
      });
    });
  }

  function highlightMilestone(step) {
    const milestoneCards = document.querySelectorAll('.milestone-card');
    milestoneCards.forEach(card => {
      if (card.getAttribute('data-step') === step) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function highlightMapNode(step) {
    const nodes = document.querySelectorAll('.route-node');
    nodes.forEach(node => {
      if (node.getAttribute('data-step') === step) {
        node.setAttribute('r', '9');
        node.setAttribute('fill', '#FFFFFF');
      } else {
        node.setAttribute('r', '6');
        node.setAttribute('fill', '#F7941D');
      }
    });
  }
})();
