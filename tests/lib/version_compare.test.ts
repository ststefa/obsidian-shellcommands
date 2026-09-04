import {
    describe,
    expect,
    it,
} from "vitest";
import {versionCompare} from "../../src/lib/version_compare";

describe("versionCompare", () => {
    it("compares numeric version parts naturally", () => {
        expect(versionCompare("1.10.0", "1.2.0")).toBe(1);
        expect(versionCompare("1.2.0", "1.10.0")).toBe(-1);
        expect(versionCompare("1.2.0", "1.2.0")).toBe(0);
    });

    it("can zero-extend shorter versions", () => {
        expect(versionCompare("1.2", "1.2.0")).toBe(-1);
        expect(versionCompare("1.2", "1.2.0", {zeroExtend: true})).toBe(0);
    });

    it("supports lexicographical suffixes when requested", () => {
        expect(versionCompare("1.2b", "1.2a", {lexicographical: true})).toBe(1);
        expect(versionCompare("1.2b", "1.2a")).toBeNaN();
    });

    it("rejects invalid version parts", () => {
        expect(versionCompare("1..2", "1.2")).toBeNaN();
        expect(versionCompare("1.2-beta", "1.2")).toBeNaN();
    });
});
