import reddit from "./redditapi";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//Form Event Listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get Search term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  //Get Limit
  const searchLimit = document.getElementById("limit").value;

  //Check input
  if (searchTerm === "") {
    showMessage("Please add a search term!", "alert-danger");
  }

  //Clear input
  searchForm.reset();

  //Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((posts) => {
    let output = '<div class="card-columns">';
    //Loop through posts
    posts.map((post) => {
      //Check for image
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
      <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="${
            post.url
          }" target="_blanc" class="btn btn-primary">Read More</a>
          <hr>
          <span class="badge badge-secondary">${post.subreddit}</span>
          <span class="badge badge-dark">${post.score}</span>
        </div>
    </div>
      `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});
/**
 * Create alert and added when you submit form with empty search term.
 * @param {String} errorText
 * @param {String} alertType
 */
function showMessage(errorText, alertType) {
  //Get Parent
  const searchContainer = document.getElementById("search-container");
  //Get Search
  const search = document.getElementById("search");
  //Create div
  const div = document.createElement("div");
  //Create Template for alert
  const alert = `
  <div class="alert ${alertType}" role="alert">
   ${errorText}
  </div>
  `;
  div.innerHTML = alert;
  searchContainer.insertBefore(div, search);

  //Timeout Alert
  setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

/**
 * Limit the text description if i have a big text.
 * @param {string} text
 * @param {num} limit
 */
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  shortened === -1 && text;

  return text.substring(0, shortened);
}
