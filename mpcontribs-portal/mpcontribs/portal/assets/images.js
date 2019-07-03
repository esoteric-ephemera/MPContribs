function lazyLoadImage(imageName, img) {
    import(
        /* webpackMode: "lazy-once" */
        './images/' + imageName.replace('./', '')
    ).then(function(src) {
        img.src = src.default;
        img.style.width = "100%";
    }).catch(function(err) { console.error(err); });
}

function generateImage(container, imageName) {
    var img = document.createElement('img');
    container.appendChild(img);
    lazyLoadImage(imageName, img);
}

function getImages() {
    return require.context('./images/', false, /\.(png|jpe?g)$/).keys();
}

var imageNames = getImages();
console.log(imageNames);
$.each(imageNames, function(idx, name) {
    var selector = '#' + name.replace('./', '').replace('.jpg', '_img');
    var container = document.querySelector(selector);
    generateImage(container, name);
})

