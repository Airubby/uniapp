function nameFilter(s){
	const Name_MAP = {
		1: '巡检',
		2: '其它'
	}
  if (!s) return ''
  let n = parseInt(s);
  return Name_MAP[n];
}
module.exports = {
	nameFilter: nameFilter
}
