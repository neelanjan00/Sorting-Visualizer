export function getQuickSortAnimations(array: number[]) {
    let animations: any[][] = [];

    quickSort(array, 0, array.length-1, animations);

    return animations
}

function quickSort(array: number[], startIndex: number, endIndex: number, animations: any[][]) {
    let pivotIndex: number
    if(startIndex < endIndex) {
        pivotIndex = partitionArray(array, startIndex, endIndex, animations)
        quickSort(array, startIndex, pivotIndex-1, animations)
        quickSort(array, pivotIndex+1, endIndex, animations)
    }
}

function partitionArray(array: number[], startIndex: number, endIndex: number, animations: any[][]) {
    let pivotIndex: number = randomIntFromInterval(startIndex, endIndex)
    
    animations.push(["first-comparison", pivotIndex, endIndex])
    animations.push(["swap", pivotIndex, array[endIndex]])
    animations.push(["swap", endIndex, array[pivotIndex]])
    animations.push(["second-comparison", pivotIndex, endIndex])
    swap(array, pivotIndex, endIndex)

    let lessTailIndex = startIndex

    for(let i=startIndex; i<endIndex; ++i) {
        animations.push(["first-comparison", i, endIndex])
        animations.push(["second-comparison", i, endIndex])
        if(array[i] <= array[endIndex]) {
            animations.push(["first-comparison", i, lessTailIndex])
            animations.push(["swap", i, array[lessTailIndex]])
            animations.push(["swap", lessTailIndex, array[i]])
            animations.push(["second-comparison", i, lessTailIndex])
            swap(array, i, lessTailIndex)
            lessTailIndex++
        }
    }

    animations.push(["first-comparison", lessTailIndex, endIndex])
    animations.push(["swap", endIndex, array[lessTailIndex]])
    animations.push(["swap", lessTailIndex, array[endIndex]])
    animations.push(["second-comparison", lessTailIndex, endIndex])
    
    swap(array, lessTailIndex, endIndex)
    return lessTailIndex
}

function swap(array: number[], firstIndex: number, secondIndex: number) {
    let temp: number = array[firstIndex]
    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}