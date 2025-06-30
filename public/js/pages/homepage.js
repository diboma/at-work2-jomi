window.onload = () => {
  /**
   * FILTER FOLLOWED BY ME
   */
  const filter = document.getElementById('filter-followed-by-me');
  filter.checked = false;

  filter.addEventListener('change', (e) => {
    if (e.target.checked) {
      document
        .querySelectorAll('.not-followed-by-me')
        .forEach((card) => card.classList.add('d-none'));
    } else {
      document
        .querySelectorAll('.not-followed-by-me')
        .forEach((card) => card.classList.remove('d-none'));
    }
  });

  /**
   * HTMX
   * Listen for htmx:afterSwap event and update the followed-by-me pins
   */
  htmx.logger = function (elt, event, data) {
    if (
      event === 'htmx:afterSwap' &&
      elt.id.includes('edit-coach') &&
      elt.dataset.followingIds
    ) {
      const followingIds = elt.dataset.followingIds.split(',');
      const pins = document.querySelectorAll('.pin-followed');
      for (const pin of pins) {
        const card = pin.parentElement.parentElement;
        if (followingIds.includes(pin.dataset.maatwerkerId)) {
          pin.classList.remove('d-none');
          card.classList.add('followed-by-me');
          card.classList.remove('not-followed-by-me');
          if (filter.checked) {
            card.classList.remove('d-none');
          }
        } else {
          pin.classList.add('d-none');
          card.classList.remove('followed-by-me');
          card.classList.add('not-followed-by-me');
          if (filter.checked) {
            card.classList.add('d-none');
          }
        }
      }
    }
  };
};
