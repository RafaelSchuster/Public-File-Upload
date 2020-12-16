const gallery = document.getElementById('gallery');

async function fetching(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayGallery() {
    fetching('http://localhost:5000/getLog').then((response) => {
        response.forEach(galleryItem => {
            const placeImg = document.createElement('span');
            placeImg.className = "imgDiv";
            const newImg = document.createElement('img');
            let textCaption = document.createTextNode(`${galleryItem.Caption}`);
            const placeCaption = document.createElement('div');
            placeCaption.className = "caption";
            newImg.setAttribute('src', `http://localhost:5000/${galleryItem.FileName}`);
            newImg.setAttribute('width', '300px');
            gallery.appendChild(placeImg);
            placeImg.appendChild(newImg);
            placeCaption.appendChild(textCaption);
            placeImg.appendChild(placeCaption);
        });
    });
}

displayGallery();