export interface RecordParameters {
  resolution: {width: number, height: number},
  /**
   * 录制时长，单位：秒
   */
  recordTime?: number,
  filename?: string,

} 
export default async function record(recordParameters: RecordParameters) {
  const {resolution, recordTime = 5, filename = 'WebGL.webm' } = recordParameters
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: resolution,
    audio: true,
  })
  const recorder = new MediaRecorder(stream)
  const chunks: Blob[] = []
  recorder.ondataavailable = (e) => chunks.push(e.data)
  recorder.onstop = () => {
    const blob = new Blob(chunks, {type: chunks[0].type})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }
  recorder.start()
  setTimeout(() => {
    recorder.stop()
  }, recordTime * 1000)
}