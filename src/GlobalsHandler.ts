import * as vscode from 'vscode';
import DecorationHandler, { DecorationOptions } from './DecorationHandler';
import * as ConfigHandler from './ConfigHandler';

enum SearchDirection {
    FORWARDS,
    BACKWARDS
}

export default class GlobalsHandler {

    public configHandler: ConfigHandler.ConfigHandler;

    public decorationStatus: boolean;
    public decorationTypes: Array<vscode.TextEditorDecorationType>;
    public searchDirection: SearchDirection;
    public handleTextSelectionEventActive: boolean;
    public disableTimer: any;
    public highlightRanges: Array<vscode.Range>[];

    /* Config parameters */
    public textColor!: string;
    public blurOutOfScopeText!: boolean;
    public opacity!: string;
    public activeWhenDebugging!: boolean;
    public maxLineSearchCount!: number;
    public decorationOptions!: DecorationOptions;
    public enabledLanguages!: Array<string>;
    public reverseSearchEnabled!: boolean;
    public allowedStartSymbols!: Array<string>;
    public allowedEndSymbols!: Array<string>;
    public highlightScopeFromText!: boolean;
    public extensionEnabled!: boolean;
    public lastSelection!: vscode.Selection | undefined;
    public timeOutValue!: number;
    public ignoreContent!: boolean;


    constructor() {
        this.configHandler = new ConfigHandler.ConfigHandler();
        this.decorationStatus = false;
        this.decorationTypes = [];
        this.searchDirection = SearchDirection.FORWARDS;
        this.handleTextSelectionEventActive = true;
        this.disableTimer = <any>null;
        this.highlightRanges = [];

        this.onConfigChange();
    }

    public onConfigChange() {
        /* Config parameters */
        this.blurOutOfScopeText = this.configHandler.blurOutOfScopeText();
        this.opacity = this.configHandler.getOpacity();
        this.textColor = this.configHandler.getTextColor();
        this.activeWhenDebugging = this.configHandler.activeWhenDebugging();
        this.maxLineSearchCount = this.configHandler.getMaxLineSearchCount();
        this.decorationOptions = this.configHandler.getDecorationOptions();
        this.enabledLanguages = this.configHandler.getEnabledLanguages();
        this.reverseSearchEnabled = this.configHandler.reverseSearchEnabled();
        this.allowedStartSymbols = this.configHandler.getAllowedStartSymbols();
        this.allowedEndSymbols = this.configHandler.getAllowedEndSymbols();
        this.highlightScopeFromText = this.configHandler.highlightScopeFromText();
        this.extensionEnabled = this.configHandler.isExtensionEnabled();
        this.timeOutValue = this.configHandler.getTimeOutValue();
        this.ignoreContent = this.configHandler.ignoreContent();

    }

    public getLongestSymbolLength(): number {
        let longestStartSymbolLength = this.getLongestStartSymbolLength();
        let longestEndSymbolLength = this.getLongestEndSymbolLength();
        return longestStartSymbolLength > longestEndSymbolLength ? longestStartSymbolLength : longestEndSymbolLength;
    }

    public getLongestStartSymbolLength(): number {
        let startSymbols = this.allowedStartSymbols;
        return startSymbols.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
    }
    public getLongestEndSymbolLength(): number {
        let endSymbols = this.allowedEndSymbols;
        return endSymbols.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
    }
}

var bracketHighlightGlobals: GlobalsHandler = new GlobalsHandler();

export { bracketHighlightGlobals, SearchDirection };