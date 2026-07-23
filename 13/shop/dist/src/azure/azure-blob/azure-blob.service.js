"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureBlobService = void 0;
const common_1 = require("@nestjs/common");
const storage_blob_1 = require("@azure/storage-blob");
const path_1 = require("path");
const crypto_1 = require("crypto");
let AzureBlobService = class AzureBlobService {
    blobServiceClient;
    publicContainer;
    onModuleInit() {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error('.env 에 AZURE_STORAGE_CONNECTION_STRING 에 넣으세요');
        }
        this.blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
        const publicName = process.env.AZURE_PUBLIC_CONTAINER ?? 'product-images';
        this.publicContainer = this.blobServiceClient.getContainerClient(publicName);
    }
    makeBlobName(originName) {
        const ext = (0, path_1.extname)(originName).toLocaleLowerCase();
        return `${(0, crypto_1.randomUUID)()}${ext}`;
    }
    async uploadPublic(file, folder = 'products') {
        const blobNmae = `${folder}/${this.makeBlobName(file.originalname)}`;
        const blockBlob = this.publicContainer.getBlockBlobClient(blobNmae);
        await blockBlob.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype }
        });
        return { blobName: blobNmae, url: blockBlob.url };
    }
};
exports.AzureBlobService = AzureBlobService;
exports.AzureBlobService = AzureBlobService = __decorate([
    (0, common_1.Injectable)()
], AzureBlobService);
//# sourceMappingURL=azure-blob.service.js.map