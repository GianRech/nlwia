import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const videoURL = input.value
  console.log("URL do vídeo enviado: ", videoURL)
  content.classList.add("placeholder")

  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "Hmmm... este vídeo não parece ser um Shorts! Envie outro, por favor!")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  content.textContent =
    "Fazendo a transcrição do áudio do seu Shorts... (Esta etapa pode levar alguns minutos!)"

  const transcription = await server.get("/summary/" + videoID)

  content.textContent =
    "Fabricando o resumo do Shorts... (Esta etapa pode levar mais alguns minutos!)"

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
