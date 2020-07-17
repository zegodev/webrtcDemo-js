import { OssParams, MpOssParams, FileTypeEnum, ExpectFileTypeEnum, RenderTypeEnum } from './zego.docs.entity';
export declare const isPrivateServer: boolean;
export declare const getEnv: () => string;
export declare const getMd5: (file: File | string) => Promise<{
    fileHash: string;
}>;
export declare const getFileType: (file: File | string) => FileTypeEnum;
export declare const getFileSize: (file: File | string) => Promise<{
    fileSize: number;
}>;
export declare const getFileName: (file: File | string) => string;
export declare const getExpectFileType: (renderType: RenderTypeEnum, fileType: FileTypeEnum) => ExpectFileTypeEnum;
export declare const getUploadOssInfo: (oss: OssParams & {
    timeout?: number | undefined;
    maxSize?: number | undefined;
}) => MpOssParams;
export declare const refreshCDNHandle: (oss: OssParams) => void;
export declare const decryptU8arry: (u8arr: Uint8Array) => Uint8Array;
export declare const codeMapHandle: (code: number) => number;
export declare const handleFileOfView: (fileID: string, data: any, obj: any) => void;
