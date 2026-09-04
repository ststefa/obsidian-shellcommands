import {
    describe,
    expect,
    it,
} from "vitest";
import {PowerShellEscaper} from "../../src/variables/escapers/PowerShellEscaper";
import {ShEscaper} from "../../src/variables/escapers/ShEscaper";

describe("shell escapers", () => {
    it("escapes shell-special characters with backslashes for Bourne-style shells", () => {
        expect(new ShEscaper("hello world! $PATH").escape()).toBe("hello\\ world\\!\\ \\$PATH");
    });

    it("turns real newlines into escaped newline literals for Bourne-style shells", () => {
        expect(new ShEscaper("line 1\nline 2\rline 3").escape()).toBe("line\\ 1\\\\nline\\ 2\\\\rline\\ 3");
    });

    it("escapes shell-special characters with backticks for PowerShell", () => {
        expect(new PowerShellEscaper("hello world! $env:PATH").escape()).toBe("hello` world`!` `$env`:PATH");
    });
});
