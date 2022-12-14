import { join } from "path";
import { readdir, stat, writeFile } from "fs/promises";

const __dirname = join(new URL(".", import.meta.url).pathname, "docs");

const files = await getJSON(__dirname);
await writeFile(
  join(__dirname, "full.json"),
  JSON.stringify(files, undefined, 2)
);

await writeFile(
  join(__dirname, "jdx.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/format/jdx/")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "biologic.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/format/biologic/")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "bigmap.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/format/biologic/jdb")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "uvvis.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/cary500")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "hplc.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/agilent-hplc")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "gcms.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/agilent-gcms")),
    undefined,
    2
  )
);

await writeFile(
  join(__dirname, "mass.json"),
  JSON.stringify(
    files.filter((file) => file.relativePath.includes("/measurement/mass")),
    undefined,
    2
  )
);

async function getJSON(basedir) {
  let files = [];
  await appendFiles(files, basedir, "data");
  files.forEach((file) => {
    file.relativePath = file.relativePath.replace(/.*__tests__\//, "");
  });
  return files;
}

async function appendFiles(files, basedir, currentDir) {
  const entries = (await readdir(join(basedir, currentDir))).filter(
    (entry) => !entry.startsWith(".")
  );
  for (let entry of entries) {
    const current = join(currentDir, entry);
    const currentPath = join(basedir, current);
    const info = await stat(currentPath);

    if (info.isDirectory()) {
      await appendFiles(files, basedir, current);
    } else {
      files.push({
        name: entry,
        size: info.size,
        relativePath: current,
        lastModified: Math.round(info.mtimeMs),
      });
    }
  }
}
