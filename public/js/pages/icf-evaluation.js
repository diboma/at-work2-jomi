const elSelectCategory = document.getElementById('icf_category_id');
const elSelectCode = document.getElementById('icf_code_id');
const elSelectRating = document.getElementById('icf_rating_id');

if (elSelectCategory) {
  elSelectCategory.addEventListener('change', (e) => {
    // Get selected category
    const catOptions = e.target.options;
    const category = catOptions[e.target.selectedIndex].dataset.category;

    // Hide codes
    elSelectCode.value = '';
    const codes = elSelectCode.options;
    for (const code of codes) {
      if (code.dataset.category === category) {
        code.classList.remove('d-none');
      } else {
        code.classList.add('d-none');
      }
    }

    // Hide ratings
    elSelectRating.value = '';
    const ratings = elSelectRating.options;
    for (const rating of ratings) {
      if (rating.dataset.category === category) {
        rating.classList.remove('d-none');
      } else {
        rating.classList.add('d-none');
      }
    }
  });
}
