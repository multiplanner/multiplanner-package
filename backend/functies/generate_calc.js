const fs = await import("fs");
const path = process.cwd();
let sourcecode = "const calculation = process.argv[2]; switch (calculation) {";
for (let s0 = 0; s0 < 10; s0++) {
  sourcecode += `case '${s0}':console.log('${s0}');break;`;
  for (let s1 = 0; s1 < 10; s1++) {
    sourcecode += `case '${s0}+${s1}':console.log('${s0 + s1}');break;`;
  }
}
for (let s0 = 0; s0 < 10; s0++) {
  sourcecode += `case '${s0}':console.log('${s0}');break;`;
  for (let s1 = 0; s1 < 10; s1++) {
    sourcecode += `case '${s0}-${s1}':console.log('${s0 - s1}');break;`;
  }
}
for (let s0 = 0; s0 < 10; s0++) {
  sourcecode += `case '${s0}':console.log('${s0}');break;`;
  for (let s1 = 0; s1 < 10; s1++) {
    sourcecode += `case '${s0}*${s1}':console.log('${s0 * s1}');break;`;
  }
}
for (let s0 = 0; s0 < 10; s0++) {
  sourcecode += `case '${s0}':console.log('${s0}');break;`;
  for (let s1 = 0; s1 < 10; s1++) {
    sourcecode += `case '${s0}/${s1}':console.log('${s0 / s1}');break;`;
  }
}
sourcecode += 'default:console.log("error");break;}';
fs.writeFileSync(path + "/calculator.js", sourcecode);
