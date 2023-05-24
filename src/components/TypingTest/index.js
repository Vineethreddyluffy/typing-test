import {Component} from 'react'

import './index.css'

const complexButtonsList = [
  {
    id: 'EASY',
    name: 'Easy',
    word: 'asf',
  },
  {
    id: 'MEDIUM',
    name: 'Medium',
    word: 'asdf',
  },
  {
    id: 'HARD',
    name: 'Hard',
    word: 'asdfj',
  },
]

const modesList = [
  {
    id: '1',
    name: '1 Minute',
    seconds: '60',
  },
  {
    id: '3',
    name: '3 Minutes',
    seconds: '180',
  },
  {
    id: '5',
    name: '5 Minutes',
    seconds: '300',
  },
]

class TypingTest extends Component {
  state = {
    activeTab: 'EASY',
    activeTab1: '1',
    para: ['asf,asgf,sfg'],
    activeIndex: 0,
    value: '',
    mistakes: 0,
    totalWords: 0,
    accuracy: 0,
    seconds: 60,
    interval: '',
    runner: 0,
    page: 'TRUE',
  }

  componentDidMount() {
    this.paragraph()
  }

  changeButton = event => {
    this.setState({activeTab: event.target.value}, this.paragraph)
  }

  changeMode = event => {
    this.setState({activeTab1: event.target.value}, this.changeSeconds)
  }

  changeSeconds = () => {
    const {activeTab1} = this.state
    const item = modesList.filter(each => each.id === activeTab1)
    this.setState({seconds: item[0].seconds})
  }

  paragraph = () => {
    const {activeTab} = this.state
    const newWord = complexButtonsList.filter(each => each.id === activeTab)
    const {word} = newWord[0]
    const wordOf = [...word]
    const Arr = wordOf.map(() => {
      const newArr = wordOf.map(() => {
        const numberOf = Math.floor(Math.random() * wordOf.length)
        return wordOf[numberOf]
      })
      const array = newArr.join('')
      return {arrayOf: array, isTrue: 'FALSE'}
    })
    this.setState({para: Arr})
  }

  changeInput = event => {
    const {para, activeIndex, mistakes, totalWords} = this.state
    if (para[activeIndex].arrayOf.includes(event.target.value)) {
      const newData = para.map(each => {
        if (para.indexOf(each) === activeIndex) {
          return {arrayOf: each.arrayOf, isTrue: 'TRUE'}
        }
        return each
      })
      this.setState(prevState => ({
        totalWords: prevState.totalWords + 1,
        para: newData,
      }))
    } else {
      const data = para.map(each => {
        if (para.indexOf(each) === activeIndex) {
          return {arrayOf: each.arrayOf, isTrue: 'WRONG'}
        }
        return each
      })
      this.setState(prevState => ({
        mistakes: prevState.mistakes + 1,
        para: data,
      }))
    }
    if (event.keyCode === 32 && activeIndex < para.length) {
      const data = para.map(each => {
        if (para.indexOf(each) === activeIndex && each.isTrue === 'TRUE') {
          return {arrayOf: each.arrayOf, isTrue: 'TRUE'}
        }
        return each
      })
      const correctWords = totalWords - mistakes
      const accuracy = (correctWords * 100) / totalWords
      const accurate = accuracy < 0 ? 0 : Math.ceil(accuracy)
      this.setState(prevState => ({
        mistakes,
        activeIndex: prevState.activeIndex + 1,
        value: '',
        para: data,
        accuracy: accurate,
      }))
    }
    if (activeIndex + 1 === para.length && event.keyCode === 32) {
      this.setState({activeIndex: 0}, this.paragraph())
    }
  }

  changeInputValue = event => {
    this.setState({value: event.target.value})
  }

  tick = () => {
    const {seconds, interval} = this.state
    if (seconds === 1) {
      clearInterval(interval)
      this.setState({page: 'FALSE'})
    }
    this.setState(prevState => ({
      seconds: prevState.seconds - 1,
      runner: prevState.runner + 1,
    }))
  }

  clicked = () => {
    const myInterval = setInterval(this.tick, 1000)
    this.setState({interval: myInterval})
  }

  switchOf = value => {
    switch (value) {
      case 'TRUE':
        return 'para-items1'
      case 'FALSE':
        return 'para-items'
      case 'WRONG':
        return 'wrong-item'
      default:
        return null
    }
  }

