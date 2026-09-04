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
    App,
    Hotkey,
} from "obsidian";

export interface AppWithHotkeyManager extends App {
    hotkeyManager?: {
        customKeys?: Record<string, Hotkey[]>,
    },
}

export interface AppWithPluginManager extends App {
    plugins?: {
        disablePlugin(plugin_id: string): Promise<void>,
    },
}

export interface AppWithSettings extends App {
    setting?: {
        openTabById?(tab_id: string): unknown,
        settingTabs?: PrivateSettingTab[],
    },
}

export interface PrivateSettingTab {
    id: string,
    searchComponent?: {
        inputEl: HTMLInputElement,
    },
    updateHotkeyVisibility?(): void,
}

export interface AppWithInternalPlugins extends App {
    internalPlugins?: {
        plugins?: {
            workspaces?: {
                enabled: boolean,
                instance?: {
                    activeWorkspace?: string,
                },
            },
        },
    },
}
