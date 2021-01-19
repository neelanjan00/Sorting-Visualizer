export function getMergeSortAnimations(array: number[]) {
  let animations: any[][] = []

  mergeSort(array, 0, array.length-1, animations)

  return animations
}

function mergeSort(array: number[], startIndex: number, endIndex: number, animations: any[][]) {
  if(startIndex === endIndex)
      return
  const middleIndex: number = Math.floor((startIndex+endIndex)/2)
  mergeSort(array, startIndex, middleIndex, animations)
  mergeSort(array, middleIndex + 1, endIndex, animations)
  merge(array, startIndex, middleIndex, endIndex, animations)
}

function merge(array: number[], startIndex: number, middleIndex: number, endIndex: number, animations: any[][]) {
  let sortArray = []
  let i = startIndex
  let j = middleIndex + 1

  while(i <= middleIndex && j <= endIndex) {
      animations.push(["first-comparison", i, j])
      animations.push(["second-comparison", i, j])
      if(array[i] <= array[j]) {
          sortArray.push(array[i++])
      }
      else {
          sortArray.push(array[j++])
      }
  }

  while(i <= middleIndex) {
      animations.push(["first-comparison", i, i])
      animations.push(["second-comparison", i, i])
      sortArray.push(array[i++])
  }

  while(j <= endIndex) {
      animations.push(["first-comparison", j, j])
      animations.push(["second-comparison", j, j])
      sortArray.push(array[j++])
  }

  for(let i = startIndex; i <= endIndex; i++) {
      animations.push(["first-comparison", i, i-startIndex])
      animations.push(["overwrite", i, sortArray[i-startIndex]])
      animations.push(["second-comparison", i, i-startIndex])
      array[i] = sortArray[i-startIndex]
  }
}