import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = `Sorry, it seems that you forgot to enter text.`;
  sentencesToShow: string[][];
  showXML: boolean;
  showCSV: boolean;
  maxSentenceLength: number;

  private static splitTextToSentences(text: string): string[] {
    return text
      .replace(/\n | \s\s+/g, ' ')
      .trim()
      .replace(/[,"'\/#$%^&\*;:{}=_–`~<>()]|(\s)-(\s)/g, '')
      .replace(/[!+|?|.{2,}]/g, '.')
      .split('.')
      .filter(sentence => sentence);
  }

  private static splitSentencesToWords(sentences: string[]): string[][] {
    return sentences.map(sentence => sentence
      .trim()
      .split(' ')
      .filter(word => word)
      .sort((a, b) => a.localeCompare(b)));
  }

  private prepareSentences(text: string): void {
    const sentences: string[] = AppComponent.splitTextToSentences(text);
    const sentencesByWords: string[][] = AppComponent.splitSentencesToWords(sentences);
    this.sentencesToShow = sentencesByWords;
    let maxSentenceLength = 0;

    for (const sentence of sentencesByWords) {
      if (sentence.length > maxSentenceLength) {
        maxSentenceLength = sentence.length;
      }
    }

    this.maxSentenceLength = maxSentenceLength;
  }

  toggleXML(text: string): void {
    if (!text) {
      alert(this.message);
      return;
    }

    this.prepareSentences(text);

    this.showXML = !this.showXML;
  }

  toggleCSV(text: string): void {
    if (!text) {
      alert(this.message);
      return;
    }

    this.prepareSentences(text);

    this.showCSV = !this.showCSV;
  }

  clearResult(): void {
    this.sentencesToShow = [];
    this.showCSV = false;
    this.showXML = false;
    this.maxSentenceLength = 0;
  }

  paste(e): void {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }
}
