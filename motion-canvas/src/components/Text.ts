import { initial, signal, Rect, Txt, Node, Img, NodeProps, Line, ImgProps as ImgMotionCanvasProps, TxtProps, Layout, LayoutProps } from "@motion-canvas/2d"
import { SimpleSignal, all } from "@motion-canvas/core"
import { debug } from '../../../debug'

interface TextProps extends LayoutProps {
  text: string
  textType: 'normal' | 'definition' | 'citation'
  author?: string
  subject?: string
  date?: string
}

export class Text extends Layout {


  public constructor(props: TextProps) {
    super({...props, layout: true, direction: 'column'})
    
    if(props.textType === 'citation') {
      this.gap(60)
      const text = new Txt({text: `"${props.text}"`, fontStyle: 'italic', fontFamily: "Rubik", fontWeight: 300, fontSize: 30, fill: "white", maxWidth: 600, textWrap: true})
      const text_ = props.date ? `${props.author} | ${props.date}` : props.author
      const author = new Txt({text: text_, fontFamily: "Rubik", fontWeight: 300, fontSize: 30, fill: "white", maxWidth: 600, textWrap: true, textAlign: 'right'})
      this.add(text)
      this.add(author)
    }
    if(props.textType === 'definition') {
      this.gap(20)
      const text = new Txt({text: props.text, fontFamily: "Rubik", fontWeight: 300, fontSize: 30, fill: "white", maxWidth: 600, textWrap: true})
      const subject = new Txt({text: props.subject, fontFamily: "Rubik", fontWeight: 500, fontSize: 40, fill: "white", maxWidth: 600, textWrap: true})
      this.add(subject)
      this.add(text)
    }
    if(props.textType === 'normal') {
      const text = new Txt({text: props.text, fontFamily: "Rubik", fontWeight: 300, fontSize: 30, fill: "white", maxWidth: 600, textWrap: true})
      this.add(text)
    }
  }


} 