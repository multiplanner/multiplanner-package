const fs = await import('fs')
const path = process.cwd()

const maxloops = 2
const operators = ["+", "-", "*", "/"] //can't be used together in end result

let sourcecode = `const fs = await import('fs');const path = process.cwd();let sourcecode = "const calculation = process.argv[2]; switch (calculation) {";`

operators.forEach(operator => {
    let sumtemplate = ""
    let answertemplate = "${"
    
    for (let i=0; i < maxloops; i++){
        let varname = "s" + i
    
        sourcecode += `for (let ${varname} = 0; ${varname} < 10; ${varname}++){`
        
        sumtemplate += "${" + varname + "}" + operator
        answertemplate += varname + operator
    
        let usumtemplate = sumtemplate.slice(0, -1)
        let uanswertemplate = answertemplate.slice(0, -1) + "}"
    
        sourcecode += "sourcecode += `case '" + usumtemplate + "':console.log('" + uanswertemplate + "');break;`;"
    }
    
    for (let i=0; i < maxloops; i++){
        sourcecode += `}`
    }
})

sourcecode += `sourcecode += 'default:console.log("error");break;}';fs.writeFileSync(path + "/calculator.js", sourcecode)`

fs.writeFileSync(path + "/generate_calc.js", sourcecode)