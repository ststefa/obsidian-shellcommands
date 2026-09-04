import {
    describe,
    expect,
    it,
    vi,
} from "vitest";
import type {
    App,
    TFile,
    TFolder,
} from "obsidian";
import type {Shell} from "../../src/shells/Shell";
import {parseCurrentFileVariablesSynchronously} from "../../src/variables/parseCurrentFileVariablesSynchronously";

vi.mock("obsidian", () => {
    return {
        normalizePath: (path: string) => path.replace(/\\/gu, "/"),
    };
});

describe("parseCurrentFileVariablesSynchronously", () => {
    it("quotes current file variables for command palette display without shell escaping", () => {
        const app = createApp(createFile("notes/capps concept.md"));
        const shell = createShell();

        expect(parseCurrentFileVariablesSynchronously(app, shell, "ocli resets {{file_path:relative}}"))
            .toBe("ocli resets \"notes/capps concept.md\"");
    });

    it("uses the active editor file instead of the most recently active file", () => {
        const activeFile = createFile("current note.md");
        const staleFile = createFile("stale note.md");
        const app = createApp(activeFile, staleFile);
        const shell = createShell();

        expect(parseCurrentFileVariablesSynchronously(app, shell, "{{file_name}}"))
            .toBe("\"current note.md\"");
    });

    it("keeps unsupported arguments unchanged", () => {
        const app = createApp(createFile("notes/capps concept.md"));
        const shell = createShell();

        expect(parseCurrentFileVariablesSynchronously(app, shell, "{{file_path:unknown}}"))
            .toBe("{{file_path:unknown}}");
    });

    it("quotes folder variables", () => {
        const app = createApp(createFile("notes/capps concept.md"));
        const shell = createShell();

        expect(parseCurrentFileVariablesSynchronously(app, shell, "{{folder_name}} {{folder_path:relative}}"))
            .toBe("\"notes\" \"notes\"");
    });
});

function createApp(activeEditorFile: TFile | null, activeFile: TFile | null = activeEditorFile): App {
    return {
        vault: {
            getName: () => "Test Vault",
        },
        workspace: {
            activeEditor: activeEditorFile
                ? {file: activeEditorFile}
                : null,
            getActiveFile: () => activeFile,
        },
    } as App;
}

function createFile(path: string): TFile {
    const parts = path.split("/");
    const name = parts[parts.length - 1];
    const extension = name.includes(".") ? name.split(".").pop() as string : "";
    const basename = extension ? name.slice(0, -extension.length - 1) : name;
    const folderPath = parts.slice(0, -1).join("/");
    return {
        path,
        name,
        basename,
        extension,
        parent: createFolder(folderPath),
    } as TFile;
}

function createFolder(path: string): TFolder {
    return {
        path,
        name: path.split("/").pop() ?? "",
        isRoot: () => path === "",
    } as TFolder;
}

function createShell(): Shell {
    return {
        translateRelativePath: (path: string) => path,
        translateAbsolutePath: (path: string) => path,
        escapeValue: (value: string) => "escaped(" + value + ")",
    } as Shell;
}
