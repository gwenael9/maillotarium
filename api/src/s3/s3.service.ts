import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3 from './s3.config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = s3;
  }

  async generatePresignedUrl(
    fileName: string,
    fileType: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      ContentType: fileType,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn: 60 });
  }
}
