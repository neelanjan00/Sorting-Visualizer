export function getInsertionSortAnimations(array: number[]) {
    let animations: any[][] = []

    insertionSort(array, animations)

    return animations
}

function insertionSort(array: number[], animations: any[][]) {
    const N = array.length;
    for (let i=1; i<N; i++) {
        let key = array[i]
        let j = i-1
        animations.push(["first-comparison", j, i])
        animations.push(["second-comparison", j, i])
        while(j >= 0 && array[j] > key) {
            animations.push(["overwrite", j+1, array[j]])
            array[j+1] = array[j]
            j = j-1;
            if(j >= 0) {
                animations.push(["first-comparison", j, i])
                animations.push(["second-comparison", j, i])
            }
        }

        animations.push(["overwrite", j+1, key])
        array[j+1] = key
    }
}