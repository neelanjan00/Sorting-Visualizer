import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { getMergeSortAnimations } from '../modules/MergeSort'
import { getBubbleSortAnimations } from '../modules/BubbleSort'
import { getSelectionSortAnimations } from '../modules/SelectionSort'
import { getInsertionSortAnimations } from '../modules/InsertionSort'
import { getQuickSortAnimations } from '../modules/QuickSort'
import Footer from '../pages/Footer/footer'

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const PRIMARY_COLOR = '#4A148C';
const SECONDARY_COLOR = '#F4511E';

const Home = () => {

  const [array, setArray] = useState([])
  const [arraySizeInput, setArraySizeInput] = useState(70)
  const [animationSpeed, setAnimationSpeed] = useState(4)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    createRandomizedArray()
  }, [arraySizeInput])

  const createRandomizedArray = () => {
    let array: number[] = [];

    for (let i = 0; i < arraySizeInput; ++i) {
      array.push(randomIntFromInterval(5, 500))
    }

    setArray(array)
  }

  const lockControlButtons = () => {
    let controlButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('control-elements');

    Array.from(controlButtons).forEach((button: HTMLButtonElement) => {
      button.disabled = true
    });
  }

  const releaseControlButtons = () => {
    let controlButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('control-elements');

    Array.from(controlButtons).forEach((button: HTMLButtonElement) => {
      button.disabled = false
    });
  }

  const startSortingAnimation = (sortingAnimationSelector: (array: number[]) => any) => {
    lockControlButtons()
    const animations = sortingAnimationSelector(array)
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i][0] == "first-comparison" || animations[i][0] == "second-comparison"
      const arrayBars: any = document.getElementsByClassName('array-bar')
      if (isColorChange === true) {
        const [comparision, barOneIndex, barTwoIndex] = animations[i]
        const color = (comparision == "first-comparison") ? SECONDARY_COLOR : PRIMARY_COLOR
        const barOneStyle = arrayBars[barOneIndex].style
        const barTwoStyle = arrayBars[barTwoIndex].style
        if (i === animations.length - 1 || i === animations.length - 2 || i === animations.length - 3) {
          setTimeout(() => {
            releaseControlButtons()
            barOneStyle.backgroundColor = color
            barTwoStyle.backgroundColor = color
          }, i * animationSpeed)
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = color
            barTwoStyle.backgroundColor = color
          }, i * animationSpeed)
        }
      } else {
        const [temp, barIndex, newHeight] = animations[i]
        const barStyle = arrayBars[barIndex].style
        setTimeout(() => {
          barStyle.height = `${newHeight}px`
        }, i * animationSpeed)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Sort Visualizer</title>
      </Head>

      <div className="container-fluid">
        <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Sorting Visualizer</h1>
        <div className={`${styles.ArrayContainer} mt-5`}>
          <div>
            {array.map((value, idx) => <div className={`${styles.ArrayBar} array-bar`} key={idx} style={{height: `${value}px`}} />)}
          </div>
        </div>
        <div>
          <div className="col-sm-6 offset-sm-3 col-12 offset-0">
            <form className="mt-5">
              <div className="form-group">
                <h6 style={{ textAlign: 'center' }}>Number of Elements</h6>
                <input type="range" id="arraySize"
                  className="form-control-range control-elements"
                  min="50" max={`${Math.floor((screenWidth - 45) / 4)}`}
                  value={`${arraySizeInput}`}
                  onChange={(e: any) => setArraySizeInput(e.target.value)} />
              </div>
            </form>
            <form className="mt-5">
              <div className="form-group">
                <h6 style={{ textAlign: 'center' }}>Animation Speed</h6>
                <input type="range" id="animationSpeed"
                  className="form-control-range control-elements"
                  min="1" max="5"
                  value={`${6 - animationSpeed}`}
                  onChange={(e: any) => setAnimationSpeed(6 - e.target.value)} />
              </div>
            </form>
          </div>
          <div className="mt-5" style={screenWidth > 631 ? { alignItems: 'center', justifyContent: 'center', display: 'flex' } : { display: 'block' }}>
            <button
              onClick={() => { startSortingAnimation(getBubbleSortAnimations) }}
              style={{ backgroundColor: '#673ab7', color: 'white', boxShadow: 'none' }}
              className="mt-1 mr-1 btn control-elements col-12 col-sm-auto">Bubble Sort</button>
            <button
              onClick={() => startSortingAnimation(getSelectionSortAnimations)}
              style={{ backgroundColor: '#673ab7', color: 'white', boxShadow: 'none' }}
              className="mt-1 mr-1 btn control-elements col-12 col-sm-auto">Selection Sort</button>
            <button
              onClick={() => startSortingAnimation(getInsertionSortAnimations)}
              style={{ backgroundColor: '#673ab7', color: 'white', boxShadow: 'none' }}
              className="mt-1 mr-1 btn control-elements col-12 col-sm-auto">Insertion Sort</button>
            <button
              onClick={() => startSortingAnimation(getMergeSortAnimations)}
              style={{ backgroundColor: '#673ab7', color: 'white', boxShadow: 'none' }}
              className="mt-1 mr-1 btn control-elements col-12 col-sm-auto">Merge Sort</button>
            <button
              onClick={() => startSortingAnimation(getQuickSortAnimations)}
              style={{ backgroundColor: '#673ab7', color: 'white', boxShadow: 'none' }}
              className="mt-1 mr-1 btn control-elements col-12 col-sm-auto">Quick Sort</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home