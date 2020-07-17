import { Method } from 'axios';
export interface Config {
    appID: number;
    token: string;
    userID: string;
    isTestEnv: boolean;
}
export interface StateCenter {
    appID: number;
    platform: number;
    webToken: string;
    userID: string;
}
export interface QueryByFileParams {
    fileHash: string;
    fileType: FileTypeEnum;
    expectFileType: ExpectFileTypeEnum;
    timeout?: number;
}
export interface QueryByTaskParams {
    taskID: string;
    timeout?: number;
}
export interface OssParams {
    access_key_id: string;
    access_key_secret: string;
    bucket_name: string;
    endpoint: string;
    object_name: string;
    security_token: string;
}
export interface SfsParams {
    token: string;
    expired_timestamp: number;
    api: string;
    object_name: string;
}
export interface CreateCvtParams {
    srcFileUrl?: string;
    fileName: string;
    fileHash: string;
    fileSize: number;
    fileType: FileTypeEnum;
    expectFileType: ExpectFileTypeEnum;
    timeout?: number;
}
export interface CancelCvtParams {
    taskID: string;
    timeout?: number;
}
export interface LoadParams {
    fileID: string;
    timeout?: number;
}
export interface RequestUrls {
    queryStatusUrl: string;
    createCvtUrl: string;
    cancelCvtUrl: string;
    queryUrl: string;
}
export interface CommonMessage {
    code: number;
    message: string;
}
/**
 * 文件当前状态 status
 * 1：未上传
 * 2：已上传
 * 4：排队中
 * 8：转换中
 * 16：转换成功
 * 32：转换失败
 * 64：转换任务已取消
 * 128：密码保护的文档
 * 256：文件内容过大
 * 512：Excel文件标签数过多
 */
export declare enum UploadStatus {
    UPLOADING = 1,
    UPLOADED = 2,
    WAITING = 4,
    CONVERTING = 8,
    CONVERTED = 16,
    CONVERTFAIL = 32
}
export interface StatusInitSub extends StatusUploadSub {
    fileServerProvider: string;
    oss?: OssParams;
    sfs?: SfsParams;
}
export interface StatusUploadSub {
    fileType: FileTypeEnum;
    status: number;
    fileHash: string;
}
export interface StatusTask extends StatusUploadSub {
    taskID: string;
}
export interface StatusLine extends StatusTask {
    queryInterval: number;
}
export declare type StatusConvert = StatusTask;
export interface StatusEnd {
    fileID: string;
    status: number;
}
export interface ReqParams {
    url: string;
    method: Method;
    timeout: number;
    data?: object;
    responseType?: string;
}
export interface MpOssParams {
    url: string;
    signature: string;
    policy: string;
    key: string;
    securityToken: string;
    OSSAccessKeyId: string;
    successActionStatus: string;
    objectName: string;
}
export interface UploadParams {
    file: File | string;
    renderType: RenderTypeEnum;
    onProgress?: Function;
}
export interface UploadProgressParams {
    taskID: string;
    onProgress?: Function;
}
export interface UploadDocParams {
    file: File | string;
    fileServerProvider: string;
    onProgress?: Function;
    oss?: OssParams;
    sfs?: SfsParams;
    fileHash?: string;
}
export declare type UploadResult = StatusEnd;
export interface CreateCvtResult {
    status: number;
    taskID: string;
}
export interface LoadResult {
    pageCount?: number;
    fileUrls: string[];
    notes?: string[];
    fileSize: number;
    fileHash: string;
}
export interface ProgressCvtParams {
    file: File | string;
    fileType: FileTypeEnum;
    fileHash: string;
    expectFileType: ExpectFileTypeEnum;
    statusInitSub?: StatusInitSub;
    onProgress?: Function;
    originReslove?: Function;
    resolve: Function;
    originReject?: Function;
    reject: Function;
}
export interface SucceedAfterParams {
    uploadResult: UploadResult;
    onProgress?: Function;
    originReslove?: Function;
    resolve: Function;
}
export declare enum TXTSuffixEnum {
    TXT = 0,
    MD = 1,
    C = 2,
    CPP = 3,
    H = 4,
    HPP = 5,
    PY = 6,
    JS = 7,
    XML = 8
}
export declare enum IMGSuffixEnum {
    PNG = 0,
    JPEG = 1,
    JPG = 2,
    BMP = 3
}
export declare enum PDFSuffixEnum {
    PDF = 0
}
export declare enum EXCELSuffixEnum {
    XLSX = 0,
    XLS = 1
}
export declare enum WORDSuffixEnum {
    DOC = 0,
    DOCX = 1
}
export declare enum PPTSuffixEnum {
    PPT = 0,
    PPTX = 1
}
export declare enum FileTypeEnum {
    FileTypeUnknown = 0,
    FileTypePPT = 1,
    FileTypeDOC = 2,
    FileTypeELS = 4,
    FileTypePDF = 8,
    FileTypeIMG = 16,
    FileTypeTXT = 32
}
export declare enum ExpectFileTypeEnum {
    FileTypePPT = 1,
    FileTypeDOC = 2,
    FileTypeELS = 4,
    FileTypePDF = 8,
    FileTypeIMG = 16,
    FileTypeTXT = 32,
    FileTypeH5 = 64,
    FileTypeH5PDF = 128,
    FileTypeIMGAndPDF = 256,
    FileTypeDynamicPPTH5 = 512
}
export declare enum RenderTypeEnum {
    RenderTypeVector = 1,
    RenderTypeIMG = 2,
    RenderTypeVectorAndIMG = 3,
    RenderTypeDynamicPPTH5 = 6
}
