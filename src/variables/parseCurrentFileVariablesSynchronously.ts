/*
 * 'Shell commands' plugin for Obsidian.
 * Copyright (C) 2021 - 2025 Jarkko Linnanvirta
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.0 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact the author (Jarkko Linnanvirta): https://github.com/Taitava/
 */

import {
    normalizePath,
} from "obsidian";
import type {
    App,
    TFile,
    TFolder,
} from "obsidian";
import {Shell} from "../shells/Shell";
import {getCurrentFile} from "./getCurrentFile";

export function parseCurrentFileVariablesSynchronously(app: App, shell: Shell, content: string): string {
    const currentFile = getCurrentFile(app);
    if (!currentFile) {
        return content;
    }

    const currentFolder = currentFile.parent;
    return content.replace(/\{\{(!?)(title|file_name|file_path|file_extension|file_uri|folder_name|folder_path)(?::([^}]*))?\}\}/giu, (occurrence, _noEscaping: string, variableName: string, rawArgument: string | undefined): string => {
        const argument = rawArgument?.toLowerCase();
        let value: string | null = null;

        switch (variableName.toLowerCase()) {
            case "title":
                value = currentFile.basename;
                break;
            case "file_name":
                value = currentFile.name;
                break;
            case "file_path":
                value = argument === "absolute" || argument === "relative"
                    ? getFilePath(app, shell, currentFile, argument)
                    : null;
                break;
            case "file_extension":
                value = argument === "with-dot" || argument === "no-dot"
                    ? getFileExtension(currentFile, argument === "with-dot")
                    : null;
                break;
            case "file_uri":
                value = "obsidian://vault/" + encodeURIComponent(app.vault.getName()) + "/" + encodeURIComponent(normalizePath(currentFile.path));
                break;
            case "folder_name":
                value = currentFolder
                    ? currentFolder.isRoot() ? "." : currentFolder.name
                    : null;
                break;
            case "folder_path":
                value = currentFolder && (argument === "absolute" || argument === "relative")
                    ? getFolderPath(app, shell, currentFolder, argument)
                    : null;
                break;
        }

        if (null === value) {
            return occurrence;
        }
        return quotePreviewValue(value);
    });
}

function getFilePath(app: App, shell: Shell, file: TFile, mode: "absolute" | "relative"): string | null {
    switch (mode) {
        case "absolute": {
            const vaultPath = getVaultPath(app);
            return vaultPath
                ? shell.translateAbsolutePath(vaultPath + "/" + file.path)
                : null;
        }
        case "relative":
            return shell.translateRelativePath(file.path);
    }
}

function getFolderPath(app: App, shell: Shell, folder: TFolder, mode: "absolute" | "relative"): string | null {
    switch (mode) {
        case "absolute": {
            const vaultPath = getVaultPath(app);
            return vaultPath
                ? shell.translateAbsolutePath(vaultPath + "/" + folder.path)
                : null;
        }
        case "relative":
            return folder.isRoot()
                ? "."
                : shell.translateRelativePath(folder.path);
    }
}

function getFileExtension(file: TFile, withDot: boolean): string {
    if (!withDot || file.extension.length === 0) {
        return file.extension;
    }
    return "." + file.extension;
}

function getVaultPath(app: App): string | null {
    const adapter = app.vault.adapter as { getBasePath?: () => string };
    return typeof adapter.getBasePath === "function"
        ? adapter.getBasePath()
        : null;
}

function quotePreviewValue(value: string): string {
    return "\"" + value.replace(/"/gu, "\\\"") + "\"";
}
