import { type PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs/promises";

// Create an S3 service client object.
interface UploadInterface {
  filePath: string;
  fileName: string;
}

class S3Helper {
  private credentials = {
    accessKeyId: "aD2IhEYwrrYV97YJ",
    secretAccessKey: "Ed8sMy0QVrngwP7ShR3pUkem5VjL8l0T7Zdcl8zr",
  };

  private s3Client(): S3Client {
    const s3 = new S3Client({
      endpoint: "https://s3.tebi.io",
      credentials: this.credentials,
      region: "global",
    });
    return s3;
  }

  public async uploadToCloud({ filePath, fileName }: UploadInterface) {
    const file = await fs.readFile(filePath);
    const uploadParams: PutObjectCommandInput = {
      Bucket: "herbal-gallery",
      Key: fileName,
      Body: file,
      ACL: "public-read",
    };

    const s3 = this.s3Client();
    const upload: Upload = new Upload({
      client: s3,
      params: uploadParams,
    });
    const metaData = await upload.done();
    fs.unlink(filePath);
    return metaData["Location"];
  }
}

export default new S3Helper();
