export const editorHeadingIcons = [
  {
    iconName: 'HeadingOneIcon',
    style: 'heading',
    method: 'toggleHeading',
    level: { level: 1 },
  },
  {
    iconName: 'HeadingTwoIcon',
    style: 'heading',
    method: 'toggleHeading',
    level: { level: 2 },
  },
  {
    iconName: 'HeadingThreeIcon',
    style: 'heading',
    method: 'toggleHeading',
    level: { level: 3 },
  },
] as const;

export const editorFontIcons = [
  {
    iconName: 'BoldIcon',
    style: 'bold',
    method: 'toggleBold',
  },
  {
    iconName: 'ItalicIcon',
    style: 'italic',
    method: 'toggleItalic',
  },
  {
    iconName: 'StrikeIcon',
    style: 'strike',
    method: 'toggleStrike',
  },
  {
    iconName: 'UnderlineIcon',
    style: 'underline',
    method: 'toggleUnderline',
  },
] as const;

export const editorAlignIcons = [
  {
    iconName: 'AlignLeftIcon',
    method: 'left',
  },
  {
    iconName: 'AlignCenterIcon',
    method: 'center',
  },
  {
    iconName: 'AlignRightIcon',
    method: 'right',
  },
] as const;
