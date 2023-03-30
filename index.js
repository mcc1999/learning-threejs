const arr = [
  '01-basic_01-main', '01-basic_02-main',
  '01-basic_03-main', '01-basic_04-main',
  '01-basic_05-main', '01-basic_06-main',
  '01-basic_07-main', '01-basic_08-main',
  '01-basic_09-main', '02-Mesh_01-main',
  '02-Mesh_02-main',  '02-Mesh_03-main',
  '02-Mesh_04-main',  '02-Mesh_05-main',
  '02-Mesh_06-main',  '02-Mesh_07-main',
  '02-Mesh_08-main',  '02-Mesh_09-main',
  '02-Mesh_10-main',  '02-Mesh_11-main',
  '02-Mesh_12-main',  '02-Mesh_13-main',
  '02-Mesh_14-main',  '02-Mesh_15-main',
  '03-light_01-main', '03-light_02-main',
  '03-light_03-main', '03-light_04-main'
]
let res = arr.reduce((pre,cur, curIndex) => {
  let a = ''
  if(curIndex === 1) {
    a = `${pre}: /src/pages/${pre}.html;\n ` + `${cur}: /src/pages/${cur}.html;\n `
    return a
  }
  a = pre + `${cur}: /src/pages/${cur}.html;\n `
  return a
})