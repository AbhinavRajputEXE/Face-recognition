/* Declarations */
const video = document.getElementById('video')
const imageUpload = document.getElementById('imageUpload')

/* Promises */

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start() {
  const container = document.getElementById('canvas2')
  container.style.position = 'relative'
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas2
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas2) canvas2.remove()
    let media  = imageUpload.files[0];
    var element = document.getElementById('imageUp'),
        style = window.getComputedStyle(element),
        val2 = style.getPropertyValue('height'),
        val = style.getPropertyValue('width');
    let width = parseInt(val, 10)
    let height = parseInt(val2, 10)
    image = await faceapi.bufferToImage(media)
    image.width = width
    image.height = height
    container.append(image)
    canvas2 = faceapi.createCanvasFromMedia(image)
    container.append(canvas2)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas2, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString(), boxColor: 'green' })
      drawBox.draw(canvas2)
    })
  })
}

function loadLabeledImages() {
  const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}

/* Functiom to srart and show video from the webcam */

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

/* Async/await function to detect face expressions, landmarks and draw canvas around the face and show the values accordnigly */

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.getElementById("face").append(canvas)
  // let width = document.getElementById("video").style.width;
  // let x = parseInt(width, 10)
  var element = document.getElementById('video'),
        style = window.getComputedStyle(element),
        val = style.getPropertyValue('width'),
        val2 = style.getPropertyValue('height');
  let width = parseInt(val, 10)
  let height = parseInt(val2, 10)
  const displaySize = { width: width, height: height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

/* Async/await function to detect face expressions and show text in text box accordingly */

setInterval(async()=>{
    const detect = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    let sad = detect[0].expressions.sad
    let angry = detect[0].expressions.angry
    let surprised = detect[0].expressions.surprised
    let happy = detect[0].expressions.happy
    /* Jokes Array */
    let jokeArray = [
      "Why do we tell actors to break a leg?....Because every play has a cast.",
      "Did you hear about the claustrophobic astronaut?.....He just needed a little space.",
      "Why don't scientists trust atoms?....Because they make up everything.",
      "Why did the chicken go to the séance?....To get to the other side."
  ];
    if(sad>=0.7) document.getElementById("joke").innerHTML = jokeArray[Math.floor(Math.random() * jokeArray.length)];
    else if(happy>=0.8) document.getElementById("joke").innerHTML = "Are you happy? 😃 You should be SAD lol!";
    else if(surprised>=0.8) document.getElementById("joke").innerHTML = "Why are you surprised? 🧐";
    else if(angry>=0.8) document.getElementById("joke").innerHTML = "Anger is not the solution to anything!! Stay calm 😌";
    else document.getElementById("joke").innerHTML = "You look fine today!";
},5000)

/* DARK MODE CODE */
const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.getElementById('bck').classList.toggle('dark');
});