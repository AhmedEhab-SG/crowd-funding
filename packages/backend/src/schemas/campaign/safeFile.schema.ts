import { UploadedFile } from "express-fileupload";
import MediaInfoFactory, { Track } from "mediainfo.js";

const safeFile = async (
  file: UploadedFile,
  { fileTypes }: { fileTypes: Track["@type"][] } = { fileTypes: ["General"] }
): Promise<boolean> => {
  try {
    const mediainfo = await MediaInfoFactory();

    // Read the file data
    const fileData = file.data;

    // Analyze the file data
    const result = await mediainfo.analyzeData(
      () => fileData.length,
      (size, offset) => fileData.subarray(offset, offset + size)
    );

    return (
      result.media?.track.some((track) =>
        fileTypes.some((type) => track["@type"] === type)
      ) || false
    );
  } catch (error) {
    return false;
  }
};

export default safeFile;
