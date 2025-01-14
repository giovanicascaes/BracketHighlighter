import * as vscode from 'vscode';
import { bracketHighlightGlobals } from './GlobalsHandler';

export const enum DecorationType {
    SYMBOLS,
    CONTENT
}

export default class DecorationHandler {

    public decorationType: DecorationType;

    constructor(decorationType: DecorationType = DecorationType.CONTENT) {
        this.decorationType = decorationType;
    }

    public getDecorationType(addAnimation?: boolean): vscode.TextEditorDecorationType {
        let decorationOptions;
        if (this.decorationType === DecorationType.CONTENT) {
            decorationOptions = bracketHighlightGlobals.contentDecorationOptions;
        }
        else {
            decorationOptions = bracketHighlightGlobals.symbolDecorationOptions;
        }
        let decorationType: vscode.TextEditorDecorationType = vscode.window.createTextEditorDecorationType({
            color: decorationOptions.color,
            fontWeight: decorationOptions.fontWeight,
            fontStyle: decorationOptions.fontStyle, 
            letterSpacing: decorationOptions.letterSpacing,
            outline: decorationOptions.outline,
            border: decorationOptions.border,
            textDecoration: addAnimation ? 'none; animation-name: var(--bounce-bracket-symbol-animation-name); animation-duration: var(--bounce-bracket-symbol-animation-duration); animation-delay: var(--bounce-bracket-symbol-animation-delay)' : decorationOptions.textDecoration,
            backgroundColor: decorationOptions.backgroundColor,
            overviewRulerLane: vscode.OverviewRulerLane.Left,
            overviewRulerColor: decorationOptions.backgroundColor,
            after: addAnimation ? {
                contentText: '',
                textDecoration: 'none; position: absolute; z-index: -1px; top: 0; margin-left: -8px; z-index: -1; padding: 0 3px 1px 1px; width: 4px; height: calc(100% - 1px); border-radius: 2px; animation-name: var(--bounce-bracket-animation-name); animation-duration: var(--bounce-bracket-animation-duration); animation-delay: var(--bounce-bracket-animation-delay)',
            } : undefined,
        });
        return decorationType;
    }
}