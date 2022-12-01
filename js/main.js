let $form = document.querySelector("#form");
let $btn = document.querySelector("#btn");
let $box = document.querySelector("#box");
let $genre = document.getElementsByName("genre")[0];

function renderGenres(array, element) {
    let genres = [];
    array.forEach(film => {
        film.genres.forEach(genre => {
            if (!genres.includes(genre)) {
                genres.push(genre)
            }
        })
    });

    if (!genres) {
        return null
    };

    let $option = ''
    genres.forEach(item => {
        value = item.split(" ").join("*")
        $option += `<option value="${value}">${item}</option>`
    });

    element.innerHTML += $option
}

renderGenres(films, $genre);

$form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let {
        search,
        genre,
        sort
    } = evt.target.elements;

    console.log(search.value, genre.value, sort.value);

    let regex = new RegExp(search.value.trim(), "gi");
    let filteredFilms = films.filter((film) => film.Title.match(regex));
    let genreFilteredFilms = [];

    if (genre.value === "all") {
        genreFilteredFilms = filteredFilms;
    } else {
        genreFilteredFilms = filteredFilms.filter(film => film.genres.includes(genre.value));
    };
    if (sort.value === "a-z") {
        genreFilteredFilms.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1);
    } else {
        genreFilteredFilms.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? -1 : 1);
    }

    console.log(genreFilteredFilms);
    renderFilms(genreFilteredFilms, $box);
});

function renderFilms(array, element) {
    element.innerHTML = null;
    let $newItem = "";

    array.forEach((film) => {
        $newItem += `
        <div class="card">
            <li style="width: 400px;">
                <img class="formImg" src='${film.Poster}' width="380" alt="Downloading" >
                <h2 class="formtitle">${film.Title}</h2>
                <p class="formId">Id: ${film.id}</p>
                <a class="formLink" href='${film.link}'>See Film</a>
            </li>
        </div>
        `;
    });
    element.innerHTML = $newItem;
}
renderFilms(films, $box);