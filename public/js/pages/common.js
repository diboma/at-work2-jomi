// Get path
// --------
const currentPath = window.location.pathname.split('/')[1];

// Select worker and redirect (only for coaches, on 'index' pages)
// ---------------------------------------------------------------
const elSelectWorker = document.getElementById('maatwerker');
if (elSelectWorker) {
  elSelectWorker.addEventListener('change', (e) => {
    window.location.href = `/${currentPath}/${e.target.value}`;
  });
}

// Add text to empty list groups
// ------------------------------
const listgroups = document.querySelectorAll('.list-group.list-group-flush');
for (const list of listgroups) {
  if (list.children.length === 0) {
    list.innerHTML = `<p class="text-sm fst-italic">Geen ${currentPath}.</p>`;
  }
}

// Toggle all accordion tabs
// --------------------------
const accordions = document.querySelectorAll('.accordion-collapse.collapse');
const toggleCollapses = document.querySelectorAll('.toggle-collapse');

for (const toggle of toggleCollapses) {
  toggle.checked = false;
  toggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      for (const accordion of accordions) {
        accordion.classList.add('show');
      }
    } else {
      for (const accordion of accordions) {
        accordion.classList.remove('show');
      }
    }
  });
}

// Sweet Alert
// ------------
const swalBootstrapMixin = {
  customClass: {
    confirmButton: 'btn btn-danger mx-2',
    cancelButton: 'btn btn-secondary mx-2',
  },
  buttonsStyling: false,
};

const swalFireOptions = {
  title: `${capitalizeWord(getSingularWordForSwal(currentPath))} verwijderen`,
  text: `Ben je zeker dat je ${getSingularWordWithArticleForSwal(
    currentPath
  )} wil verwijderen?`,
  icon: 'warning',
  showCancelButton: true,
  cancelButtonText: 'Annuleren',
  confirmButtonText: 'Verwijderen',
};

// Pinned item
// -----------
let pinnedItemLink = document.getElementById('pinned-item-link');
if (pinnedItemLink) {
  pinnedItemLink.addEventListener('click', listenForPinnedItemClick);
}

function listenForPinnedItemClick(e) {
  e.preventDefault();
  const itemId = pinnedItemLink.dataset.itemId;
  let targetElement;
  if (currentPath === 'arbeidsongevallen') {
    targetElement = document.getElementById(`collapse-${itemId}`);
  } else {
    targetElement = document.getElementById(`item-${itemId}`);
  }
  const collapseId = targetElement.dataset.collapseId;

  // Toggle collapse
  const accordion = document.getElementById(collapseId);
  accordion.classList.add('show');

  // Scroll to target item
  targetElement.scrollIntoView();
}

// HTMX
// Listen for htmx:afterSwap event to update pinned items
// ------------------------------------------------------
window.onload = () => {
  htmx.logger = function (elt, event, data) {
    // Listen for update of pinned item
    if (
      event === 'htmx:afterSwap' &&
      (elt.id.includes('item') || elt.id.includes('accordion'))
    ) {
      const pinnedItem = document.getElementById('pinned-item');
      const hasPinnedItem = elt.dataset.hasPinnedItem;
      if ((!hasPinnedItem || hasPinnedItem === 'false') && pinnedItem) {
        // Hide pinned item
        pinnedItem.classList.add('d-none');
      } else if (hasPinnedItem === 'true') {
        const pinnedItemId = elt.dataset.pinnedItemId;
        const pinnedItemTitle = elt.dataset.pinnedItemTitle;
        const pinnedItemHtml = elt.dataset.pinnedItemHtml;
        if (pinnedItem) {
          // Update pinned item
          pinnedItem.dataset.itemId = pinnedItemId;
          document.getElementById(`pinned-item-title`).innerHTML =
            pinnedItemTitle;
          document.getElementById(`pinned-item-link`).dataset.itemId =
            pinnedItemId;
          // Show pinned item
          pinnedItem.classList.remove('d-none');
        } else if (!pinnedItem) {
          // Create pinned item
          const newPinnedItem = createElementFromHTML(pinnedItemHtml);
          document.getElementsByTagName('main')[0].prepend(newPinnedItem);
          // Add event listener
          pinnedItemLink = document.getElementById('pinned-item-link');
          if (pinnedItemLink) {
            pinnedItemLink.addEventListener('click', listenForPinnedItemClick);
          }
        }
      }
    }
  };
};

// Utils
// -----
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getSingularWordForSwal(path) {
  if (path === 'afspraken') return 'afspraak';
  if (path === 'arbeidsongevallen') return 'arbeidsongeval';
  return path;
}

function getSingularWordWithArticleForSwal(path) {
  if (path === 'afspraken') return 'deze afspraak';
  if (path === 'arbeidsongevallen') return 'dit arbeidsongeval';
  return `deze ${path}`;
}

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
