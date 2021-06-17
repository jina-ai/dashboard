import { HubImage } from "../redux/hub/hub.types"

export const sortHubImagesNamesIncreasing = (images: HubImage[]) =>
  images.sort((imageA, imageB) =>
    imageA.name < imageB.name ? -1 : imageA.name > imageB.name ? 1 : 0
  )

export const sortHubImagesNamesDecreasing = (images: HubImage[]) =>
  images.sort((imageA, imageB) =>
    imageA.name > imageB.name ? -1 : imageA.name < imageB.name ? 1 : 0
  )

export const sortHubImagesAuthorsIncreasing = (images: HubImage[]) =>
  images.sort((imageA, imageB) =>
    imageA.author < imageB.author ? -1 : imageA.author > imageB.author ? 1 : 0
  )

export const sortHubImagesAuthorsDecreasing = (images: HubImage[]) =>
  images.sort((imageA, imageB) =>
    imageA.author > imageB.author ? -1 : imageA.author < imageB.author ? 1 : 0
  )
