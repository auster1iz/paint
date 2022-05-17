import axios from 'axios'

export const fetchCanvasImage = (params, canvas) => {
    const ctx = canvas.getContext('2d')
    axios
        .get(`http://localhost:5000/image?id=${params.id}`)
        .then((response) => {
            const img = new Image()
            img.src = response.data
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        })
        .catch((err) => console.log(err.message))
}
