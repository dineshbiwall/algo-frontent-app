import httpClient from "@/api-client/client";
import { type UploadResponse } from "@/types/uploadthing";
import { ModuleTypeEnum } from "../enums/utils.enum";
import { ApiResponse } from "../types/api";

export async function uploadThing(
  file: File,
  module: ModuleTypeEnum,
): Promise<UploadResponse> {
  try {
    // Get the pre-signed URL from the backend
    const { data } = await httpClient
      .get("api/v1/utils/generate-upload-url", {
        searchParams: {
          mimeType: file.type,
          module: module,
        },
      })
      .json<
        ApiResponse<{
          signedUrl: string;
          url: string;
          key: string;
        }>
      >();

    const { url, key, signedUrl } = data;

    // Upload the file directly to S3 using the pre-signed URL
    await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    return { url, key };
  } catch (error) {
    console.log("Error uploading file:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to upload file",
    );
  }
}
