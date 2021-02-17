import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'

type SeparatorProps = ViewProps & {
  layout?: 'horizontal' | 'vertical'
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Separator = ({ layout = 'horizontal', style, ...rest }: SeparatorProps) => {
  //layout === 'horizontal'tuueの時はstyles.horizontal.falseならstyles.vertical
  return <View style={[layout === 'horizontal' ? styles.horizontal : styles.vertical, style]} {...rest} />
}
const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D3D3D3',
  },
  vertical: {
    height: '100%',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#D3D3D3',
  },
})

export default Separator
