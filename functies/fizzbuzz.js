x = NaN === NaN;
Array.prototype.valueOf = () => x+=1
while((i=+[]) < (+true + (+false + "") + (+true + ""))) 
{
        let str = (i % (true + true + true) == false ? 'fiz' : "") +  
        (i % ((+true+(+false+""))/2) == false? 'buzz' : "");
        String(+str) == +{}+'' ? console.log(str) : console.log(i)
}

let f = 0
for(let i=0;i<100;i++){
    let str = (i % 3 == 0 ? 'fiz' : '') + (i % 5 == 0 ? 'buz' : '')
    console.log((str == '' ? i : str))
}

