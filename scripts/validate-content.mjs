#!/usr/bin/env node
/**
 * AlertForge content validator + index generator.
 *
 * - Validates every data/techniques/*.json against data/schema.technique.json.
 * - Checks slugs are unique and match the filename.
 * - Regenerates data/index.json (the lightweight browse/search list).
 *
 * Run with:  bun run validate:content   (or: node scripts/validate-content.mjs)
 * Exits non-zero if anything is invalid — so CI fails on a bad technique file.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const DATA_DIR = "data";
const TECH_DIR = join(DATA_DIR, "techniques");
const SCHEMA_PATH = join(DATA_DIR, "schema.technique.json");
const INDEX_PATH = join(DATA_DIR, "index.json");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));
const validate = ajv.compile(schema);

const files = readdirSync(TECH_DIR).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.error("No technique files found in", TECH_DIR);
  process.exit(1);
}

let hadError = false;
const seenSlugs = new Set();
const index = [];

for (const file of files) {
  const path = join(TECH_DIR, file);
  let data;
  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    console.error(`✗ ${file}: invalid JSON — ${e.message}`);
    hadError = true;
    continue;
  }

  // Schema validation
  if (!validate(data)) {
    hadError = true;
    console.error(`✗ ${file}: schema errors:`);
    for (const err of validate.errors) {
      console.error(`    ${err.instancePath || "(root)"} ${err.message}`);
    }
    continue;
  }

  // Slug must match filename and be unique
  const expectedSlug = basename(file, ".json");
  if (data.slug !== expectedSlug) {
    console.error(`✗ ${file}: slug "${data.slug}" does not match filename "${expectedSlug}"`);
    hadError = true;
    continue;
  }
  if (seenSlugs.has(data.slug)) {
    console.error(`✗ ${file}: duplicate slug "${data.slug}"`);
    hadError = true;
    continue;
  }
  seenSlugs.add(data.slug);

  // Add to index
  index.push({
    slug: data.slug,
    title: data.title,
    id: data.id,
    category: data.category,
    tactic: data.attack.tactic,
    difficulty: data.difficulty ?? "intermediate",
    artifactSource: data.artifact.source,
  });

  console.log(`✓ ${file}`);
}

if (hadError) {
  console.error("\nContent validation FAILED.");
  process.exit(1);
}

// Sort index by title for a stable order, then write it
index.sort((a, b) => a.title.localeCompare(b.title));
writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");

console.log(`\n✓ All ${files.length} technique(s) valid. Wrote ${INDEX_PATH} (${index.length} entries).`);
