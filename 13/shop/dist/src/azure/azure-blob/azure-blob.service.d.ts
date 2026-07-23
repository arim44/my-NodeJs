import { OnModuleInit } from '@nestjs/common';
export declare class AzureBlobService implements OnModuleInit {
    private blobServiceClient;
    private publicContainer;
    onModuleInit(): void;
    makeBlobName(originName: string): string;
    uploadPublic(file: Express.Multer.File, folder?: string): Promise<{
        blobName: string;
        url: string;
    }>;
}
