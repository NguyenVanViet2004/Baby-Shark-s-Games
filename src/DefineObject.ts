interface fontFamily {
  JetBrainsMono_Bold: string;
  JetBrainsMono_Italic: string;
  JetBrainsMono_Medium: string;
  JetBrainsMono_Thin: string;
}

export const FONTFAMILY: fontFamily = {
  JetBrainsMono_Bold: 'JetBrainsMono-Bold',
  JetBrainsMono_Italic: 'JetBrainsMono-Italic',
  JetBrainsMono_Medium: 'JetBrainsMono-Medium',
  JetBrainsMono_Thin: 'JetBrainsMono-Thin',
};

interface colors {
  backGround: string[];
  green: string;
  winGameColor: string[];
  loseGameColor: string[];
  modalBackGroundColor: string;
  light_yellow: string;
  white: string;
}

export const COLORS: colors = {
  backGround: ['#4c669f', '#3b5998', '#192f6a'],
  green: '#2aed2a',
  winGameColor: ['#00b4db', '#FFD700', '#FFA500'],
  loseGameColor: ['#7e3caa', '#ad44a9', '#d74f30'],
  modalBackGroundColor: 'rgba(0, 0, 0, 0.5)',
  light_yellow: '#FFFF00',
  white: '#FFFFFF',
};

// DefineObject.ts
export const initialBoardState: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export const lines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkForWinner = (newBoard: string[][]) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const rowA = Math.floor(a / 3);
    const colA = a % 3;
    const rowB = Math.floor(b / 3);
    const colB = b % 3;
    const rowC = Math.floor(c / 3);
    const colC = c % 3;

    const line = [
      newBoard[rowA][colA],
      newBoard[rowB][colB],
      newBoard[rowC][colC],
    ];
    const lineString = line.join('');
    if (lineString === 'XXX' || lineString === 'OOO') {
      return line[0];
    }
  }
  return null;
};
