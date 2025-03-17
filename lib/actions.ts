import {uploadImage} from "@/lib/uploadImage";

type State = {
    status?: string;
    message?: string | null;
    fileName?: string;
};

export async function uploadFile(prevState: State, formData: FormData): Promise<State> {
    try {
        const file = formData.get("file") as File;

        if (!file || file.size === 0) {
            return { status: "error", message: "Please select a file." };
        }

        // Use the Supabase uploadImage function
        const publicUrl = await uploadImage(file);

        return {
            status: "success",
            message: "File has been uploaded.",
            fileName: publicUrl
        };
    } catch (error) {
        console.error(error);
        return { status: "error", message: "Failed to upload file." };
    }
}