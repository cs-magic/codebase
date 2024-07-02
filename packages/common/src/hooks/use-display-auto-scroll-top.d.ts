/**
 * 充分性：在某些场景（比如键盘弹起导致屏幕高度立即被控制减小）下强制自动滚动到顶部
 * 必要性：否则屏幕的中心位置将被偏移，用户体验差
 */
export declare const useDisplayAutoScrollTop: () => void;
