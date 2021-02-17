import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native'

type OutlinesButtonProps = TouchableOpacityProps & {
  text?: string
  fontSize: number
  color?: string // html color code
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//.FCはchildrenを使うときに使う
const OutlinedButton: React.FC<OutlinesButtonProps> = ({
  text,
  fontSize = 12,
  color = '#1da1f2',
  style,
  children,
  ...rest //TouchableOpacityPropsの残りのやつをまとめている。
}) => {
  return (
    <TouchableOpacity style={[styles.root, { borderColor: color }, style]} {...rest}>
      {text && <Text style={{ color, fontSize }}>{text}</Text>}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1da1f2',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
})

export default OutlinedButton
