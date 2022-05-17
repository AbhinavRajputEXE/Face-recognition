/* Declarations */
const video = document.getElementById('video')

/* Promises */

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

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
  const displaySize = { width: 720, height: 560 }
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
    else document.getElementById("joke").innerHTML = "You look fine today!";
},5000)

/* DARK MODE CODE */
const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.getElementById('bck').classList.toggle('dark');
});