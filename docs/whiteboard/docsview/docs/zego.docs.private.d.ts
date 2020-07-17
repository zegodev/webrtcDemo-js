/**
 * 私有化 业务
 */
import { UploadDocParams } from './zego.docs.entity';
export declare const uploadDocToSfsByWx: (ctx: any, uploadDocParams: UploadDocParams) => Promise<any>;
export declare const uploadDocToSfsByWeb: (ctx: any, uploadDocParams: UploadDocParams) => Promise<any>;
