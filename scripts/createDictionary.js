const fs = require('fs')

try {
    const args = process.argv.slice(2)
    if (!fs.existsSync(args[0])) {
        try {
            fs.writeFile(args[0], '', function(err) {
                if (err) throw err;
                console.log("File " + args[0] + " created successfully.");
            });
        } catch (err) {
            console.error("Error searching for file " + args[0] + ".")
        }
    } else {
        console.log("File " + args[0] + " already exists.");
    }
} catch (err) {
    console.error("Error searching for file " + args[0] + ".")
}