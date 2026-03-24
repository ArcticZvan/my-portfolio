import { describe, it, expect } from "vitest";
import zhMessages from "@/i18n/zh.json";
import enMessages from "@/i18n/en.json";

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys.push(...getKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe("i18n translations", () => {
  it("zh and en should have the same keys", () => {
    const zhKeys = getKeys(zhMessages).sort();
    const enKeys = getKeys(enMessages).sort();
    expect(zhKeys).toEqual(enKeys);
  });

  it("no translation values should be empty", () => {
    const zhKeys = getKeys(zhMessages);
    for (const key of zhKeys) {
      const parts = key.split(".");
      let value: unknown = zhMessages;
      for (const part of parts) {
        value = (value as Record<string, unknown>)[part];
      }
      expect(value, `zh.${key} should not be empty`).toBeTruthy();
    }

    const enKeys = getKeys(enMessages);
    for (const key of enKeys) {
      const parts = key.split(".");
      let value: unknown = enMessages;
      for (const part of parts) {
        value = (value as Record<string, unknown>)[part];
      }
      expect(value, `en.${key} should not be empty`).toBeTruthy();
    }
  });
});
