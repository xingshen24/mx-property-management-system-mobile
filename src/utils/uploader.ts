import { Api } from "./request";

export const uploadFile = async (file: any, bizType: string) => {
  console.log(file)
  file.status = 'uploading'
  file.message = '上传中...'
  const formData = new FormData();
  formData.append("bizType", bizType);
  const blobUrl = file.objectUrl;
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  formData.append('file', blob, file.file?.name ?? (new Date().getTime() + '.jpeg'))
  return new Promise<unknown>((resolve, reject) => {

    Api.req('/upload').files(formData).success((data: any) => {
      resolve(data)
      file.status = 'done'
      file.id = data.id;
    }).fail((data) => {
      file.status = 'failed'
      file.message = '上传失败'
      reject(data)
    }).post();
  })
}