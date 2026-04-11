const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir('src', function(filePath) {
    if (filePath.endsWith('.astro')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/teal-400/g, 'blue-400')
            .replace(/teal-500/g, 'blue-500')
            .replace(/teal-300/g, 'blue-300')
            .replace(/#00f5d4/g, '#60a5fa')
            .replace(/#00c9b1/g, '#3b82f6')
            .replace(/0,245,212/g, '59,130,246')
            .replace(/0, 245, 212/g, '59, 130, 246')
            .replace(/0,201,177/g, '59,130,246')
            .replace(/0, 201, 177/g, '59, 130, 246');
            
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
