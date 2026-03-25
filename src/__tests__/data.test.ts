import { describe, it, expect } from "vitest";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";

describe("Data integrity", () => {
  it("experiences should have valid structure", () => {
    expect(experiences.length).toBeGreaterThan(0);
    for (const exp of experiences) {
      expect(exp.id).toBeTruthy();
      expect(exp.company.zh).toBeTruthy();
      expect(exp.company.en).toBeTruthy();
      expect(exp.role.zh).toBeTruthy();
      expect(exp.role.en).toBeTruthy();
      expect(["work", "education"]).toContain(exp.type);
    }
  });

  it("skills should have valid structure", () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const skill of skills) {
      expect(skill.name).toBeTruthy();
      expect(skill.url).toBeTruthy();
      expect(skill.icon).toBeTruthy();
    }
  });

  it("projects should have valid structure", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const proj of projects) {
      expect(proj.id).toBeTruthy();
      expect(proj.title.zh).toBeTruthy();
      expect(proj.title.en).toBeTruthy();
      expect(proj.tags.length).toBeGreaterThan(0);
    }
  });
});
