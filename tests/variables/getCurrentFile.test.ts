import {
    describe,
    expect,
    it,
} from "vitest";
import type {
    App,
    TFile,
} from "obsidian";
import {getCurrentFile} from "../../src/variables/getCurrentFile";

describe("getCurrentFile", () => {
    it("prefers the active editor file over the most recently active file", () => {
        const activeEditorFile = {path: "current.md"} as TFile;
        const recentFile = {path: "previous.md"} as TFile;
        const app = {
            workspace: {
                activeEditor: {
                    file: activeEditorFile,
                },
                getActiveFile: () => recentFile,
            },
        } as App;

        expect(getCurrentFile(app)).toBe(activeEditorFile);
    });

    it("falls back to getActiveFile when there is no active editor file", () => {
        const recentFile = {path: "previous.md"} as TFile;
        const app = {
            workspace: {
                activeEditor: null,
                getActiveFile: () => recentFile,
            },
        } as App;

        expect(getCurrentFile(app)).toBe(recentFile);
    });
});
