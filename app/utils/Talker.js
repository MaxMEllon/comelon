'use strict';

import Itako from 'itako';
import ItakoTextReaderSpeechSynthesis from 'itako-text-reader-speech-synthesis';

let reader = new ItakoTextReaderSpeechSynthesis('text', {
  volume: 1,
  pitch: 1,
  speed: 1,
  lang: 'ja-JP',
  speaker: 'Kyoko'
});

let itako = new Itako([reader]);

export default itako;
