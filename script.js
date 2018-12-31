/* global document */

const answer = ['C 3', 'A 3', 'A 3', 'G 3', 'A 3', 'F 3', 'C 3', 'C 3', 'C 3', 'A 3', 'A 3', 'A# 3', 'G 3', 'C 4']
let correct = 0

const piano = Synth.createInstrument('piano');

const showMap = () => {
  removeListeners()
  const img = document.createElement('img')
  const keyboard = document.getElementById('keyboard')
  const parent = document.getElementById('mapHolder')
  img.id = 'map'
  document.body.removeChild(keyboard)
  parent.appendChild(img)
  img.classList.add('showed')
}

const addListeners = () => {
  [ ...document.querySelectorAll('.key')].map(el =>
    el.addEventListener('click', keyHandler)
  )  
  window.addEventListener('keypress', keyPressHandler)
}  

const removeListeners = () => {
  [ ...document.querySelectorAll('.key')].map(el =>
    el.removeEventListener('click', keyHandler)
  )  
  window.removeEventListener('keypress', keyPressHandler)
}  

const getNoteAndOctave = str => {
  const note = str.split(' ')[0]
  const octave = +(str.split(' ')[1])

  return [note, octave]
}

const checkAnswer = key => {
  if (key === answer[correct]) {
    if (correct === answer.length - 1) {
      correct = 0
      showMap()
    } else {
      correct += 1
    }
  } else {
    correct = 0
  }
}

const playNote = (note, octave) => {
  checkAnswer(`${note} ${octave}`)
  piano.play(note, octave, 2)
}

const keyHandler = e => {
  const raw = e.target.id
  const [note, octave] = getNoteAndOctave(raw)
  playNote(note, octave)
}

const keyPressHandler = e => {
  const keyCodeNotes = {
    'KeyQ': 'C 3',
    'KeyW': 'D 3',
    'KeyE': 'E 3',
    'KeyR': 'F 3',
    'KeyT': 'G 3',
    'KeyY': 'A 3',
    'KeyU': 'B 3',
    'KeyZ': 'C 4',
    'KeyX': 'D 4',
    'KeyC': 'E 4',
    'KeyV': 'F 4',
    'KeyB': 'G 4',
    'KeyN': 'A 4',
    'KeyM': 'B 4',
    'Digit1': 'C# 3',
    'Digit2': 'D# 3',
    'Digit3': 'F# 3',
    'Digit4': 'G# 3',
    'Digit5': 'A# 3',
    'Digit6': 'C# 4',
    'Digit7': 'D# 4',
    'Digit8': 'F# 4',
    'Digit9': 'G# 4',
    'Digit0': 'A# 4',
  }
  const raw = keyCodeNotes[e.code]
  if (raw) {
    const [note, octave] = getNoteAndOctave(raw)
    playNote(note, octave)
  }
}

addListeners()
