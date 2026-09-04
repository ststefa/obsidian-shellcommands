import {
    describe,
    expect,
    it,
} from "vitest";
import {escapeRegExp} from "../../src/lib/escapeRegExp";

describe("escapeRegExp", () => {
    it("escapes regular expression metacharacters", () => {
        const escaped = escapeRegExp("hello.*+?^${}()|[]\\world");

        expect(new RegExp("^" + escaped + "$", "u").test("hello.*+?^${}()|[]\\world")).toBe(true);
    });

    it("does not escape ordinary text", () => {
        expect(escapeRegExp("notes/capps concept.md")).toBe("notes/capps concept\\.md");
    });
});
