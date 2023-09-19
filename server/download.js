import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do vídeo: ", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error(
          "Este vídeo tem mais de um minuto de duração e, portanto, não é um Shorts!"
        )
      }
    })
    .on("end", () => {
      console.log("O download do vídeo Shorts foi concluído.")
      resolve()
    })
    .on("error", (error) => {
      console.log(
        "Não foi possível realizar o download do vídeo! Detalhes do erro: ",
        error
      )
      reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
