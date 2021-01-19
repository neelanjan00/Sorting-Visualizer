export function getBubbleSortAnimations(array: number[]) {
    const animations: any[][] = []
    
    bubbleSort(array, animations)

    return animations;
}

const bubbleSort = (array: number[], animations: any[][]) => {
    const length: number = array.length
    let iters: number = length-1
    while(iters > 0) {
        for(let i = 0; i < iters; ++i) {
            animations.push(["first-comparison", i, i+1])
            animations.push(["second-comparison", i, i+1])
            if(array[i] > array[i+1]) {
                animations.push(["swap", i, array[i+1]])
                animations.push(["swap", i+1, array[i]])
                swap(array, i, i+1)
            }
        }
        iters--
    }
}

const swap = (array: number[], firstIndex: number, secondIndex: number) => {
    let temp: number = array[firstIndex]
    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
}