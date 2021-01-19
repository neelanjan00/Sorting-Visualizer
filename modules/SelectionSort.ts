export function getSelectionSortAnimations (array: number[]) {
    const animations: any[][] = []

    selectionSort(array, animations)

    return animations
}

const selectionSort = (array: number[], animations: any[][]) => {
    const length: number = array.length

    for(let i=0; i<length-1; ++i){
        let minIndex: number = i;
        for(let j=i+1; j<length; ++j){
            animations.push(["first-comparison", j, minIndex])
            animations.push(["second-comparison", j, minIndex])
            if (array[j] < array[minIndex]) {
                minIndex = j
            }
        }
        animations.push(["swap", minIndex, array[i]])
        animations.push(["swap", i, array[minIndex]])
        swap(array, minIndex, i)
    }
}

function swap(array: number[], firstIndex: number, secondIndex: number) {
    let temp: number = array[firstIndex]
    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
}