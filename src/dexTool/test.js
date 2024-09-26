const number =306763.09
  // 处理小数点后的数字，保留两位小数
  const decimalPart = Math.round((number % 1) * 100) / 100
  let numberPart = Math.floor(number)

  let unit = ''
  if (numberPart >= 1000000000) {
    numberPart /= 1000000000
    unit = 'B' // Billion
  } else if (numberPart >= 1000000) {
    numberPart /= 1000000
    unit = 'M' // Million
  } else if (numberPart >= 1000) {
    numberPart /= 1000
    unit = 'K' // Thousand
  }

  // 处理小数点后为零的情况，避免显示多余的.00
  if (decimalPart === 0) {
    console.log( `${numberPart.toFixed(0)}${unit}`)
  } else {
    // 保留两位小数
    console.log( `${numberPart.toFixed(2)}${unit}`)
  }
