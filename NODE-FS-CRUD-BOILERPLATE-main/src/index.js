const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	await fs.writeFile(fileName, fileContent);
}

const myFileReader = async (fileName) => {
	const data = await fs.readFile(fileName, "utf-8");
    console.log(data);
}

const myFileUpdater = async (fileName, fileContent) => {
	await fs.appendFile(fileName, fileContent);
    const data = await fs.readFile(fileName, "utf-8");
    console.log(data);
}

const myFileDeleter = async (fileName) => {
	await fs.unlink(fileName);
}

myFileWriter("file1.txt", "This is the first assignment")
    .then(() => myFileReader("file1.txt"))
    .then(() => myFileUpdater("file1.txt", "Some new words"))
    .then(() => myFileDeleter("file1.txt"))
    .catch((error) => console.error(error));
