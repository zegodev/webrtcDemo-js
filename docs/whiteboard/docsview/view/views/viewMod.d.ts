import { ZegoDocsViewServiceBase } from '../services/base';
export declare class ZegoDocsView {
    private serviceHandle;
    private parent;
    private id;
    private drawMode;
    private viewInfo;
    private fileInfo;
    private virtualPageCache;
    private virtualPageAspecCache;
    private dividingLineMap;
    constructor(serviceHandle: ZegoDocsViewServiceBase, parent: string, viewID: string);
    private setParentWidthHeight;
    private drawDividingLine;
    private drawImg;
    private getDocsViewDomId;
    private getIFrameId;
    private getCanvasId;
    private createDocsViewParentIfNeeded;
    private updateDocsViewParentLayout;
    private hideOtherDocsViewParent;
    private drawImgByPath;
    private drawImgByVPageList;
    private drawHtmlByVPageList;
    private getAllVirtualInPageRange;
    private startGetImageByVirtualPageList;
    private sortVirtualPageListRule;
    private getImageByVirtualPageList;
    private getPageNumberByYPos;
    private getHeightByPage;
    private execScrollFileAndDraw;
    private loadCurrentSheet;
    private init;
    private handleScroll;
    private getScrollTopByPage;
    /**
     * 页码计算方式
     * 滚动时：第一页占上半部分，第二页占下半部分时，视为第二页
     * 切页码：第一页完全离开时，视为第二页
     *
     */
    private getPageByScrollTop;
    /**
     * postMessage 和 iframe 通信，需要文件服务器支持跨域 Access-Control-Allow-Origin
     * @param action 调用 iframe 的方法
     * @param args 方法的参数
     *
     * gotoPage 页码从0开始
     */
    private postMessage2iframe;
    private handlePageChange;
    setSheetName(name: string): void;
    /**
     * 加载文件
     */
    loadFile(fileID: string, authKey: string): Promise<any>;
    /**
     * 获取文件内容宽高
     */
    getContentSize(): {
        width: number;
        height: number;
    };
    /**
     * 获取视口宽高
     */
    getVisibleSize(): {
        width: number;
        height: number;
    };
    /**
     * 获取当前视图对应的 fileID
     */
    getFileID(): string;
    /**
     * 获取当前视图加载的文件的 fileType
     */
    getFileType(): number;
    /**
     * 获取当前视图视口中线位置所在的页码，页码从1开始
     */
    getCurrentPage(): number;
    /**
     * 获取当前已加载文件的总页数
     */
    getPageCount(): number;
    /**
     * 获取纵向偏移百分比
     */
    getVerticalPercent(): number;
    /**
     * 滚动到纵向偏移百分比 0-1
     */
    scrollTo(percent: number): void;
    /**
     *  跳转到目标页，从1开始
     */
    flipPage(page: number): void;
    /**
     * 动画上一步，仅针对动态PPT
     */
    previousStep(): void;
    /**
     * 动画下一步，仅针对动态PPT
     */
    nextStep(): void;
    /**
     * 切换 Excel sheet
     */
    loadSheet(index: number): void;
    /**
     * 上一页
     */
    private previousPage;
    /**
     * 下一页
     */
    private nextPage;
}
