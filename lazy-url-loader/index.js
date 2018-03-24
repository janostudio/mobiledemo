
module.exports = function(content){
  //对source进行解析
  // var exports = process(source);
  // return "module.exports = " + exports;
  // if (content.indexOf('__webpack_public_path__') >= 0) {
  //   console.log(content)
  //   content.split
  // }
  const name = this.resourcePath.split('/').pop()

  return `module.exports = "/statics/images/${name}";`
}
