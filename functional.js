const animatedTexts = document.querySelectorAll('.animated-text');

animatedTexts.forEach(text => {
    text.addEventListener('mouseover', e => {
        animatedTexts.forEach(otherText => {
            if (otherText !== e.target) {
                otherText.classList.add('darkened');
            }
        });
    });

    text.addEventListener('mouseout', e => {
        animatedTexts.forEach(otherText => {
            otherText.classList.remove('darkened');
        });
    });
});

//Mapping de N pages à N liens
document.addEventListener('DOMContentLoaded', function() {
  var body = document.getElementsByTagName('body')[0];
  var blocCentral = document.getElementById('bloc-central');
  
  // Mapping des liens avec leurs pages correspondantes
  var pageMapping = {
    'cv': 'cv-page',
    'portfolio': 'portfolio-page',
    'contact': 'contact-page'
    // Ajoute d'autres liens/pages ici
  };

  // Ajouter un event listener sur chaque lien du menu
  Object.keys(pageMapping).forEach(function(linkId) {
    var link = document.getElementById(linkId);
    var pageId = pageMapping[linkId];
    var pageElement = document.getElementById(pageId);

    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Fermer toutes les autres pages
      document.querySelectorAll('.hidden-page').forEach(function(page) {
        page.classList.remove('shift-left');
      });

      // Si la page correspondante est déjà ouverte, la fermer
      if (body.classList.contains(pageId + '-open')) {
        blocCentral.classList.remove('reduce-left');
        body.classList.remove(pageId + '-open');
      } else {
        // Sinon, ouvrir la page
        blocCentral.classList.add('reduce-left');
        pageElement.classList.add('shift-left');

        // Fermer les autres pages ouvertes
        Object.keys(pageMapping).forEach(function(otherLinkId) {
          body.classList.remove(pageMapping[otherLinkId] + '-open');
        });

        // Ouvrir la page actuelle
        body.classList.add(pageId + '-open');
      }
    });
  });
});
