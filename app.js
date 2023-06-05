const fs = require('node:fs/promises');
const path = require('node:path');
const foo = async () => {
    const basePath = path.join(process.cwd(), 'work');

    await fs.mkdir(basePath, {recursive: true});
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    for (const folder of folderNames) {
        const folderPath = path.join(basePath, folder);
        await fs.mkdir(folderPath, {recursive: true});

        for (const file of fileNames) {
            await fs.writeFile(path.join(basePath, file), 'some stuff in file');
        }
    }

    const files = await fs.readdir(basePath);
    for (const file of files) {
        const stat = await fs.stat(path.join(basePath, file));
        console.log(path.join(basePath, file), ' : ', stat.isDirectory() ? 'folder' : 'file');

    }
}
foo();

