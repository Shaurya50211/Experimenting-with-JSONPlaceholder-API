var baseUrl = "https://jsonplaceholder.typicode.com"
// https://jsonplaceholder.typicode.com/albums/1/photos

const form = document.querySelector("form")
form.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault();
    const albumID = e.target['albumID'].value
    getPhotos(albumID)
}

function getPhotos(albumID) {
    let url = `${baseUrl}/albums/${albumID}/photos`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("There was an issue fetching images.");
            }
        })
        .then(json => showImages(json))
        .catch(err => alert(err))
}

function showImages(photos) {
    const images = document.querySelector("#images")
    images.innerHTML = ""
    photos.forEach(photo => {
        const img = document.createElement("img")
        img.src = photo.url
        let title = document.createElement("p")
        // title.style.position = "absolute"
        title.innerText = photo.title
        
        let imageDiv = document.createElement("div")
        imageDiv.classList.add("imageDiv")
        imageDiv.appendChild(img)
        imageDiv.appendChild(title)

        images.appendChild(imageDiv)
    })
}