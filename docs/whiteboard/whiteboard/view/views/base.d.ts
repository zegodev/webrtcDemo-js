import { ViewTool, FileInfo } from '../entities/viewEntity';
export declare abstract class WhiteboardView {
    abstract enable(enable: boolean): boolean;
    abstract isEnable(): boolean;
    abstract clear(): void;
    abstract scroll(horizontalPercent: number, verticalPercent: number): void;
    abstract getCurrentScrollPercent(): {
        horizontalPercent: number;
        verticalPercent: number;
    };
    abstract undo(): void;
    abstract redo(): void;
    abstract getAspectRatio(): string;
    abstract getFileInfo(): FileInfo | null;
    abstract getID(): string;
    abstract getName(): string;
    abstract getRoomID(): string;
    abstract getCreateTime(): number;
    abstract getPageCount(): number | undefined;
    abstract setBackgroundColor(color: string): boolean;
    abstract getBackgroundColor(): string;
    abstract setToolType(type: ViewTool | null): boolean;
    abstract getToolType(): ViewTool | null;
    abstract setBrushColor(color: string): boolean;
    abstract getBrushColor(): string;
    abstract setBrushSize(thin: number): boolean;
    abstract getBrushSize(): number;
    abstract setTextSize(thin: number): boolean;
    abstract getTextSize(): number;
    abstract setFontItalic(italic: boolean): boolean;
    abstract isFontItalic(): boolean;
    abstract setFontBold(bold: boolean): boolean;
    abstract isFontBold(): boolean;
}
