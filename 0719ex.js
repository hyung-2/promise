const options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  params: { from: "0", size: "20", tags: "under_30_minutes" },
  headers: {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": "31276411cfmsh0efd07dc2760712p136b67jsnbcdc93b074f2"
  }
}

function loadApi(url){
  return fetch(url)
          .then(response => response.json())
}
function loadApiTwo(url){
  return fetch(url,options)
          .then(response => response.json())
}

function loadMovieApi(movies){
  return fetch(`https://yts.mx/api/v2/list_movies.json/${movies}`)
          .then(response => response.json())
}



function showData(movieList){
  return new Promise(function(resolve, reject){
    console.log(movieList)
    
    for (i=0; i<movieList.data.movies.length; i++){
      let div = document.createElement('div')
      document.body.append(div)
      div.className = 'container'

      let imgbox = document.createElement('div')
      div.append(imgbox)
      imgbox.className = 'imgbox'

      let textbox = document.createElement('div')
      div.append(textbox)
      textbox.className = 'textbox'

      let img = document.createElement('img')
      img.src = movieList.data.movies[i].medium_cover_image
      imgbox.append(img)
      
      let title = document.createElement('h3')
      title.innerHTML = `${movieList.data.movies[i].title}`
      textbox.append(title)
      
      let genres = document.createElement('p')
      genres.innerHTML = `${movieList.data.movies[i].genres}`
      textbox.append(genres)
    }
    resolve(movieList)

  })
}

loadApi('https://yts.mx/api/v2/list_movies.json')
  .then(movieData => loadMovieApi(movieData.data.movies))
  .then(movieList => showData(movieList))



function loadRecipeApi(recipes){
  return fetch(`https://tasty.p.rapidapi.com/recipes/list`,options)
          .then(response => response.json())
}

function showRecipe(foodLists){
  return new Promise(function(resolve, reject){
    console.log(foodLists)

  })
}

loadApiTwo('https://tasty.p.rapidapi.com/recipes/list')
  .then(recipeData => loadRecipeApi(recipeData))
  .then(foodLists => showRecipe(foodLists))