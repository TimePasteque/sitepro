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


/* TRANSISTIONS PAGES */
//Mapping de N pages à N liens

document.addEventListener('DOMContentLoaded', function() {
  var body = document.getElementsByTagName('body')[0];
  var blocCentral = document.getElementById('bloc-central');
  
  var activePage = null;

  // Mapping des liens avec leurs pages correspondantes
  var pageMapping = {
    'cv': 'cv-page',
    'portfolio': 'portfolio-page',
    'contact': 'contact-page'
    // Ajoute d'autres liens/pages ici
  };

  function returnToMenu() {
    if (blocCentral.classList.contains('reduce-left')) {
      // Close active page
      if (activePage) {
        activePage.classList.remove('shift-left');
        blocCentral.classList.remove('reduce-left');
        body.classList.remove(activePage.id + '-open');
        
        // Remove the event listener from bloc-central
        blocCentral.removeEventListener('click', returnToMenu);
        
        activePage.classList.add('shift-left-reverse');
        blocCentral.classList.add('reduce-left-reverse');

        setTimeout(() => {
          activePage.classList.remove('shift-left-reverse');
          blocCentral.classList.remove('reduce-left-reverse');
          activePage = null;

          // Reattach event listeners to links
          attachLinkEventListeners();
        }, 900);
      }
    }
  }

  function goToPage(e) {
    e.preventDefault();
    var linkId = e.target.id;
    var pageId = pageMapping[linkId];
    var pageElement = document.getElementById(pageId);

    blocCentral.classList.add('reduce-left');
    pageElement.classList.add('shift-left');
    body.classList.add(pageId + '-open');

    // Remove the event listener from all links
    detachLinkEventListeners();

    setTimeout(() => {
      // Attach event listener to bloc-central to return to menu
      blocCentral.addEventListener('click', returnToMenu);
    }, 900);

    // Set active page as current
    activePage = pageElement;
  }

  function attachLinkEventListeners() {
    Object.keys(pageMapping).forEach(function(linkId) {
      var link = document.getElementById(linkId);
      link.addEventListener('click', goToPage);
    });
  }

  function detachLinkEventListeners() {
    Object.keys(pageMapping).forEach(function(linkId) {
      var link = document.getElementById(linkId);
      link.removeEventListener('click', goToPage);
    });
  }

  // Attach event listeners to links initially
  attachLinkEventListeners();

  function fetchPortfolioData() {
    fetch('/portfolio-contents')
      .then(response => response.json())
      .then(data => {
        const portfolioContainer = document.getElementById('portfolio-container');
        portfolioContainer.innerHTML = ''; // Clear existing content

        data.forEach(project => {
          const card = document.createElement('div');
          card.className = 'portfolio-card';
          card.onclick = () => showProjectDetails(project.id);

          const title = document.createElement('h2');
          title.textContent = project.title;

          const description = document.createElement('p');
          description.textContent = project.description;

          card.appendChild(title);
          card.appendChild(description);
          portfolioContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching portfolio data:', error));
  }

  fetchPortfolioData();

});