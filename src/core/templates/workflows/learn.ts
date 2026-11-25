import type { SkillTemplate, CommandTemplate } from '../types.js';

function getLearnInstructions(): string {
  return `Help the user learn from a specific piece of completed work. This is an opt-in learning review, not a code review or an implementation workflow. It works with or without an OpenSpec change.

**Scope**

- Use the user's specified change, PR, commit range, or files. Otherwise use the current conversation and inspect Git status and history to identify the work. Include relevant committed and uncommitted changes, including untracked files when appropriate.
- If the scope or comparison base is unclear, ask the user. Do not assume the last commit or default branch represents their work, and do not include unrelated changes.
- Read the actual diff and relevant surrounding code, tests, and available design context. If the work was done in another worktree, inspect that worktree or its branch when available. If evidence is unavailable, explain what is missing instead of guessing.

**Teach**

- Briefly summarize the work, then select at most three genuinely useful lessons grounded in it. Prefer surprising tradeoffs, debugging insights, design decisions, and reusable patterns over basic or generic explanations.
- For each lesson, cite specific files and lines, explain the problem and why the solution matters, and describe a meaningful alternative or limitation when supported by evidence. Distinguish observed facts from inference; do not invent the author's reasoning.
- If there is no worthwhile lesson or insufficient evidence, say so. Do not pad the answer.

**Optional Obsidian note**

- Do not write to a vault unless the user explicitly asks for a note.
- Choose the vault path in this order: the path supplied by the user; \`learn.obsidianVaultPath\` in the working project's \`openspec/config.yaml\`; \`OPENSPEC_OBSIDIAN_VAULT\`; then ask the user. Never guess it.
- If no path was supplied, locate the working project's config from the work being reviewed, not an unrelated store or worktree. If no project config exists, continue without one. When only \`openspec/config.yml\` exists, use it; when both exist, use \`config.yaml\`.
- The configured path must be a non-empty string. Resolve a relative configured path from the directory containing \`openspec/\`. If the selected config cannot be read or parsed, or the configured field is invalid, report the problem and ask rather than silently using another path.
- Check that the selected vault directory exists and is accessible. Report errors and ask for another path; do not create or guess a vault.
- When a note is requested, inspect relevant existing notes to avoid duplication. Present the proposed note and destination, then wait for explicit approval before creating or modifying a file. Never overwrite an existing note without approval; report access errors instead of claiming success.
- Keep the note focused on the selected lessons, with useful context and references. Do not include secrets or sensitive project details.

Do not modify code or OpenSpec artifacts as part of this review.`;
}

export function getLearnSkillTemplate(): SkillTemplate {
  return {
    name: 'openspec-learn',
    description: 'Learn from a specific completed change or fix. Use only when the user explicitly asks for a learning review, says "openspec learn", or says "opsx learn".',
    instructions: getLearnInstructions(),
    license: 'MIT',
    compatibility: 'Works with or without an OpenSpec change.',
    metadata: { author: 'openspec', version: '1.0' },
  };
}

export function getOpsxLearnCommandTemplate(): CommandTemplate {
  return {
    name: 'OPSX: Learn',
    description: 'Learn from a completed change',
    category: 'Workflow',
    tags: ['workflow', 'learning'],
    content: getLearnInstructions(),
  };
}
