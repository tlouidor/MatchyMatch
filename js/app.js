const sourceImages =[
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
]

const randomImages = [...sourceImages, ...sourceImages].sort((a,b) => 
    Math.random() > 0.5 ? 1 : -1)

console.log(randomImages)

const gameContainer = document.querySelector('#matchy-match')

for (let randomImages of randomImages) {
    gameContainer.innerHTML += `
        <div>
            <img src="images/${randomImages}}">
        </div>
    `
}
