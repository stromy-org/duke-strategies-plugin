/**
 * Workspace v2 — output path resolution for plugin build scripts.
 *
 * Works at any directory depth by walking up to find markers
 * instead of assuming a fixed number of parent levels.
 *
 * Usage (from any build script inside workspace/):
 *   const path = require('path');
 *   let root = __dirname;
 *   while (!require('fs').existsSync(path.join(root, 'package.json'))) root = path.dirname(root);
 *   const { ensureOutputDir } = require(path.join(root, 'src/workspace'));
 *   const outputDir = ensureOutputDir(__dirname);
 */

const path = require('path');
const fs = require('fs');

/**
 * Walk up from startDir to find the repo root (directory containing package.json).
 * Skips node_modules directories.
 */
function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);
  while (dir !== path.dirname(dir)) {
    if (
      fs.existsSync(path.join(dir, 'package.json')) &&
      !dir.includes('node_modules')
    ) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}

/**
 * Walk up from a build script directory to find the project root.
 *
 * The project root is the directory whose child named 'build' contains
 * the build script. Works at any depth:
 *   workspace/build/<deliverable>/                → workspace/
 *   workspace/<project>/build/<deliverable>/      → workspace/<project>/
 */
function resolveProjectRoot(buildDir) {
  let dir = path.resolve(buildDir);
  while (dir !== path.dirname(dir)) {
    const parent = path.dirname(dir);
    if (path.basename(parent) === 'build') {
      return path.dirname(parent);
    }
    dir = parent;
  }
  return path.resolve(buildDir);
}

/**
 * Walk up from startDir to find the workspace/ root directory.
 * Returns null if not inside a workspace tree.
 */
function resolveWorkspaceRoot(startDir) {
  let dir = path.resolve(startDir);
  while (dir !== path.dirname(dir)) {
    if (path.basename(dir) === 'workspace') return dir;
    dir = path.dirname(dir);
  }
  return null;
}

/**
 * Resolve the output directory for a build script.
 *
 * Precedence:
 *   1. options.outputDir (explicit — for external agents)
 *   2. OUTPUT_DIR env var
 *   3. .remotion-project marker → <projectRoot>/out/
 *   4. Convention → <projectRoot>/output/<deliverable>/
 */
function resolveOutputDir(buildDir, options) {
  if (options && options.outputDir) return path.resolve(options.outputDir);
  if (process.env.OUTPUT_DIR) return path.resolve(process.env.OUTPUT_DIR);

  const projectRoot = resolveProjectRoot(buildDir);
  const abs = path.resolve(buildDir);

  if (fs.existsSync(path.join(projectRoot, '.remotion-project'))) {
    return path.join(projectRoot, 'out');
  }

  const parent = path.dirname(abs);
  if (path.basename(parent) === 'build') {
    const deliverable = path.basename(abs);
    return path.join(projectRoot, 'output', deliverable);
  }

  return path.join(projectRoot, 'output');
}

/** Resolve output dir and create it if it doesn't exist. */
function ensureOutputDir(buildDir, options) {
  const dir = resolveOutputDir(buildDir, options);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Resolve full path to an output file. */
function resolveOutputPath(buildDir, filename, options) {
  return path.join(resolveOutputDir(buildDir, options), filename);
}

/** Resolve the intake directory for a project. */
function resolveIntakeDir(buildDir) {
  return path.join(resolveProjectRoot(buildDir), 'intake');
}

module.exports = {
  findRepoRoot,
  resolveProjectRoot,
  resolveWorkspaceRoot,
  resolveOutputDir,
  ensureOutputDir,
  resolveOutputPath,
  resolveIntakeDir,
};
