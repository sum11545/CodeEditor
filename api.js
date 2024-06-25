const express = require('express')
const app = express()
const compiler = require('compilex')
const options = { stats: true }
compiler.init(options)
const bodyparser = require('body-parser')
const port = 3500

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use('/codemirror-5.65.16', express.static("codemirror-5.65.16"))
app.get('/', (req, res) => {
    compiler.flush(function(){
        console.log("Deleted");
    })
    res.sendFile(__dirname + '/mkc.html')
})

app.post('/compile', (req, res) => {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
 console.log(req.body.code);

    try {
     
        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} };
                compiler.compileCPP(envData, code, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }

                });
            } else {
                var envData = { OS: "windows", cmd: "g++" ,options:{timeout:10000} };
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }
                });

            }
        } else if (lang == "Jave") {
            if (!input) {
                 
                var envData = { OS: "windows" };
               

                compiler.compileJava(envData, code, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            } else {
               
                var envData = { OS: "windows" };
                

                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }

        }
        else if(lang == 'Python') {
            if (!input) {

                var envData = { OS: "windows" };

                compiler.compilePython(envData, code, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            } else {

                var envData = { OS: "windows" };


                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);     
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
})
app.listen(port)
