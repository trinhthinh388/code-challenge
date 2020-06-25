const fs = require('fs-extra');
const crypto = require('crypto');
const exec = require('child_process').exec;

module.exports = {
    compileCode: (req, res, next) => {
        try{
            const {content} = req.body;
            let command;
            let folder = "/tmp/" + crypto.randomBytes(16).toString('hex');
            fs.mkdirSync(folder);

            if(req.params.language == "javascript"){
                let inputFile = folder + "/main.js";
                fs.writeFileSync(inputFile, content);
                command = `docker run --rm -v ${folder}:${folder} cc_js node ${inputFile} ${folder}/output`;
            }
            else if(req.params.language == "python"){
                let inputFile = folder + "/main.py";
                fs.writeFileSync(inputFile, content);
                command = `docker run --rm -v ${folder}:${folder} cc_python python ${inputFile} ${folder}/output`;
            }
            else if(req.params.language == "cpp"){
                let inputFile = folder + "/main.cpp";
                fs.writeFileSync(inputFile, content);
                command = `docker run --rm -v ${folder}:${folder} cc_gcc g++ ${inputFile} ${folder}/output`;
            }
            else if(req.params.language == "c"){
                let inputFile = folder + "/main.c";
                fs.writeFileSync(inputFile, content);
                command = `docker run --rm -v ${folder}:${folder} cc_gcc g++ ${inputFile} ${folder}/output`;
            }

            if(command == null){
                res.json({
                    stdout: "",
                    error: "The laguage is not supported",
                });
            }

            exec(command, (error, exec_time, stderr)=>{
                let stdout = fs.readFileSync(folder + "/output", 'utf8');
                res.json({
                    stdout: stdout,
                    error: stderr,
                    time: exec_time
                });

                fs.remove(folder, (err) => {});
            });
        }
        catch(err){
            res.status(500).json(err.message);
        }
    } 
}
