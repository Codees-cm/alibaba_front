/* eslint-disable react-hooks/rules-of-hooks */
import { useEdgeStore } from "./edgestore";


const {edgestore} = useEdgeStore()


export async function uploadFile(formData) {
  try {
    const file = formData.get("file");

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }
    const res = await edgestore.myPublicImages.upload({ 
            file,
            onProgressChange: (progress) => {
            // setProgress(progress)
            console.log(progress)
            }

        })
       return { status: "success", message: "File has been uploaded.", fileName:res.url };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to upload file." };
  }
}