  modes = () => {
    const {page} = this.state
    switch (page) {
      case 'TRUE':
        return this.mainPage()
      case 'FALSE':
        return this.resultsPage()
      default:
        return null
    }
  }

  retry = () => {
    this.setState(
      {
        page: 'TRUE',
        activeTab: 'EASY',
        activeTab1: '1',
        para: ['asf,asgf,sfg'],
        activeIndex: 0,
        value: '',
        mistakes: 0,
        totalWords: 0,
        accuracy: 0,
        seconds: 60,
        runner: 0,
      },
      this.paragraph,
    )
  }

  resultsPage = () => {
    const {accuracy, mistakes, runner, totalWords} = this.state
    const wpm = totalWords / (runner / 60)
    const wordsPerMin = totalWords <= 0 ? 0 : Math.floor(wpm)
    return (
      <div className="result-main-cont">
        <div className="result-cont">
          <p className="result-para">Results</p>
          <p className="cheer-para">Challange Yourself! You Can Do Better.</p>
          <div className="lower-cont">
            <div className="sub-cont1">
              <p className="sub-head1">WPM Score</p>
              <p className="sub-para1">{wordsPerMin} WPM</p>
            </div>
            <div className="sub-cont1">
              <p className="sub-head1">Accuracy</p>
              <p className="sub-para1">{accuracy} %</p>
            </div>
            <div className="sub-cont1">
              <p className="sub-head1">Mistakes</p>
              <p className="sub-para1">{mistakes}</p>
            </div>
          </div>
          <button type="button" className="retry-btn" onClick={this.retry}>
            Retry Again
          </button>
        </div>
      </div>
    )
  }

  mainPage = () => {
    const {
      activeTab,
      activeTab1,
      para,
      activeIndex,
      value,
      mistakes,
      accuracy,
      totalWords,
      seconds,
      runner,
    } = this.state
    const wpm = totalWords / (runner / 60)
    const wordsPerMin = totalWords <= 0 ? 0 : Math.floor(wpm)
    return (
      <div className="full-cont">
        <div className="header">
          <img
            src="https://res.cloudinary.com/ddtnmma06/image/upload/v1684854176/logo_lsxyhl.jpg"
            className="image"
            alt="logo"
          />
          <p className="header-para">Typing Test</p>
        </div>
        <div className="bottom-cont">
          <p className="timer-para">Timer: {seconds} s</p>
          <div className="container-cont">
            <div className="sub-cont">
              <p className="sub-head">Accuracy</p>
              <p className="sub-para">{accuracy} %</p>
            </div>
            <div className="sub-cont">
              <p className="sub-head">Words/Min</p>
              <p className="sub-para">{wordsPerMin} WPM</p>
            </div>
            <div className="sub-cont">
              <p className="sub-head">Errors</p>
              <p className="sub-para">{mistakes}</p>
            </div>
          </div>
          <div className="btn-cont">
            <div className="complex-cont">
              <p className="complex-para">complexity</p>
              <ul className="complexity-btns">
                {complexButtonsList.map(each => (
                  <li key={each.id} className="list-item">
                    <button
                      type="button"
                      className={activeTab === each.id ? 'button1' : 'button'}
                      onClick={this.changeButton}
                      value={each.id}
                    >
                      {each.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="complex-cont">
              <p>Modes</p>
              <ul className="complexity-btns">
                {modesList.map(each => (
                  <li key={each.id} className="list-item">
                    <button
                      className={activeTab1 === each.id ? 'button1' : 'button'}
                      type="button"
                      onClick={this.changeMode}
                      value={each.id}
                    >
                      {each.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="card-cont">
            {para.map(item => (
              <li
                key={para.indexOf(item)}
                className={
                  para.indexOf(item) === activeIndex
                    ? 'underlined'
                    : 'not-underlined'
                }
              >
                <p className={this.switchOf(item.isTrue)}>{item.arrayOf}</p>
              </li>
            ))}
          </ul>
          <div className="input-cont">
            <input
              type="text"
              className="input"
              placeholder="Start Typing Here..."
              onKeyUp={this.changeInput}
              onChange={this.changeInputValue}
              onClick={this.clicked}
              value={value}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.modes()}</div>
  }
}
export default TypingTest
