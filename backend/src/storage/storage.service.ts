import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class StorageService {
  private minioClient: Minio.Client;
  private bucketName = 'mclegends';

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'minio',
      port: parseInt(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'mclegends',
      secretKey: process.env.MINIO_SECRET_KEY || 'mclegends_minio_pass',
    });
    this.initBucket();
  }

  private async initBucket() {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }
  }

  async uploadFile(path: string, file: Buffer): Promise<void> {
    await this.minioClient.putObject(this.bucketName, path, file);
  }

  async downloadFile(path: string): Promise<Buffer> {
    const stream = await this.minioClient.getObject(this.bucketName, path);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  async deleteFile(path: string): Promise<void> {
    await this.minioClient.removeObject(this.bucketName, path);
  }

  async listFiles(prefix: string): Promise<any[]> {
    const stream = this.minioClient.listObjects(this.bucketName, prefix, true);
    const files = [];
    for await (const obj of stream) {
      files.push(obj);
    }
    return files;
  }

  async getFileUrl(path: string, expiry: number = 3600): Promise<string> {
    return this.minioClient.presignedGetObject(this.bucketName, path, expiry);
  }
}
